
  const header = ["id","name","price"]
  const product = document.querySelector("#productTable tbody")
  document.addEventListener('DOMContentLoaded', function () {
    fetchUserInfo();
    
    // getCartFromAPI();
    // getCartFromSessionStorage();
    // getCartFromLocalStorage();
});

function fetchUserInfo(){
  fetch('/cart')
  .then(async (response) => {
      if (response.status === 200) {
        console.log('통과')
          return response.json();
      } else if (response.status === 401) {
        console.log('실패')
          // 401 상태 코드일 경우 로그인이 필요하다는 메시지를 화면에 표시
          const data = await response.json();
          alert(data.message);

          // 만약 리다이렉트 URL이 제공되면 해당 URL로 이동
          if (data.redirectUrl) {
            console.log('리다이렉트')
              window.location.href = data.redirectUrl;
          }
          
          throw new Error('Unauthorized');
      } else {
          throw new Error('Failed to fetch cart data');
      }
  })
  .then((cartData) => displayCart(cartData))

}


function display(data){
  if(product){
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
}

window.addToCart = function (productId) {
  fetch(`/add-to-cart/${productId}`, { method: 'POST' })
      .then((response) => response.json())
      .then((data) => {
          alert(data.message);
          // 서버에서 업데이트된 장바구니 정보를 가져와 테이블에 출력
          fetchUserInfo();
      });
};


function displayCart(cart) {
  const cartTableBody = document.querySelector('#cartTable tbody');
  console.log(cartTableBody);
  const plus ="plus";
  const minus ="minus";
  let total =0;
  // 기존 테이블 내용을 비우고 새로운 내용으(로 업데이트
  cartTableBody.innerHTML = '';
  console.log(cart)
  cart.forEach((item) => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td>
          ${item.quantity}
          <button onclick="handleQuantity(${item.id}, 'plus')">+</button>
          <button onclick="handleQuantity(${item.id}, 'minus')">-</button>

          </td>
          <td>${item.price}</td>
          <td><button  onclick="handleDelete(${item.id})">Remove</button></td>
          `;
      cartTableBody.appendChild(row);
      total += item.quantity * item.price;
    });
    const price = document.createElement('tr');
    price.innerHTML= `
    <td>total </td>
    <td>${total}</td>
    `
    cartTableBody.appendChild(price)
}

function handleQuantity(id, type){
  fetch(`/update-quantity/${id}`,{
    method: 'PUT',
    headers: {'Content-Type': 'text/plain' },
    body: type
  })
  .then((data) => {
      // 서버에서 업데이트된 장바구니 정보를 가져와 테이블에 출력
      fetchUserInfo();
  });
} 

function handleDelete(id){
  fetch(`/delete/${id}`,{
    method: 'DELETE'
  })
  .then(()=>{
    fetchUserInfo();
  })
  console.log(id)
}

function login(){
  const username = document.querySelector('#username').value
  const password = document.querySelector('#password').value


  fetch('/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
})
.then((res)=>res.json())
.then((data)=> alert(data.message))
}




// Get : 서버에서 데이터 불러오기
// POST : 서버에 데이터 전송(생성)
// PUT : 서버에 데이터 전송 (수정)
// Delete : 서버에 해당 데이터 삭제하라고 명령