const router = require("express").Router();


router.get("/", (req, res, next) => {
  res.json("All good in here api");
});

router.get("/tours", (req, res, next) => {
  res.json("All good in here");
});
module.exports = router;
