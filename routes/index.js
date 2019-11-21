const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/:id/group", require("./group"));
router.use("/", require("./users"));

module.exports = router;
