const express = require('express');
const nunjucks = require('nunjucks');
const csv = require('csv-parser');
const fs = require('fs');
// const userRouter = require('./src/userRouter')

const app = express();
const port = 3000;
const itemsPerPage = 10;

nunjucks.configure('views', {
    autoescape: true,
    express: app,
});

// app.use('/user', userRouter);


let data = []; 

let fieldnames;
async function loadDataIntoMemory() {
    return new Promise((resolve, reject) => {
        const fileStream = fs.createReadStream('Person.csv', 'utf-8');
        fileStream
            .pipe(csv())
            .on('data', (row) => {
                data.push(row);
            })
            .on('end', () => {
                resolve();
            })
            .on('error', (error) => {
                console.error(error.message);
                reject(error);
            });
    });
}

async function startServer() {
        await loadDataIntoMemory();
        
        app.get('/', (req, res) => {
          const page = req.query.page || 1;
          const startIndex = (page-1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          fieldnames = Object.keys(data[0] || {});
          console.log(fieldnames)
          fieldnames.shift()
          console.log(`요청 GET 파라미터 : ${req.query.page}`)
          const totalPages = Math.ceil(data.length / itemsPerPage);
          const currPageRows = data.slice(startIndex, endIndex);

          
          res.render('index.html', {
            header : fieldnames,
            data: currPageRows,
            total_pages: totalPages,
            page: parseInt(page),
            id:"Id"
          });
        });
        
        app.get('/user/:id',(req,res)=>{
          const page = req.params.id;
          fieldnames = Object.keys(data[0] || {});
          // console.log(page)
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

        app.get('/search',(req,res)=>{
            const queryData = req.query.user;
            
            const search_data=[]
            data.forEach((item)=>{
              item.Name.includes(queryData) && search_data.push(item)
            })
            const page = Math.ceil(search_data.length/itemsPerPage) 
            console.log(`데이터의 양 : ${search_data.length}`)
            console.log(`총 페이지 수 : ${page}`)
            res.render('index3.html',{
              header: fieldnames,
              data: search_data,
              page: page,

            })
        })

        app.listen(port, () => {
            console.log(`http://localhost:${port}`);
        });
}

// Start the server
startServer();
