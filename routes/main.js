var express = require('express');
var router = express.Router();
const upload = require('../config/multer');
const util = require('../module/utils');
const statusCode = require('../module/statusCode');
const resMessage = require('../module/responseMessage');

router.get('/', upload.array('images', 3) , async(req, res) => {
    console.log(req.files);
    //전체
    const result=[];
    //favorite
    const favorite = [];
    var favorite_json = new Object();
    favorite_json.image = req.files[0].location;
    favorite_json.name = "test1";
    favorite.push(favorite_json);
    //beauty
    const beauty = [];
    var beauty_json = new Object();
    beauty_json.image = req.files[1].location;
    beauty_json.brand = "test1";
    beauty_json.product = "test1";
    beauty_json.price = "200won";
    beauty.push(beauty_json);
    //ad
    const ad = [];
    var ad_json = new Object();
    ad_json.image = req.files[2].location;
    ad.push(ad_json);

    var json = new Object();
    json.favorite = favorite;
    json.beauty = beauty;
    json.ad = ad;
    result.push(json);
    res.status(200).send(util.successTrue(statusCode.OK, resMessage.MAIN_SUCCESS, result));

});

module.exports = router;