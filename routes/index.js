const express = require('express');
const router = express.Router({mergeParams: true});

router.use('/:userIdx/group', require('./group'));
router.use('/', require('./users'));

module.exports = router;