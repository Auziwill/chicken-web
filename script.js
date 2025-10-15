const products = [
  { id: 1, name: "AYAM BAKAR", price: 10000 },
  { id: 2, name: "AYAM BAKAR DADA", price: 10000 },
  { id: 3, name: "AYAM SAYAP DAN NASI", price: 10000 },
  { id: 4, name: "AYAM BAKAR ESTEH", price: 10000 },
  { id: 5, name: "NASI LELE", price: 10000 },
  { id: 6, name: "AYAM SAYAP DAN NASI", price: 11000 },
  { id: 7, name: "AYAM SAYAP DAN NASI", price: 11000 },
  { id: 8, name: "AYAM SAYAP DAN NASI", price: 11000 },
  { id: 9, name: "AYAM SAYAP DAN NASI", price: 11000 },
  { id: 10, name: "AYAM SAYAP DAN NASI", price: 11000 },
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart();
}

function plusQty(id) {
  cart.find(c => c.id === id).qty++;
  saveCart();
}

function minusQty(id) {
  const c = cart.find(c => c.id === id);
  if (c.qty === 1) removeFromCart(id);
  else {
    c.qty--;
    saveCart();
  }
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const container = document.getElementById('cartItems');
  const totalEl = document.getElementById('totalPrice');
  const countEl = document.getElementById('cartCount');

  if (!cart.length) {
    container.innerHTML = '<p>Keranjang kosong</p>';
    totalEl.textContent = '0';
    countEl.textContent = '0';
    return;
  }

  container.innerHTML = cart.map(c => `
    <div class="cart-item">
      <div>
        <div>${c.name}</div>
        <div>Rp ${c.price.toLocaleString('id-ID')} x ${c.qty}</div>
      </div>
      <div class="cart-item-actions">
        <button onclick="minusQty(${c.id})">−</button>
        <span>${c.qty}</span>
        <button onclick="plusQty(${c.id})">+</button>
        <button class="btn-remove" onclick="removeFromCart(${c.id})">Hapus</button>
      </div>
    </div>
  `).join('');

  const total = cart.reduce((a, b) => a + b.price * b.qty, 0);
  totalEl.textContent = total.toLocaleString('id-ID');
  countEl.textContent = cart.reduce((a, b) => a + b.qty, 0);
}

function toggleCart() {
  document.getElementById('cartSidebar').classList.toggle('open');
}

function closeNav() {
  document.getElementById('navToggle').checked = false;
}

function checkoutWhatsApp() {


  let text = `Hai kak aku mau pesan Crunchy Banana Six dong!%0A%0A`;
  cart.forEach(c => {
    text += `- ${c.name} x${c.qty} = Rp ${(c.price * c.qty).toLocaleString('id-ID')}%0A`;
  });
  const total = cart.reduce((a, b) => a + b.price * b.qty, 0);
  text += `%0ATotal: *Rp ${total.toLocaleString('id-ID')}*%0A%0ATerima kasih!`;

  window.open(`https://wa.me/6285701917804?text=${text}`, '_blank');
}


/* menambahkan menu list produk */

const menuIcon = document.getElementById("menu-icon");
const menuItems = document.getElementById("menu-items");

menuIcon.addEventListener("click", () => {
  menuItems.classList.toggle("hidden");
});
