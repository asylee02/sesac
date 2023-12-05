const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const cors = require('cors');
const path = require('path')
const sqlite3 = require('sqlite3')

const dbFile = 'mycrm1.db';

const db = new sqlite3.Database(dbFile);
// const userRouter = require('./src/userRouter')

const app = express();
const port = 4004;
const itemsPerPage = 10;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'src')))


// app.use('/user', userRouter);


// const data = []; 

// let fieldnames;
// async function loadDataIntoMemory() {
//     return new Promise((resolve, reject) => {
//         const fileStream = fs.createReadStream('Person.csv', 'utf-8');
//         fileStream
//             .pipe(csv())
//             .on('data', (row) => {
//                 data.push(row);
//             })
//             .on('end', () => {
//                 resolve();
//             })
//             .on('error', (error) => {
//                 console.error(error.message);
//                 reject(error);
//             });
//     });
// }

async function startServer() {
        // await loadDataIntoMemory();
        
        app.get('/:table', (req, res) => {
          const db_table = req.params.table || 'users'
          console.log(db_table)
          const query =`SELECT * FROM ${db_table}`;

          db.all(query, (err,rows)=>{
            const page = req.query.page || 1;
            const startIndex = (page-1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const fieldnames = Object.keys(rows[0] || {});
            const totalPages = Math.ceil(rows.length / itemsPerPage);
            const currPageRows = rows.slice(startIndex, endIndex);
            const page_data={
              header:fieldnames,
              data:currPageRows,
              total_pages: totalPages,
              page: parseInt(page),
              id:'id'
            }
            res.json(page_data);
          })

          // const page = req.query.page || 1;
          // const test = req.url
          // console.log('test:'+ req.query.test)
          // console.log('page번호:'+ req.query.page)
          // const startIndex = (page-1) * itemsPerPage;
          // const endIndex = startIndex + itemsPerPage;
          // fieldnames = Object.keys(data[0] || {});
          // console.log(fieldnames)
          // // fieldnames.shift()
          // console.log(`요청 GET 파라미터 : ${req.query.page}`)
          // const totalPages = Math.ceil(data.length / itemsPerPage);
          // const currPageRows = data.slice(startIndex, endIndex);

          // const page_data= {
          //   header:fieldnames, 
          //   test,
          //   data:currPageRows, 
          //   total_pages: totalPages, 
          //   page: parseInt(page), 
          //   id: "Id"
          // }
          // res.json(page_data)

        });


        // app.get('/user/:id',(req,res)=>{
        //   const page = req.params.id;
        //   fieldnames = Object.keys(data[0] || {});
        //   let detail = [];
        //   data.forEach((item)=>{{
        //     item.Id==page && detail.push(item)
        //   }})
        //   const deatial_data={
        //     header:fieldnames,
        //     data: detail
        //   }
        //   res.json(deatial_data)
        // })

        // app.get('/search',(req,res)=>{
        //     const queryData = req.query.user;
            
        //     const search_data=[]
        //     data.forEach((item)=>{
        //       item.Name.includes(queryData) && search_data.push(item)
        //     })
        //     const page = Math.ceil(search_data.length/itemsPerPage) 
        //     console.log(`데이터의 양 : ${search_data.length}`)
        //     console.log(`총 페이지 수 : ${page}`)
        //     res.render('index3.html',{
        //       header: fieldnames,
        //       data: search_data,
        //       page: page,

        //     })
        // })

        app.listen(port, () => {
            console.log(`http://localhost:${port}`);
        });
}

// Start the server
startServer();
