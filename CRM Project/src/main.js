const useapi = 'http://localhost:4004'
let useurl ='http://localhost:4004'
let table_name ='users';
let current_page = 1;

let data = '';
const table = document.querySelector("table");
const thead = document.querySelector("thead");
const tbody = document.querySelector("tbody");
const pagination = document.querySelector(".pagination");
async function fetchData(){
  table_url = useurl +`/${table_name}?page=${current_page}`
  console.log(table_url)
await fetch(table_url)
  .then(res=>res.json())
  .then(res=>data=res)

  console.log(data)
}

function paging(){
  table.addEventListener("click", function(event) {
    const targetRow = event.target.closest("tr[data-href]");
    if (targetRow) {
      const href = targetRow.dataset.href;
      window.location.href = href;
    }
  });
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
    Object.values(item).forEach((data, index) => {
      const td = document.createElement('td');
      if (index === 0) {
        const a = document.createElement('a');
        a.setAttribute('href', `/src/Detail.html?${table_name}&&${data}`);
        a.textContent = data;
        td.appendChild(a);
      } else {
        td.textContent = data;
      }
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}


function handlePagination(){
  
  if(data.page!=1){
  const prev = document.createElement('a');
  prev.textContent='prev'
  current_page -=1;
  // prev.setAttribute('href', params)
  prev.addEventListener('click', (e)=>{
    e.preventDefault();
    handleList()
  });
  pagination.appendChild(prev);
  }
  for(let i=1; i<data.total_pages+1; i++){
    const a = document.createElement('a');
    a.textContent = i;
    a.setAttribute('href', `?params`)
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      current_page = i;
      handleList()
    });
    pagination.appendChild(a);
  }
  
  if(data.page!=data.total_pages){
    const next = document.createElement('a');
    next.textContent='next'
    current_page +=1;
    // next.setAttribute('href', params)
    next.addEventListener('click', (e)=>{
      e.preventDefault();
      handleList()
    });
    pagination.appendChild(next);
    }
}

function router(){
  tbody.innerHTML=''
  thead.innerHTML='';
  pagination.innerHTML='';
  current_page = 
  reload();
}

function handleList(table=table_name){
  table_name = table;
  tbody.innerHTML=''
  thead.innerHTML='';
  pagination.innerHTML='';
  reload();
}



async function reload(){
  await fetchData();
  handleThead();
  handleTbody();
  paging();
  handlePagination();
}



document.addEventListener("DOMContentLoaded", async()=>{
  reload();

});