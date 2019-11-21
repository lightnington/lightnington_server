const express = require('express');
const router = express.Router({mergeParams: true});

router.use('/', require('./groups'));
router.use('/:groupIdx/invite', require('./invite'));

module.exports = router;