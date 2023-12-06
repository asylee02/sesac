const usparameapi = 'http://localhost:4004'
let data = '';
let table_name = '';
let id='';
const table = document.querySelector("table");
const thead = document.querySelector("thead");
const tbody = document.querySelector("tbody");

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
  await fetch(`${usparameapi}/detail/${table_name}?id=${id}`)
  .then(res=>res.json())
  .then(res=>data=res)

  console.log(data)
}


function handleThead(){
  data.header.forEach((item)=>{
    const th = document.createElement('th');
    th.textContent = item
    thead.appendChild(th);
  })
}

function handleTbody() {
  data.data.forEach((item) => {
    const tr = document.createElement('tr');
    console.log(item);
    Object.values(item).forEach((data, index) => {
      const td = document.createElement('td');
      td.textContent = data;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}



function router(param){
  tbody.innerHTML=''
  thead.innerHTML='';
  pagination.innerHTML='';
  useurl = useapi 
  useurl += param;
  reload();
}


async function reload(){
  await fetchData();
  handleThead();
  handleTbody();
}



document.addEventListener("DOMContentLoaded", async()=>{
  reload();

});