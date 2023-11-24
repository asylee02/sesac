const express = require('express')
const router = express.Router();

router.get('/', (req, res)=>{
  res.send('물품 ')
})
router.get('/details', (req, res)=>{
  res.send('물품 상세보기')
})
router.get('/list', (req, res)=>{
  res.send('물품 리스트')
})


module.exports = router;

//미션 1
// product/details
// product/list

//미션2
//cart <- CRUD 