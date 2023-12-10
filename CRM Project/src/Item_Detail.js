const usparameapi = 'http://localhost:4004'
let data = '';
let table_name = '';
let id='';
const info_tbody = document.querySelector(".info>tbody");
const info_title = document.querySelector(".title")
const month_tbody = document.querySelector(".month>tbody");
const ctx = document.getElementById('myChart');
const month = []
const total_Revenue = []
const Item_Count = []

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
  await fetch(`${usparameapi}/items/Item_Detail?id=${id}`)
  .then(res=>res.json())
  .then(res=>data=res)

  console.log(data)
}



function handleInfoTbody() {
  data.info.forEach((item) => {
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

function handleMonthTbody() {
  data.month.forEach((item) => {
    const tr = document.createElement('tr');
    Object.values(item).forEach((data, index) => {
      if(index==0){month.push(data)}
      if(index==1){total_Revenue.push(data)}
      if(index==2){Item_Count.push(data)}
      const td = document.createElement('td');
      td.textContent = data;
      tr.appendChild(td);
    });
    month_tbody.appendChild(tr);
  });
}


function chart(){

  return (new Chart(ctx, {
    type: 'bar',
    data: {
      datasets: [
        {
          type: 'line',
          label: 'Item Count',
          data: Item_Count,
          order:1
        },
        {
          label: 'Total Revenue',
          data: total_Revenue,
          borderWidth: 1,
          order:2
        },
        
      ],
        labels: month
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  }))

}

document.addEventListener("DOMContentLoaded", async()=>{
  queryParsing();
  await fetchData();
  handleInfoTbody();
  handleMonthTbody();
  chart();
});