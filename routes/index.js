const express = require('express');
const router = express.Router();
const authorRouter = require('./user');
const postRouter = require('./post');
const categoryRouter = require('./category');
const publicRouter = require('./public');
const errorHandler = require('../middleware/errorHandler');

router.get("/", (req, res) => {
    res.send('API Robby phase 2');
});
router.use(errorHandler);
router.use('/users', authorRouter);
router.use('/posts', postRouter);
router.use('/categories', categoryRouter);
router.use('/pub', publicRouter);

module.exports = router;
