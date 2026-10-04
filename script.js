/* =========================================================
   CROCHET Studio - Complete Website JavaScript
   ========================================================= */

/* =========================
   BUSINESS SETTINGS
   ========================= */

const BRAND = "CROCHET Studio";

/*
  Replace this with the actual WhatsApp number.
  Format: country code + number, without + or spaces.
  Example: 919876543210
*/
const whatsappNumber = "8452-942-656";

/*
  Replace with the actual Instagram profile.
*/
const instagramURL = "https://www.instagram.com/crochet__.studio?stkn=OXQ3ejV2dGRzajhv";


/* =========================
   PRODUCTS
   ========================= */

const products = [
  {
    id: "bouquet",
    name: "Crochet Flower Bouquet",
    category: "Crochet Bouquet",
    collection: "Bestsellers",
    price: 599,
    description: "A forever bouquet, handmade with love.",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=700"
  },

  {
    id: "bag",
    name: "Handmade Crochet Bag",
    category: "Accessories",
    collection: "Season Special",
    price: 799,
    description: "A cute everyday handmade companion.",
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=700"
  },

  {
    id: "gift",
    name: "Cute Crochet Gift",
    category: "Gifts",
    collection: "Premium Bouquet",
    price: 399,
    description: "A thoughtful little handmade surprise.",
    image:
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=700"
  },

  {
    id: "rose",
    name: "Crochet Rose",
    category: "Single Flower",
    collection: "Bestsellers",
    price: 199,
    description: "A handmade rose that stays beautiful forever.",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=700"
  },

  {
    id: "keychain",
    name: "Crochet Keychain",
    category: "Crochet Keychain",
    collection: "Season Special",
    price: 249,
    description: "A tiny handmade companion for your everyday adventures.",
    image:
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=700"
  },

  {
    id: "pot",
    name: "Crochet Flower Pot",
    category: "Crochet Flower Pot",
    collection: "Premium Bouquet",
    price: 449,
    description: "A charming handmade flower arrangement for your space.",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=700"
  }
];


/* =========================
   STATE
   ========================= */

let cart = [];
let cartLineId = 0;
let selectedProduct = null;
let currentFilter = "all";


/* =========================
   ELEMENTS
   ========================= */

const overlay = document.getElementById("overlay");
const sidebar = document.getElementById("sidebar");
const cartPanel = document.getElementById("cart-panel");
const searchBar = document.getElementById("search-bar");
const searchInput = document.getElementById("search-input");

const productGrid = document.getElementById("product-grid");
const categoryMenu = document.getElementById("category-menu");

const listingTitle = document.getElementById("listing-title");
const listingSubtitle = document.getElementById("listing-subtitle");
const resultCount = document.getElementById("result-count");

const modal = document.getElementById("product-modal");
const customFields = document.getElementById("custom-fields");


/* =========================
   BASIC SAFETY CHECK
   ========================= */

if (!productGrid) {
  console.error("product-grid was not found.");
}


/* =========================
   PANEL FUNCTIONS
   ========================= */

function openPanel(panel) {
  if (!panel) return;

  panel.classList.add("open");

  if (overlay) {
    overlay.classList.add("show");
  }

  document.body.classList.add("panel-open");
}


function closePanels() {
  if (sidebar) {
    sidebar.classList.remove("open");
  }

  if (cartPanel) {
    cartPanel.classList.remove("open");
  }

  if (overlay) {
    overlay.classList.remove("show");
  }

  document.body.classList.remove("panel-open");
}


function openSidebar() {
  closePanels();

  if (sidebar) {
    sidebar.classList.add("open");
  }

  if (overlay) {
    overlay.classList.add("show");
  }

  document.body.classList.add("panel-open");
}


function openCart() {
  closePanels();

  if (cartPanel) {
    cartPanel.classList.add("open");
  }

  if (overlay) {
    overlay.classList.add("show");
  }

  document.body.classList.add("panel-open");

  renderCart();
}


/* =========================
   MENU
   ========================= */

const menuOpen = document.getElementById("menu-open");
const menuClose = document.getElementById("menu-close");

if (menuOpen) {
  menuOpen.addEventListener("click", openSidebar);
}

if (menuClose) {
  menuClose.addEventListener("click", closePanels);
}

if (overlay) {
  overlay.addEventListener("click", closePanels);
}


/* =========================
   CART OPEN / CLOSE
   ========================= */

const cartOpen = document.getElementById("cart-open");
const cartClose = document.getElementById("cart-close");

if (cartOpen) {
  cartOpen.addEventListener("click", openCart);
}

if (cartClose) {
  cartClose.addEventListener("click", closePanels);
}


/* =========================
   ESCAPE KEY
   ========================= */

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closePanels();

    if (modal && !modal.hidden) {
      closeCustomizer();
    }
  }
});


/* =========================
   SEARCH
   ========================= */

const searchToggle = document.getElementById("search-toggle");

if (searchToggle) {
  searchToggle.addEventListener("click", () => {
    if (!searchBar) return;

    searchBar.hidden = !searchBar.hidden;

    if (!searchBar.hidden && searchInput) {
      searchInput.focus();
    }
  });
}


if (searchInput) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
      renderProducts(currentFilter);
      return;
    }

    const results = products.filter(product => {
      return (
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    });

    renderProductList(results);
  });
}


/* =========================
   PRODUCT RENDERING
   ========================= */

function renderProducts(filter = "all") {
  currentFilter = filter;

  let filteredProducts = [...products];

  if (filter !== "all") {
    filteredProducts = products.filter(product => {
      return (
        product.category === filter ||
        product.collection === filter
      );
    });
  }

  renderProductList(filteredProducts);
}


function renderProductList(list) {
  if (!productGrid) return;

  if (!list.length) {
    productGrid.innerHTML = `
      <div class="empty-products">
        <p>No products found.</p>
        <button class="primary-btn" id="empty-view-all">
          View all products
        </button>
      </div>
    `;

    const emptyButton = document.getElementById("empty-view-all");

    if (emptyButton) {
      emptyButton.addEventListener("click", () => {
        renderProducts("all");
      });
    }

    if (resultCount) {
      resultCount.textContent = "0 products";
    }

    return;
  }

  productGrid.innerHTML = list.map(product => `
    <article class="product-card">

      <div class="product-image">
        <img
          src="${product.image}"
          alt="${escapeHTML(product.name)}"
          loading="lazy"
        >
      </div>

      <div class="product-info">

        <h3>${escapeHTML(product.name)}</h3>

        <p>${escapeHTML(product.description)}</p>

        <div class="product-bottom">

          <strong>
            ${product.price == null
              ? "Price to confirm"
              : "₹" + product.price}
          </strong>

          <button
            class="order-button"
            data-add="${product.id}"
            type="button"
          >
            Customise ↗
          </button>

        </div>

      </div>

    </article>
  `).join("");

  if (resultCount) {
    resultCount.textContent =
      `${list.length} ${list.length === 1 ? "product" : "products"}`;
  }

  productGrid.querySelectorAll("[data-add]").forEach(button => {
    button.addEventListener("click", () => {
      openCustomizer(button.dataset.add);
    });
  });
}


/* =========================
   CATEGORY MENU
   ========================= */

function renderCategoryMenu() {
  if (!categoryMenu) return;

  const categories = [
    "All products",
    "Single Flower",
    "Single Flower Bouquet",
    "Crochet Bouquet",
    "Crochet Flower Pot",
    "Crochet Keychain",
    "Accessories",
    "Gifts"
  ];

  categoryMenu.innerHTML = categories.map(category => `
    <button
      type="button"
      class="category-button"
      data-category="${escapeHTML(category)}"
    >
      ${escapeHTML(category)}
    </button>
  `).join("");

  categoryMenu.querySelectorAll("[data-category]").forEach(button => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;

      closePanels();

      if (category === "All products") {
        updateListingText(
          "Explore our collections",
          "Find a little something to love."
        );

        renderProducts("all");
      } else {
        updateListingText(
          category,
          "Handmade pieces created with love."
        );

        renderProducts(category);
      }

      scrollToShop();
    });
  });
}


/* =========================
   SPECIAL COLLECTIONS
   ========================= */

document.querySelectorAll("[data-special]").forEach(button => {
  button.addEventListener("click", () => {
    const special = button.dataset.special;

    closePanels();

    updateListingText(
      special,
      "A carefully selected collection for you."
    );

    if (special === "Custom Orders") {
      const customOrderButton =
        document.getElementById("custom-order");

      if (customOrderButton) {
        customOrderButton.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }

      return;
    }

    renderProducts(special);
    scrollToShop();
  });
});


/* =========================
   EXPLORE COLLECTION
   ========================= */

const exploreButton = document.getElementById("explore");

if (exploreButton) {
  exploreButton.addEventListener("click", () => {
    closePanels();

    updateListingText(
      "Explore our collections",
      "Find a little something to love."
    );

    renderProducts("all");
    scrollToShop();
  });
}


/* =========================
   VIEW ALL
   ========================= */

const clearFilter = document.getElementById("clear-filter");

if (clearFilter) {
  clearFilter.addEventListener("click", () => {
    updateListingText(
      "Explore our collections",
      "Find a little something to love."
    );

    if (searchInput) {
      searchInput.value = "";
    }

    renderProducts("all");
    scrollToShop();
  });
}


/* =========================
   LISTING TEXT
   ========================= */

function updateListingText(title, subtitle) {
  if (listingTitle) {
    listingTitle.innerHTML = escapeHTML(title);
  }

  if (listingSubtitle) {
    listingSubtitle.textContent = subtitle;
  }
}


/* =========================
   SCROLL TO SHOP
   ========================= */

function scrollToShop() {
  const shop = document.getElementById("shop");

  if (shop) {
    setTimeout(() => {
      shop.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 100);
  }
}


/* =========================
   CUSTOMIZER
   ========================= */

function openCustomizer(id) {
  selectedProduct = products.find(
    product => String(product.id) === String(id)
  );

  if (!selectedProduct || !modal) return;

  const modalTitle = document.getElementById("modal-title");
  const modalDescription =
    document.getElementById("modal-description");
  const colourChoice =
    document.getElementById("colour-choice");
  const itemQuantity =
    document.getElementById("item-quantity");
  const itemNote =
    document.getElementById("item-note");
  const modalPrice =
    document.getElementById("modal-price");

  if (modalTitle) {
    modalTitle.textContent = selectedProduct.name;
  }

  if (modalDescription) {
    modalDescription.textContent =
      selectedProduct.description;
  }

  if (colourChoice) {
    colourChoice.value = "As shown / available";
  }

  if (itemQuantity) {
    itemQuantity.value = 1;
  }

  if (itemNote) {
    itemNote.value = "";
  }

  if (customFields) {
    customFields.innerHTML = "";
  }

  const cat = selectedProduct.category;

  if (cat === "Single Flower") {
    customFields.innerHTML = `
      <label for="stem-length">Stem preference</label>

      <select id="stem-length">
        <option>Standard</option>
        <option>Long stem (confirm availability)</option>
      </select>
    `;
  }


  if (
    cat === "Single Flower Bouquet" ||
    cat === "Crochet Bouquet"
  ) {
    customFields.innerHTML = `
      <label for="flower-count">
        Number of flowers
      </label>

      <select id="flower-count">
        <option value="3">3 flowers</option>
        <option value="5">5 flowers</option>
        <option value="7">7 flowers</option>
        <option value="10">10 flowers</option>
        <option value="Custom">Custom quantity</option>
      </select>

      <label for="wrapping-choice">
        Wrapping
      </label>

      <select id="wrapping-choice">
        <option>Standard wrapping</option>
        <option>
          Premium wrapping (price to confirm)
        </option>
        <option>
          Discuss custom wrapping
        </option>
      </select>

      <label for="bouquet-mix">
        Flower arrangement
      </label>

      <select id="bouquet-mix">
        <option>Same flower</option>
        <option>Mixed flowers</option>
        <option>
          Discuss a custom arrangement
        </option>
      </select>
    `;
  }


  if (cat === "Crochet Flower Pot") {
    customFields.innerHTML = `
      <label for="pot-size">
        Arrangement
      </label>

      <select id="pot-size">
        <option>Single flower</option>
        <option>Double flower</option>
      </select>

      <label for="pot-style">
        Pot colour / style
      </label>

      <input
        id="pot-style"
        placeholder="Preferred colour or style"
      >
    `;
  }


  if (cat === "Crochet Keychain") {
    customFields.innerHTML = `
      <label for="keychain-addon">
        Optional add-on
      </label>

      <select id="keychain-addon">

        <option value="None">
          No add-on
        </option>

        <option value="White crochet flower">
          White crochet flower
          (price to confirm)
        </option>

      </select>
    `;

    const addon =
      document.getElementById("keychain-addon");

    if (
      addon &&
      selectedProduct.name !==
        "Strawberry with White Flower"
    ) {
      const option = addon.querySelectorAll("option")[1];

      if (option) {
        option.disabled =
          !selectedProduct.name
            .toLowerCase()
            .includes("strawberry");
      }
    }
  }


  if (modalPrice) {
    modalPrice.textContent =
      selectedProduct.price == null
        ? "Price to be confirmed"
        : "₹" + selectedProduct.price;
  }

  modal.hidden = false;
}


/* =========================
   CLOSE CUSTOMIZER
   ========================= */

function closeCustomizer() {
  if (!modal) return;

  modal.hidden = true;
  selectedProduct = null;
}


const modalClose =
  document.getElementById("modal-close");

if (modalClose) {
  modalClose.addEventListener(
    "click",
    closeCustomizer
  );
}


if (modal) {
  modal.addEventListener("click", event => {
    if (event.target === modal) {
      closeCustomizer();
    }
  });
}


/* =========================
   ADD CUSTOMISED PRODUCT
   ========================= */

const addCustomised =
  document.getElementById("add-customised");

if (addCustomised) {
  addCustomised.addEventListener("click", () => {

    if (!selectedProduct) return;

    const quantityInput =
      document.getElementById("item-quantity");

    const qty = Number(
      quantityInput ? quantityInput.value : 1
    );

    if (
      !Number.isInteger(qty) ||
      qty < 1 ||
      qty > 20
    ) {
      alert(
        "Please select a quantity between 1 and 20."
      );
      return;
    }


    const colourElement =
      document.getElementById("colour-choice");

    const noteElement =
      document.getElementById("item-note");


    const options = {
      colour: colourElement
        ? colourElement.value
        : "As shown / available",

      quantity: qty,

      note: noteElement
        ? noteElement.value.trim()
        : ""
    };


    const stem =
      document.getElementById("stem-length");

    const flowerCount =
      document.getElementById("flower-count");

    const wrapping =
      document.getElementById("wrapping-choice");

    const mix =
      document.getElementById("bouquet-mix");

    const potSize =
      document.getElementById("pot-size");

    const potStyle =
      document.getElementById("pot-style");

    const addon =
      document.getElementById("keychain-addon");


    if (stem) {
      options.stem = stem.value;
    }

    if (flowerCount) {
      options.flowerCount = flowerCount.value;
    }

    if (wrapping) {
      options.wrapping = wrapping.value;
    }

    if (mix) {
      options.arrangement = mix.value;
    }

    if (potSize) {
      options.potSize = potSize.value;
    }

    if (potStyle) {
      options.potStyle = potStyle.value;
    }

    if (addon) {
      options.addon = addon.value;
    }


    cart.push({
      ...selectedProduct,
      lineId: ++cartLineId,
      qty,
      options
    });


    renderCart();

    closeCustomizer();

    openCart();
  });
}


/* =========================
   CART RENDER
   ========================= */

function renderCart() {

  const cartCount =
    document.getElementById("cart-count");

  const cartItems =
    document.getElementById("cart-items");

  const cartTotal =
    document.getElementById("cart-total");


  const totalQuantity = cart.reduce(
    (sum, product) => sum + product.qty,
    0
  );


  if (cartCount) {
    cartCount.textContent = totalQuantity;
  }


  if (!cartItems) return;


  if (!cart.length) {

    cartItems.innerHTML =
      "<p>Your bag is empty.</p>";

  } else {

    cartItems.innerHTML = cart.map(product => {

      return `
        <div class="cart-item">

          <div>

            <strong>
              ${escapeHTML(product.name)}
            </strong>

            <p>
              Qty: ${product.qty}
              · ${escapeHTML(product.options.colour)}
            </p>

            ${
              product.options.flowerCount
                ? `<p>
                    Flowers:
                    ${escapeHTML(
                      product.options.flowerCount
                    )}
                  </p>`
                : ""
            }

            ${
              product.options.wrapping
                ? `<p>
                    Wrapping:
                    ${escapeHTML(
                      product.options.wrapping
                    )}
                  </p>`
                : ""
            }

            ${
              product.options.arrangement
                ? `<p>
                    Arrangement:
                    ${escapeHTML(
                      product.options.arrangement
                    )}
                  </p>`
                : ""
            }

            ${
              product.options.potSize
                ? `<p>
                    Pot:
                    ${escapeHTML(
                      product.options.potSize
                    )}
                  </p>`
                : ""
            }

            ${
              product.options.potStyle
                ? `<p>
                    Pot style:
                    ${escapeHTML(
                      product.options.potStyle
                    )}
                  </p>`
                : ""
            }

            ${
              product.options.stem
                ? `<p>
                    Stem:
                    ${escapeHTML(
                      product.options.stem
                    )}
                  </p>`
                : ""
            }

            ${
              product.options.addon
                ? `<p>
                    Add-on:
                    ${escapeHTML(
                      product.options.addon
                    )}
                  </p>`
                : ""
            }

            ${
              product.options.note
                ? `<p>
                    Note:
                    ${escapeHTML(
                      product.options.note
                    )}
                  </p>`
                : ""
            }

            <p>
              ${
                product.price == null
                  ? "Price to be confirmed"
                  : "₹" +
                    product.price *
                      product.qty
              }
            </p>

          </div>

          <button
            type="button"
            data-remove="${product.lineId}"
          >
            Remove
          </button>

        </div>
      `;

    }).join("");


    cartItems
      .querySelectorAll("[data-remove]")
      .forEach(button => {

        button.addEventListener("click", () => {

          const lineId =
            Number(button.dataset.remove);

          cart = cart.filter(
            product =>
              product.lineId !== lineId
          );

          renderCart();

        });

      });

  }


  const hasUnknownPrice =
    cart.some(
      product => product.price == null
    );


  const total = cart.reduce(
    (sum, product) =>
      sum +
      (product.price || 0) *
      product.qty,
    0
  );


  if (cartTotal) {

    cartTotal.textContent =
      hasUnknownPrice
        ? "Final price to be confirmed"
        : "₹" + total;

  }
}


/* =========================
   WHATSAPP CHECKOUT
   ========================= */

const checkout =
  document.getElementById("checkout");

if (checkout) {

  checkout.addEventListener("click", () => {

    if (!cart.length) {

      alert("Your bag is empty.");

      return;
    }


    const lines = cart.map(product => {

      const details = [

        `Product: ${product.name}`,

        `Quantity: ${product.qty}`,

        `Colour: ${product.options.colour}`,

        product.options.stem &&
          `Stem: ${product.options.stem}`,

        product.options.flowerCount &&
          `Flower count: ${product.options.flowerCount}`,

        product.options.wrapping &&
          `Wrapping: ${product.options.wrapping}`,

        product.options.arrangement &&
          `Arrangement: ${product.options.arrangement}`,

        product.options.potSize &&
          `Pot: ${product.options.potSize}`,

        product.options.potStyle &&
          `Pot style: ${product.options.potStyle}`,

        product.options.addon &&
          `Add-on: ${product.options.addon}`,

        product.options.note &&
          `Note: ${product.options.note}`,

        `Price: ${
          product.price == null
            ? "To be confirmed"
            : "₹" +
              product.price *
                product.qty
        }`

      ].filter(Boolean);

      return details.join("\n");

    });


    const message =
      `Hello ${BRAND}! I'd like to enquire about this order:\n\n` +
      lines.join("\n\n") +
      "\n\nPlease confirm the final price, availability, delivery charges and payment details.";


    sendWhatsApp(message);

  });

}


/* =========================
   WHATSAPP FUNCTION
   ========================= */

function sendWhatsApp(message) {

  const url =
    `https://wa.me/${whatsappNumber}?text=` +
    encodeURIComponent(message);

  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );
}


/* =========================
   CUSTOM ORDER
   ========================= */

const customOrder =
  document.getElementById("custom-order");

if (customOrder) {

  customOrder.addEventListener("click", () => {

    const message =
      `Hello ${BRAND}! I'd like to request a custom crochet order.\n\n` +
      `I'd like to discuss the colour, flower/bouquet style, quantity and design.`;

    sendWhatsApp(message);

  });

}


/* =========================
   FOOTER INSTAGRAM
   ========================= */

const instagramLink =
  document.getElementById("instagram-link");

if (instagramLink) {
  instagramLink.href = instagramURL;
}


/* =========================
   BRAND LINK
   ========================= */

document.querySelectorAll("#brand").forEach(link => {

  link.addEventListener("click", event => {

    event.preventDefault();

    closePanels();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });

});


/* =========================
   ESCAPE HTML
   ========================= */

function escapeHTML(value) {

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


/* =========================
   INITIALISE WEBSITE
   ========================= */

renderCategoryMenu();

renderProducts("all");

renderCart();

console.log(
  "CROCHET Studio JavaScript loaded successfully."
);