const pkgs = require('../utility/packages')
const ObjectID = require('mongodb').ObjectID
const usersCollection = require('../db').db().collection('Registrations')

let Notification = function(type, ref, text){
    this.type = type
    this.ref = ref
    this.text = text
    this.timeStamp = pkgs.currentDateTime()
    this.expiry = Math.trunc((new Date().getTime()/1000) + 604800)
}

Notification.prototype.save = function(){
    return new Promise(async(resolve,reject)=>{
        try{
            let notification = {type: this.type, ref: this.ref, text: this.text, timeStamp: this.timeStamp, expiry: this.expiry}
            await usersCollection.updateOne({person: 'admin'},{$push: {"notifications": notification}})
            resolve()
        }
        catch(error){
            console.log(error,'Location: query/save()/Notification.js')
            reject('Unexpected Error! Please try again later.')
        }
    })
}

module.exports = Notification