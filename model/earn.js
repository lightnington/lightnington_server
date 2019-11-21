const utils = require("../module/util/utils");
const statusCode = require("../module/util/statusCode");
const responseMessage = require("../module/util/responseMessage");
const pool = require("../module/poolAsync");

module.exports = {
  makeMandarins: ({ groupIdx, userIdx }) => {
    const table = "user_groups";
    const updateQuery = `UPDATE ${table} SET mandarins=mandarins+1 WHERE groupIdx=${groupIdx} AND userIdx=${userIdx}`;
    return new Promise(async (resolve, reject) => {
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
