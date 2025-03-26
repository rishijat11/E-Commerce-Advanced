document.addEventListener("DOMContentLoaded", function () {
    updateCartDisplay();
});

function getCartItems() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function updateCartDisplay() {
    let cartItems = getCartItems();
    let cartContainer = document.querySelector(".cart-page table");
    let totalItemCount = document.getElementById("totalItem");
    let totalPrice = 0;

    if (cartItems.length === 0) {
        cartContainer.innerHTML = "<h3>Your cart is empty!</h3>";
        return;
    }

    fetch('https://fakestoreapi.com/products') // Replace with your actual API
        .then(response => response.json())
        .then(products => {
            let cartHTML = `
            <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Subtotal</th>
            </tr>`;

            cartItems.forEach(item => {
                let product = products.find(p => p.id == item.id);
                if (product) {
                    let itemTotal = product.price * item.quantity;
                    totalPrice += itemTotal;

                    cartHTML += `
                    <tr>
                        <td>
                            <div class="cart-info">
                                <img src="${product.image}" alt="${product.title}" />
                                <div>
                                    <p>${product.title}</p>
                                    <small>Price: $${product.price.toFixed(2)}</small>
                                    <br />
                                    <a href="#" onclick="removeFromCart(${product.id})">Remove</a>
                                </div>
                            </div>
                        </td>
                        <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${product.id}, this.value)" /></td>
                        <td>$${itemTotal.toFixed(2)}</td>
                    </tr>`;
                }
            });

            cartContainer.innerHTML = cartHTML;
            document.querySelector(".total-price table").innerHTML = `
                <tr><td>Subtotal</td><td>$${totalPrice.toFixed(2)}</td></tr>
                <tr><td>Tax</td><td>$${(totalPrice * 0.1).toFixed(2)}</td></tr>
                <tr><td>Total</td><td>$${(totalPrice * 1.1).toFixed(2)}</td></tr>
            `;
        })
        .catch(error => console.error('Failed to fetch product data:', error));
}

function removeFromCart(productId) {
    let cart = getCartItems();
    let updatedCart = cart.filter(item => item.id != productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateCartDisplay();
}

function updateQuantity(productId, quantity) {
    let cart = getCartItems();
    let item = cart.find(item => item.id == productId);
    if (item) {
        item.quantity = parseInt(quantity);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();
    }
}