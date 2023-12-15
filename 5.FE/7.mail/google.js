const nodemailer = require('nodemailer');
const express = require('express');
const path = require('path')
require('dotenv').config();

const app = express();

app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

// // / 경로로 들어온 요청에 대해 public/email.html 파일을 응답으로 전송
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'email.html');
    res.sendFile(filePath);
    
});
const CODE =String(Math.floor(Math.random() * (99999 - 10000 + 1) + 10000));

app.post('/join',(req,res)=>{
const transporter = nodemailer.createTransport({
    service: 'gmail', // 'google' 대신 'gmail'을 사용합니다.
    auth: {
        user: process.env.GOOGLE_ID,
        pass: process.env.GOOGLE_PASS
    }
});


const mailOptions = {
    from: 'asylee02@gmail.com',
    to: req.body,
    subject: '테스트 이메일',
    text: CODE
};

transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
        console.log(err);
    } else {
        console.log('이메일 전송 성공:', info.response); // `,`만 사용하여 문자열로 로그를 출력합니다.
    }
});
    res.send('성공')
})

app.get('/code',(req,res)=>{
    res.send(CODE);
})


app.listen(4000, () =>{
    console.log('서버레디');
})