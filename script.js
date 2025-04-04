// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});
// Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
    }
  });
});

// Form
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Por favor, completa todos los campos");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Por favor, ingresa un email válido");
    return;
  }

  alert("¡Mensaje enviado con éxito!");
  contactForm.reset();
});

// load Products

async function loadProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products?limit=4");
    const products = await response.json();

    const productsContainer = document.getElementById("products-container");

    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";

      productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <div class="product-info">
                    <h3>${product.title}</h3>
                    <p class="price">$${product.price}</p>
                    <button class="add-to-cart" onclick="addToCart('${product.title}')">
                        Agregar al carrito
                    </button>
                </div>
            `;

      productsContainer.appendChild(productCard);
    });
  } catch (error) {
    console.error("Error loading products:", error);
    const productsContainer = document.getElementById("products-container");
    productsContainer.innerHTML =
      "<p>Error al cargar los productos. Por favor, intenta más tarde.</p>";
  }
}

// add product

function addToCart(productName) {
  console.log(`Producto agregado al carrito: ${productName}`);
  alert(`Producto agregado al carrito: ${productName}`);
}

document.addEventListener("DOMContentLoaded", loadProducts);
