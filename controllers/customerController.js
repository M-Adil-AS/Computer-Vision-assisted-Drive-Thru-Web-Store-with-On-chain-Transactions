const User = require('../models/User')
const Customer = require('../models/Customer')

exports.profile = async function(req,res){
    let customer = new User(req.body)

    customer.edit(req.session.user.id, 'customer').then(()=>{
        req.flash('success', 'Profile data updated successfully')
        req.session.save(()=>{
          res.redirect(`/profile`)
        }) 
    }).catch((errors)=>{
        errors.forEach((error)=>{
            req.flash('errors',error)
        })
        req.session.save(()=>{
            res.redirect(`/profile`)
        })
    })  
}

exports.place_order_screen = async function(req,res){
    try{
        let [items, category, sub_category, categories, sub_categories, cart] = await Customer.getItems(req.params.category, req.params.sub_category, req.session.user.id)
        res.render('place-order', {script:'/scripts/place-order.js' ,cssFile:'/place-order.css', errors:req.flash('errors'), success:req.flash('success'), items, category, sub_category, categories, sub_categories, cart})
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

exports.search_product = function(req,res){
    Customer.search_product(req.body.searchTerm).then((results)=>{
        res.json(results)
    }).catch(()=>{
        res.json([])
    })
}

exports.add_item_cart = function(req,res){
    Customer.add_item_cart(req.body.itemID,req.body.qty,req.session.user.id).then((data)=>{
        res.json(data)
    }).catch((error)=>{
        if(error=='This item is currently out of stock or not available in the quantity requested!'){
            res.json({msg:'Quantity not available!'})
        }
        else{
            res.json({msg:'Item not added!'})
        }
    })
}

exports.delete_item_cart = function(req,res){
    Customer.delete_item_cart(req.session.user.id, req.params.id).then((data)=>{
        res.json(data)
    }).catch((error)=>{
        res.json({msg:'Please try again later!'})
    })  
}

exports.clear_cart = async function(req,res){
    Customer.clear_cart(req.session.user.id).then(()=>{
        res.json('Cart is now empty!')
    }).catch((error)=>{
        res.json('Please try again later!')
    })  
}

exports.pay = function(req,res){
    const baseURL = `${req.protocol}://${req.get('host')}`
    Customer.pay(req.session.user.id, baseURL).then(([href,cart])=>{
        req.session.user.cart = cart
        req.session.save(()=>{
            res.redirect(href)
        })
    }).catch((error)=>{
        req.flash('errors', error)
        req.session.save(()=>{
            res.redirect(`/place-order/baby-care/baby-diapers-wipes`)
        })
    })
}

exports.success_screen = function(req,res){
    Customer.success_screen(req.query.PayerID,req.query.paymentId,req.session.user.id,req.session.user.cart).then((order)=>{
        res.redirect(`/order-details/${order._id}`)
    }).catch((error)=>{
        req.flash('errors', error)
        req.session.save(()=>{
            res.redirect(`/place-order/baby-care/baby-diapers-wipes`)
        })
    })
}

exports.cancel_screen = function(req,res){
    req.flash('errors', 'Transaction canceled!')
    req.session.save(()=>{
        res.redirect(`/place-order/baby-care/baby-diapers-wipes`)
    })
}

exports.orders_screen = function(req,res){
    Customer.getOrders(req.session.user.id).then((orders)=>{
        res.render('view-orders', {errors:req.flash('errors'), success:req.flash('success'), cssFile:'/view-orders.css', script:'/scripts/view-orders.js', orders})
    }).catch((error)=>{
        req.flash('errors', error)
        req.session.save(()=>{
            res.redirect('/')  
        })
    })
}

exports.order_details = function(req,res){
    Customer.orderDetails(req.session.user.id,req.params.id).then((order)=>{
        res.render('order-details', {errors:req.flash('errors'), success:req.flash('success'), cssFile:'/order-details.css', order})
    }).catch((error)=>{
        if(error!='404'){
            req.flash('errors', error)
            req.session.save(()=>{
                res.redirect('/orders')  
            })
        }
        else{
            res.render('404', {cssFile:'/404.css'})
        }
    })
}

exports.notify_store = function(req,res){
    Customer.notify(req.session.user.id).then(()=>{
        req.flash('success', 'Your order will be delivered shortly!')
        req.session.save(()=>{
          res.redirect(`/orders`)
        }) 
    }).catch((error)=>{
        req.flash('errors', error)
        req.session.save(()=>{
            res.redirect(`/orders`)
        })
    })
}

exports.confirm_delivery_info = function(req,res){
    Customer.confirm_delivery_info(req.session.user.id).then((results)=>{
        res.json(results)
    }).catch((error)=>{
        res.json(error)
    })
}

exports.confirm_delivery = function(req,res){
    Customer.confirm_delivery(req.session.user.id).then(()=>{
        req.flash('success', 'Confirmed Delivery')
        req.session.save(()=>{
          res.redirect(`/orders`)
        }) 
    }).catch((error)=>{
        req.flash('errors', error)
        req.session.save(()=>{
            res.redirect(`/orders`)
        })
    })
}

exports.recommend = function(req,res){
    const host = req.get('host')
    Customer.recommend(req.session.user.id, host).then((results)=>{
        res.json(results)
    }).catch((error)=>{
        res.json([])
    })
}

exports.verifyCart = function (req, res) {
    Customer.verifyCart(req.session.user.id).then((msg) => {
        res.json(msg)
    }).catch((error) => {
        res.json(error)
    })
}

exports.payWithCrypto = function (req, res) {
    Customer.payWithCrypto(req.session.user.id, req.body.payload).then((order) => {
        res.json(order._id)
    }).catch((error) => {
        res.json(error)
    })
}