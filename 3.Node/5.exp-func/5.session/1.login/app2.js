const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 세션 미들웨어 설정
app.use(
    session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: true,
    })
);

// 정적 파일 제공
// app.use(express.static(path.join(__dirname, 'public')));

// 간단한 메모리 기반 사용자 데이터
const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' },
];

// 로그인 라우트
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
        req.session.user = user;
        res.json({ message: '로그인 성공!' });
    } else {
        res.status(401).json({ message: '로그인 실패' });
    }
});

// 세션에서 사용자 정보 가져오기
app.get('/profile', (req, res) => {
    const user = req.session.user;

    if (user) {
        res.json({ username: user.username, message: '프로필 정보' });
    } else {
        res.status(401).json({ message: '인증되지 않은 사용자' });
    }
});

// 로그아웃 라우트
app.get('/logout', (req, res) => {
    // 세션에서 사용자 정보를 삭제
    req.session.destroy((err) => {
        if (err) {
            console.error('세션 삭제 오류:', err);
            res.status(500).json({ message: '로그아웃 실패' });
        } else {
            res.json({ message: '로그아웃 성공!' });
        }
    });
});

// 루트 엔드포인트로 접근 시 login2.html을 제공
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login2.html'));
});

// 서버 시작
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});