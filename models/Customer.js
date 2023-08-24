const itemsCollection = require('../db').db().collection('Items')
const usersCollection = require('../db').db().collection('Registrations')
const pendingCollection = require('../db').db().collection('Pending Tasks')
const ObjectID = require('mongodb').ObjectID
const pkgs = require('../utility/packages')
const paypal = require('paypal-rest-sdk')
const fetch = require('node-fetch')
const Admin = require('../models/Admin')
const Notification = require('../models/Notification')
const axios = require('axios')

let Customer = function(data){
    this.data = data
    this.errors = []
}

Customer.getItems = function(category, sub_category, userID){
    return new Promise(async(resolve,reject)=>{
        try{
            if(typeof(category)!='string' || typeof(sub_category)!='string'){
                reject('404')
                return 
            }
    
            let inventoryItems = await itemsCollection.find({}).toArray()
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

                let customer = await usersCollection.findOne({_id: new ObjectID(userID)})
                let cart = customer.cart ? customer.cart : []
                cart = cart.filter(cartItem => inventoryItems.find(inventoryItem => {
                    return String(inventoryItem._id)==String(cartItem._id) && Number(cartItem.qty) <= Number(inventoryItem.qty)
                }))

                if(cart.length){
                    await usersCollection.updateOne({_id: new ObjectID(userID)}, {$set: {cart:cart}})
                    cart = cart.map(cartItem => {
                        const inventoryItem = inventoryItems.find(inventoryItem => String(inventoryItem._id)==String(cartItem._id))
                        return {
                            _id: new ObjectID(cartItem._id),
                            qty: cartItem.qty,
                            price: inventoryItem.price,
                            category: inventoryItem.category,
                            title: inventoryItem.title,
                            desc: inventoryItem.desc
                        }
                    })   
                }
                else{
                    await usersCollection.updateOne({_id: new ObjectID(userID)},{$unset:{"cart":""}})
                }
                resolve([items,category,sub_category,categories,sub_categories,cart])
            }
            else{
                reject('404')
            }   
        }
        catch(error){
            console.log(error, 'Location: query/getItems()/Customer.js')
            reject('Unexpected Error! Please try again later.')
        }
    }) 
}

Customer.search_product = function(searchTerm){
    return new Promise((resolve,reject)=>{
        if(typeof(searchTerm)!='string'){
            reject()
            return 
        }

        itemsCollection.find({title: {$regex: searchTerm, $options: 'i'}}).toArray().then((results)=>{
            resolve(results)
        }).catch((error)=>{
            console.log(error, 'Location: query/search_product()/Customer.js')
            reject()
        })
    }) 
}

Customer.add_item_cart = function(itemID,qty,userID){
    return new Promise(async(resolve,reject)=>{
        if(typeof(itemID)!='string' || !ObjectID.isValid(itemID) || typeof(qty)!='string' || qty=='' || Number(qty)<=0 || !pkgs.isNumeric(qty)){
            reject('Invalid value of quantity / item ID')
            return 
        }

        try{
            let inventoryItems = await itemsCollection.find({}).toArray()
            let itemExists = inventoryItems.find(item => String(item._id)==String(itemID))
            if(itemExists){
                if(Number(qty)>Number(itemExists.qty)){
                    reject('This item is currently out of stock or not available in the quantity requested!')
                }
                else{
                    let cartItem = {_id: new ObjectID(itemID), qty:qty}
                    let existsInCart = await usersCollection.findOne({_id: new ObjectID(userID), "cart._id": new ObjectID(itemID)})
                    let cart

                    if(existsInCart){
                        let returned = await usersCollection.findOneAndUpdate({_id: new ObjectID(userID), "cart._id": new ObjectID(itemID)},{$set:{"cart.$.qty": qty}}, {returnDocument: "after"})
                        cart = returned.value.cart
                    }
                    else{
                        let returned = await usersCollection.findOneAndUpdate({_id: new ObjectID(userID)},{$push:{"cart":cartItem}}, {returnDocument: "after"})
                        cart = returned.value.cart
                    }
                    
                    cart = cart.map(cartItem => {
                        const inventoryItem = inventoryItems.find(inventoryItem => String(inventoryItem._id)==String(cartItem._id))
                        return {
                            _id: new ObjectID(cartItem._id),
                            qty: cartItem.qty,
                            price: inventoryItem.price,
                            category: inventoryItem.category,
                            title: inventoryItem.title,
                            desc: inventoryItem.desc
                        }
                    })

                    resolve({msg:'Item added to cart!', cart})
                }
            }
            else{
                reject('This item does not exist in inventory')
            }
        }
        catch(error){
            console.log(error, 'Location: query/add_item_cart()/Customer.js')
            reject('Unexpected Error! Please try again later.')
        }     
    }) 
}

Customer.delete_item_cart = function(userID, itemID){
    return new Promise(async(resolve,reject)=>{
        if(typeof(itemID)!='string' || !ObjectID.isValid(itemID)){
            reject('Invalid value of item ID')
            return 
        }

        try{
            let cart
            let inventoryItems = await itemsCollection.find({}).toArray()          
            let customer = await usersCollection.findOne({_id: new ObjectID(userID)})
            let existsInCart = customer.cart && customer.cart.find(item => String(item._id) == String(itemID))
            let unsetCart = existsInCart && customer.cart.length==1

            if(!existsInCart){
                cart = customer.cart
            }
            else if(unsetCart){
                await usersCollection.updateOne({_id: new ObjectID(userID)},{$unset:{"cart":""}})
                cart = []
            }
            else{
                let returned = await usersCollection.findOneAndUpdate({_id: new ObjectID(userID)},{$pull: {cart: {_id: new ObjectID(itemID)}}}, {returnDocument: "after"})
                cart = returned.value.cart              
            }

            cart = cart.map(cartItem => {
                const inventoryItem = inventoryItems.find(inventoryItem => String(inventoryItem._id)==String(cartItem._id))
                return {
                    _id: new ObjectID(cartItem._id),
                    qty: cartItem.qty,
                    price: inventoryItem.price,
                    category: inventoryItem.category,
                    title: inventoryItem.title,
                    desc: inventoryItem.desc
                }
            })

            resolve({cart, msg:'Item Removed!'})
        }
        catch(error){
            console.log(error, 'Location: query/delete_item_cart()/Customer.js')
            reject('Unexpected Error! Please try again later.')
        }
    }) 
}

Customer.clear_cart = function(userID){
    return new Promise((resolve,reject)=>{
        usersCollection.updateOne({_id: new ObjectID(userID)},{$unset:{"cart":""}}).then(()=>{
            resolve()
        }).catch((error)=>{
            console.log(error, 'Location: query/clear_cart()/Customer.js')
            reject('Unexpected Error! Please try again later.')
        })
    }) 
}

Customer.verifyCart = function(userID){
    return new Promise(async(resolve,reject)=>{
        let cart = []

        try{
            let userObject = await usersCollection.findOne({_id:new ObjectID(userID), cart:{$exists:true}})
            if(!userObject){
                reject('No items exist in your cart!')
                return
            }

            cart = userObject.cart
            let cartItemsIDs = cart.map(item => new ObjectID(item._id))
            let inventoryItems = await itemsCollection.find({_id: {$in: cartItemsIDs}}).toArray()

            if(inventoryItems.length!=cart.length){
                reject('Some items in your cart are no longer supplied by the store. Cart is now updated!')
                return
            }

            let insufficientQty = false

            for(let i=0; i<cart.length; i++){
                for(let j=0; j<inventoryItems.length; j++){
                    if(String(cart[i]._id)==String(inventoryItems[j]._id)){
                        cart[i].price = inventoryItems[j].price
                        cart[i].desc = inventoryItems[j].desc
                        cart[i].title = inventoryItems[j].title
                        cart[i].category = inventoryItems[j].category

                        if(Number(cart[i].qty)>Number(inventoryItems[j].qty)){
                            insufficientQty = true
                        }
                        break
                    }
                }
                if(insufficientQty){
                    break
                }
            }

            if(insufficientQty){
                reject('Some items in your cart are not available in the quantity requested. Cart is now updated!')
                return
            }

            let orderID = new ObjectID()
            resolve(['Success', orderID])
        }
        catch(error){
            console.log(error, 'Location: query/verifyCart()/Customer.js')
            reject('Unexpected Error! Please try again later.')
            return
        }     
    })
}

Customer.payWithCrypto = function(userID, payload){
    return new Promise(async(resolve,reject)=>{
        try{
            let orderID = payload[0]
            let cart = JSON.parse(payload[1])
            let transactionID = payload[2]

            let cartItemsIDs = cart.map(item => new ObjectID(item._id))
            let inventoryItems = await itemsCollection.find({ _id: { $in: cartItemsIDs } }).toArray()

            let order = {
                _id: new ObjectID(orderID),
                status: 'placed',
                orderNo: null,
                assembler: '-',
                carrier: '-',
                assembled_at: '-',
                detected_at: '-',
                carried_at: '-',
                items: cart.map((item) => {
                    return {
                        title: item.title,
                        desc: item.desc,
                        price: item.price,
                        qty: item.qty,
                        category: item.category
                    }
                }),
                transactionID: transactionID,
                placed_at: pkgs.currentDateTime(),
                account: 'Meta Mask'
            }
                
            let users = await usersCollection.find().toArray()

            let customers = users.filter(user => {
                return (user.person == 'customer' && user.orders)
            })

            let highestOrderNo = 0

            customers.forEach((customer) => {
                highestOrderNo = Math.max(...customer.orders.map(order => order.orderNo), highestOrderNo)
            })

            order.orderNo = highestOrderNo + 1

            let selectedEmployees = users.filter(user => {
                return (user.person == 'employee' && user.role == 'assembler' && user.status == 'active')
            })

            if (selectedEmployees.length) {
                selectedEmployees.forEach((emp) => {
                    if (!emp.tasks) {
                        emp.tasks = []
                    }
                    else {
                        emp.tasks = emp.tasks.filter((task) => {
                            return task.status == 'incomplete'
                        })
                    }
                })

                let totalAssignedTasks = selectedEmployees.map(emp => emp.tasks.length)
                let minTasksIndex = totalAssignedTasks.indexOf(Math.min(...totalAssignedTasks))
                let selectedEmp = selectedEmployees[minTasksIndex]

                order.assembler = selectedEmp._id

                let task = {
                    _id: new ObjectID(),
                    orderID: order._id,
                    status: 'incomplete',
                    assigned_at: pkgs.currentDateTime()
                }

                await usersCollection.updateOne({ _id: new ObjectID(selectedEmp._id) }, { $push: { "tasks": task } })
            }
            else {
                let pending_task = {
                    _id: new ObjectID(),
                    orderID: order._id,
                    status: 'incomplete',
                    desc: 'To assemble'
                }

                await pendingCollection.insertOne(pending_task)

                let notification = new Notification(3, `/customer/${String(userID)}/order-details/${String(order._id)}`, `No assemblers active! A new task was added to pending list`)
                await notification.save()
            }

            let itemsNearlyOutOfStock = []
            let itemsOutOfStock = []

            let bulk_queries = inventoryItems.map((inventoryItem) => {
                let cartItem = cart.find(cartItem => String(cartItem._id) == String(inventoryItem._id))
                let diff = Number(inventoryItem.qty) - Number(cartItem.qty)

                if (diff < 5 && diff != 0) itemsNearlyOutOfStock.push({ category: inventoryItem.category, sub_category: inventoryItem.sub_category, title: inventoryItem.title, desc: inventoryItem.desc })
                else if (diff == 0) itemsOutOfStock.push({ category: inventoryItem.category, sub_category: inventoryItem.sub_category, title: inventoryItem.title, desc: inventoryItem.desc })

                return {
                    updateOne: {
                        "filter": { _id: new ObjectID(inventoryItem._id) },
                        "update": { $set: { qty: diff } }
                    }
                }
            })

            for (let i = 0; i < itemsNearlyOutOfStock.length; i++) {
                let notification = new Notification(6, `${itemsNearlyOutOfStock[i].category}/${itemsNearlyOutOfStock[i].sub_category}`, `${itemsNearlyOutOfStock[i].title} (${itemsNearlyOutOfStock[i].desc}) is about to run out of stock!`)
                await notification.save()
            }

            for (let i = 0; i < itemsOutOfStock.length; i++) {
                let notification = new Notification(7, `${itemsOutOfStock[i].category}/${itemsOutOfStock[i].sub_category}`, `${itemsOutOfStock[i].title} (${itemsOutOfStock[i].desc}) is out of stock!`)
                await notification.save()
            }

            let customer = users.find(user => String(user._id) == String(userID))
            if (customer.orders && (customer.orders.length + 1) % 100 == 0) {
                let notification = new Notification(2, String(userID), `${customer.username} has ordered ${customer.orders.length + 1} times!`)
                await notification.save()
            }

            await itemsCollection.bulkWrite(bulk_queries)
            await usersCollection.updateOne({ _id: new ObjectID(userID) }, { $unset: { "cart": "" } })
            await usersCollection.updateOne({ _id: new ObjectID(userID) }, { $push: { "orders": order } })
            resolve(order)
        }
        catch(error){
            console.log(error, 'Location: query/payWithCrypto()/Customer.js')
            reject('Transaction successful! Some other unexpected error.')
        }
    })
}

Customer.pay = function(userID, baseURL){
    return new Promise(async(resolve,reject)=>{
        let purchasedItems = []
        let cart = []

        try{
            let userObject = await usersCollection.findOne({_id:new ObjectID(userID), cart:{$exists:true}})
            if(!userObject){
                reject('No items exist in your cart!')
                return
            }

            const response = await fetch('https://v6.exchangerate-api.com/v6/fad8af2086624b956f89f6ca/latest/USD')
            const body = await response.json()
            const rate = Number(body.conversion_rates.PKR)

            cart = userObject.cart
            let cartItemsIDs = cart.map(item => new ObjectID(item._id))
            let inventoryItems = await itemsCollection.find({_id: {$in: cartItemsIDs}}).toArray()

            if(inventoryItems.length!=cart.length){
                reject('Some items in your cart are no longer supplied by the store. Cart is now updated!')
                return
            }

            let insufficientQty = false

            for(let i=0; i<cart.length; i++){
                for(let j=0; j<inventoryItems.length; j++){
                    if(String(cart[i]._id)==String(inventoryItems[j]._id)){
                        cart[i].price = inventoryItems[j].price
                        cart[i].desc = inventoryItems[j].desc
                        cart[i].title = inventoryItems[j].title
                        cart[i].category = inventoryItems[j].category

                        if(Number(cart[i].qty)>Number(inventoryItems[j].qty)){
                            insufficientQty = true
                        }
                        break
                    }
                }
                if(insufficientQty){
                    break
                }
            }

            if(insufficientQty){
                reject('Some items in your cart are not available in the quantity requested. Cart is now updated!')
                return
            }

            purchasedItems = cart.map(item => {
                return {
                    name: item.title,
                    sku: item.desc,
                    price: (item.price/rate).toFixed(2),
                    currency: "USD",
                    quantity: Number(item.qty)
                }
            })
        }
        catch(error){
            console.log(error, 'Location: query/pay()/Customer.js')
            reject('Unexpected Error! Please try again later.')
            return
        }     

        paypal.configure({
            'mode': 'sandbox',
            'client_id': process.env.PAYPAL_CLIENT_ID,
            'client_secret': process.env.PAYPAL_CLIENT_SECRET 
        })

        const profile_name = Math.random().toString(36).substring(7)

        const create_web_profile_json = {
            "name": profile_name,
            "input_fields": {
                "no_shipping": 1
            },
            "presentation": {
                "brand_name": "Black Creek"
            }
        }

        let create_payment_json = {
            intent: "sale",
            payer: {
                payment_method: "paypal"
            },
            redirect_urls: {
                return_url: `${baseURL}/success`,
                cancel_url: `${baseURL}/cancel`
            },
            transactions: [{
                item_list: {
                    items: purchasedItems
                },
                amount: {
                    currency: "USD",
                    total: Number(purchasedItems.reduce((accumulator, object) => {
                        return accumulator + (Number(object.price) * object.quantity)
                    }, 0)).toFixed(2)
                },
                description: "Blackcreek Drive Through Store"
            }]
        }
        
        paypal.webProfile.create(create_web_profile_json, function(error, web_profile){
            if(error){
                console.log(error)
                reject('Unexpected Error! Please try again later.')
            } 
            else{        
                create_payment_json.experience_profile_id = web_profile.id

                paypal.payment.create(create_payment_json, function(error, payment){
                    if(error){
                        console.log(error)
                        reject('Unexpected Error! Please try again later.')
                    } 
                    else{
                        for(let i=0; i<payment.links.length; i++){
                            if(payment.links[i].rel === 'approval_url'){
                                resolve([payment.links[i].href,cart])
                            }
                        }
                    }
                })
            }
        })
    
    })
}

Customer.success_screen = function(payerId,paymentId,userID,cart){
    return new Promise(async(resolve,reject)=>{
        let inventoryItems = []
        try{
            let cartItemsIDs = cart.map(item => new ObjectID(item._id))
            inventoryItems = await itemsCollection.find({_id: {$in: cartItemsIDs}}).toArray()

            if(inventoryItems.length!=cart.length){
                reject('Some items in your cart are no longer supplied by the store. Cart is now updated!')
                return
            }

            let insufficientQty = false

            for(let i=0; i<cart.length; i++){
                for(let j=0; j<inventoryItems.length; j++){
                    if(String(cart[i]._id)==String(inventoryItems[j]._id)){
                        if(Number(cart[i].qty)>Number(inventoryItems[j].qty)){
                            insufficientQty = true
                        }
                        break
                    }
                }
                if(insufficientQty){
                    break
                }
            }

            if(insufficientQty){
                reject('Some items in your cart are not available in the quantity requested. Cart is now updated!')
                return
            }
        }
        catch(error){
            console.log(error, 'Location: query/success_screen()/Customer.js')
            reject('Unexpected Error! Please try again later.')
            return
        }

        const execute_payment_json = {
            "payer_id": payerId
        }

        paypal.payment.execute(paymentId, execute_payment_json, async function(error, payment){
            if(error){
                console.log(error)
                reject('Unexpected Error! Please try again later.')
            } 
            else{
                let order = {
                    _id: new ObjectID(),
                    status: 'placed',
                    orderNo: null,
                    assembler:'-',
                    carrier:'-',
                    assembled_at:'-',
                    detected_at:'-',
                    carried_at:'-',
                    items: cart.map((item)=>{
                        return{
                            title: item.title,
                            desc: item.desc,
                            price: item.price,
                            qty: item.qty,
                            category: item.category
                        }
                    }),
                    transactionID: payment.transactions[0].related_resources[0].sale.id,
                    placed_at: pkgs.currentDateTime(),
                    account: 'PayPal'            
                }

                try{
                    let users = await usersCollection.find().toArray()

                    let customers = users.filter(user => {
                        return (user.person=='customer' && user.orders)
                    })

                    let highestOrderNo = 0

                    customers.forEach((customer)=>{
                        highestOrderNo = Math.max(...customer.orders.map(order => order.orderNo),highestOrderNo)
                    })

                    order.orderNo = highestOrderNo + 1
                    
                    let selectedEmployees = users.filter(user => {
                        return (user.person=='employee' && user.role=='assembler' && user.status=='active')
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

                        order.assembler = selectedEmp._id

                        let task = {
                            _id: new ObjectID(),
                            orderID: order._id,
                            status: 'incomplete',
                            assigned_at: pkgs.currentDateTime()
                        }

                        await usersCollection.updateOne({_id: new ObjectID(selectedEmp._id)},{$push:{"tasks":task}})
                    }
                    else{
                        let pending_task = {
                            _id: new ObjectID(),
                            orderID: order._id,
                            status: 'incomplete',
                            desc: 'To assemble'
                        }

                        await pendingCollection.insertOne(pending_task)
                        
                        let notification = new Notification(3, `/customer/${String(userID)}/order-details/${String(order._id)}`, `No assemblers active! A new task was added to pending list`)
                        await notification.save()
                    }
                    
                    let itemsNearlyOutOfStock = []
                    let itemsOutOfStock = []

                    let bulk_queries = inventoryItems.map((inventoryItem)=>{
                        let cartItem = cart.find(cartItem => String(cartItem._id)==String(inventoryItem._id))
                        let diff = Number(inventoryItem.qty)-Number(cartItem.qty)

                        if(diff<5 && diff!=0) itemsNearlyOutOfStock.push({category: inventoryItem.category, sub_category: inventoryItem.sub_category, title: inventoryItem.title, desc: inventoryItem.desc})
                        else if(diff==0) itemsOutOfStock.push({category: inventoryItem.category, sub_category: inventoryItem.sub_category, title: inventoryItem.title, desc: inventoryItem.desc})

                        return {
                            updateOne: {
                                "filter":{_id: new ObjectID(inventoryItem._id)}, 
                                "update":{$set:{qty:diff}}
                            }
                        }
                    })
                   
                    for(let i=0; i<itemsNearlyOutOfStock.length; i++){
                        let notification = new Notification(6, `${itemsNearlyOutOfStock[i].category}/${itemsNearlyOutOfStock[i].sub_category}`, `${itemsNearlyOutOfStock[i].title} (${itemsNearlyOutOfStock[i].desc}) is about to run out of stock!`)
                        await notification.save()
                    }

                    for(let i=0; i<itemsOutOfStock.length; i++){
                        let notification = new Notification(7, `${itemsOutOfStock[i].category}/${itemsOutOfStock[i].sub_category}`, `${itemsOutOfStock[i].title} (${itemsOutOfStock[i].desc}) is out of stock!`)
                        await notification.save()
                    }

                    let customer = users.find(user => String(user._id)==String(userID))
                    if(customer.orders && (customer.orders.length+1) % 100 == 0){
                        let notification = new Notification(2, String(userID), `${customer.username} has ordered ${customer.orders.length+1} times!`)
                        await notification.save()
                    }

                    await itemsCollection.bulkWrite(bulk_queries)
                    await usersCollection.updateOne({_id: new ObjectID(userID)},{$unset:{"cart":""}})
                    await usersCollection.updateOne({_id: new ObjectID(userID)},{$push:{"orders": order}})
                    resolve(order)
                }
                catch(error){
                    console.log(error, 'Location: query/success_screen()/Customer.js')
                    reject('Transaction successful! Some other unexpected error.')
                }
            }
        })
    })
}

Customer.getOrders = function(userID){
    return new Promise((resolve,reject)=>{
        usersCollection.findOne({_id:new ObjectID(userID)}).then((customer)=>{
            customer.orders ? resolve(customer.orders.reverse()) : resolve([])
        }).catch((error)=>{
            console.log(error, 'Location: query/getOrders()/Customer.js')
            reject('Unexpected Error! Please try again later.')
        })
    })
}

Customer.orderDetails = function(userID,orderID){
    return new Promise((resolve,reject)=>{
        if(typeof(orderID)!='string' || !ObjectID.isValid(orderID)){
            reject('404')
            return 
        }

        usersCollection.findOne({_id:new ObjectID(userID)}).then((customer)=>{
            if(customer.orders){
                let order = customer.orders.find(order => String(order._id) == String(orderID))
                order ? resolve(order) : reject('404')
            }
            else{
                reject('404')
            }
        }).catch((error)=>{
            console.log(error, 'Location: query/orderDetails()/Customer.js')
            reject('Unexpected Error! Please try again later.')
        })
    })
}

Customer.notify = function(userID){
    return new Promise(async(resolve,reject)=>{
        try{
            let users = await usersCollection.find().toArray()
            let customer = users.find(user => String(user._id)==String(userID))

            if(customer.orders){
                let orders = customer.orders.filter(order => order.status=='assembled')

                if(orders.length){
                    await Admin.createTasks(customer,users,orders)
                    resolve()
                }
                else{
                    reject('Invalid Operation!')
                }
            }
            else{
                reject('Invalid Operation!')
            }
            
        }
        catch(error){
            console.log(error, 'Location: query/notify()/Customer.js')
            reject('Unexpected Error! Please try again later.')
        }
    })
}

Customer.confirm_delivery_info = function(userID){
    return new Promise(async(resolve,reject)=>{
        try{
            let customer = await usersCollection.findOne({_id: new ObjectID(userID)})
            if(customer.orders){
                let selectedOrders = customer.orders.filter(order => order.status=='detected' && order.carrier!='-')
                selectedOrders.length ? resolve(selectedOrders) : reject('Invalid Request!')
            }
            else{
                reject('Invalid Request!')
            }
        }
        catch(error){
            console.log(error, 'Location: query/confirm_delivery_info()/Customer.js')
            reject('Unexpected Error! Please try again later.')
        }
    })
}

Customer.confirm_delivery = function(userID){
    return new Promise(async(resolve,reject)=>{
        try{
            let users = await usersCollection.find().toArray()
            let customer = users.find(user => String(user._id)==String(userID))

            if(customer.orders){
                let orders = customer.orders.filter(order => order.status=='detected' && order.carrier != '-')

                if(orders.length){
                    let orderEmployees = []
                    let emp_IDs = []

                    for(let order of orders){
                        let employee = await usersCollection.findOne({tasks: {$elemMatch: {orderID: new ObjectID(order._id), status: 'incomplete'}}})                  
                        let orderEmployee = orderEmployees.find(object => String(object.employee._id)==String(employee._id))

                        if(orderEmployee){
                            orderEmployee.no_of_orders += 1
                        }
                        else{
                            orderEmployees.push({employee:employee, no_of_orders:1})
                        }

                        let task = employee.tasks.find(task => task.orderID == String(order._id) && task.status=='incomplete')
                        let task_minutes = pkgs.dateTimeDiff(pkgs.currentDateTime(), task.assigned_at)
                        if(task_minutes > 10 && !emp_IDs.includes(String(employee._id))){
                            let notification = new Notification(5, String(employee._id), `${employee.username} took ${task_minutes} min to complete task(s)!`)
                            await notification.save()
                            emp_IDs.push(String(employee._id))
                        }
                    }
 
                    for(let i=0; i<orderEmployees.length; i++){
                        let completed = orderEmployees[i].employee.tasks.filter(task => task.status=='complete').length
                        let toBeCompleted = orderEmployees[i].no_of_orders
    
                        for(let j=0; j<toBeCompleted; j++){
                            completed++
                            if(completed%100==0){
                                let notification = new Notification(1, String(orderEmployees[i].employee._id), `${orderEmployees[i].employee.username} has completed ${completed} tasks!`)
                                await notification.save()
                            }
                        }
                    }

                    let promises = []

                    for(let order of orders){
                        promises.push(
                            new Promise(async(resolve,reject)=>{
                                await usersCollection.updateOne(
                                    {tasks: {$elemMatch: {orderID: new ObjectID(order._id), status: 'incomplete'}}}, 
                                    {$set:{"tasks.$.status": "complete"}}
                                )
                                resolve()
                            })
                        )

                        promises.push(
                            new Promise(async(resolve,reject)=>{
                                await usersCollection.updateOne(
                                    {"orders._id": new ObjectID(order._id)}, 
                                    {$set:{"orders.$.status": "delivered", "orders.$.carried_at": pkgs.currentDateTime()}}
                                )
                                resolve()
                            })
                        )
                    }
    
                    await Promise.all(promises)
                    resolve()
                }
                else{
                    reject('Invalid Operation!')
                }
            }
            else{
                reject('Invalid Operation!')
            }
            
        }
        catch(error){
            console.log(error, 'Location: query/confirm_delivery()/Customer.js')
            reject('Unexpected Error! Please try again later.')
        }
    })
}

Customer.recommend = function(userID, host){
    return new Promise(async(resolve,reject)=>{
        try{
            let customers = await usersCollection.find({person:'customer'}).toArray()
            let customer = customers.find(customer => String(customer._id)==String(userID))
            let inventoryItems = await itemsCollection.find().toArray()
            let dataset = {}

            for(customer of customers){
                let itemData = {}
                let orders = customer.orders
                
                for(order of orders){
                    let items = order.items

                    for(item of items){
                        let itemInfo = `${item.title} ${item.desc}`
                        if(itemData.hasOwnProperty(itemInfo)){
                            itemData[itemInfo] += 1
                        }
                        else{
                            itemData[itemInfo] = 1
                        }
                    }
                }

                dataset[customer._id] = itemData
            }

            let url = host.includes('ngrok') ? 'https://ml-forecast-as.azurewebsites.net/item-recommender' : 'http://shahbazalivk.pythonanywhere.com/item-recommender'
            let response = await axios.post(url, {dataset, customerId: customer._id})
            let items = response.data
    
            items = items.map(item => {
                let inventoryItem = inventoryItems.find(inventoryItem => item==`${inventoryItem.title} ${inventoryItem.desc}`)
                return inventoryItem ? inventoryItem : null
            })

            items = items.filter(item => item)
            items = items.slice(0,8)

            resolve(items)
        }
        catch(error){
            console.log(error, 'Location: query/recommend()/Customer.js')
            reject('Unexpected Error! Please try again later.')
        }
    })
}

module.exports = Customer