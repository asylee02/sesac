const usparameapi = 'http://localhost:4004'
let data = '';
let table_name = '';
let id='';
const info_tbody = document.querySelector(".info>tbody");
const info_title = document.querySelector(".title")

const sale_tbody = document.querySelector(".sale>tbody");

const customer_body = document.querySelector(".customer>tbody");

function queryParsing(){
  const url = new URL(window.location.href);
  const querys =url.search.replace('?','').split('&&')
  table_name=querys[0]
  id=querys[1]

}

async function fetchData(){
  queryParsing();
  console.log(table_name)
  console.log(id)
  await fetch(`${usparameapi}/stores/Store_detail?id=${id}`)
  .then(res=>res.json())
  .then(res=>data=res)

  console.log(data)
}



function handleInfoTbody() {
  data.data.forEach((item) => {
    const tr = document.createElement('tr');
    console.log(item);
    Object.values(item).forEach((data, index) => {
      const td = document.createElement('td');
      td.textContent = data;
      tr.appendChild(td);
    });
    info_tbody.appendChild(tr);
  });
}

function handleSaleTbody() {
  data.sale.forEach((item) => {
    const tr = document.createElement('tr');
    console.log(item);
    Object.values(item).forEach((data, index) => {
      const td = document.createElement('td');
      if(index==1){
        td.textContent = data;
        td.addEventListener('click',()=>{
          console.log('el')
        })
        // fetch(`/st ores/Store_detail/${data}`)
        // .then((res)=>res.json())
        // .then((res)=>console.log(res))
      }
      else{
        td.textContent=data;
      }
      tr.appendChild(td);
    });
    sale_tbody.appendChild(tr);
  });
}

function handleCustomerTbody() {
  data.customer.forEach((item) => {
    const tr = document.createElement('tr');
    console.log(item);
    Object.values(item).forEach((data, index) => {
      const td = document.createElement('td');
      td.textContent = data;
      tr.appendChild(td);
    });
    customer_body.appendChild(tr);
  });
}

document.addEventListener("DOMContentLoaded", async()=>{
  queryParsing();
  await fetchData();
  handleInfoTbody();
  handleSaleTbody();
  handleCustomerTbody();
});