document.addEventListener("DOMContentLoaded", () => {

  const cartBtn = document.getElementById("cart-btn");
  const closeCart = document.getElementById("close-cart");
  const cartDrawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("overlay");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");
  const toast = document.getElementById("toast");
  const checkoutBtn = document.getElementById("checkout-btn");

  let cart = [];

  // ❗安全檢查（避免 null）
  if (!cartBtn || !cartDrawer || !overlay) {
    console.error("Cart elements not found");
    return;
  }

  // ===== OPEN CART =====
  cartBtn.addEventListener("click", () => {
    cartDrawer.classList.add("open");
    overlay.classList.remove("hidden");
  });

  // ===== CLOSE CART =====
  function closeCartDrawer() {
    cartDrawer.classList.remove("open");
    overlay.classList.add("hidden");
  }

  closeCart?.addEventListener("click", closeCartDrawer);
  overlay?.addEventListener("click", closeCartDrawer);

  // ===== TOAST =====
  function showToast(msg) {
    if (!toast) return;

    toast.textContent = msg;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 2000);
  }

  // ===== ADD TO CART =====
  window.addToCart = function (name, price) {

    const item = cart.find(i => i.name === name);

    if (item) {
      item.qty++;
    } else {
      cart.push({ name, price, qty: 1 });
    }

    renderCart();
    showToast(`已加入：${name}`);
  };

  // ===== RENDER CART =====
  function renderCart() {

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {
      cartItems.innerHTML = `<p class="empty-cart">購物車是空的</p>`;
    }

    cart.forEach((item, index) => {

      total += item.price * item.qty;
      count += item.qty;

      cartItems.innerHTML += `
        <div class="cart-item">
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <p>$${item.price} × ${item.qty}</p>
          </div>

          <button onclick="removeItem(${index})" class="remove-btn">
            刪除
          </button>
        </div>
      `;
    });

    cartTotal.textContent = total;
    cartCount.textContent = count;
  }

  // ===== REMOVE =====
  window.removeItem = function (index) {
    cart.splice(index, 1);
    renderCart();
  };

  // ===== CHECKOUT =====
  checkoutBtn?.addEventListener("click", () => {

    if (cart.length === 0) {
      showToast("購物車是空的");
      return;
    }

    showToast("結帳成功");

    cart = [];
    renderCart();
    closeCartDrawer();
  });

  // 初始化
  renderCart();
});
