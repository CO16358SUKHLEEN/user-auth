var express = require("express");
var router = express.Router();

router.get("/register", (req, res, next) => {
  res.json({
    "name": "sukhleen"
  });
})

router.get("/login", (req, res, next) => {
  res.json({
    "name": "sukhleen"
  });
})
module.exports = router;