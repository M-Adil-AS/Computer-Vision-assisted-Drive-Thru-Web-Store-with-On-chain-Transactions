const User = require('../models/User')

exports.register = function(req, res){
  let user = new User(req.body)
  let to_be_registered = req.session.user ? 'employee' : 'customer'

  user.register(to_be_registered).then(()=>{
    if(to_be_registered=='customer'){
      req.session.user = {id:user.data._id, person:user.data.person}
    }
    else if(to_be_registered=='employee'){
      req.flash('success', 'Employee registered successfully')
    }

    req.session.save(()=>{
      res.redirect(`${to_be_registered=='employee' ? '/register-employee' : '/'}`)
    }) 
  }).catch((errors)=>{
    errors.forEach((error)=>{
      req.flash('errors',error)
    })
    req.session.save(()=>{
      res.redirect(`${to_be_registered=='employee' ? '/register-employee' : '/'}`)
    })
  })
}

exports.home = function(req, res){
  if(req.session.user){
    if(req.session.user.person=='customer'){
        res.render('customer-dashboard',{cssFile:'/customer-dashboard.css',errors:req.flash('errors')})
    }
    else if(req.session.user.person=='admin'){
        res.render('admin-dashboard',{cssFile:'/admin-dashboard.css',errors:req.flash('errors')})
    }
    else if(req.session.user.person=='employee'){
      res.render('employee-dashboard',{cssFile:'/employee-dashboard.css',errors:req.flash('errors')})
    }
  }
  else{
    res.render('home-guest',{errors:req.flash('errors'),cssFile:'/home-guest.css'})
  }
}

exports.login = function(req,res){
  let user = new User(req.body)
  user.login().then(()=>{
    req.session.user = {id:user.data._id, person:user.data.person}

    req.session.save(()=>{
      res.redirect('/')
    }) 
  }).catch((errors)=>{
    errors.forEach((error)=>{
      req.flash('errors',error)
    })
    req.session.save(()=>{
      res.redirect('/')
    })
  })  
}

exports.profile_screen = async function(req,res){
  try{
    let user = await User.findById(req.session.user.id)
    delete user.password
    res.render('profile', {cssFile:'/profile.css', errors:req.flash('errors'), success:req.flash('success'), user:user})
  }
  catch(error){
    req.flash('errors', error)
    req.session.save(()=>{
        res.redirect('/')  
    })
  }
}

exports.password_screen = function(req,res){
    res.render('password', {cssFile:'/password.css', errors:req.flash('errors'), success:req.flash('success')})
}

exports.password = function(req,res){
  let user = new User(req.body)

  user.changePassword(req.session.user.id).then(()=>{
    req.flash('success', 'Password updated successfully')
    req.session.save(()=>{
      res.redirect(`/change-password`)
    }) 
  }).catch((errors)=>{
    errors.forEach((error)=>{
      req.flash('errors',error)
    })
    req.session.save(()=>{
      res.redirect('/change-password')
    })
  })  
}

exports.logout = function(req,res){
  req.session.destroy(()=>{
    res.redirect('/')
  })
}

exports.mustBeLoggedIn = function(req,res,next){
  if(req.session.user){
    next()
  }
  else{
    req.flash('errors','You must be logged in to perform that action.')
    req.session.save(()=>{
      res.redirect('/')
    })
  }
}

exports.mustBeCustomer = function(req,res,next){
  if(req.session.user.person=='customer'){
    next()
  }
  else{
    req.flash('errors','You are not allowed to perform that action.')
    req.session.save(()=>{
      res.redirect('/')
    })
  }
}

exports.mustBeAdmin = function(req,res,next){
  if(req.session.user.person=='admin'){
    next()
  }
  else{
    req.flash('errors','You are not allowed to perform that action.')
    req.session.save(()=>{
      res.redirect('/')
    })
  }
}

exports.mustBeEmployee = function(req,res,next){
  if(req.session.user.person=='employee'){
    next()
  }
  else{
    req.flash('errors','You are not allowed to perform that action.')
    req.session.save(()=>{
      res.redirect('/')
    })
  }
}