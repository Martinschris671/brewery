document.addEventListener("DOMContentLoaded", function () {
  // Cart functionality
  const cartIcon = document.getElementById("cartIcon");
  const cartDropdown = document.getElementById("cartDropdown");
  const cartClose = document.querySelector(".cart-close");
  const cartItemsContainer = document.getElementById("cartItems");
  const cartCountElement = document.querySelector(".cart-count");
  const cartTotalElement = document.getElementById("cartTotal");
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  let cart = [];
  let cartCount = 0;

  // Toggle cart dropdown
  cartIcon.addEventListener("click", function (e) {
    if (!e.target.closest(".cart-dropdown")) {
      cartDropdown.classList.toggle("active");
    }
  });

  // Close cart dropdown
  cartClose.addEventListener("click", function () {
    cartDropdown.classList.remove("active");
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", function (e) {
    if (!cartIcon.contains(e.target)) {
      cartDropdown.classList.remove("active");
    }
  });

  // Add to cart functionality
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const id = this.dataset.id;
      const name = this.dataset.name;
      const price = parseFloat(this.dataset.price);
      const image = this.dataset.image;

      // Check if item already in cart
      const existingItem = cart.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          id,
          name,
          price,
          image,
          quantity: 1,
        });
      }

      updateCart();
      cartDropdown.classList.add("active");

      // Animation for add to cart
      this.classList.add("adding");
      setTimeout(() => {
        this.classList.remove("adding");
      }, 500);
    });
  });

  // Update cart UI
  function updateCart() {
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty</p>";
      cartCountElement.textContent = "0";
      cartTotalElement.textContent = "₦0.00";
      return;
    }

    let total = 0;
    cartCount = 0;

    cart.forEach((item) => {
      cartCount += item.quantity;
      total += item.price * item.quantity;

      const cartItemElement = document.createElement("div");
      cartItemElement.className = "cart-item";
      cartItemElement.innerHTML = `
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">₦${item.price.toFixed(
                          2
                        )}</div>
                        <div class="cart-item-controls">
                            <div class="quantity-control">
                                <button class="quantity-btn decrease" data-id="${
                                  item.id
                                }">-</button>
                                <span class="quantity">${item.quantity}</span>
                                <button class="quantity-btn increase" data-id="${
                                  item.id
                                }">+</button>
                            </div>
                            <div class="remove-item" data-id="${item.id}">
                                <i class="fas fa-trash"></i>
                            </div>
                        </div>
                    </div>
                `;

      cartItemsContainer.appendChild(cartItemElement);
    });

    cartCountElement.textContent = cartCount;
    cartTotalElement.textContent = `₦${total.toFixed(2)}`;

    // Add event listeners to cart item controls
    document.querySelectorAll(".increase").forEach((button) => {
      button.addEventListener("click", function () {
        const id = this.dataset.id;
        const item = cart.find((item) => item.id === id);
        item.quantity += 1;
        updateCart();
      });
    });

    document.querySelectorAll(".decrease").forEach((button) => {
      button.addEventListener("click", function () {
        const id = this.dataset.id;
        const item = cart.find((item) => item.id === id);
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          cart = cart.filter((cartItem) => cartItem.id !== id);
        }
        updateCart();
      });
    });

    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", function () {
        const id = this.dataset.id;
        cart = cart.filter((item) => item.id !== id);
        updateCart();
      });
    });
  }

  updateCart();
});
