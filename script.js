/* =============================
   🔥 每次重整都清空資料
============================= */
localStorage.clear();

/* =============================
   變數初始化
============================= */
let cart = [];
let currentUser = null;
let pendingCheckout = false;

/* =============================
   基本儲存
============================= */

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* =============================
   使用者狀態 UI
============================= */

function updateUserUI(){
  const userInfo = document.getElementById("user-info");
  const loginBtn = document.getElementById("login-btn");

  if(currentUser){
    userInfo.textContent = "歡迎，" + currentUser;
    loginBtn.textContent = "登出";
    loginBtn.onclick = logout;
  }else{
    userInfo.textContent = "未登入";
    loginBtn.textContent = "登入";
    loginBtn.onclick = openLogin;
  }
}

function logout(){
  currentUser = null;
  updateUserUI();
}

/* =============================
   購物車功能
============================= */

function addToCart(name, price, qtyId){
  const quantity = parseInt(document.getElementById(qtyId).value);

  if(quantity <= 0 || isNaN(quantity)){
    alert("請輸入正確數量");
    return;
  }

  const existing = cart.find(item => item.name === name);

  if(existing){
    existing.quantity += quantity;
  }else{
    cart.push({name, price, quantity});
  }

  updateCart();
}

function updateCart(){
  const cartList = document.getElementById("cart-list");
  const totalElement = document.getElementById("total");

  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item,index)=>{
    const subtotal = item.price * item.quantity;
    total += subtotal;

    cartList.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>$${item.price}</td>
        <td>$${subtotal}</td>
        <td><button onclick="removeItem(${index})">刪除</button></td>
      </tr>
    `;
  });

  totalElement.textContent = total;
}

function removeItem(index){
  cart.splice(index,1);
  updateCart();
}

/* =============================
   登入功能
============================= */

function openLogin(){
  document.getElementById("login-modal").classList.remove("hidden");
}

function login(){
  const account = document.getElementById("login-account").value;
  const password = document.getElementById("login-password").value;

  if(account && password){
    currentUser = account;

    document.getElementById("login-modal").classList.add("hidden");
    updateUserUI();

    if(pendingCheckout){
      showCheckoutSection();
      pendingCheckout = false;
    }

  }else{
    alert("請輸入帳號密碼");
  }
}

/* =============================
   結帳流程
============================= */

function checkout(){

  if(cart.length === 0){
    alert("購物車是空的");
    return;
  }

  if(!currentUser){
    alert("請先登入會員");
    pendingCheckout = true;
    openLogin();
    return;
  }

  showCheckoutSection();
}

/* =============================
   顯示付款區 + 平滑滾動
============================= */

function showCheckoutSection() {
  const checkout = document.getElementById("checkout-section");

  checkout.classList.remove("hidden");

  checkout.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

/* =============================
   付款完成
============================= */

function fakePayment(){
  alert("付款成功！");

  cart = [];
  updateCart();

  document.getElementById("checkout-section").classList.add("hidden");
}

/* =============================
   初始化
============================= */

updateCart();
updateUserUI();
