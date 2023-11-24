const express = require('express')
const app = express();

const userRouter = require('./src/userRouter')
const productRouter = require('./src/productRouter')
const cartRouter = require('./src/cartRouter')

app.get('/', (req,res)=>{
  res.send('Welcome to the 메인페이지')
})

// 각종 라우터 추가
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);

const port =3000;
app.listen(port,()=>{
  console.log('렏')
})

