const express = require('express')
const session = require('express-session')
const flash = require('express-flash')

const app = express();
const port= 3000
const nunjucks = require('nunjucks')

nunjucks.configure('views',{
    autoescape: true,
    express:app
  })

app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true
}));

app.set('view engine', 'html');

app.use(flash());
app.use(express.urlencoded({extended: true}))

app.post('/login', (req,res)=>{
    const {username, password} = req.body;
    console.log(username, password)
    if (username === 'user' && password ==='pass'){
        req.flash('message',[
            { type: 'success', text: '로그인이 성공하였습니다.'},
            { type: 'info', text: '신규버전이 출시되었습니다.'},
            { type: 'warning', text: '공지사항.'},
        ]);
    }
    else{
        req.flash('error', 'Login failed. Please check your id and password')
    }

    const successMessage = req.flash('message');
    const errorMessage = req.flash('error');

    res.render('login',{successMessage, errorMessage})
})

app.get('/login', (req,res)=>{
    res.render('login');
})

app.get('/',(req,res)=>{
    const successMessage = req.flash('success');
    const errorMessage = req.flash('error');

    res.json({successMessage, errorMessage})
});

app.listen(port, ()=>{
    console.log('서버 레디')
})

