const utils = require("../module/util/utils");
const statusCode = require("../module/util/statusCode");
const responseMessage = require("../module/util/responseMessage");
const pool = require("../module/poolAsync");

module.exports = {
  makeMandarins: ({
    name,
    id
  }) => {
    const table = "user_groups";
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
      const groupIdx = await pool.queryParam_None(`SELECT groupIdx FROM groups WHERE name='${name}'`);
      console.log(groupIdx);
      if (!groupIdx) {
        resolve({
          code: statusCode.BAD_REQUEST,
          json: utils.successFalse(responseMessage.NO_GROUP)
        });
        return;
      }
      console.log(groupIdx[0].groupIdx);
      const updateQuery = `UPDATE ${table} SET mandarins=mandarins+1 WHERE groupIdx='${groupIdx[0].groupIdx}' AND userIdx='${userIdx[0].userIdx}'`;
      const updateResult = await pool.queryParam_None(updateQuery);
      if (!updateResult) {
        resolve({
          code: status(statusCode.NOT_FOUND),
          json: utils.successFalse(responseMessage.RANK_READ_FAIL)
        });
        return;
      }
      resolve({
        code: statusCode.OK,
        json: utils.successTrue(responseMessage.RANK_READ_SUCCESS, updateResult)
      });
    });
  }
};
