const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');

const app = express();

const users = {};

// 정적 파일 요청시 제공할 폴더 설정
// 앞: URL, 뒤 : 로컬 폴더명
app.use('/static', express.static('public/static'));
app.use('/images', express.static('public/images'));

app.use(bodyParser.json())
// app.use(express.json())  express 4.16부터는 이제 bodyparser 안써도 express 자체에서 바꿔줌

// 각종 라우트 셋업
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'about.html'));
});
app.get('/user', (req, res) => {
    res.json(users)
});

app.post('/user', (req,res)=>{
    const id = Date.now();
    const name = req.body.name;
    users[id]=name;
    res.status(201).send('등록성공')
})

app.put('/user/:id', (req,res)=>{
    const id = req.body.id
    const name = req.body.name
    users[id]=name;
    res.status(200).send('수정성공')
})

app.delete('/user/:id', (req,res)=>{
    const id = req.params.id
    console.log(id)
    delete users[id];
    res.status(200).send('삭제성공')
})


// 서버의 포트 정리
const port = 3000;
app.listen(port, () => {
    console.log(`${port}번 포트 열려있음`);
    console.log(`http://localhost:${port}`);
});
