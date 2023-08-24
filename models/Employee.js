const usersCollection = require('../db').db().collection('Registrations')
const pendingCollection = require('../db').db().collection('Pending Tasks')
const ObjectID = require('mongodb').ObjectID
const pkgs = require('../utility/packages')
const Notification = require('../models/Notification')

let Employee = function(data){
    this.data = data
    this.errors = []
}

Employee.tasks_screen = function(userID){
    return new Promise(async(resolve,reject)=>{
        try{
            let employeeData = (await usersCollection.aggregate([
                {$match:{_id: new ObjectID(userID)}},
                {$lookup:{from:'Registrations', localField:'tasks.orderID', foreignField:'orders._id', as:'customers'}},
                {$project:{tasks:1, customers:1, role:1, status:1, attendance:1}}
            ]).toArray())[0]
        
            employeeData.tasks = employeeData.tasks ? employeeData.tasks : []
            let tasks = employeeData.tasks.map((task)=>{
                employeeData.customers.forEach((customer)=>{
                    let orderDoc = customer.orders.find(order => String(order._id)==String(task.orderID))
                    if(orderDoc){
                        task.order = orderDoc
                        task.customerID = customer._id
                        task.customerLicenseID = customer.license
                        task.customerVehicleColor = customer.color

                        if(String(orderDoc.assembler)==String(userID)){
                            task.desc = 'To assemble'
                            task.time = task.status=='complete' ? pkgs.concatZero(pkgs.dateTimeDiff(task.order.assembled_at, task.assigned_at)) : '-'
                        }
                        else{
                            task.desc = 'To deliver'
                            task.time = task.status=='complete' ? pkgs.concatZero(pkgs.dateTimeDiff(task.order.carried_at, task.assigned_at)) : '-'
                        }
                    }       
                })
                return task
            })

            // if an employee is both assembler and carrier of the same order
            tasks.forEach((task_A, i)=>{
                tasks.forEach((task_B, j)=>{
                    if(i!==j && String(task_A.orderID)==String(task_B.orderID)){
                        let num = pkgs.compareDateTime(task_A.assigned_at, task_B.assigned_at)
                        if(num==-1){
                            task_A.desc = 'To assemble'
                            task_B.desc = 'To deliver'
                            task_A.time = task.status=='complete' ? pkgs.concatZero(pkgs.dateTimeDiff(task.order.assembled_at, task.assigned_at)) : '-'
                            task_B.time = task.status=='complete' ? pkgs.concatZero(pkgs.dateTimeDiff(task.order.carried_at, task.assigned_at)) : '-'
                        }
                        else if(num==1){
                            task_B.desc = 'To assemble'
                            task_A.desc = 'To deliver'
                            task_B.time = task.status=='complete' ? pkgs.concatZero(pkgs.dateTimeDiff(task.order.assembled_at, task.assigned_at)) : '-'
                            task_A.time = task.status=='complete' ? pkgs.concatZero(pkgs.dateTimeDiff(task.order.carried_at, task.assigned_at)) : '-'
                        }
                    }
                })
            })

            delete employeeData.customers
         
            let incompleteTasks = tasks.filter(task => task.status=='incomplete')
            let completeTasks = tasks.filter(task => task.status=='complete')

            if(incompleteTasks.length){
                let sortBy = incompleteTasks[0].desc == 'To assemble' ? 'placed_at' : 'detected_at'
                incompleteTasks.sort((a,b)=> pkgs.compareDateTime(a.order[sortBy], b.order[sortBy]))
            }
            completeTasks.sort((a,b)=> {
                let a_sortBy = a.desc == 'To assemble' ? 'assembled_at' : 'carried_at'
                let b_sortBy = b.desc == 'To assemble' ? 'assembled_at' : 'carried_at'
                return pkgs.compareDateTime(b.order[a_sortBy], a.order[b_sortBy])
            })

            tasks = [...incompleteTasks, ...completeTasks]
            employeeData.tasks = tasks       
            
            if(employeeData.attendance){
                let attendanceDoc = employeeData.attendance.find(doc => doc.date == pkgs.currentDate())
                let attendanceInfo

                if(attendanceDoc){
                    let hours = Math.floor(attendanceDoc.total_time/1000/60/60)
                    let minutes = Math.floor((attendanceDoc.total_time/1000/60/60 - hours)*60)
                    attendanceInfo = `${hours}h ${minutes}m`
                }
                else{
                    attendanceInfo = `0h 0m`
                }

                employeeData.attendanceInfo = attendanceInfo
            }
            else{
                employeeData.attendanceInfo = `0h 0m`
            }

            delete employeeData.attendance
            resolve(employeeData)
        }
        catch(error){
            console.log(error, 'Location: query/tasks_screen()/Employee.js')
            reject('Unexpected Error! Please try again later.')
        }
    })
}

Employee.taskOrderDetails = function(taskID,userID){
    return new Promise(async(resolve,reject)=>{
        try{
            if(typeof(taskID)!='string' || !ObjectID.isValid(taskID)){
                reject('404')
                return 
            }

            let emp = await usersCollection.findOne({_id: new ObjectID(userID)})
            if(emp && emp.tasks){
                let task = emp.tasks.find(task => String(task._id) == String(taskID))
                if(task){   
                    let customer = await usersCollection.findOne({"orders._id": new ObjectID(task.orderID)})
                    let order = customer.orders.find(order => String(order._id) == String(task.orderID))
                    order.customerLicenseID = customer.license
                    order.customerVehicleColor = customer.color
                    resolve([order,task,emp.role])
                }
                else{
                    reject('404')
                }
            }
            else{
                reject('404')
            }
        }
        catch(error){
            console.log(error, 'Location: query/taskOrderDetails()/Employee.js')
            reject('Unexpected Error! Please try again later.')
        }
    })
}

Employee.toggle_status = function(userID){
    return new Promise(async(resolve,reject)=>{
        try{
            let emp = await usersCollection.findOne({_id: new ObjectID(userID)})
            let toggled_status = emp.status=='active' ? 'inactive' : 'active'

            await Employee.attendance(emp, toggled_status)
   
            if(toggled_status=='active'){
                await Employee.add_pending_tasks(emp)
            }

            await usersCollection.updateOne({_id: new ObjectID(userID)},{$set: {status:toggled_status}})
            resolve()
        }
        catch(error){
            console.log(error, 'Location: query/toggle_status()/Employee.js')
            reject('Unexpected Error! Please try again later.')
        }
    })
}

Employee.add_pending_tasks = function(emp){
    return new Promise(async(resolve,reject)=>{
        try{
            let desc = emp.role == 'assembler' ? 'To assemble' : 'To deliver'
            let pendingTasks = await pendingCollection.find({desc: desc}).toArray()

            if(pendingTasks.length){
                await pendingCollection.deleteMany({desc:desc})

                pendingTasks = pendingTasks.map(task => {
                    return {
                        _id: new ObjectID(),
                        orderID: new ObjectID(task.orderID),
                        status: 'incomplete',
                        assigned_at: pkgs.currentDateTime()
                    }
                })

                await usersCollection.updateOne({_id: new ObjectID(emp._id)},{$push: {"tasks": {$each: pendingTasks}}})

                let promises = []
                for(let task of pendingTasks){
                    promises.push(
                        new Promise(async(resolve,reject)=>{
                            await usersCollection.updateOne(
                                {"orders._id": new ObjectID(task.orderID)},
                                (emp.role=='assembler') ? {$set:{"orders.$.assembler": new ObjectID(emp._id)}} : {$set:{"orders.$.carrier": new ObjectID(emp._id)}}
                            )
                            resolve()
                        })
                    )
                }
                
                await Promise.all(promises)

                let notification = new Notification(12, String(emp._id), `${pendingTasks.length} pending tasks are assigned to an employee!`)
                await notification.save()
            }
            
            resolve()
        }
        catch(error){
            reject(error)
        }
    })
}

Employee.attendance = function(emp, updated_status){
    return new Promise(async(resolve,reject)=>{
        try{
            let todayDoc = null
            if(emp.attendance){
                todayDoc = emp.attendance.find((doc)=> doc.date == pkgs.currentDate())
            }

            if(!todayDoc && updated_status=='active'){
                let attendance = {
                    _id: new ObjectID(),
                    total_time: 0,
                    active_from: new Date(),
                    date: pkgs.currentDate()
                }

                await usersCollection.updateOne({_id: new ObjectID(emp._id)},{$push:{"attendance": attendance}})
            }
            else if(todayDoc && updated_status=='active'){
                await usersCollection.updateOne({_id: new ObjectID(emp._id), "attendance.date": pkgs.currentDate()},{$set:{"attendance.$.active_from": new Date()}})
            }
            else if(todayDoc && updated_status!='active'){
                let calcTime = new Date() - new Date(todayDoc.active_from)
                let totalTime = Number(todayDoc.total_time) + Number(calcTime)
                await usersCollection.updateOne({_id: new ObjectID(emp._id), "attendance.date": pkgs.currentDate()},{$set:{"attendance.$.total_time": totalTime, "attendance.$.active_from": ''}})
            }
            else if(!todayDoc && updated_status!='active'){
                let lastdayDoc = emp.attendance.slice(-1)[0]
                let lastdayCalcTime = (new Date(lastdayDoc.active_from).setHours(23,59,59)) - new Date(lastdayDoc.active_from)
                let lastdayTotalTime = Number(lastdayDoc.total_time) + Number(lastdayCalcTime)

                let daysInBetween = pkgs.datesBetween(lastdayDoc.date,pkgs.currentDate())
                let daysInBetweenAttendance = []

                daysInBetween.forEach((date)=>{
                    daysInBetweenAttendance.push({
                        _id: new ObjectID(),
                        total_time: 86400000,
                        active_from: '',
                        date: date
                    })
                })

                let attendance = {
                    _id: new ObjectID(),
                    total_time: 0,
                    active_from: '',
                    date: pkgs.currentDate()
                }

                let calcTime = new Date() - (new Date().setHours(0,0,1))
                attendance.total_time += Number(attendance.total_time) + Number(calcTime)

                await usersCollection.updateOne({_id: new ObjectID(emp._id), "attendance.date": lastdayDoc.date},{$set:{"attendance.$.total_time": lastdayTotalTime, "attendance.$.active_from": ''}})
                await usersCollection.updateOne({_id: new ObjectID(emp._id)},{$push:{"attendance": {$each: [...daysInBetweenAttendance,attendance]}}})
            }
            resolve()
        }
        catch(error){
            reject(error)
        }
    })
}

Employee.mark_task = function(userID,taskID){
    return new Promise(async(resolve,reject)=>{
        try{
            let emp = await usersCollection.findOne({_id: new ObjectID(userID)})
            if(emp && emp.tasks){
                let task = emp.tasks.find(task => String(task._id) == String(taskID))

                if(task){               
                    let customer = await usersCollection.findOne({"orders._id": new ObjectID(task.orderID)})
                    let order = customer.orders.find(order => String(order._id) == String(task.orderID))

                    if(emp.role=='assembler' && task.status=='incomplete' && order.status=='placed'){
                        let new_order_status = 'assembled'

                        await usersCollection.updateOne({"orders._id": new ObjectID(task.orderID)},{$set: {"orders.$.status": new_order_status, "orders.$.assembled_at": pkgs.currentDateTime()}})
                        await usersCollection.updateOne({_id: new ObjectID(userID), "tasks._id": new ObjectID(taskID)},{$set: {"tasks.$.status": "complete"}})
                        
                        let completed = emp.tasks.filter(task_A => task_A.status=='complete').length
        
                        if((completed+1) % 100 == 0){
                            let notification = new Notification(1, String(emp._id), `${emp.username} has completed ${completed+1} tasks!`)
                            await notification.save()
                        }

                        let task_minutes = pkgs.dateTimeDiff(pkgs.currentDateTime(), task.assigned_at)
            
                        if(task_minutes > 15){
                            let notification = new Notification(5, String(emp._id), `${emp.username} took ${task_minutes} min to complete a task!`)
                            await notification.save()
                        }
                   
                        // send email to customer here
                        resolve()
                    }
                    else{
                        reject('Invalid Action!')
                    }
                }
                else{
                    reject('Invalid Task ID')
                }
            }
            else{
                reject('Invalid Task ID')
            }
        }
        catch(error){
            console.log(error, 'Location: query/mark_task()/Employee.js')
            reject('Unexpected Error! Please try again later.')
        }
    })
}

Employee.attendance_screen = function(userID, month, year){
    return new Promise(async(resolve,reject)=>{
        try{
            if(typeof(month)!='string' || typeof(year)!='string' || !pkgs.isNumeric(month) || !pkgs.isNumeric(year) || Number(month)<1 || Number(month)>12){
                reject('404')
                return 
            }

            let attendance = (await usersCollection.findOne({_id: new ObjectID(userID)})).attendance
            if(attendance){
                attendance = attendance.filter((object)=> Number(object.date.split('/')[1])==Number(month) && Number(object.date.split('/')[2])==Number(year))
                attendance = attendance.map((object)=>{
                    object = {
                        date: object.date,
                        total_time: Math.trunc(((object.total_time/1000)/60)/60)
                    }
                    return object
                })
            }

            let daysCount = new Date(year, month, 0).getDate()
            let dayDates = []
            let dayNames = []
            let symbols = []

            for(let i=1; i<=daysCount; i++){
                dayDates.push(i)
                if(attendance){
                    let doc = attendance.find(object => Number(object.date.split('/')[0])==i)
                    if(!doc) symbols.push('A')
                    else if(doc.total_time >= 8) symbols.push('P')
                    else symbols.push('T')
                }
                else{
                    symbols.push('A')
                }
            }

            let date = new Date(year, month-1)
            let weekdays = ['Sun','Mon', 'Tues', 'Wed','Thurs','Fri','Sat']
            while(date.getMonth()==month-1){
                dayNames.push(`${weekdays[date.getDay()]}`)
                date.setDate(date.getDate()+1)
            }        

            resolve([dayDates, dayNames, symbols, month, year])
        }
        catch(error){
            console.log(error, 'Location: query/attendance_screen()/Employee.js')
            reject('Unexpected Error! Please try again later.')
        }
    })
}

Employee.invert = function(role){
    return (role=='assembler') ? 'carrier' : 'assembler'
}

module.exports = Employee