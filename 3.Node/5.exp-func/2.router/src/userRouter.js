const express = require('express')
const router = express.Router();

router.get('/', (req, res)=>{
  res.send('사용자 간단 프로필')
})

router.get('/profile',(req,res)=>{
  res.send('사용자 프로필')
})

//사용자 조회
router.get('/settings',(req, res)=>{
  res.send('사용자 설정')
})

module.exports = router;

//미션 1
// product/details
// product/list

//미션2
//cart <- CRUD 