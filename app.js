const products = [
  { id: 1, name: 'Product 1', price: 49.99 },
  { id: 2, name: 'Product 2', price: 79.99 },
  { id: 3, name: 'Product 3', price: 29.99 },
  { id: 4, name: 'Product 4', price: 99.99 },
  { id: 5, name: 'Product 5', price: 59.99 },
];
// Add these functions to your app.js file
function showCart() {
  const cartModal = document.getElementById('cart-modal');
  const cartItemsList = document.getElementById('cart-items');
  cartItemsList.innerHTML = '';

  cart.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.className = 'cart-item';
    listItem.innerHTML = `
      ${item.product.name} - ${item.quantity} - $${(item.product.price * item.quantity).toFixed(2)}
      <button onclick="removeFromCart(${item.product.id})">Remove</button>
    `;

    cartItemsList.appendChild(listItem);
  });

  cartModal.style.display = 'block';
}

function closeCart() {
  const cartModal = document.getElementById('cart-modal');
  cartModal.style.display = 'none';
}

function removeFromCart(productId) {
  const itemIndex = cart.findIndex((item) => item.product.id === productId);

  if (itemIndex > -1) {
    cart.splice(itemIndex, 1);
  }

  updateCartDisplay();
  showCart();
}

const cart = [];

function addToCart(productId) {
  const product = products.find((product) => product.id === productId);
  const cartItem = cart.find((item) => item.product.id === productId);

  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ product, quantity: 1 });
  }

  updateCartDisplay();
}

function updateCartDisplay() {
  const cartLink = document.getElementById('cart');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartLink.textContent = `Cart (${totalItems})`;
}

function displayProducts() {
  const productsContainer = document.getElementById('products');
  productsContainer.innerHTML = '';

  products.forEach((product) => {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    productDiv.innerHTML = `
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;

    productsContainer.appendChild(productDiv);
  });
}

displayProducts();
document.getElementById('cart').addEventListener('click', (e) => {
  e.preventDefault();
  showCart();
});

document.getElementById('close-cart').addEventListener('click', closeCart);
