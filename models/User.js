const usersCollection = require('../db').db().collection('Registrations')
const sessionsCollection = require('../db').db().collection('sessions')
const validator = require('validator')
const pkgs = require('../utility/packages')
const ObjectID = require('mongodb').ObjectID
const Employee = require('../models/Employee')
const Admin = require('../models/Admin')

let User = function(data){
  this.data = data
  this.errors = []
}

User.prototype.register = function(to_be_registered){
  return new Promise(async(resolve,reject)=>{
    this.cleanUp('register', to_be_registered)
    await this.validate(Object.keys(this.data))

    if(!this.errors.length){
      delete this.data.confirm

      if(to_be_registered=='employee'){
        let date = new Date()

        this.data.status = 'inactive'
        this.data.regDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
      }

      this.data.person = to_be_registered
      
      usersCollection.insertOne(this.data).then(()=>{
        resolve()
      }).catch((error)=>{
        console.log(error,'Location: query/register()/User.js')
        this.errors.push('Unexpected Error! Please try again later.')
        reject(this.errors)
      }) 
    }
    else{
      reject(this.errors)
    }
  })
}

User.prototype.edit = function(userID, to_be_edited){
  return new Promise(async(resolve,reject)=>{
    try{
      let user 

      if(to_be_edited=='employee'){
        if(typeof(userID)!='string' || !ObjectID.isValid(userID)){
          reject(['The employee you are trying to update does not exist!'])
          return  
        }
  
        user = await usersCollection.findOne({_id: new ObjectID(userID)})
      }
      else if(to_be_edited=='customer'){
        user = true
      }

      if(user){
        this.cleanUp('edit', to_be_edited)
        await this.validate(Object.keys(this.data), userID)

        if(!this.errors.length){
          await usersCollection.updateOne({_id: new ObjectID(userID)},{$set:this.data})

          if(to_be_edited=='employee'){
            if(this.data.status=='suspended'){
              await sessionsCollection.deleteMany({session: {$regex : userID}})
            }

            if((this.data.status=='active' && user.status!='active')||(this.data.status!='active' && user.status=='active')){
              await Employee.attendance(user, this.data.status)
            }

            if(this.data.role!=user.role || this.data.status=='suspended'){  
              let roleInverted = (this.data.role != user.role)
              await Admin.distribute_tasks(userID, 'emp-update-feature', roleInverted)
            }  
            
            if(this.data.status=='active' && user.status!='active'){
              await Employee.add_pending_tasks({_id: userID, role: this.data.role})
            }   
          }

          resolve()
        }
        else{
          reject(this.errors)
        }
      }
      else{
        reject(['The employee you are trying to update does not exist!'])
      }
    }
    catch(error){
      console.log(error,'Location: query/edit()/User.js')
      this.errors.push('Unexpected Error! Please try again later.')
      reject(this.errors)
    }
  })
}

User.prototype.changePassword = function(userID){
  return new Promise(async(resolve,reject)=>{
    try{
      this.cleanUp('password', 'all')
      await this.validate(Object.keys(this.data))

      if(!this.errors.length){
        delete this.data.confirm
        delete this.data.oldPass

        await usersCollection.updateOne({_id: new ObjectID(userID)},{$set:this.data})
        resolve()
      }
      else{
        reject(this.errors)
      }
    }
    catch(error){
      console.log(error,'Location: query/changePassword()/User.js')
      this.errors.push('Unexpected Error! Please try again later.')
      reject(this.errors)
    }
  })
}

User.findById = function(userID){
  return new Promise((resolve,reject)=>{
      if(typeof(userID)!='string' || !ObjectID.isValid(userID)){
          reject('404')
          return  
      }

      usersCollection.findOne({_id:new ObjectID(userID)}).then((user)=>{
          user ? resolve(user) : reject('404')
      }).catch((error)=>{
          console.log(error, 'Location: query/findById()/User.js')
          reject('Unexpected Error! Please try again later.')
      })
  })
}

User.prototype.cleanUp = function(operation, operated_on){
  let keys = ['username', 'email', 'oldPass', 'password', 'confirm', 'address', 'contact', 'license', 'role', 'status', 'color']

  keys.forEach((key)=>{
    if(typeof(this.data[key])!= "string"){this.data[key] = ""}
  })

  this.data = {
    username: this.data.username.trim().toLowerCase(),
    email:    this.data.email.trim().toLowerCase(),
    oldPass:  this.data.oldPass,
    password: this.data.password,
    confirm:  this.data.confirm,
    address:  this.data.address.trim(),
    contact:  this.data.contact.trim(),
    license:  this.data.license.trim().toUpperCase().replace(/\s+/g, ''),
    role:     this.data.role.trim().toLowerCase(),
    status:   this.data.status.trim().toLowerCase(),
    color:    this.data.color.trim().toLowerCase()
  }

  if(operation=='register'){
    delete this.data.status
    delete this.data.oldPass

    if(operated_on=='customer'){
      delete this.data.role
      delete this.data.address
    }
    else{
      delete this.data.license
      delete this.data.color
    }
  }
  else if(operation=='edit'){
    let toBeDeleted = ['username', 'email', 'oldPass', 'password', 'confirm']
    
    toBeDeleted.forEach((string)=>{
      delete this.data[string]
    })

    if(operated_on=='employee'){
      delete this.data.license
      delete this.data.color
    }
    else if(operated_on=='customer'){
      delete this.data.role
      delete this.data.status
      delete this.data.address
    }
  }
  else if(operation=='password'){
    let toBeDeleted = ['username', 'email', 'address', 'contact', 'license', 'role', 'status', 'color']

    toBeDeleted.forEach((string)=>{
      delete this.data[string]
    })
  }
}

User.prototype.validate = function(toBeValidated, userID){
  return new Promise(async(resolve,reject)=>{

    if(toBeValidated.includes('username')){
      if(this.data.username == ""){this.errors.push("You must provide a username.")}
      if(this.data.username != "" && !pkgs.isAlphaSpace(this.data.username)){this.errors.push("Username can contain only letters and spaces.")}
      if(this.data.username.length > 0 && this.data.username.length < 5){this.errors.push("Username must contain at least 5 characters.")}
      if(this.data.username.length > 30){this.errors.push("Username cannot exceed 30 characters.")}
    }
    if(toBeValidated.includes('email')){
      if(this.data.email == ""){this.errors.push("Email is required")} 
      if(this.data.email != "" && !validator.isEmail(this.data.email)){this.errors.push("You must provide a valid email address.")}
      if(this.data.email != '' && validator.isEmail(this.data.email)){    
        try{
          let userDoc = await usersCollection.findOne({email:this.data.email})
          if(userDoc){this.errors.push("This email is already in use.")}
        }
        catch(error){
          console.log('Location: query/validate()/User.js', error)
          this.errors.push('Unexpected Error! Please try again later.')
        }
      }
    }
    if(toBeValidated.includes('oldPass')){
      if(this.data.oldPass == ""){this.errors.push("You must provide your old password.")}
      if(this.data.oldPass != ''){    
        try{
          let userDoc = await usersCollection.findOne({password:this.data.oldPass})
          if(!userDoc){this.errors.push("Old password is incorrect.")}
        }
        catch(error){
          console.log('Location: query/validate()/User.js', error)
          this.errors.push('Unexpected Error! Please try again later.')
        }
      }
    }
    if(toBeValidated.includes('password')){
      if(this.data.password == ""){
        toBeValidated.includes('oldPass') ? this.errors.push("You must provide a new password.") : this.errors.push("You must provide a password.")
      }
      if(this.data.password.length > 0 && this.data.password.length < 5){this.errors.push("Password must contain at least 5 characters.")}
      if(this.data.password.length > 30){this.errors.push("Password cannot exceed 30 characters.")}
    }
    if(toBeValidated.includes('confirm')){
      if(this.data.confirm != this.data.password){this.errors.push("Passwords must match.")}
    }
    if(toBeValidated.includes('contact')){
      if(this.data.contact == ""){this.errors.push("Contact number required")} 
      if(this.data.contact != "" && (this.data.contact.length!=11 || !pkgs.isNumeric(this.data.contact))){this.errors.push("Invalid contact No")}
    }
    if(toBeValidated.includes('address')){
      if(this.data.address == ""){this.errors.push("Address required")}
      if(this.data.address.length > 0 && this.data.address.length < 20){this.errors.push("Address must contain at least 20 characters.")}
      if(this.data.address.length > 80){this.errors.push("Address cannot exceed 80 characters.")}
    }    
    if(toBeValidated.includes('color')){
      if(this.data.color == ""){this.errors.push("Vehicle color required")}
      if(!(/^#[0-9A-F]{6}$/i.test(this.data.color))){this.errors.push("Invalid color format")}
    }   
    if(toBeValidated.includes('license')){
      if(this.data.license == ""){this.errors.push("License plate No required")}
      if(this.data.license.length > 10){this.errors.push("License No cannot exceed 10 characters.")}
      if(this.data.license != "" && !pkgs.isAlphaNumericSpace(this.data.license)){this.errors.push("License plate can contain only letters, numbers and space.")}
      if(this.data.license != '' && this.data.license.length < 11 && pkgs.isAlphaNumericSpace(this.data.license)){    
        try{
          let userDoc = null
          if(userID){
            userDoc = await usersCollection.findOne({license:this.data.license, '_id': {$ne : new ObjectID(userID)}})
          }
          else{
            userDoc = await usersCollection.findOne({license:this.data.license})
          }
          if(userDoc){this.errors.push("Another account is registered with this License Plate")}
        }
        catch(error){
          console.log('Location: query/validate()/User.js', error)
          this.errors.push('Unexpected Error! Please try again later.')
        }
      }
    }
    if(toBeValidated.includes('role')){
      if(this.data.role != 'assembler' && this.data.role != 'carrier'){this.errors.push("Invalid value of role.")}
    }
    if(toBeValidated.includes('status')){
      if(this.data.status != 'active' && this.data.status != 'inactive' && this.data.status != 'suspended'){this.errors.push("Invalid value of status.")}
    }
    
    resolve()
  })
}

User.prototype.login = function(){
  return new Promise((resolve,reject)=>{
    this.cleanUp('login', 'all')
    usersCollection.findOne({email:this.data.email}).then((attemptedUser)=>{
      if(attemptedUser && attemptedUser.password == this.data.password){
        this.data = attemptedUser

        if(this.data.person=='employee' && this.data.status=='suspended'){
          this.errors.push('You are currently suspended by the admin.')
          reject(this.errors)
        }
        else{
          resolve()
        }
      }
      else{
        this.errors.push('Invalid email/password')
        reject(this.errors)
      }
    }).catch((error)=>{
      console.log(error,'Location: query/login()/User.js')
      this.errors.push('Unexpected Error! Please try again later.')
      reject(this.errors)
    })  
  })
}

module.exports = User