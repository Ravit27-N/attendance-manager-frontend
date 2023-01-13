const express = require('express')
const router = express.Router();

router.use('/user', require('./user'));
router.use('/candidate', require('./candidate'));
router.use('/attendance', require('./attendance'));
router.use('/chart', require('./chart'));
router.use('/report', require('./report'));




module.exports = router;