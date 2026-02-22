let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 儲存
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// 加入購物車
function addToCart(name, price, qtyId) {
  const quantity = parseInt(document.getElementById(qtyId).value);

  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ name, price, quantity });
  }

  saveCart();
  updateCart();
}

// 更新購物車畫面
function updateCart() {
  const cartList = document.getElementById("cart-list");
  const totalElement = document.getElementById("total");

  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>$${item.price}</td>
      <td>$${subtotal}</td>
      <td><button onclick="removeItem(${index})">刪除</button></td>
    `;

    cartList.appendChild(tr);
  });

  totalElement.textContent = total;
}

// 刪除商品
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  updateCart();
}

// 結帳
function checkout() {
  if (cart.length === 0) {
    alert("購物車是空的！");
    return;
  }

  document.getElementById("checkout-section").classList.remove("hidden");
}

// 假付款
function fakePayment() {
  alert("付款成功！");
  cart = [];
  saveCart();
  updateCart();
  document.getElementById("checkout-section").classList.add("hidden");
}

// 頁面載入時執行
updateCart();
