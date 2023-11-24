const express = require(express);

const app = express();
const PORT =3000;

//미들웨어를 통한 body 데이터처리
// 원래는 body-parser라고 불리는 모듈이 해주는 거였고,
// 지금은 그냥 빌트인 express 모듈을 사용할 예정

app.use(express.json())

app.post('/submit',(req,res)=>{
  console.log(req.body)
  const jsonData = req.body;
  res.json({receivedData: jsonData})
})


app.listen(PORT,()=>{
  console.log(`http://localhost:${PORT} 가 열렸습니다.`)
})