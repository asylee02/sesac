const usparameapi = 'http://localhost:4004'
let data = '';
let table_name = '';
let id='';
const info_tbody = document.querySelector(".info>tbody");
const info_title = document.querySelector(".title")
const order_tbody = document.querySelector(".order>tbody");
const store = document.querySelector(".store_top")
const item = document.querySelector(".item_top")

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
  await fetch(`${usparameapi}/users/User_Detail?id=${id}`)
  .then(res=>res.json())
  .then(res=>data=res)

  console.log(data)
}



function handleInfoTbody() {
  data.info.forEach((item) => {
    const tr = document.createElement('tr');
    console.log(item);
    Object.values(item).forEach((data, index) => {
    if(index==0){return}
      const td = document.createElement('td');
      td.textContent = data;
      tr.appendChild(td);
    });
    info_tbody.appendChild(tr);
  });
}

function handleOrderTbody() {
  data.order.forEach((item) => {
    const tr = document.createElement('tr');
    Object.values(item).forEach((data, index) => {
      const td = document.createElement('td');
      td.textContent = data;
      tr.appendChild(td);
    });
    order_tbody.appendChild(tr);
  });
}

function handleTop(){
    data.store_top.forEach((item)=>{
        const li = document.createElement('li');
        li.textContent = `${item.Name} (${item.count}번 방문)`
        store.appendChild(li);
        console.log(li)
    })
    data.item_top.forEach((data)=>{
        const li = document.createElement('li');
        li.textContent = `${data.Name} (${data.count}번 주문)`
        item.appendChild(li);
        console.log(li)
    })
}

document.addEventListener("DOMContentLoaded", async()=>{
  queryParsing();
  await fetchData();
  handleInfoTbody();
  handleOrderTbody();
  handleTop();
});