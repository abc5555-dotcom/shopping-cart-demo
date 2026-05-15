// ===== Elements =====

const cartBtn =
  document.getElementById("cart-btn");

const closeCart =
  document.getElementById("close-cart");

const cartDrawer =
  document.getElementById("cart-drawer");

const overlay =
  document.getElementById("overlay");

const cartItems =
  document.getElementById("cart-items");

const cartTotal =
  document.getElementById("cart-total");

const cartCount =
  document.getElementById("cart-count");

const toast =
  document.getElementById("toast");

const checkoutBtn =
  document.getElementById("checkout-btn");


// ===== Cart Data =====

let cart = [];


// ===== Open Cart =====

cartBtn.addEventListener("click", () => {

  cartDrawer.classList.add("open");

  overlay.classList.remove("hidden");

});


// ===== Close Cart =====

function closeCartDrawer() {

  cartDrawer.classList.remove("open");

  overlay.classList.add("hidden");

}

closeCart.addEventListener(
  "click",
  closeCartDrawer
);

overlay.addEventListener(
  "click",
  closeCartDrawer
);


// ===== Toast =====

function showToast(message) {

  toast.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {

    toast.classList.remove("show");

  }, 2000);

}


// ===== Add To Cart =====

function addToCart(name, price) {

  const existingItem =
    cart.find(item => item.name === name);

  if (existingItem) {

    existingItem.qty++;

  } else {

    cart.push({
      name: name,
      price: price,
      qty: 1
    });

  }

  renderCart();

  // Toast 提醒

  showToast(`${name} 已加入購物車`);

}


// ===== Render Cart =====

function renderCart() {

  cartItems.innerHTML = "";

  let total = 0;

  let count = 0;


  // ===== Empty Cart =====

  if (cart.length === 0) {

    cartItems.innerHTML = `
      <p class="empty-cart">
        購物車目前是空的
      </p>
    `;

  }


  cart.forEach((item, index) => {

    total += item.price * item.qty;

    count += item.qty;

    cartItems.innerHTML += `

      <div class="cart-item">

        <div class="cart-item-info">

          <h4>
            ${item.name}
          </h4>

          <p>
            $${item.price} × ${item.qty}
          </p>

        </div>

        <button
          class="remove-btn"
          onclick="removeItem(${index})"
        >

          刪除

        </button>

      </div>

    `;

  });

  cartTotal.textContent = total;

  cartCount.textContent = count;

}


// ===== Remove Item =====

function removeItem(index) {

  const removedItem = cart[index].name;

  cart.splice(index, 1);

  renderCart();

  showToast(`${removedItem} 已移除`);

}


// ===== Checkout =====

checkoutBtn.addEventListener("click", () => {

  // 空購物車

  if (cart.length === 0) {

    showToast("購物車是空的");

    return;

  }

  // 模擬結帳

  showToast("付款成功，感謝您的購買");

  // 清空購物車

  cart = [];

  renderCart();

  // 關閉購物車

  closeCartDrawer();

});

// ===== Initial Render =====

renderCart();
