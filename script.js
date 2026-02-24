let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price) {
    let item = cart.find(p => p.name === name);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    saveCart();
    updateCart();
}

function updateCart() {
    let cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        cartItems.innerHTML += `
        <div>
            ${item.name} - ₹${item.price} x ${item.quantity}
            <button onclick="increase(${index})">+</button>
            <button onclick="decrease(${index})">-</button>
            <button onclick="removeItem(${index})">Remove</button>
        </div>
        `;
    });

    document.getElementById("total").innerText = total;
}

function increase(index) {
    cart[index].quantity++;
    saveCart();
    updateCart();
}

function decrease(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    }
    saveCart();
    updateCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    updateCart();
}

function placeOrder() {
    let name = document.getElementById("customerName").value;
    let address = document.getElementById("customerAddress").value;

    if (!name || !address) {
        alert("Please fill all customer details.");
        return;
    }

    if (cart.length === 0) {
        alert("Cart is empty.");
        return;
    }

    generateBill(name, address);

    cart = [];
    saveCart();
    updateCart();
}

function generateBill(name, address) {
    let bill = `<h3>🧾 Order Bill</h3>`;
    bill += `<p>Name: ${name}</p>`;
    bill += `<p>Address: ${address}</p><hr>`;

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        bill += `<p>${item.name} x ${item.quantity} = ₹${item.price * item.quantity}</p>`;
    });

    bill += `<hr><h4>Total: ₹${total}</h4>`;
    bill += `<p>Thank you for ordering! 🍕</p>`;

    document.getElementById("bill").innerHTML = bill;
}

function toggleDark() {
    document.body.classList.toggle("dark");
}

function searchPizza() {
    let input = document.getElementById("search").value.toLowerCase();
    let pizzas = document.querySelectorAll(".pizza");

    pizzas.forEach(pizza => {
        let name = pizza.querySelector("h2").innerText.toLowerCase();
        pizza.style.display = name.includes(input) ? "block" : "none";
    });
}

updateCart();
