const express = require('express');
const router = express.Router();
const {create,list,remove,listby,searchFilters,update,read,createImages,removeImage} = require('../controllers/product')
const {authCheck,adminCheck} = require('../middlewares/authCheck')



//@ENDPOINT http://localhost:5000/api/product
router.post('/product',create)
router.get('/products/:count',list)
router.get('/product/:id',read)
router.put('/product/:id',update)
router.delete('/product/:id',remove)
router.post('/productby',listby)
router.post('/search/filters',searchFilters)

router.post('/images',authCheck,adminCheck,createImages)
router.post('/removeimages',authCheck,adminCheck,removeImage)


module.exports = router;