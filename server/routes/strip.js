const express = require('express');
const router = express.Router();
const { authCheck} = require('../middlewares/authCheck')
// import controller
const { payment } = require ('../controllers/strip');


router.post('/user/create-payment-intent',authCheck,payment)




module.exports = router;

