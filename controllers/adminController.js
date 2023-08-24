const Admin = require('../models/Admin')
const User = require('../models/User')
const Item = require('../models/Item')
const dotenv = require('dotenv')
dotenv.config()

exports.view_customers = async function(req,res){
    try{
        let customers = await Admin.view_customers()
        customers = customers.map((customer)=>{
            delete customer.password
            return customer
        })
        res.render('view-customers', {cssFile:'/view-customers.css', script:'/scripts/view-customers.js', errors:req.flash('errors'), success:req.flash('success'), customers:customers})
    }
    catch(error){
        req.flash('errors', error)
        req.session.save(()=>{
            res.redirect('/')  
        })
    }
}

exports.view_employees = async function(req,res){
    try{
        let employees = await Admin.view_employees()
        employees = employees.map((employee)=>{
            delete employee.password
            return employee
        })
        res.render('view-employees', {cssFile:'/view-employees.css', errors:req.flash('errors'), success:req.flash('success'), employees:employees})
    }
    catch(error){
        req.flash('errors', error)
        req.session.save(()=>{
            res.redirect('/')  
        })
    }
}

exports.register_emp_screen = function(req,res){
    res.render('register-emp',{cssFile:'/register-emp.css', errors:req.flash('errors'), success:req.flash('success')})
}

exports.inventory_screen = async function(req,res){
    try{
        let [items, category, sub_category, categories, sub_categories] = await Admin.getItems(req.params.category, req.params.sub_category)
        res.render('inventory', {script:'/scripts/inventory.js' ,cssFile:'/inventory.css', errors:req.flash('errors'), success:req.flash('success'), items, category, sub_category, categories, sub_categories})
    }
    catch(error){
        if(error!='404'){
            req.flash('errors', error)
            req.session.save(()=>{
                res.redirect('/')  
            })
        }
        else{
            res.render('404', {cssFile:'/404.css'})
        }
    }
}

exports.import_screen = async function(req,res){
    try{
        let [items, category, sub_category, categories, sub_categories] = await Admin.getMarketItems(req.params.category, req.params.sub_category)
        res.render('import', {script:'/scripts/import.js' ,cssFile:'/import.css', errors:req.flash('errors'), success:req.flash('success'), items, category, sub_category, categories, sub_categories})
    }
    catch(error){
        if(error!='404'){
            req.flash('errors', error)
            req.session.save(()=>{
                res.redirect('/')  
            })
        }
        else{
            res.render('404', {cssFile:'/404.css'})
        }
    }
}

exports.search_inventory = function(req,res){
    Admin.search_inventory(req.body.searchTerm).then((results)=>{
        res.json(results)
    }).catch(()=>{
        res.json([])
    })
}

exports.search_market = function(req,res){
    Admin.search_market(req.body.searchTerm).then((results)=>{
        res.json(results)
    }).catch(()=>{
        res.json([])
    })
}

exports.edit_emp_screen = async function(req,res){
    try{
        let employee = await User.findById(req.params.id)
        delete employee.password
        res.render('edit-emp', {cssFile:'/edit-emp.css', errors:req.flash('errors'), success:req.flash('success'), employee:employee})
    }
    catch(error){
        if(error!='404'){
            req.flash('errors', error)
            req.session.save(()=>{
                res.redirect('/view-employees')  
            })
        }
        else{
            res.render('404', {cssFile:'/404.css'})
        }
    }
}

exports.edit_emp = function(req,res){
    let employee = new User(req.body)

    employee.edit(req.params.id, 'employee').then(()=>{
        req.flash('success', 'Employee data updated successfully')
        req.session.save(()=>{
          res.redirect(`/edit-employee/${req.params.id}`)
        }) 
    }).catch((errors)=>{
        errors.forEach((error)=>{
            req.flash('errors',error)
        })
        req.session.save(()=>{
            errors.includes('The employee you are trying to update does not exist!') ? res.redirect('/') : res.redirect(`/edit-employee/${req.params.id}`)
        })
    })  
}

exports.update_item = function(req,res){
    let item = new Item(req.body)

    item.update(req.params.id).then(()=>{
        res.json('Item updated!')
    }).catch((errors)=>{
        res.json('Failed to update!')
    })  
}

exports.import_item = function(req,res){
    let item = new Item(req.body.payload)

    item.import().then(()=>{
        res.json('Item imported!')
    }).catch((errors)=>{
        if(errors.includes('This item already exists in your inventory!')){
            res.json('Already imported!')
        }
        else{
            res.json('Failed to Import!')
        }
    })  
}

exports.delete_item = function(req,res){
    Admin.delete_item(req.body.itemID).then((msg)=>{
        res.json(msg)
    }).catch(()=>{
        res.json('Delete Operation Failed!')
    })
}

exports.customer_orders_screen = function(req,res){
    Admin.getCustomerOrders(req.params.id).then((orders)=>{
        res.render('view-orders', {errors:req.flash('errors'), success:req.flash('success'), cssFile:'/view-orders.css', orders, customerDetails:false})
    }).catch((error)=>{
        if(error!='404'){
            req.flash('errors', error)
            req.session.save(()=>{
                res.redirect('/view-customers')  
            })
        }
        else{
            res.render('404', {cssFile:'/404.css'})
        }
    })
}

exports.customer_order_details = function(req,res){
    Admin.customerOrderDetails(req.params.cid,req.params.oid).then((order)=>{
        res.render('order-details', {errors:req.flash('errors'), success:req.flash('success'), cssFile:'/order-details.css', order})
    }).catch((error)=>{
        if(error!='404'){
            req.flash('errors', error)
            req.session.save(()=>{
                res.redirect(`/view-customers`)  
            })
        }
        else{
            res.render('404', {cssFile:'/404.css'})
        }
    })
}

exports.all_orders = function(req,res){
    Admin.getAllOrders().then((orders)=>{
        res.render('view-orders', {errors:req.flash('errors'), success:req.flash('success'), cssFile:'/view-orders.css', orders, customerDetails:true})
    }).catch((error)=>{
        req.flash('errors', error)
        req.session.save(()=>{
            res.redirect('/')  
        })
    })
}

exports.customer_details = function(req,res){
    Admin.customerDetails(req.params.id).then((customer)=>{
        res.render('customer-details', {errors:req.flash('errors'), success:req.flash('success'), cssFile:'/customer-details.css', script:'/scripts/customer-details.js', customer})
    }).catch((error)=>{
        if(error!='404'){
            req.flash('errors', error)
            req.session.save(()=>{
                res.redirect(`/all-orders`)  
            })
        }
        else{
            res.render('404', {cssFile:'/404.css'})
        }
    })
}

exports.employee_tasks_screen = function(req,res){
    Admin.getEmployeeTasks(req.params.id).then((tasks)=>{
        res.render('view-tasks', {errors:req.flash('errors'), success:req.flash('success'), cssFile:'/view-tasks.css', tasks, empID:req.params.id})
    }).catch((error)=>{
        if(error!='404'){
            req.flash('errors', error)
            req.session.save(()=>{
                res.redirect('/view-employees')  
            })
        }
        else{
            res.render('404', {cssFile:'/404.css'})
        }
    })
}

exports.emp_attendance_screen = async function(req,res){
    try{
      let [dayDates, dayNames, symbols, month, year] = await Admin.emp_attendance_screen(req.params.id, req.params.month, req.params.year)
      res.render('attendance', {cssFile:'/attendance.css', errors:req.flash('errors'), success:req.flash('success'), dayDates, dayNames, symbols, month, year, empID:req.params.id, page:'single'})
    }
    catch(error){
      if(error!='404'){
        req.flash('errors', error)
        req.session.save(()=>{
            res.redirect('/view-employees')  
        })
      }
      else{
          res.render('404', {cssFile:'/404.css'})
      }
    }
  }

exports.attendance_list = async function(req,res){
    try{
        let [dayDates, dayNames, symbols, month, year, employees] = await Admin.attendance_list(req.params.month, req.params.year)
        res.render('attendance', {cssFile:'/attendance.css', errors:req.flash('errors'), success:req.flash('success'), dayDates, dayNames, symbols, month, year, employees, page:'list'})
    }
    catch(error){
        if(error!='404'){
            req.flash('errors', error)
            req.session.save(()=>{
                res.redirect('/')  
            })
        }
        else{
            res.render('404', {cssFile:'/404.css'})
        }
    }
}

exports.distribute_tasks = async function(req,res){
    try{
        await Admin.distribute_tasks(req.params.id, 'distribute-feature', null)
        req.flash('success', 'Incomplete tasks distributed!')
        req.session.save(()=>{
            res.redirect(`/employee-tasks/${req.params.id}`) 
        })   
    }
    catch(error){
        req.flash('errors', error)
        if(error=='That employee does not exist!'){     
            req.session.save(()=>{
                res.redirect('/view-employees')  
            })
        }
        else{
            req.session.save(()=>{
                res.redirect(`/employee-tasks/${req.params.id}`)  
            })
        }
    }
}

exports.sales_screen = async function(req,res){
    try{
        let customers = await Admin.view_customers()
        customers = customers.filter(customer => customer.orders)
        customers = customers.map((customer)=>{
            return {
                _id: customer._id,
                username: customer.username,
                orders: customer.orders
            }
        })

        res.render('sales', {script:'/scripts/sales.js' ,cssFile:'/sales.css', errors:req.flash('errors'), success:req.flash('success'), customers, env:process.env.NODE_ENV})
    }
    catch(error){
        req.flash('errors', error)
        req.session.save(()=>{
            res.redirect('/')  
        })
    }
}

exports.notifications = async function(req,res){
    try{
        let notifications = await Admin.notifications()
        res.render('notifications', {cssFile:'/notifications.css', notifications})
    }
    catch(error){
        req.flash('errors', error)
        req.session.save(()=>{
            res.redirect('/')  
        })
    }
}