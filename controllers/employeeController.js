const Employee = require('../models/Employee')

exports.tasks_screen = async function(req,res){
    try{
      let emp = await Employee.tasks_screen(req.session.user.id)
      res.render('view-tasks', {cssFile:'/view-tasks.css', errors:req.flash('errors'), success:req.flash('success'), emp, tasks:emp.tasks, script:'/scripts/view-tasks.js'})
    }
    catch(error){
      req.flash('errors', error)
      req.session.save(()=>{
          res.redirect('/')  
      })
    }
}

exports.refresh_tasks = async function(req,res){
  res.statusCode = 200
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Cache-Control", "no-cache")
  res.setHeader("connection", "keep-alive")
  res.setHeader("Content-Type", "text/event-stream")
  getNewTasks(req, res)
}

let getNewTasks = exports.new_tasks = async function(req,res){
  try{
    let empData = await Employee.tasks_screen(req.session.user.id)
    const data = JSON.stringify({ticker: empData})
    res.write(`id: ${(new Date()).toLocaleTimeString()}\ndata: ${data}\n\n`)

    await new Promise(resolve => {
      setTimeout(() => {
        getNewTasks(req, res)
        resolve()
      },20000)
    })
  }
  catch(error){
    await new Promise(resolve => {
      setTimeout(() => {
        getNewTasks(req, res)
        resolve()
      },20000)
    })
  }
}

exports.task_order_details = function(req,res){
  Employee.taskOrderDetails(req.params.id,req.session.user.id).then(([order,task,empRole])=>{
      res.render('order-details', {errors:req.flash('errors'), success:req.flash('success'), cssFile:'/order-details.css', order, task, empRole, script:'/scripts/order-details.js'})
  }).catch((error)=>{
      if(error!='404'){
          req.flash('errors', error)
          req.session.save(()=>{
              res.redirect(`/tasks`)  
          })
      }
      else{
          res.render('404', {cssFile:'/404.css'})
      }
  })
}

exports.toggle_status = async function(req,res){
  try{
    await Employee.toggle_status(req.session.user.id)
    res.redirect('/tasks')
  }
  catch(error){
    req.flash('errors', error)
    req.session.save(()=>{
        res.redirect('/tasks')  
    })
  }
}

exports.mark_task = async function(req,res){
  try{
    await Employee.mark_task(req.session.user.id,req.params.id)
    req.flash('success', 'Task completed!')
    req.session.save(()=>{
      res.redirect(`/tasks`)
    }) 
  }
  catch(error){
    req.flash('errors', error)
    req.session.save(()=>{
      res.redirect('/tasks')  
    })
  }
}

exports.attendance_screen = async function(req,res){
  try{
    let [dayDates, dayNames, symbols, month, year] = await Employee.attendance_screen(req.session.user.id, req.params.month, req.params.year)
    res.render('attendance', {cssFile:'/attendance.css', errors:req.flash('errors'), success:req.flash('success'), dayDates, dayNames, symbols, month, year})
  }
  catch(error){
    if(error!='404'){
      req.flash('errors', error)
      req.session.save(()=>{
          res.redirect(`/`)  
      })
    }
    else{
        res.render('404', {cssFile:'/404.css'})
    }
  }
}