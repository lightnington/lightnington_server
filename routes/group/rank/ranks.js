const express = require("express");
const router = express.Router({ mergeParams: true });
//const authUtil = require('../../../module/util/authUtils');
const statusCode = require("../../../module/util/statusCode");
const responseMessage = require("../../../module/util/responseMessage");
const Rank = require("../../../model/rank");
const utils = require("../../../module/util/utils");

router.get('/', (req, res) => {
    Rank.read({
        })
        .then(({
            code,
            json
        }) => {
            res.status(code).send(json);
        }).catch(err => {
            res.status(statusCode.INTERNAL_SERVER_ERROR)
                .send(utils.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
        });
});
module.exports = router;
