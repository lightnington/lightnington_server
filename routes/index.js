const express = require('express');
const router = express.Router({mergeParams: true});

router.use("/:id/group", require("./group"));
router.use("/", require("./users"));
router.use("/multer", require("./multerTest"));
router.use("/main", require("./main"));

module.exports = router;
