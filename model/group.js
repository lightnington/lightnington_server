const utils = require('../module/util/utils');
const statusCode = require('../module/util/statusCode');
const responseMessage = require('../module/util/responseMessage');
const pool = require("../module/poolAsync");

module.exports = {
    readAll: (
    ) => {
        const table = 'groups';
        const query = `SELECT * FROM ${table};`;
        const message = responseMessage.GROUP_READ_SUCCESS;
        return new Promise(async (resolve, reject) => {
            const result = await pool.queryParam_None(query);

            if (!result) {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: utils.successFalse(responseMessage.GROUP_READ_FAIL)
                });
                return;
            }
            resolve({
                code: statusCode.OK,
                json: utils.successTrue(message, result)
            });
        });
    },
    read: ({
        name
    }) => {
            const table = 'user_groups';
            const message = responseMessage.GROUP_READ_SUCCESS;
            return new Promise(async (resolve, reject) => {
                const groupIdx = await pool.queryParam_None(`SELECT groupIdx FROM groups WHERE name='${name}'`);
                const query = `SELECT * FROM ${table} WHERE groupIdx='${groupIdx[0].groupIdx}';`;
                const result = await pool.queryParam_None(query);
    
                if (!result) {
                    resolve({
                        code: statusCode.NOT_FOUND,
                        json: utils.successFalse(responseMessage.GROUP_READ_FAIL)
                    });
                    return;
                }
                resolve({
                    code: statusCode.OK,
                    json: utils.successTrue(message, result)
                });
            });
        },
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