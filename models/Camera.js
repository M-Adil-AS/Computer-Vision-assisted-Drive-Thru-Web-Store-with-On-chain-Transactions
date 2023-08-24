const Admin = require('../models/Admin')
const usersCollection = require('../db').db().collection('Registrations')

let Camera = function(data){
    this.data = data
    this.errors = []
}

Camera.detect = function(license){
    return new Promise(async(resolve,reject)=>{
        try{
            let users = await usersCollection.find().toArray()
            let customer = users.find(user => user.license==license)
            
            if(customer){
                if(customer.orders){
                    let orders = customer.orders.filter(order => order.status=='assembled')

                    if(orders.length){
                        await Admin.createTasks(customer,users,orders)
                        resolve('MATCH AND UPDATE')
                    }
                    else{
                        resolve('MATCH')
                    }
                }              
                else{
                    resolve('MATCH')
                }
            }
            else{
                resolve('UNMATCH')
            }
        }
        catch(error){
            console.log(error, 'Location: query/detect()/Camera.js')
            reject('Unexpected Error! Please try again later.')
        }
    })
}

module.exports = Camera