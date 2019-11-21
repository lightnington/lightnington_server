const utils = require('../module/util/utils');
const statusCode = require('../module/util/statusCode');
const responseMessage = require('../module/util/responseMessage');
const pool = require("../module/poolAsync");

module.exports = {
    read: ({
        groupIdx
    }) => {
        const table = 'user_groups';
        const query = `SELECT mandarins, userIdx FROM ${table} WHERE groupIdx=${groupIdx};`;
        const message = responseMessage.RANK_READ_SUCCESS;
        return new Promise(async (resolve, reject) => {
            const result = await pool.queryParam_None(query);
            console.log(result);
            if (!result) {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: utils.successFalse(responseMessage.RANK_READ_FAIL)
                });
                return;
            }
            resolve({
                code: statusCode.OK,
                json: utils.successTrue(message, result)
            });
        });
    },
}