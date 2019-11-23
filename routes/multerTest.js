const express = require('express')
const router = express.Router();

/*
// server에 저장하는 경우 
const multer = require('multer');
const upload = multer({
    dest: 'uploads/'
}); */
const upload = require('../config/multer');

router.post('/single', upload.single('image'), (req, res) => {
    // req.file 은 `image` 라는 필드의 파일 정보입니다.
    // 텍스트 필드가 있는 경우, req.body가 이를 포함할 것입니다.
    console.log(req.file);
    console.log(req.body);
    res.send({
        file: req.file,
        body: req.body
    });
})
module.exports = router;