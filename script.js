let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 儲存購物車
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

// 更新畫面
function updateCart() {
  const cartList = document.getElementById("cart-list");
  const totalElement = document.getElementById("total");

  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - $${item.price} x ${item.quantity} = $${subtotal}
      <button onclick="removeItem(${index})">刪除</button>
    `;

    cartList.appendChild(li);
  });

  totalElement.textContent = total;
}

// 刪除商品
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  updateCart();
}

// 結帳按鈕
function checkout() {
  if (cart.length === 0) {
    alert("購物車是空的！");
    return;
  }

  document.getElementById("checkout-section").classList.remove("hidden");
}

// 假付款
function fakePayment() {
  alert("付款成功！（模擬）");
  cart = [];
  saveCart();
  updateCart();
  document.getElementById("checkout-section").classList.add("hidden");
}

// 頁面載入時更新
updateCart();
