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
        app.get('/user/search', (req, res) => {
          const user = req.query.user;
          console.log(req.url)
          console.log(user)
          const query = `SELECT * from users
          WHERE Name LIKE '%${user}%'`
          console.log(query)
          db.all(query,(err,rows)=>{
            console.log(rows)
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
              table_name:'users',
            }
            res.json(page_data);
          })
        });
        

        app.get('/:table', (req, res) => {
          const db_table = req.params.table
          if(db_table =='favicon.ico'){return}
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
        app.get('/users/User_Detail',(req,res)=>{
          console.log('user_detail')
          const id = req.query.id
          console.log(id)
          const query = `SELECT DISTINCT * FROM users WHERE Id='${id}'`;
          const query2 =`Select orders.id, OrderAt, StoreId 
          from users join orders on users.id = orders.UserId
          WHERE users.id='${id}'`
          const query3 = `Select  stores.Name, Count(StoreId) as count
          from users join orders join stores on users.id = orders.UserId and orders.StoreId = stores.Id
          WHERE users.id='${id}'
          GROUP BY StoreId ORDER BY count DESC LIMIT 5;`
          const query4 = `Select items.Name, Count(items.Name) as count
          from users join orders join orderitems join items on users.id = orders.UserId and orderitems.OrderId = orders.Id and orderitems.ItemId = items.Id
          WHERE users.id='${id}'
          GROUP BY items.Name ORDER BY count DESC LIMIT 5;`
          db.all(query,(err,rows)=>{
            db.all(query2,(err2,rows2)=>{
              
              db.all(query3,(err3,rows3)=>{
                
                db.all(query4,(err4,rows4)=>{
                  const userData = {
                    info:rows,
                    order:rows2,
                    store_top:rows3,
                    item_top:rows4
                  }
                  res.json(userData)
                })
              })
              

            })
          })
        })
        app.get('/items/Item_Detail',(req,res)=>{
          console.log('item_Detail')
          const id = req.query.id
          const query = `SELECT Name, UnitPrice FROM items WHERE Id='${id}'`;
          const query2 = `SELECT  strftime('%Y-%m', OrderAt) AS month, (items.UnitPrice*Count(Name)) as price,  Count(Name) as count 
          from items join orderitems join orders on orderitems.ItemId = items.Id and orderitems.OrderId = orders.Id 
          WHERE items.Id = '${id}'
          GROUP BY month;`
          db.all(query,(err,rows)=>{
            console.log(rows)
            db.all(query2,(err2,rows2)=>{
              const ItemData = {
                info:rows,
                month:rows2
              }
              res.json(ItemData)
            })
          })
        })

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

