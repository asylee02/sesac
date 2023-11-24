const bodyParser = require('body-parser');
const express =require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const port =3000;

app.use(bodyParser.json())
app.use(express.urlencoded('{extended:true}'))

app.use(session({
  secret : 'abcd1234', // .env에 넣어서 커밋 안되게 막기
  resave : false,     // 세션(쿠키정보)의 변경사항이 없어도 다시 저장시키느냐     
  saveUninitialized : true
}))


// app.use((req,res,next )=>{
//   console.log('Session Info:',req.session);
//   next();
// })

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public/static')))

const products = [
  { id:1, name: 'Product 1', quantity:1, price:2000},
  { id:2, name: 'Product 2', quantity:1, price:5000},
  { id:3, name: 'Product 3', quantity:1, price:3000},
  { id:4, name: 'Product 4', quantity:1, price:1000},
]

app.get('/product', (req,res)=>{
  res.json(products);
})

app.get('/cart', (req,res)=>{
  const cart=req.session.cart || [];

  console.log('Session Info:', req.sessionStore)
  res.json(cart);
})

app.post('/update-quantity/:productId',(req,res)=>{
  const prodcutId = parseInt(req.params.productId, 10)
  const {quantity} = req.body;
  const cart = req.session.cart.map((item)=>{
    if (item.id == prodcutId){
      item.quantity = quantity
    }
    return item
  })
  req.session.cart = cart

  // const productId = parseInt(req.params.productId);
  // const change- parseInt(req.query.change);
  // const cart = req.session.cart;

  // const item = cart.find((i) => i.id ===prodcutId);

  // item.quantity = Math.max(1, item.quantity + change);

})

app.post('/add-to-cart/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);
  const product = products.find((p) => p.id === productId);

  if (!product) {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
  }

  // 세션에서 장바구니 데이터 가져오기
  const cart = req.session.cart || [];


  // 장바구니에 상품 추가
    cart.push({
        id: product.id,
        name: product.name,
        quantity: product.quantity,
        price: product.price,
    });
  
  // 업데이트된 장바구니 데이터를 세션에 저장
  req.session.cart = cart;

  res.json({ message: '상품이 장바구니에 추가되었습니다.', cart });
});

app.get('/', (req,res)=>{
  res.sendFile(path.join(__dirname, 'public', 'product.html'))
})

app.listen(port, ()=>{
  console.log(`http://www.localhost:${port}`)
})

//미션3. 장바구니에 최신것만 남을까
//미션4. 프론트에서, fetch를 통해서 ...cart 불러와서 테이블 아래에 새로운 테이블 추가하기

function caclulateTotalAmount(cart){
  let total = 0;

  for (let i =0; i<cart.length; i++){
    const item = cart[i];
    total += item.price * item.quantity;
  }

  return total;
}

function caclulateTotalAmount2(cart){
  return cart.reduce((total, item)=> total + item.price*item.quantity, 0);
}