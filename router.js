const express = require('express')
const router = express.Router()
const userController = require('./controllers/userController')
const adminController = require('./controllers/adminController')
const customerController = require('./controllers/customerController')
const employeeController = require('./controllers/employeeController')
const cameraController = require('./controllers/cameraController')

router.get('/', userController.home)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/profile', userController.mustBeLoggedIn, userController.profile_screen)
router.get('/change-password', userController.mustBeLoggedIn, userController.password_screen)
router.post('/change-password', userController.mustBeLoggedIn, userController.password)

router.post('/camera', cameraController.detect)

router.get('/inventory/:category/:sub_category', userController.mustBeLoggedIn, userController.mustBeAdmin, adminController.inventory_screen)
router.post('/update-item/:id', userController.mustBeLoggedIn, userController.mustBeAdmin, adminController.update_item)
router.post('/delete-item/:id', userController.mustBeLoggedIn, userController.mustBeAdmin, adminController.delete_item)
router.post('/search-inventory', userController.mustBeLoggedIn, userController.mustBeAdmin, adminController.search_inventory)
router.get('/import/:category/:sub_category', userController.mustBeLoggedIn, userController.mustBeAdmin, adminController.import_screen)
router.post('/search-market', userController.mustBeLoggedIn, userController.mustBeAdmin, adminController.search_market)
router.post('/import-item', userController.mustBeLoggedIn, userController.mustBeAdmin, adminController.import_item)
router.get('/view-customers', userController.mustBeLoggedIn, userController.mustBeAdmin, adminController.view_customers)
router.get('/register-employee', userController.mustBeLoggedIn, userController.mustBeAdmin, adminController.register_emp_screen)
router.post('/register-employee', userController.mustBeLoggedIn, userController.mustBeAdmin, userController.register)
router.get('/view-employees', userController.mustBeLoggedIn, userController.mustBeAdmin, adminController.view_employees)
router.get('/edit-employee/:id', userController.mustBeLoggedIn, userController.mustBeAdmin, adminController.edit_emp_screen)
router.post('/edit-employee/:id', userController.mustBeLoggedIn, userController.mustBeAdmin, adminController.edit_emp)
router.get('/customer-orders/:id', userController.mustBeLoggedIn, userController.mustBeAdmin, adminController.customer_orders_screen)
router.get('/customer/:cid/order-details/:oid', userController.mustBeLoggedIn, userController.mustBeAdmin, adminController.customer_order_details)
router.get('/all-orders', userController.mustBeLoggedIn, userController.mustBeAdmin, adminController.all_orders)
router.get('/customer-details/:id', userController.mustBeLoggedIn, userController.mustBeAdmin, adminController.customer_details)
router.get('/employee-tasks/:id', userController.mustBeLoggedIn, userController.mustBeAdmin, adminController.employee_tasks_screen)
router.get('/employee/:id/attendance/:month/:year', userController.mustBeLoggedIn, userController.mustBeAdmin, adminController.emp_attendance_screen)
router.get('/attendance-list/:month/:year', userController.mustBeLoggedIn, userController.mustBeAdmin, adminController.attendance_list)
router.get('/sales', userController.mustBeLoggedIn, userController.mustBeAdmin, adminController.sales_screen)
router.post('/distribute-tasks/:id', userController.mustBeLoggedIn, userController.mustBeAdmin, adminController.distribute_tasks)
router.get('/notifications', userController.mustBeLoggedIn, userController.mustBeAdmin, adminController.notifications)

router.post('/profile', userController.mustBeLoggedIn, userController.mustBeCustomer, customerController.profile)
router.get('/place-order/:category/:sub_category', userController.mustBeLoggedIn, userController.mustBeCustomer, customerController.place_order_screen)
router.post('/search-product', userController.mustBeLoggedIn, userController.mustBeCustomer, customerController.search_product)
router.post('/add-item-cart', userController.mustBeLoggedIn, userController.mustBeCustomer, customerController.add_item_cart)
router.post('/delete-item-cart/:id', userController.mustBeLoggedIn, userController.mustBeCustomer, customerController.delete_item_cart)
router.post('/clear-cart', userController.mustBeLoggedIn, userController.mustBeCustomer, customerController.clear_cart)
router.post('/pay', userController.mustBeLoggedIn, userController.mustBeCustomer, customerController.pay)
router.get('/success', userController.mustBeLoggedIn, userController.mustBeCustomer, customerController.success_screen)
router.get('/cancel', userController.mustBeLoggedIn, userController.mustBeCustomer, customerController.cancel_screen)
router.get('/orders', userController.mustBeLoggedIn, userController.mustBeCustomer, customerController.orders_screen)
router.get('/order-details/:id', userController.mustBeLoggedIn, userController.mustBeCustomer, customerController.order_details)
router.post('/notify-store', userController.mustBeLoggedIn, userController.mustBeCustomer, customerController.notify_store)
router.get('/confirm-delivery-info', userController.mustBeLoggedIn, userController.mustBeCustomer, customerController.confirm_delivery_info)
router.post('/confirm-delivery', userController.mustBeLoggedIn, userController.mustBeCustomer, customerController.confirm_delivery)
router.get('/recommend-items', userController.mustBeLoggedIn, userController.mustBeCustomer, customerController.recommend)
router.get('/verifyCart', userController.mustBeLoggedIn, userController.mustBeCustomer, customerController.verifyCart)
router.post('/payWithCrypto', userController.mustBeLoggedIn, userController.mustBeCustomer, customerController.payWithCrypto)

router.get('/tasks', userController.mustBeLoggedIn, userController.mustBeEmployee, employeeController.tasks_screen)
router.get('/refresh-tasks', userController.mustBeLoggedIn, userController.mustBeEmployee, employeeController.refresh_tasks)
router.get('/task/:id/order-details', userController.mustBeLoggedIn, userController.mustBeEmployee, employeeController.task_order_details)
router.post('/toggle-status', userController.mustBeLoggedIn, userController.mustBeEmployee, employeeController.toggle_status)
router.post('/mark-task/:id', userController.mustBeLoggedIn, userController.mustBeEmployee, employeeController.mark_task)
router.get('/attendance/:month/:year', userController.mustBeLoggedIn, userController.mustBeEmployee, employeeController.attendance_screen)

module.exports = router