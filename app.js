/*
 * AOI — interações do site.
 * IMPORTANTE: substitua WHATSAPP_NUMBER pelo número comercial com código do país,
 * DDD e número, somente dígitos. Exemplo de formato: 5511999999999.
 */
const WHATSAPP_NUMBER = "5511999999999";

const products = [
  {
    id: "placa-nfc-google",
    title: "Placa NFC Google",
    category: "nfc",
    categoryLabel: "NFC / AVALIAÇÕES",
    description: "Facilite o acesso dos clientes à página de avaliação da sua empresa.",
    price: "Sob consulta",
    visual: "nfc",
    object: "plaque",
    badge: "Destaque"
  },
  {
    id: "placa-nfc-social",
    title: "Placa NFC personalizada",
    category: "nfc",
    categoryLabel: "NFC / QR CODE",
    description: "Direcione clientes para contatos, redes sociais ou outros links.",
    price: "Sob consulta",
    visual: "nfc",
    object: "plaque",
    badge: "Personalizável"
  },
  {
    id: "chaveiros",
    title: "Chaveiros personalizados",
    category: "personalizados",
    categoryLabel: "BRINDES",
    description: "Brindes com cores, formatos e identidade visual da sua marca.",
    price: "Sob consulta",
    visual: "keychain",
    object: "key",
    badge: "Sob medida"
  },
  {
    id: "brindes",
    title: "Brindes corporativos",
    category: "personalizados",
    categoryLabel: "EMPRESAS",
    description: "Peças para eventos, ações promocionais e relacionamento com clientes.",
    price: "Sob consulta",
    visual: "gift",
    object: "gift",
    badge: "Para empresas"
  },
  {
    id: "display",
    title: "Displays personalizados",
    category: "personalizados",
    categoryLabel: "EXPOSIÇÃO",
    description: "Apresente produtos e informações com uma peça feita para seu espaço.",
    price: "Sob consulta",
    visual: "display",
    object: "board",
    badge: "Sob medida"
  }
];

const productGrid = document.querySelector("#productGrid");
const searchInput = document.querySelector("#productSearch");
const filterButtons = [...document.querySelectorAll(".filter-tab")];
let activeFilter = "todos";

function productObjectMarkup(product) {
  switch (product.object) {
    case "key":
      return '<div class="product-object key">SUA MARCA</div>';
    case "gift":
      return '<div class="product-object gift"><strong>AOI</strong></div>';
    case "board":
      return '<div class="product-object board">SUA<br><strong>MARCA</strong></div>';
    default:
      return '<div class="product-object plaque"><strong>AOI</strong><span>)))</span></div>';
  }
}

function renderProducts() {
  if (!productGrid) return;
  const query = (searchInput?.value || "").trim().toLocaleLowerCase("pt-BR");
  const filtered = products.filter((product) => {
    const matchesCategory = activeFilter === "todos" || product.category === activeFilter;
    const searchable = `${product.title} ${product.categoryLabel} ${product.description}`.toLocaleLowerCase("pt-BR");
    return matchesCategory && searchable.includes(query);
  });

  if (!filtered.length) {
    productGrid.innerHTML = '<div class="empty-state">Não encontramos produtos com esse termo. Tente outra busca ou fale com a AOI.</div>';
    return;
  }

  productGrid.innerHTML = filtered.map((product) => `
    <article class="product-card">
      <div class="product-art ${product.visual}">
        <span class="product-badge">${product.badge}</span>
        ${productObjectMarkup(product)}
      </div>
      <div class="product-info">
        <div class="product-category">${product.categoryLabel}</div>
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <div class="product-bottom">
          <span class="product-price">${product.price}</span>
          <button class="product-quote" type="button" data-quote="${product.title}">Pedir orçamento ↗</button>
        </div>
      </div>
    </article>
  `).join("");
}

function buildWhatsAppUrl(message) {
  const digits = WHATSAPP_NUMBER.replace(/\D/g, "");
  const text = encodeURIComponent(message);
  return `https://wa.me/${digits}?text=${text}`;
}

function openWhatsApp(message) {
  if (!WHATSAPP_NUMBER || WHATSAPP_NUMBER === "5511999999999") {
    alert("Configure o número comercial da AOI no arquivo app.js, na variável WHATSAPP_NUMBER.");
    return;
  }
  window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
}

productGrid?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-quote]");
  if (!button) return;
  const productName = button.dataset.quote;
  openWhatsApp(`Olá! Vim pelo site da AOI e gostaria de um orçamento para: ${productName}.`);
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    renderProducts();
  });
});

searchInput?.addEventListener("input", renderProducts);

document.querySelectorAll("[data-product]").forEach((link) => {
  link.addEventListener("click", () => {
    const productName = link.dataset.product;
    const contactHeading = document.querySelector("#contato");
    if (contactHeading) contactHeading.dataset.requestedProduct = productName;
    const whatsappMain = document.querySelector("#whatsappMain");
    if (whatsappMain) whatsappMain.dataset.product = productName;
  });
});

const defaultMessage = "Olá! Vim pelo site da AOI e gostaria de conhecer as soluções em impressão 3D para minha empresa.";
const whatsappMain = document.querySelector("#whatsappMain");
const whatsappFloat = document.querySelector("#whatsappFloat");

whatsappMain?.addEventListener("click", (event) => {
  event.preventDefault();
  const productName = whatsappMain.dataset.product;
  const message = productName
    ? `Olá! Vim pelo site da AOI e gostaria de um orçamento para: ${productName}.`
    : defaultMessage;
  openWhatsApp(message);
});
whatsappFloat?.addEventListener("click", (event) => {
  event.preventDefault();
  openWhatsApp(defaultMessage);
});

const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");
menuToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});
mainNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const year = document.querySelector("#currentYear");
if (year) year.textContent = new Date().getFullYear();

renderProducts();
