const express = require("express");
const router = express.Router({ mergeParams: true });

<<<<<<< HEAD
router.use("/", require("./groups"));
router.use("/:groupIdx/invite", require("./invite"));
router.use("/:groupIdx/rank", require("./rank"));
module.exports = router;
=======
router.use('/', require('./groups'));
router.use('/:groupIdx/invite', require('./invite'));
router.use('/:groupIdx/rank', require('./rank'));
module.exports = router;
>>>>>>> 35844e7f15c988798b88ee30d4c11898c2284202
