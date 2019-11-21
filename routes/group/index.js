const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/", require("./groups"));
router.use("/invite", require("./invite"));
router.use("/rank", require("./rank"));
router.use("/earn", require("./earn"));
module.exports = router;
