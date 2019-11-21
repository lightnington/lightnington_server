const express = require("express");
const router = express.Router({ mergeParams: true });
//const authUtil = require('../../module/util/authUtils');
const statusCode = require("../../module/util/statusCode");
const responseMessage = require("../../module/util/responseMessage");
const Group = require("../../model/group");
const utils = require("../../module/util/utils");

router.get('/', (req, res) => {
  const { name } = req.body;
  Group.readAll()
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

router.get('/groups', (req, res) => {
  const { name } = req.body;
  Group.read({
    name
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
router.post("/", (req, res) => {
  const { userIdx } = req.params;
  const { name } = req.body;
  if (!userIdx || !name) {
    const missParameters = Object.entries({
      userIdx,
      name
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
  Group.create({
    name
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
