const Camera = require('../models/Camera')
const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config()

exports.detect = function(req,res){  
    if(req.body && req.body.TopicArn==process.env.TOPICARN){
        if(req.body.Type=='SubscriptionConfirmation'){
            axios.get(req.body.SubscribeURL).then((response)=>{
                res.sendStatus(200)
            }).catch((error)=>{
                console.log(error)
            })
        }
        else if(req.body.Type=='Notification'){
            let vehicles = JSON.parse(req.body.Message).event.data.vehicles
            
            if(vehicles && vehicles.length && vehicles[0].plate.found){
                Camera.detect(vehicles[0].plate.unicodeText).then((response)=>{
                    res.sendStatus(200)
                }).catch((error)=>{
                    console.log(error)
                })
            }
            else{
                res.sendStatus(200)
            }
        }
    }
    else{
        res.sendStatus(400)
    }
}