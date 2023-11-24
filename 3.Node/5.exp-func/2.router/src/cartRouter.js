const express = require('express')
const router = express.Router();

router.get('/', (req, res)=>{
  res.send('장바구니 조회 ')
})
.post((req, res)=>{
  res.send('장바구니 추가 ')
})
.put((req, res)=>{
  res.send('장바구니 수정 ')
})
.delete((req, res)=>{
  res.send('장바구니 삭제 ')
})

module.exports = router;