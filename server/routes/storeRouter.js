const Router = require('express');
const passport = require("passport");
const router = new Router();
const storeController = require('../controllers/storeController')

// router.post('/addStore', passport.authenticate("jwt", {session: false}), storeController.addNewStore);
router.post('/addStore', storeController.addNewStore);
router.post('/addProduct', storeController.addNewProduct);
router.get('/allStores', storeController.getAllStores);
router.get('/allProducts', storeController.getAllProducts);


module.exports = router;