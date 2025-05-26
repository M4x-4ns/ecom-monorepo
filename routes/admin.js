const express = require('express');
const router = express.Router();
const { authCheck} = require('../middlewares/authCheck')
// import controller
const{getOrderAdmin,changOrderStatus} = require ('../controllers/admin')


router.put('/admin/order-status',authCheck,changOrderStatus)
router.get('/admin/orders',authCheck,getOrderAdmin)




module.exports = router;

