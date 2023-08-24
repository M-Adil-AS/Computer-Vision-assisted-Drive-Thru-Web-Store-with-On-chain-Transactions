const cron = require('node-cron')
const usersCollection = require('./db').db().collection('Registrations')

cron.schedule('0 0 * * *', () => {
    const timeStamp = Math.trunc((new Date().getTime()/1000))
    usersCollection.updateOne({person:'admin'}, {$pull: {notifications: {expiry: {$lt: timeStamp}}}}).then(()=>{
        console.log('Expired Notifications Removed')
    }).catch((error)=>{
        console.log(error)
    })
})