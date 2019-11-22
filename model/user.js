const utils = require('../module/util/utils');
const statusCode = require('../module/util/statusCode');
const responseMessage = require('../module/util/responseMessage');
const pool = require("../module/poolAsync");

module.exports = {
    check: ({
        id
    }) => {
        const table = 'user';
        return new Promise(async (resolve, reject) => {
            const query = `SELECT * FROM ${table} WHERE id = '${id}'`;
            const result = await pool.queryParam_None(query);
            if (!(result.length === 0)) { // 같은 아이디가 있으면
                resolve({
                    code: statusCode.BAD_REQUEST,
                    json: utils.successFalse(responseMessage.ALREADY_ID)
                });
                return;
            }
            resolve({
                code: statusCode.OK,
                json: utils.successTrue(message, result)
            });
        });
    },
    signin: ({
        id,
        pwd
    }) => {
        const table = 'user';
        const message = responseMessage.RANK_READ_SUCCESS;
        return new Promise(async (resolve, reject) => {
            const query = `SELECT * FROM ${table} WHERE id = '${id}'`;
            const result = await pool.queryParam_None(query);
            const user = result[0];
            if (!user) {
                resolve({
                    code: statusCode.BAD_REQUEST,
                    json: authUtil.successFalse(responseMessage.NO_USER)
                });
                return;
            }
            // 비밀번호 체크
            if (user.pwd != pwd) {
                resolve({
                    code: statusCode.BAD_REQUEST,
                    json: authUtil.successFalse(responseMessage.MISS_MATCH_PW)
                });
                return;
            }
            // 로그인 성공
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.SIGN_IN_SUCCESS)
            });
        });
    },
    signup: ({
        id,
        pwd,
        phone
    }) => {
        const table = 'user';
        const fields = 'id pwd, phone';
        const questions = `?, ?, ?`;
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
        const values = [id, pwd, phone];
        // return pool.queryParam_Parse(query, values);
        return new Promise(async (resolve, reject) => {
            // 회원가입 성공
            const result = await pool.queryParam_Parse(query, values);
            if (!result) {
                resolve({
                    code: statusCode.INTERNAL_SERVER_ERROR,
                    json: authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR)
                })
                return;
            }
            const userId = result.insertId;
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.SIGN_UP_SUCCESS, userId)
            });
        });
    }
};