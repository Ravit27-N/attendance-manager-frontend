const express = require('express')
const router = express.Router();

router.use('/user', require('./user'));
router.use('/student', require('./student'));
router.use('/attendance', require('./attendance'));






module.exports = router;