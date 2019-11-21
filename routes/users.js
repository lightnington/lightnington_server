const express = require("express");
const router = express.Router();
const pool = require("../module/poolAsync");
const responseMessage = require("../module/util/responseMessage");
const statusCode = require("../module/util/statusCode");
const utils = require("../module/util/utils");
/* GET users listing. */
router.post("/signin", (req, res) => {
  const { id, pwd } = req.body;
  const query = `SELECT * FROM user WHERE id="${id}" AND pwd="${pwd}"`;
  const value = [id, pwd];

  if (!id || !pwd) {
    //id pwd 비어 있는 경우
    res
      .status(statusCode.FORBIDDEN)
      .send(utils.successFalse(responseMessage.NULL_VALUE));
  }
  pool
    .queryParam_Parse(query, value)
    .then(user => {
      console.log(user);
      res.status(statusCode.OK).send(responseMessage.SIGN_IN_SUCCESS);
    })
    .catch(err => console.log(err));
});

router.post("/signup", function(req, res, next) {
  const { id, pwd, phone } = req.body;
  const insertQuery = "INSERT INTO user (id, pwd, phone) values (?, ?, ?);";
  const insertValue = [id, pwd, phone];

  //회원가입 정보가 기재 안 되어 있을때
  if (!id || !pwd || !phone) {
    res.status(statusCode.NO_CONTENT).send(responseMessage.SIGN_UP_FAIL);
  }

  const selectQuery = `SELECT * FROM user WHERE="${id}"`;
  /*
  id 중복 체크 필요 
  */

  pool
    .queryParam_Parse(insertQuery, insertValue)
    .then(data => {
      console.log(data);
      res.status(statusCode.OK).send(responseMessage.SIGN_UP_SUCCESS);
    })
    .catch(err => {
      console.log(err);
      res.status(statusCode.BAD_REQUEST).send(responseMessage.SIGN_UP_FAIL);
    });
});

module.exports = router;
