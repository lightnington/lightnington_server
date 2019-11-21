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
<<<<<<< HEAD
      const groupIdx = await pool.queryParam_None(`SELECT groupIdx FROM groups WHERE name='${name}'`);
      console.log(groupIdx);
=======
      const groupIdx = await pool.queryParam_None(
        `SELECT groupIdx FROM groups WHERE name='${name}'`
      );
>>>>>>> 443becd08223bd6ac06ec6dc4a6779cb3d1fe4a0
      if (!groupIdx) {
        resolve({
          code: statusCode.BAD_REQUEST,
          json: utils.successFalse(responseMessage.NO_GROUP)
        });
        return;
      }
<<<<<<< HEAD
      console.log(groupIdx[0].groupIdx);
      const updateQuery = `UPDATE ${table} SET mandarins=mandarins+1 WHERE groupIdx='${groupIdx[0].groupIdx}' AND userIdx='${userIdx[0].userIdx}'`;
=======
      console.log(groupIdx, userIdx);
      const updateQuery = `UPDATE ${table} SET mandarins=mandarins+1 WHERE groupIdx=${groupIdx[0].groupIdx} AND userIdx=${userIdx[0].userIdx}`;
>>>>>>> 443becd08223bd6ac06ec6dc4a6779cb3d1fe4a0
      const updateResult = await pool.queryParam_None(updateQuery);
      const currentMandarin = await pool.queryParam_None(
        `SELECT mandarins FROM user_groups WHERE id='${id}'`
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
