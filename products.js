
/* ==========================================
   VINTAGE ERA — PRODUCTS SECTION
========================================== */

(() => {
  "use strict";

  const products = [
    {
      id: 1,
      name: "Victorian Carved Armchair",
      price: 48500,
      era: "victorian",
      type: "seating",
      category: "Antique Seating",
      description: "A characterful armchair with traditional detailing and an elegant silhouette.",
      image: "images/product-1.png"
    },
    {
      id: 2,
      name: "Edwardian Writing Desk",
      price: 36500,
      era: "edwardian",
      type: "tables",
      category: "Writing Furniture",
      description: "A refined desk inspired by Edwardian proportions and practical craftsmanship.",
      image: "images/product-2.png"
    },
    {
      id: 3,
      name: "Art Deco Display Cabinet",
      price: 72000,
      era: "art-deco",
      type: "storage",
      category: "Display & Storage",
      description: "A distinctive cabinet featuring geometric influence and a confident profile.",
      image: "images/product-3.png"
    },
    {
      id: 4,
      name: "Mid-Century Lounge Chair",
      price: 42500,
      era: "mid-century",
      type: "seating",
      category: "Vintage Seating",
      description: "A considered blend of clean lines, inviting form, and understated character.",
      image: "images/product-4.png"
    },
    {
      id: 5,
      name: "Colonial Solid Wood Table",
      price: 58500,
      era: "colonial",
      type: "tables",
      category: "Dining & Occasional",
      description: "A substantial wooden table suited to gatherings and everyday living.",
      image: "images/product-5.png"
    },
    {
      id: 6,
      name: "French Provincial Chest",
      price: 39500,
      era: "french-provincial",
      type: "storage",
      category: "Antique Storage",
      description: "Decorative detailing and graceful proportions give this style its charm.",
      image: "images/product-6.png"
    },
    {
      id: 7,
      name: "Victorian Mahogany Sideboard",
      price: 67500,
      era: "victorian",
      type: "storage",
      category: "Dining Room Furniture",
      description: "A traditional storage piece with rich wood character and a strong presence.",
      image: "images/product-7.png"
    },
    {
      id: 8,
      name: "Edwardian Bedside Table",
      price: 18500,
      era: "edwardian",
      type: "bedroom",
      category: "Bedroom Furniture",
      description: "A versatile bedside piece inspired by classic early twentieth-century design.",
      image: "images/product-8.png"
    },
    {
      id: 9,
      name: "Art Deco Accent Table",
      price: 22500,
      era: "art-deco",
      type: "tables",
      category: "Occasional Tables",
      description: "A compact statement piece with a strong silhouette and decorative appeal.",
      image: "images/product-9.png"
    },
    {
      id: 10,
      name: "Mid-Century Wooden Sideboard",
      price: 54000,
      era: "mid-century",
      type: "storage",
      category: "Vintage Storage",
      description: "Functional storage with simple lines and a timeless furniture profile.",
      image: "images/product-10.png"
    },
    {
      id: 11,
      name: "French Provincial Dressing Table",
      price: 31500,
      era: "french-provincial",
      type: "bedroom",
      category: "Bedroom Furniture",
      description: "An elegant dressing table inspired by the softer forms of French country design.",
      image: "images/product-11.png"
    },
    {
      id: 12,
      name: "Vintage Decorative Mirror",
      price: 12500,
      era: "victorian",
      type: "decor",
      category: "Decorative Accents",
      description: "A decorative accent that adds depth, detail, and vintage character to a room.",
      image: "images/product-12.png"
    }
  ];

  const eraLabels = {
    victorian: "Victorian",
    edwardian: "Edwardian",
    "art-deco": "Art Deco",
    "mid-century": "Mid-Century",
    colonial: "Colonial",
    "french-provincial": "French Provincial"
  };

  const typeLabels = {
    seating: "Seating",
    tables: "Tables",
    storage: "Cabinets & Storage",
    bedroom: "Bedroom",
    decor: "Decorative"
  };

  const grid = document.getElementById("ve-product-grid");
  const resultCount = document.getElementById("ve-results-number");
  const emptyState = document.getElementById("ve-empty-state");
  const resetButton = document.getElementById("ve-reset-filters");
  const emptyResetButton = document.getElementById("ve-empty-reset");

  if (!grid) return;

  const filterButtons = document.querySelectorAll(
    ".ve-filter-btn[data-filter-group][data-filter-value]"
  );

  const categoryButtons = document.querySelectorAll(
    ".ve-category-card[data-category-filter]"
  );

  let selectedEra = "all";
  let selectedType = "all";

  /* Format prices using Indian numbering */
  function formatPrice(price) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(price);
  }

  /* Refresh Lucide icons if the library is available */
  function refreshIcons() {
    if (
      window.lucide &&
      typeof window.lucide.createIcons === "function"
    ) {
      window.lucide.createIcons();
    }
  }

  /* Create a product image with a fallback */
  function createProductImage(product) {
    const imageWrap = document.createElement("div");
    imageWrap.className = "ve-product-image-wrap";

    const image = document.createElement("img");
    image.className = "ve-product-image";
    image.src = product.image;
    image.alt = product.name;
    image.loading = "lazy";

    image.addEventListener("error", () => {
      image.remove();

      const fallback = document.createElement("div");
      fallback.className = "ve-product-image-fallback";

      const icon = document.createElement("i");
      icon.setAttribute("data-lucide", "image-off");
      icon.setAttribute("aria-hidden", "true");

      fallback.appendChild(icon);
      imageWrap.prepend(fallback);

      refreshIcons();
    }, { once: true });

    const eraBadge = document.createElement("span");
    eraBadge.className = "ve-product-era";
    eraBadge.textContent = eraLabels[product.era] || product.era;

    const typeBadge = document.createElement("span");
    typeBadge.className = "ve-product-type";
    typeBadge.textContent = typeLabels[product.type] || product.type;

    imageWrap.append(image, eraBadge, typeBadge);

    return imageWrap;
  }

  /* Create a complete product card */
  function createProductCard(product) {
    const card = document.createElement("article");
    card.className = "ve-product-card";

    const content = document.createElement("div");
    content.className = "ve-product-content";

    const category = document.createElement("p");
    category.className = "ve-product-category";
    category.textContent = product.category;

    const name = document.createElement("h3");
    name.className = "ve-product-name";
    name.textContent = product.name;

    const price = document.createElement("p");
    price.className = "ve-product-price";
    price.textContent = formatPrice(product.price);

    const description = document.createElement("p");
    description.className = "ve-product-description";
    description.textContent = product.description;

    const link = document.createElement("a");
    link.className = "ve-product-link";
    link.href = "contact.html";
    link.setAttribute(
      "aria-label",
      `Enquire about ${product.name}`
    );

    const linkText = document.createElement("span");
    linkText.textContent = "Enquire About This Piece";

    const linkIcon = document.createElement("i");
    linkIcon.setAttribute("data-lucide", "arrow-up-right");
    linkIcon.setAttribute("aria-hidden", "true");

    link.append(linkText, linkIcon);
    content.append(category, name, price, description, link);

    card.append(createProductImage(product), content);

    return card;
  }

  /* Filter by era and furniture type simultaneously */
  function getFilteredProducts() {
    return products.filter((product) => {
      const matchesEra =
        selectedEra === "all" || product.era === selectedEra;

      const matchesType =
        selectedType === "all" || product.type === selectedType;

      return matchesEra && matchesType;
    });
  }

  /* Render filtered products */
  function renderProducts() {
    const filteredProducts = getFilteredProducts();
    const fragment = document.createDocumentFragment();

    filteredProducts.forEach((product) => {
      fragment.appendChild(createProductCard(product));
    });

    grid.replaceChildren(fragment);

    if (resultCount) {
      resultCount.textContent = filteredProducts.length;
    }

    if (emptyState) {
      emptyState.hidden = filteredProducts.length !== 0;
    }

    refreshIcons();
  }

  /* Keep active filter states and accessibility attributes in sync */
  function updateFilterButtons() {
    filterButtons.forEach((button) => {
      const group = button.dataset.filterGroup;
      const value = button.dataset.filterValue;

      const isActive =
        (group === "era" && value === selectedEra) ||
        (group === "type" && value === selectedType);

      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  /* Change a selected filter */
  function setFilter(group, value) {
    if (group === "era") {
      selectedEra = value;
    }

    if (group === "type") {
      selectedType = value;
    }

    updateFilterButtons();
    renderProducts();
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setFilter(
        button.dataset.filterGroup,
        button.dataset.filterValue
      );
    });
  });

  /* Reset both filters */
  function resetFilters() {
    selectedEra = "all";
    selectedType = "all";

    updateFilterButtons();
    renderProducts();
  }

  if (resetButton) {
    resetButton.addEventListener("click", resetFilters);
  }

  if (emptyResetButton) {
    emptyResetButton.addEventListener("click", resetFilters);
  }

  /* Category cards filter the collection below */
  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const type = button.dataset.categoryFilter;

      if (!typeLabels[type]) return;

      selectedEra = "all";
      selectedType = type;

      updateFilterButtons();
      renderProducts();

      const collection = document.getElementById("ve-collection");

      if (collection) {
        collection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  /* Initial render */
  updateFilterButtons();
  renderProducts();
})();
