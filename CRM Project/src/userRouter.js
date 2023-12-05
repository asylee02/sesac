const express = require('express')
const router = express.Router();
const data = require('../app2')

router.get('/', (req, res)=>{
  res.send('장바구니 조회 ')
})

router.get('/:id', (req, res)=>{
  console.log(data)
  const page = req.params.id;
          fieldnames = Object.keys(data[0] || {});
          console.log('data')
          console.log(data)
          const detail = [];
          data.forEach((item)=>{{
            item.Id==page && detail.push(item)
          }})
          // const detail_data = Object.keys(detail)
          console.log(detail)
          res.render('index2.html',{
            header: fieldnames,
            data: detail
})
})

module.exports = router;