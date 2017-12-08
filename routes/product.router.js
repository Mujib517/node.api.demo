var express = require('express');
var router = express.Router();
var productCtrl = require('./../controllers/product.ctrl');

var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        var file = Date.now() + file.originalname;
        req.body.image = file;
        console.log(file);
        cb(null, file);
    }
});

var upload = multer({ storage: storage });

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
router.post('/', upload.single('img'), productCtrl.save);

module.exports = router;