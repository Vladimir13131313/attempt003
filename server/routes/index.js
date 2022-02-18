const Router = require('express');
const userRouter = require('./userRouter');
const storeRouter = require('./storeRouter');
const router = new Router();

router.use('/user', userRouter);
router.use('/store', storeRouter);

module.exports = router;