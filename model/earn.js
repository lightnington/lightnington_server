const utils = require("../module/util/utils");
const statusCode = require("../module/util/statusCode");
const responseMessage = require("../module/util/responseMessage");
const moment = require('moment');
const pool = require("../module/poolAsync");

module.exports = {
  makeMandarins: ({
    id
  }) => {
    const table = "user";
    const current = moment().format("H");
    const count = 11 - current;
    return new Promise(async (resolve, reject) => {
      // userIdx 여부 체크
      const userIdx = await pool.queryParam_None(`SELECT userIdx FROM user WHERE id='${id}'`);
      console.log(userIdx);
      if (!userIdx) {
        resolve({
          code: statusCode.BAD_REQUEST,
          json: utils.successFalse(responseMessage.NO_USER)
        });
        return;
      }
      const updateQuery = `UPDATE ${table} SET mandarins=mandarins+${count} WHERE userIdx='${userIdx[0].userIdx}'`;
      const updateResult = await pool.queryParam_None(updateQuery);
      const currentMandarin = await pool.queryParam_None(
        `SELECT mandarins FROM ${table} WHERE id='${id}'`
      );
      if (!updateResult) {
        resolve({
          code: status(statusCode.NOT_FOUND),
          json: utils.successFalse(responseMessage.EARN_MANDARIN_FAIL)
        });
        return;
      }
      resolve({
        code: statusCode.OK,
        json: utils.successTrue(
          responseMessage.EARN_MANDARIN_SUCCESS,
          currentMandarin[0].mandarins
        )
      });
    });
  }
};
