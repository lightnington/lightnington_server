const express = require('express');
const router = express.Router({mergeParams: true});
//const authUtil = require('../../../module/util/authUtils');
const statusCode = require('../../../module/util/statusCode');
const responseMessage = require('../../../module/util/responseMessage');
const Invite = require('../../../model/invite');
const utils = require("../../../module/util/utils");

router.post('/', (req, res) => {
  const {groupIdx} = req.params;
  const {
      id
  } = req.body;
  // 아이디 중복 체크
  if (!groupIdx || !id) {
      const missParameters = Object.entries({
              groupIdx,
              id
          })
          .filter(it => it[1] == undefined).map(it => it[0]).join(',');
      res.status(statusCode.BAD_REQUEST)
          .send(utils.successFalse(`${responseMessage.NULL_VALUE}, ${missParameters}`));
      return;
  }
  Invite.create({
          groupIdx,
          id
      })
      .then(({
          code,
          json
      }) => {
          res.status(code).send(json);
      }).catch(err => {
          console.log("error : ", err);
          res.status(statusCode.INTERNAL_SERVER_ERROR)
              .send(utils.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
      });
});

module.exports = router;
