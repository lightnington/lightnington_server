const utils = require('../module/util/utils');
const statusCode = require('../module/util/statusCode');
const responseMessage = require('../module/util/responseMessage');
const pool = require("../module/poolAsync");

module.exports = {
    read: ({
        groupIdx
    }) => {
        const table = 'user_groups';
        const rows = [];
        const jss = {};
        const query = `SELECT mandarins, id, userIdx FROM ${table} WHERE groupIdx=${groupIdx};`;
        const message = responseMessage.RANK_READ_SUCCESS;
        return new Promise(async (resolve, reject) => {
            const result = await pool.queryParam_None(query);
            result.forEach(function(row){
                rows.push(row);
            });

            rows.sort((a,b) =>{
                return a.mandarins > b.mandarins ? -1 : 1;
            })
            console.log(rows);
            if (!result) {
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: utils.successFalse(responseMessage.RANK_READ_FAIL)
                });
                return;
            }
            resolve({
                code: statusCode.OK,
                json: utils.successTrue(message, rows)
            });
        });
    },
}