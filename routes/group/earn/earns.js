const express = require("express");
const router = express.Router({ mergeParams: true });
//const authUtil = require('../../../module/util/authUtils');
const statusCode = require("../../../module/util/statusCode");
const responseMessage = require("../../../module/util/responseMessage");
const Earn = require("../../../model/earn");
const utils = require("../../../module/util/utils");

router.post("/", (req, res) => {
  const { id } = req.body;
  if (!id) {
    const missParameters = Object.entries({
      id
    })
      .filter(it => it[1] == undefined)
      .map(it => it[0])
      .join(",");
    res
      .status(statusCode.BAD_REQUEST)
      .send(
        utils.successFalse(`${responseMessage.NULL_VALUE}, ${missParameters}`)
      );
    return;
  }
  Earn.makeMandarins({
    id
})
    .then(({ code, json }) => {
      res.status(code).send(json);
    })
    .catch(err => {
      console.log("error : ", err);
      res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(utils.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

module.exports = router;
