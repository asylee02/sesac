
  const header = ["id","name","price"]
  const product = document.querySelector("#productTable tbody")

fetch('/product')
  .then((res)=>res.json())
  .then((res)=>display(res))
  .then(()=>{
    fetch('/cart')
      .then((response) => response.json())
      .then((cart) => displayCart(cart));
      // .then((cart)=>{
      //   window.location.href='cart/html'
      // })
  })

function display(data){
  data.forEach((item)=>{
    const tr = document.createElement('tr');
    product.append(tr);
    for (let i=0; i<3; i++){
      // console.log(header[i])
      data = item[header[i]]
      const th = document.createElement('td');
      th.textContent = data;
      product.appendChild(th);
    }
    const button = document.createElement('th')
    button.innerHTML = `<button onClick="addToCart(${item.id})">담기</button>`;
    product.appendChild(button)
  })
}

window.addToCart = function (productId) {
  fetch(`/add-to-cart/${productId}`, { method: 'POST' })
      .then((response) => response.json())
      .then((data) => {
          alert(data.message);
          // 서버에서 업데이트된 장바구니 정보를 가져와 테이블에 출력
          fetch('/cart')
              .then((response) => response.json())
              .then((cart) => displayCart(cart))
      });
};


function displayCart(cart) {
  const cartTableBody = document.querySelector('#cartTable tbody');
  console.log(cartTableBody);
  // 기존 테이블 내용을 비우고 새로운 내용으로 업데이트
  cartTableBody.innerHTML = '';
  cart.forEach((item) => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td>
          ${item.quantity}
          <button onclick="handlePlus(${item.quantity}, ${item.id})">+</button>
          <button>-</button>
          </td>
          <td>${item.price}</td>
          `;
      cartTableBody.appendChild(row);
  });
}

function handlePlus(quantity, id){
  console.log(id)
  updatedQuantity = quantity+1;
  fetch(`/update-quantity/${id}`,{
    method: 'POST',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify({quantity: updatedQuantity})
  })
  .then(()=>{
    fetch('/cart')
      .then((res)=>res.json())
      .then((cart)=>console.log(cart))
      .then((cart)=> displayCart(cart))
  })
} 

// Get : 서버에서 데이터 불러오기
// POST : 서버에 데이터 전송(생성)
// PUT : 서버에 데이터 전송 (수정)
// Delete : 서버에 해당 데이터 삭제하라고 명령