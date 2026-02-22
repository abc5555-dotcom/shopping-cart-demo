let cart = [];
let total = 0;

function addToCart(name, price) {
  cart.push({ name, price });
  total += price;
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById("cart-list");
  const totalElement = document.getElementById("total");

  cartList.innerHTML = "";

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });

  totalElement.textContent = total;
}

function checkout() {
  if (cart.length === 0) {
    alert("購物車是空的！");
    return;
  }

  alert("訂單完成！感謝購買！");
  cart = [];
  total = 0;
  updateCart();
}
