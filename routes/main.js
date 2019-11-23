var express = require('express');
var router = express.Router();
const upload = require('../config/multer');
const resMessage = require("../module/util/responseMessage");
const statusCode = require("../module/util/statusCode");
const util = require("../module/util/utils");
router.get('/', upload.array('images', 3) , async(req, res) => {
    console.log(req.files);
    //전체
    const result=[];
    //favorite
    const favorite = [];
    var favorite_json = new Object();
     favorite_json.image = "https://sopt-kkoon9.s3.ap-northeast-2.amazonaws.com/1574495684431.jpg";
    favorite_json.name = "test1";
    favorite.push(favorite_json);
    //beauty
    const beauty = [];
    var beauty_json = new Object();
     beauty_json.image = "https://sopt-kkoon9.s3.ap-northeast-2.amazonaws.com/1574494559696.jpg";
    beauty_json.brand = "test1";
    beauty_json.product = "test1";
    beauty_json.price = "200";
    beauty.push(beauty_json);
    //ad
    const ad = [];
    var ad_json = new Object();
     ad_json.image = "https://sopt-kkoon9.s3.ap-northeast-2.amazonaws.com/1574495385381.jpg";
    ad.push(ad_json);

    var json = new Object();
    json.favorite = favorite;
    json.beauty = beauty;
    json.ad = ad;
    result.push(json);
    res.status(200).send(util.successTrue(statusCode.OK, resMessage.MAIN_SUCCESS, result));

});

module.exports = router;