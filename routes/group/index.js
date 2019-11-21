const express = require('express');
const router = express.Router({mergeParams: true});

router.use('/', require('./groups'));
router.use('/:groupIdx/invite', require('./invite'));
router.use('/:groupIdx/rank', require('./rank'));
module.exports = router;