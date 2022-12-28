const express = require('express')
const router = express.Router();

router.use('/user', require('./user'));
router.use('/student', require('./student'));
router.use('/attendance', require('./attendance'));
router.use('/chart', require('./chart'));






module.exports = router;