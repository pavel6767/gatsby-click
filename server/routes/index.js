const router = require('express').Router()
module.exports = router

const inventory = require("../src.json")

router.get('/inventory', async (req, res, next) => {
  try {
    res.send(inventory)
  } catch (err) {
    next(err);
  }
})
