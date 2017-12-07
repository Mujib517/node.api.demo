var express = require('express');
var router = express.Router();
var productCtrl = require('./../controllers/product.ctrl');

//REST HTTP Verbs
// GET - read
// POST - Create
// PUT  Update
// Delete Delete

//HTTP GET http://localhost:3000/products
router.get('/', productCtrl.get);
router.get('/:pageIndex/:pageSize', productCtrl.get);

router.get('/:id', productCtrl.getById);
router.delete('/:id', productCtrl.delete);
router.put('/:id', productCtrl.update);
//HTTP POST http://localhost:3000/products
router.post('/', productCtrl.save);

module.exports = router;