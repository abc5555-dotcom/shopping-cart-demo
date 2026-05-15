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

    let cart = [];

    // ===== Open Cart =====

    cartBtn.addEventListener("click", () => {

      cartDrawer.classList.add("open");

      overlay.classList.remove("hidden");

    });

    // ===== Close Cart =====

    function closeCartDrawer(){

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

    // ===== Add To Cart =====

    function addToCart(name, price){

      const existingItem =
        cart.find(item => item.name === name);

      if(existingItem){

        existingItem.qty++;

      }else{

        cart.push({
          name:name,
          price:price,
          qty:1
        });

      }

      renderCart();

    }

    // ===== Render Cart =====

    function renderCart(){

      cartItems.innerHTML = "";

      let total = 0;

      let count = 0;

      cart.forEach((item,index)=>{

        total += item.price * item.qty;

        count += item.qty;

        cartItems.innerHTML += `
          <div class="cart-item">

            <div>
              <h4>${item.name}</h4>

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

    function removeItem(index){

      cart.splice(index,1);

      renderCart();

    }
