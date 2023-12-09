const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path')
const sqlite3 = require('sqlite3')

const dbFile = 'mycrm2.db';

const db = new sqlite3.Database(dbFile);

const app = express();
const port = 4004;
const itemsPerPage = 10;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'src')))


// app.use('/user', userRouter);


async function startServer() {
        app.get('/:table', (req, res) => {
          const db_table = req.params.table
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
              id:'id',
              table_name:db_table,
            }
            res.json(page_data);
          })

        });

        app.get('/stores/Store_detail',(req,res)=>{
          console.log('Store_detail')
          const id = req.query.id
          const query = `SELECT DISTINCT * FROM stores WHERE Id='${id}'`;
          const query2 = `Select   strftime('%Y-%m', OrderAt) AS month,SUM(items.UnitPrice) as price ,COUNT(orders.id) as count
          from orders join stores join items join orderitems on orders.StoreId = stores.Id and orders.Id = orderitems.OrderId and items.Id = orderitems.ItemId
          WHERE stores.id ='${id}' GROUP BY month;`
          const query3 = `Select UserId,users.Name, Count(UserId)as count
          from orders join users on orders.UserId = users.Id
          WHERE StoreId ='${id}'
          GROUP BY UserId ORDER BY count DESC LIMIT 10;`

          db.all(query, (err,rows)=>{
            const currentdata = rows
          
            db.all(query2,(err2,rows2)=>{
              const monthData = rows2;

                db.all(query3,(err3,rows3)=>{
                  const customerData = rows3

                  const store_data={
                    data:currentdata,
                    sale:monthData,
                    customer:customerData
                  }
                  res.json(store_data)
                })
              
            })
          })
        })
 

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
        //     console.log(queryData)
        //    const query = ``
        // })

        app.listen(port, () => {
            console.log(`http://localhost:${port}`);
        });
}

function titledata(table){
  if(table == 'stores'){return ('매장 정보') }
  else if(table == 'users'){return ('고객 정보') }
  else if(table == 'orders'){return ('상품주문 정보') }
  else if(table == 'items'){return ('상품 정보') }
}
// Start the server
startServer();

