const express = require("express");
const router = express.Router();
const pool = require("../module/poolAsync");
const responseMessage = require("../module/util/responseMessage");
const statusCode = require("../module/util/statusCode");
const utils = require("../module/util/utils");
/* GET users listing. */
router.post("/signin", async (req, res) => {
  const { id, pwd } = req.body;
  const query = `SELECT * FROM user WHERE id="${id}" AND pwd="${pwd}"`;
  const value = [id, pwd];

  if (!id || !pwd) {
    //id pwd 비어 있는 경우
    await res
      .status(statusCode.FORBIDDEN)
      .send(utils.successFalse(responseMessage.NULL_VALUE));
  }
  //id나 비밀번호가 잘못 될 경우
  await pool
    .queryParam_Parse(query, value)
    .then(user => {
      console.log(user);
      if (user.length === 0) {
        res
          .status(statusCode.NOT_FOUND)
          .send(utils.successFalse(responseMessage.SIGN_IN_FAIL));
      } else {
        res
          .status(statusCode.OK)
          .send(utils.successTrue(responseMessage.SIGN_IN_SUCCESS));
      }
    })
    .catch(err => console.log(err));
});

router.post("/check", async function(req, res) {
  const { id } = req.body;
  const selectQuery = `SELECT id FROM user WHERE id="${id}"`;
  let isAlreadyHave = false;
  await pool.queryParam_None(selectQuery).then(data => {
    console.log(data);
    if (data.length !== 0) {
      isAlreadyHave = true;
      res
        .status(statusCode.SERVICE_UNAVAILABLE)
        .send(utils.successFalse(responseMessage.ALREADY_ID));
      return;
    } else {
      res
        .status(statusCode.OK)
        .send(utils.successTrue(responseMessage.POSSIBLE_ID));
    }
  });
});

router.post("/signup", async function(req, res) {
  const { id, pwd, phone } = req.body;
  const insertQuery = "INSERT INTO user (id, pwd, phone) values (?, ?, ?);";
  const insertValue = [id, pwd, phone];

  //회원가입 정보가 기재 안 되어 있을때
  if (!id || !pwd || !phone) {
    res
      .status(statusCode.NO_CONTENT)
      .send(utils.successFalse(responseMessage.SIGN_UP_FAIL));
  }

  const selectQuery = `SELECT id FROM user WHERE id="${id}"`;
  let isAlreadyHave = false;
  await pool.queryParam_None(selectQuery).then(data => {
    console.log(data);
    if (data.length !== 0) {
      isAlreadyHave = true;
      res
        .status(statusCode.SERVICE_UNAVAILABLE)
        .send(utils.successFalse(responseMessage.ALREADY_ID));
      return;
    }
  });
  if (isAlreadyHave === false) {
    await pool
      .queryParam_Parse(insertQuery, insertValue)
      .then(() => {
        res
          .status(statusCode.OK)
          .send(utils.successTrue(responseMessage.SIGN_UP_SUCCESS));
      })
      .catch(err => {
        console.log(err);
        res
          .status(statusCode.BAD_REQUEST)
          .send(utils.successFalse(responseMessage.SIGN_UP_FAIL));
      });
  }
});

module.exports = router;
