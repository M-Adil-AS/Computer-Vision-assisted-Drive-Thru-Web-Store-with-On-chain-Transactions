const usersCollection = require('../db').db().collection('Registrations')
const itemsCollection = require('../db').db().collection('Items')
const pendingCollection = require('../db').db().collection('Pending Tasks')
const ObjectID = require('mongodb').ObjectID
const axios = require('axios')
const pkgs = require('../utility/packages')
const Employee = require('../models/Employee')
const Notification = require('../models/Notification')

let Admin = function(data){
    this.data = data
    this.errors = []
}

Admin.view_customers = function(){
    return new Promise((resolve,reject)=>{
        usersCollection.find({person:'customer'}).toArray().then((customers)=>{
            resolve(customers)
        }).catch((error)=>{
            console.log(error, 'Location: query/view_customers()/Admin.js')
            reject('Unexpected Error! Please try again later.')
        })
    })
}

Admin.view_employees = function(){
    return new Promise((resolve,reject)=>{
        usersCollection.find({person:'employee'}).toArray().then((employees)=>{
            resolve(employees)
        }).catch((error)=>{
            console.log(error, 'Location: query/view_employees()/Admin.js')
            reject('Unexpected Error! Please try again later.')
        })
    })
}

Admin.getItems = function(category, sub_category){
    return new Promise((resolve,reject)=>{
        if(typeof(category)!='string' || typeof(sub_category)!='string'){
            reject('404')
            return 
        }

        itemsCollection.find({}).toArray().then((inventoryItems)=>{
            let categories = []
            let sub_categories = []

            for(item of inventoryItems){
                let categoryIndex = categories.indexOf(item.category)
                if(categoryIndex==-1){
                    categories.push(item.category)
                    sub_categories.push([item.sub_category])
                }
                else{
                    let sub_categoryIndex = sub_categories[categoryIndex].indexOf(item.sub_category)
                    if(sub_categoryIndex==-1) sub_categories[categoryIndex].push(item.sub_category)
                }
            }

            const categoryIndex = categories.indexOf(category)

            if(categories.includes(category) && sub_categories[categoryIndex].includes(sub_category)){
                let items = inventoryItems.filter(item => item.category==category && item.sub_category==sub_category)
                resolve([items,category,sub_category,categories,sub_categories])
            }
            else{
                reject('404')
            }
        }).catch((error)=>{
            console.log(error, 'Location: query/getItems()/Admin.js')
            reject('Unexpected Error! Please try again later.')
        })
    }) 
}

Admin.getMarketItems = function(category, sub_category){
    return new Promise((resolve,reject)=>{
        if(typeof(category)!='string' || typeof(sub_category)!='string'){
            reject('404')
            return 
        }

        axios.get('https://m-adilahmad.github.io/FYP-MarketItems/data.json').then((response)=>{
            const marketItems = response.data
            let categories = []
            let sub_categories = []

            for(item of marketItems){
                let categoryIndex = categories.indexOf(item.category)
                if(categoryIndex==-1){
                    categories.push(item.category)
                    sub_categories.push([item.sub_category])
                }
                else{
                    let sub_categoryIndex = sub_categories[categoryIndex].indexOf(item.sub_category)
                    if(sub_categoryIndex==-1) sub_categories[categoryIndex].push(item.sub_category)
                }
            }

            const categoryIndex = categories.indexOf(category)

            if(categories.includes(category) && sub_categories[categoryIndex].includes(sub_category)){
                let items = marketItems.filter(item => item.category==category && item.sub_category==sub_category)
                resolve([items,category,sub_category,categories,sub_categories])
            }
            else{
                reject('404')
            }
        }).catch((error)=>{
            console.log(error, 'Location: query/getMarketItems()/Admin.js')
            reject('Unexpected Error! Please try again later.')
        })
    }) 
}

Admin.search_inventory = function(searchTerm){
    return new Promise((resolve,reject)=>{
        if(typeof(searchTerm)!='string'){
            reject()
            return 
        }

        itemsCollection.find({title: {$regex: searchTerm, $options: 'i'}}).toArray().then((results)=>{
            resolve(results)
        }).catch((error)=>{
            console.log(error, 'Location: query/search_inventory()/Admin.js')
            reject()
        })
    }) 
}

Admin.search_market = function(searchTerm){
    return new Promise((resolve,reject)=>{
        if(typeof(searchTerm)!='string'){
            reject()
            return 
        }

        axios.get('https://m-adilahmad.github.io/FYP-MarketItems/data.json').then((response)=>{
            const marketItems = response.data
            let regEx = new RegExp(searchTerm, 'i')
            let results = marketItems.filter(item => item.title.match(regEx) != null)
            resolve(results)
        }).catch((error)=>{
            console.log(error, 'Location: query/search_market()/Admin.js')
            reject()
        })
    }) 
}

Admin.delete_item = function(itemID){
    return new Promise((resolve,reject)=>{
        if(typeof(itemID)!='string' || !ObjectID.isValid(itemID)){
            reject()
            return 
        }

        itemsCollection.deleteOne({_id: new ObjectID(itemID)}).then((response)=>{
            response.deletedCount==1 ? resolve('Found') : resolve('Not Found')
        }).catch((error)=>{
            console.log(error, 'Location: query/delete_item()/Admin.js')
            reject()
        })
    }) 
}

Admin.getCustomerOrders = function(customerID){
    return new Promise((resolve,reject)=>{
        if(typeof(customerID)!='string' || !ObjectID.isValid(customerID)){
            reject('404')
            return 
        }

        usersCollection.findOne({_id:new ObjectID(customerID)}).then((customer)=>{
            if(customer){
                if(customer.orders){
                    let orders = customer.orders.map((order)=>{
                        order.customerID = customer._id
                        return order
                    })
                    resolve(orders.reverse())
                }
                else{
                    resolve([])
                }
            }
            else{
                reject('404')
            }
        }).catch((error)=>{
            console.log(error, 'Location: query/getCustomerOrders()/Admin.js')
            reject('Unexpected Error! Please try again later.')
        })
    })
}

Admin.customerOrderDetails = function(customerID,orderID){
    return new Promise((resolve,reject)=>{
        if(typeof(orderID)!='string' || !ObjectID.isValid(orderID) || typeof(customerID)!='string' || !ObjectID.isValid(customerID)){
            reject('404')
            return 
        }

        usersCollection.findOne({_id:new ObjectID(customerID)}).then((customer)=>{
            if(customer && customer.orders){
                let order = customer.orders.find(order => String(order._id) == String(orderID))
                order ? resolve(order) : reject('404')
            }
            else{
                reject('404')
            }
        }).catch((error)=>{
            console.log(error, 'Location: query/customerOrderDetails()/Admin.js')
            reject('Unexpected Error! Please try again later.')
        })
    })
}

Admin.getAllOrders = function(){
    return new Promise((resolve,reject)=>{
        usersCollection.find({person:'customer'}).toArray().then((customers)=>{
            let orders = []
            customers.forEach((customer)=>{
                if(customer.orders){
                    customer.orders.forEach((order)=>{
                        order.customerID = customer._id
                        orders.push(order)
                    })
                }
            })
            
            resolve(orders.sort((b,a) => Number(a.orderNo)-Number(b.orderNo)))
        }).catch((error)=>{
            console.log(error, 'Location: query/getAllOrders()/Admin.js')
            reject('Unexpected Error! Please try again later.')
        })
    })
}

Admin.customerDetails = function(customerID){
    return new Promise((resolve,reject)=>{
        if(typeof(customerID)!='string' || !ObjectID.isValid(customerID)){
            reject('404')
            return 
        }

        usersCollection.findOne({_id:new ObjectID(customerID)}).then((customer)=>{
            if(customer){
                delete customer.password
                resolve(customer)
            }
            else{
                reject('404')
            }
        }).catch((error)=>{
            console.log(error, 'Location: query/customerDetails()/Admin.js')
            reject('Unexpected Error! Please try again later.')
        })
    })
}

Admin.getEmployeeTasks = function(empID){
    return new Promise(async(resolve,reject)=>{
        if(typeof(empID)!='string' || !ObjectID.isValid(empID)){
            reject('404')
            return 
        }

        try{
            let data = (await usersCollection.aggregate([
                {$match:{_id: new ObjectID(empID)}},
                {$lookup:{from:'Registrations', localField:'tasks.orderID', foreignField:'orders._id', as:'customers'}},
                {$project:{tasks:1, customers:1}}
            ]).toArray())[0]
            
            if(!data){
                reject('404')
                return 
            }
            
            data.tasks = data.tasks ? data.tasks : []
            let tasks = data.tasks.map((task)=>{
                data.customers.forEach((customer)=>{
                    let orderDoc = customer.orders.find(order => String(order._id)==String(task.orderID))
                    if(orderDoc){
                        task.order = orderDoc
                        task.customerID = customer._id

                        if(String(orderDoc.assembler)==String(empID)){
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
            resolve(tasks)
        }
        catch(error){
            console.log(error, 'Location: query/getEmployeeTasks()/Admin.js')
            reject('Unexpected Error! Please try again later.')
        }
    })
}

Admin.createTasks = function(customer,users,orders){
    return new Promise(async(resolve,reject)=>{
        try{
            let selectedEmployees = users.filter(user => {
                return (user.person=='employee' && user.role=='carrier' && user.status=='active')
            })
            
            if(selectedEmployees.length){
                selectedEmployees.forEach((emp)=>{
                    if(!emp.tasks){
                        emp.tasks = []
                    }
                    else{
                        emp.tasks = emp.tasks.filter((task)=>{
                            return task.status=='incomplete'
                        })
                    }
                })

                let totalAssignedTasks = selectedEmployees.map(emp => emp.tasks.length)
                let minTasksIndex = totalAssignedTasks.indexOf(Math.min(...totalAssignedTasks))
                let selectedEmp = selectedEmployees[minTasksIndex]
                // Priority is to assign multiple orders delivery of a single customer to a single emp 

                let tasks = []
                let orderIDs = orders.map(order => new ObjectID(order._id))

                for(let i=0; i<orders.length; i++){
                    tasks.push({
                        _id: new ObjectID(),
                        orderID: new ObjectID(orders[i]._id),
                        status: 'incomplete',
                        assigned_at: pkgs.currentDateTime()
                    })
                }

                await usersCollection.updateOne({_id: new ObjectID(selectedEmp._id)},{$push: {"tasks": {$each: tasks}}})

                let promises = []
                for(let orderID of orderIDs){
                    promises.push(
                        new Promise(async(resolve,reject)=>{
                            await usersCollection.updateOne({"orders._id": new ObjectID(orderID)}, {$set:{"orders.$.status": 'detected', "orders.$.carrier": new ObjectID(selectedEmp._id), "orders.$.detected_at": pkgs.currentDateTime()}})
                            resolve()
                        })
                    )
                }
                
                await Promise.all(promises)
            }
            else{
                let pending_tasks = orders.map((order)=>{
                    return {
                        _id: new ObjectID(),
                        orderID: new ObjectID(order._id),
                        status: 'incomplete',
                        desc: 'To deliver'
                    }
                })

                let orderIDs = orders.map(order => new ObjectID(order._id))
                let promises = []
                
                for(let orderID of orderIDs){
                    promises.push(
                        new Promise(async(resolve,reject)=>{
                            await usersCollection.updateOne({"orders._id": new ObjectID(orderID)}, {$set:{"orders.$.status": 'detected', "orders.$.detected_at": pkgs.currentDateTime()}})
                            resolve()
                        })
                    )
                }

                await Promise.all(promises)
                await pendingCollection.insertMany(pending_tasks)

                let notification = new Notification(4, String(customer._id), `No carriers active! A new task(s) was added to pending list`)
                await notification.save()
            }

            resolve()
        }
        catch(error){
            reject(error)
        }
    })
} 

Admin.emp_attendance_screen = function(empID, month, year){
    return new Promise(async(resolve,reject)=>{
        try{
            if(typeof(empID)!='string' || !ObjectID.isValid(empID)){
                reject('404')
                return 
            }

            if(typeof(month)!='string' || typeof(year)!='string' || !pkgs.isNumeric(month) || !pkgs.isNumeric(year) || Number(month)<1 || Number(month)>12){
                reject('404')
                return 
            }

            let employee = await usersCollection.findOne({_id: new ObjectID(empID)})
            if(!employee){
                reject('404')
                return 
            }

            let attendance = employee.attendance
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
            console.log(error, 'Location: query/emp_attendance_screen()/Admin.js')
            reject('Unexpected Error! Please try again later.')
        }
    })
}

Admin.attendance_list = function(month, year){
    return new Promise(async(resolve,reject)=>{
        try{
            if(typeof(month)!='string' || typeof(year)!='string' || !pkgs.isNumeric(month) || !pkgs.isNumeric(year) || Number(month)<1 || Number(month)>12){
                reject('404')
                return 
            }

            let daysCount = new Date(year, month, 0).getDate()
            let dayDates = []
            let dayNames = []
            let symbols = []

            for(let i=1; i<=daysCount; i++){
                dayDates.push(i)
            }

            let date = new Date(year, month-1)
            let weekdays = ['Sun','Mon', 'Tues', 'Wed','Thurs','Fri','Sat']
            while(date.getMonth()==month-1){
                dayNames.push(`${weekdays[date.getDay()]}`)
                date.setDate(date.getDate()+1)
            }     

            let employees = await usersCollection.find({person:'employee'}).toArray()

            employees.forEach((employee,index)=>{
                let attendance = employee.attendance
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

                symbols.push([])

                for(let i=1; i<=daysCount; i++){
                    if(attendance){
                        let doc = attendance.find(object => Number(object.date.split('/')[0])==i)
                        if(!doc) symbols[index].push('A')
                        else if(doc.total_time >= 8) symbols[index].push('P')
                        else symbols[index].push('T')
                    }
                    else{
                        symbols[index].push('A')
                    }
                }   
            })

            employees = employees.map((emp)=>{
                emp = {
                    _id: emp._id,
                    username: emp.username
                }
                return emp
            })

            resolve([dayDates, dayNames, symbols, month, year, employees])
        }
        catch(error){
            console.log(error, 'Location: query/emp_attendance_screen()/Admin.js')
            reject('Unexpected Error! Please try again later.')
        }
    })
}

Admin.distribute_tasks = function(employeeID, request, roleInverted){
    return new Promise(async(resolve,reject)=>{
        try{
            if(typeof(employeeID)!='string' || !ObjectID.isValid(employeeID)){
                reject('That employee does not exist!')
                return 
            }

            let users = await usersCollection.find().toArray()
            let emp = users.find(user => String(user._id) == String(employeeID))

            if(!emp){
                reject('That employee does not exist!')
                return 
            }

            emp.tasks = emp.tasks ? emp.tasks : []
            let incompleteTasks = emp.tasks.filter(task => task.status=='incomplete')

            if(incompleteTasks.length==0){
                if(request=='distribute-feature'){
                    reject('No incomplete tasks to distribute!')
                    return 
                }
                else if(request=='emp-update-feature'){
                    resolve()
                    return 
                }
            }

            let customers = users.filter(user => user.person=='customer' && user.orders)

            let selectedEmployeesRole = (request=='distribute-feature' || (request=='emp-update-feature' && !roleInverted)) ? emp.role : Employee.invert(emp.role)
            let selectedEmployees = users.filter(user => {
                return user.person=='employee' && String(user._id) != String(employeeID) && user.role==selectedEmployeesRole && user.status=='active'
            })

            if(!selectedEmployees.length){
                let pending_tasks = incompleteTasks.map((task)=>{
                    return {
                        _id: new ObjectID(),
                        orderID: new ObjectID(task.orderID),
                        status: 'incomplete',
                        desc: (selectedEmployeesRole=='assembler') ? 'To assemble' : 'To deliver'
                    }
                })

                let orderQueryInfo = []
                incompleteTasks.forEach((incompleteTask)=>{
                    customers.forEach(customer =>{
                        let order = customer.orders.find(order => String(order._id)==String(incompleteTask.orderID))
                        if(order){
                            orderQueryInfo.push({customerID: customer._id, orderID: order._id, modifyField: selectedEmployeesRole, reassignTo: '-'})
                        }
                    })
                })

                let promises = []
                for(let object of orderQueryInfo){
                    promises.push(
                        new Promise(async(resolve,reject)=>{
                            await usersCollection.updateOne(
                                {_id: new ObjectID(object.customerID), "orders._id": new ObjectID(object.orderID)}, 
                                (object.modifyField=='assembler') ? {$set:{"orders.$.assembler": object.reassignTo}} : {$set:{"orders.$.carrier": object.reassignTo}}
                            )
                            resolve()
                        })
                    )
                }

                await Promise.all(promises)
                await pendingCollection.insertMany(pending_tasks)

                let notification_type = selectedEmployeesRole=='assembler' ? 8 : 9
                let notification_text = `No ${selectedEmployeesRole}s active! Tasks transferred are added to pending list`
                let notification = new Notification(notification_type, null, notification_text)
                await notification.save()
            }
            else{
                let taskQueryInfo = []
                let orderQueryInfo = []

                incompleteTasks.forEach((incompleteTask)=>{
                    selectedEmployees.forEach((emp)=>{
                        if(!emp.tasks){
                            emp.tasks = []
                        }
                        else{
                            emp.tasks = emp.tasks.filter(task => task.status=='incomplete')
                        }
                    })

                    let totalAssignedTasks = selectedEmployees.map(emp => emp.tasks.length)
                    let minTasksIndex = totalAssignedTasks.indexOf(Math.min(...totalAssignedTasks))
                    let selectedEmp = selectedEmployees[minTasksIndex]
                    selectedEmp.tasks.push(incompleteTask)

                    taskQueryInfo.push({empID:selectedEmp._id, task:incompleteTask})

                    customers.forEach(customer =>{
                        let order = customer.orders.find(order => String(order._id)==String(incompleteTask.orderID))
                        if(order){
                            orderQueryInfo.push({customerID: customer._id, orderID: order._id, modifyField: selectedEmployeesRole, reassignTo: selectedEmp._id})
                        }
                    })
                })

                let promises = []

                for(let object of taskQueryInfo){
                    promises.push(
                        new Promise(async(resolve,reject)=>{
                            await usersCollection.updateOne(
                                {_id: new ObjectID(object.empID)}, 
                                {$push:{"tasks": {_id: new ObjectID(), orderID: new ObjectID(object.task.orderID), status: object.task.status, assigned_at: pkgs.currentDateTime()}}}
                            )
                            resolve()
                        })
                    )
                }

                for(let object of orderQueryInfo){
                    promises.push(
                        new Promise(async(resolve,reject)=>{
                            await usersCollection.updateOne(
                                {_id: new ObjectID(object.customerID), "orders._id": new ObjectID(object.orderID)}, 
                                (object.modifyField=='assembler') ? {$set:{"orders.$.assembler": new ObjectID(object.reassignTo)}} : {$set:{"orders.$.carrier": new ObjectID(object.reassignTo)}}
                            )
                            resolve()
                        })
                    )
                }

                await Promise.all(promises)

                let notification_type = selectedEmployeesRole=='assembler' ? 10 : 11
                let notification_text = `Tasks assigned to ${emp.username} are transferred to other ${selectedEmployeesRole}s!`
                let notification = new Notification(notification_type, null, notification_text)
                await notification.save()
            }

            await usersCollection.updateOne({_id: new ObjectID(employeeID)}, {$pull: {tasks: {status: 'incomplete'}}})

            if(request=='distribute-feature' && emp.status=='active'){
                await usersCollection.updateOne({_id: new ObjectID(employeeID)},{$set:{"status": 'inactive'}})
                await Employee.attendance(emp, 'inactive')
            }
            resolve()
        }
        catch(error){
            console.log(error, 'Location: query/distribute_tasks()/Admin.js')
            reject('Unexpected Error! Please try again later.')
        }
    })
}

Admin.notifications = function(){
    return new Promise(async(resolve,reject)=>{
        try{
            let notifications = (await usersCollection.findOne({person:"admin"})).notifications
            notifications = notifications ? notifications : []
            resolve(notifications.reverse())
        }
        catch(error){
            console.log(error, 'Location: query/notifications()/Admin.js')
            reject('Unexpected Error! Please try again later.')
        }
    })
}

module.exports = Admin