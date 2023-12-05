const useapi = 'http://localhost:4004/user/'
let data = '';
const table = document.querySelector("table");
const thead = document.querySelector("thead");
const tbody = document.querySelector("tbody");
async function fetchData(){
  const currentUrl = window.location.href;
  const param = new URL(currentUrl).searchParams.get('id')
  console.log(param);
  console.log(useapi+param)
await fetch(useapi+param)
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