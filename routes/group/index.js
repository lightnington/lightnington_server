const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/", require("./groups"));
router.use("/:name/invite", require("./invite"));
router.use("/:name/rank", require("./rank"));
router.use("/:name/earn", require("./earn"));
module.exports = router;
