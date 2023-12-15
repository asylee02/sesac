const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: 'smtp.naver.com',
    port: 465,
    auth: {
        user: process.env.NAVER_ID,
        pass: process.env.NAVER_PASS
    }
});

const mailOptions = {
    from: 'asylee02@naver.com',
    to: 'asylee02@naver.com',
    subject: '테스트 이메일',
    text: '안녕하세요, 이것은 네이버 메일로 보내는 텍스트 메일입니다.'
};


transporter.sendMail(mailOptions, (err,info)=>{
    if(err){
    
        console.log(err);
    }
    else{
        console.log('이메일 전송 성공:', + info.response)
    }
})