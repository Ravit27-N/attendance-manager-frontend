const express = require('express')
const router = express.Router();

router.get('', async function (req, res) {
  res.send("Hello User page");
})

module.exports = router