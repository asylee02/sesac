const express = require('express')
const session = require('express-session')
const flash = require('express-flash')

const app = expresS();
const port= 3000

app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true
}));

app.use(flash());
app.use(express.urlencoded({extended: true}))

app.post('/login', (req,res)=>{
    const {username, password} = req.body;

    if (username === 'user' && password ==='pass'){
        req.flash('success', 'Login successful!')
    }
    else{
        req.flash('error', 'Login failed. Please check your id and password')
    }
})


app.get('/',(req,res)=>{
    const successMessage = req.flash('succeess');
    const errorMessage = req.flash('error');

    res.json({successMessage, errorMessage})
});

app.listen(port, ()=>{
    console.log('서버 레디')
})

