var express = require('express');
var router = express.Router();
const util = require('../module/utils');
const statusCode = require('../module/statusCode');
const resMessage = require('../module/responseMessage');

router.get('/' , async(req, res) => {
    //전체
    const result=[];
    //favorite
    const favorite = [];
    var favorite_json_1 = new Object();
    favorite_json_1.image = "https://sopt-kkoon9.s3.ap-northeast-2.amazonaws.com/1574495684431.jpg";
    favorite_json_1.name = "test1";
    var favorite_json_2 = new Object();
    favorite_json_2.image = "https://sopt-kkoon9.s3.ap-northeast-2.amazonaws.com/1574495684431.jpg";
    favorite_json_2.name = "test1";
    var favorite_json_3 = new Object();
    favorite_json_3.image = "https://sopt-kkoon9.s3.ap-northeast-2.amazonaws.com/1574495684431.jpg";
    favorite_json_3.name = "test1";
    var favorite_json_4 = new Object();
    favorite_json_4.image = "https://sopt-kkoon9.s3.ap-northeast-2.amazonaws.com/1574495684431.jpg";
    favorite_json_4.name = "test1";
    favorite.push(favorite_json_1);
    favorite.push(favorite_json_2);
    favorite.push(favorite_json_3);
    favorite.push(favorite_json_4);

    //beauty
    const beauty = [];
    var beauty_json_1 = new Object();
    beauty_json_1.image = "https://sopt-kkoon9.s3.ap-northeast-2.amazonaws.com/1574494559696.jpg";;
    beauty_json_1.brand = "test1";
    beauty_json_1.product = "test1";
    beauty_json_1.price = "200won";
    var beauty_json_2 = new Object();
    beauty_json_2.image = "https://sopt-kkoon9.s3.ap-northeast-2.amazonaws.com/1574494559696.jpg";;
    beauty_json_2.brand = "test1";
    beauty_json_2.product = "test1";
    beauty_json_2.price = "200won";
    var beauty_json_3 = new Object();
    beauty_json_3.image = "https://sopt-kkoon9.s3.ap-northeast-2.amazonaws.com/1574494559696.jpg";;
    beauty_json_3.brand = "test1";
    beauty_json_3.product = "test1";
    beauty_json_3.price = "200won";
    var beauty_json_4 = new Object();
    beauty_json_4.image = "https://sopt-kkoon9.s3.ap-northeast-2.amazonaws.com/1574494559696.jpg";;
    beauty_json_4.brand = "test1";
    beauty_json_4.product = "test1";
    beauty_json_4.price = "200won";
    beauty.push(beauty_json_1);
    beauty.push(beauty_json_2);
    beauty.push(beauty_json_3);
    beauty.push(beauty_json_4);

    //ad
    const ad = [];
    var ad_json_1 = new Object();
    var ad_json_2 = new Object();
    var ad_json_3 = new Object();
    var ad_json_4 = new Object();
    ad_json_1.image = "https://sopt-kkoon9.s3.ap-northeast-2.amazonaws.com/1574495385381.jpg";
    ad_json_2.image = "https://sopt-kkoon9.s3.ap-northeast-2.amazonaws.com/1574495385381.jpg";
    ad_json_3.image = "https://sopt-kkoon9.s3.ap-northeast-2.amazonaws.com/1574495385381.jpg";
    ad_json_4.image = "https://sopt-kkoon9.s3.ap-northeast-2.amazonaws.com/1574495385381.jpg";

    ad.push(ad_json_1);
    ad.push(ad_json_2);
    ad.push(ad_json_3);
    ad.push(ad_json_4);

    var json = new Object();
    json.favorite = favorite;
    json.beauty = beauty;
    json.ad = ad;
    result.push(json);
    res.status(200).send(util.successTrue(statusCode.OK, resMessage.MAIN_SUCCESS, result));

});

module.exports = router;