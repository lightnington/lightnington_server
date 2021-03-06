const utils = require('../module/util/utils');
const statusCode = require('../module/util/statusCode');
const responseMessage = require('../module/util/responseMessage');
const pool = require("../module/poolAsync");

module.exports = {
    create: ({
        name,
        id
    }) => {
        const table = 'user_groups';
        const fields = 'userIdx, groupIdx, id';
        return new Promise(async (resolve, reject) => {
            // userIdx 여부 체크
            const userIdx = await pool.queryParam_None(`SELECT userIdx FROM user WHERE id='${id}'`);
            if (!userIdx) {
                resolve({
                    code: statusCode.BAD_REQUEST,
                    json: utils.successFalse(responseMessage.NO_USER)
                });
                return;
            }
            const groupIdx = await pool.queryParam_None(`SELECT groupIdx FROM user WHERE name='${name}'`);
            if (!groupIdx) {
                resolve({
                    code: statusCode.BAD_REQUEST,
                    json: utils.successFalse(responseMessage.NO_GROUP)
                });
                return;
            }
            // group create 성공
            const query = `INSERT INTO ${table}(${fields}) VALUES('${userIdx[0].userIdx}',${groupIdx[0].groupIdx}, '${id}')`;
            //const values = [userIdx[0].userIdx, groupIdx];
            //console.log(values);
            const result = await pool.queryParam_None(query);
            if (!result) {
                resolve({
                    code: statusCode.INTERNAL_SERVER_ERROR,
                    json: utils.successFalse(responseMessage.INVITE_FAIL)
                });
                return;
            }
            console.log(result);
            const groupId = result.insertId;
            resolve({
                code: statusCode.OK,
                json: utils.successTrue(responseMessage.INVITE_SUCCESS, groupId)
            });
        });
    }
};