const utils = require('../module/util/utils');
const statusCode = require('../module/util/statusCode');
const responseMessage = require('../module/util/responseMessage');
const pool = require("../module/poolAsync");

module.exports = {
    create: ({
        name
    }) => {
        const table = 'groups';
        const fields = 'name';
        const questions = '?';
        const query = `INSERT INTO ${table} (${fields}) VALUES(${questions})`;
        const values = [name];
        return new Promise(async (resolve, reject) => {
            // group create 성공
            const result = await pool.queryParam_Parse(query, values);
            if (!result) {
                resolve({
                    code: statusCode.INTERNAL_SERVER_ERROR,
                    json: utils.successFalse(responseMessage.GROUP_CREATE_FAIL)
                });
                return;
            }
            console.log(result);
            const groupId = result.insertId;
            resolve({
                code: statusCode.OK,
                json: utils.successTrue(responseMessage.GROUP_CREATE_SUCCESS, groupId)
            });
        });
    }
};