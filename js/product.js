/* =========================================
   PRODUCT DATABASE
========================================= */

const products = [

    {
        id: 1,

        name: "Mediora Vitamin C",

        category: "supplement",

        categoryName: "Supplements",

        image:
            "images/products/product-01.jpg",

        shortDescription:
            "Vitamin C supplement designed to support daily nutritional needs.",

        description:
            "Mediora Vitamin C is a nutritional supplement designed to complement daily dietary requirements and support general wellness.",

        composition:
            "Vitamin C",

        indication:
            "For nutritional supplementation and daily wellness support.",

        dosage:
            "Use according to the product label or professional advice.",

        packaging:
            "Available in selected retail packaging."

    },


    {
        id: 2,

        name: "Mediora Multivitamin",

        category: "supplement",

        categoryName: "Supplements",

        image:
            "images/products/product-02.jpg",

        shortDescription:
            "Daily multivitamin formula for everyday wellness support.",

        description:
            "Mediora Multivitamin provides a combination of essential vitamins and nutrients designed for everyday nutritional support.",

        composition:
            "Multivitamin formula",

        indication:
            "For daily nutritional supplementation.",

        dosage:
            "Use according to the product label or professional advice.",

        packaging:
            "Available in selected retail packaging."

    },


    {
        id: 3,

        name: "Mediora Healthcare Tablets",

        category: "pharmaceutical",

        categoryName: "Pharmaceutical",

        image:
            "images/products/product-03.jpg",

        shortDescription:
            "Quality pharmaceutical product developed with trusted standards.",

        description:
            "A pharmaceutical product developed and supplied with a focus on quality, consistency and reliable healthcare standards.",

        composition:
            "Please refer to official product information.",

        indication:
            "Please refer to official product information.",

        dosage:
            "Use only according to approved product information and professional advice.",

        packaging:
            "Please refer to official product packaging."

    },


    {
        id: 4,

        name: "Digital Blood Pressure Monitor",

        category: "medical",

        categoryName: "Medical Devices",

        image:
            "images/products/product-04.jpg",

        shortDescription:
            "Digital monitoring device designed for convenient home use.",

        description:
            "A digital blood pressure monitoring device designed to provide convenient blood pressure measurement for home and personal monitoring.",

        composition:
            "Electronic medical device",

        indication:
            "Blood pressure monitoring.",

        dosage:
            "Not applicable.",

        packaging:
            "Device, cuff and accessories."

    }

];


/* =========================================
   PRODUCT CARD
========================================= */

function createProductCard(product) {

    return `

        <article class="product-card">

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    onerror="
                        this.style.display='none';
                        this.parentElement
                        .classList.add('image-error');
                    "
                >

                <span class="product-category">
                    ${product.categoryName}
                </span>

            </div>


            <div class="product-content">

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ${product.shortDescription}
                </p>

                <a
                    href="product-detail.html?id=${product.id}"
                    class="product-link"
                >
                    View Product
                    <span>→</span>
                </a>

            </div>

        </article>

    `;
}


/* =========================================
   RENDER PRODUCTS
========================================= */

function renderProducts(productList) {

    const grid =
        document.getElementById(
            "productsGrid"
        );

    if (!grid) return;


    if (productList.length === 0) {

        grid.innerHTML = `

            <div class="no-products">

                <h3>
                    No products found
                </h3>

                <p>
                    Please try another search
                    or category.
                </p>

            </div>

        `;

        return;
    }


    grid.innerHTML =
        productList
            .map(createProductCard)
            .join("");
}


/* =========================================
   FILTER
========================================= */

function initializeProductFilter() {

    const grid =
        document.getElementById(
            "productsGrid"
        );

    if (!grid) return;


    const search =
        document.getElementById(
            "productSearch"
        );

    const buttons =
        document.querySelectorAll(
            ".category-btn"
        );


    let selectedCategory = "all";


    function filter() {

        const keyword =
            search
                ? search.value
                    .toLowerCase()
                    .trim()
                : "";


        const filtered =
            products.filter(product => {

                const categoryMatch =
                    selectedCategory === "all" ||
                    product.category ===
                    selectedCategory;


                const searchMatch =

                    product.name
                        .toLowerCase()
                        .includes(keyword)

                    ||

                    product.categoryName
                        .toLowerCase()
                        .includes(keyword)

                    ||

                    product.shortDescription
                        .toLowerCase()
                        .includes(keyword);


                return (
                    categoryMatch &&
                    searchMatch
                );

            });


        renderProducts(filtered);
    }


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                buttons.forEach(btn => {

                    btn.classList.remove(
                        "active"
                    );

                });


                button.classList.add(
                    "active"
                );


                selectedCategory =
                    button.dataset.category;


                filter();

            }
        );

    });


    if (search) {

        search.addEventListener(
            "input",
            filter
        );

    }


    filter();
}


/* =========================================
   PRODUCT DETAIL
========================================= */

function initializeProductDetail() {

    const container =
        document.getElementById(
            "productDetail"
        );

    if (!container) return;


    const params =
        new URLSearchParams(
            window.location.search
        );


    const productId =
        Number(
            params.get("id")
        );


    const product =
        products.find(
            item => item.id === productId
        );


    if (!product) {

        container.innerHTML = `

            <div class="product-not-found">

                <h1>
                    Product Not Found
                </h1>

                <p>
                    The requested product
                    could not be found.
                </p>

                <a
                    href="products.html"
                    class="btn btn-primary"
                >
                    Back to Products
                </a>

            </div>

        `;

        return;
    }


    document.title =
        `${product.name} | Mediora Pharma`;


    container.innerHTML = `

        <div class="product-detail-grid">


            <!-- IMAGE -->

            <div class="product-detail-image">

                <div class="detail-image-wrapper">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        onerror="
                            this.style.display='none';
                            this.parentElement
                            .classList.add('image-error');
                        "
                    >

                </div>

            </div>


            <!-- CONTENT -->

            <div class="product-detail-content">

                <span class="section-label">
                    ${product.categoryName}
                </span>


                <h1>
                    ${product.name}
                </h1>


                <p class="product-lead">
                    ${product.shortDescription}
                </p>


                <div class="product-info-list">


                    <div class="product-info-item">

                        <span>
                            Composition
                        </span>

                        <strong>
                            ${product.composition}
                        </strong>

                    </div>


                    <div class="product-info-item">

                        <span>
                            Indication
                        </span>

                        <strong>
                            ${product.indication}
                        </strong>

                    </div>


                    <div class="product-info-item">

                        <span>
                            Dosage
                        </span>

                        <strong>
                            ${product.dosage}
                        </strong>

                    </div>


                    <div class="product-info-item">

                        <span>
                            Packaging
                        </span>

                        <strong>
                            ${product.packaging}
                        </strong>

                    </div>

                </div>


                <div class="product-description">

                    <h2>
                        Product Information
                    </h2>

                    <p>
                        ${product.description}
                    </p>

                </div>


                <div class="product-actions">

                    <a
                        href="products.html"
                        class="btn btn-outline"
                    >
                        ← Back to Products
                    </a>

                    <a
                        href="index.html#contact"
                        class="btn btn-primary"
                    >
                        Contact Us
                    </a>

                </div>

            </div>

        </div>

    `;


    renderRelatedProducts(
        product
    );
}


/* =========================================
   RELATED PRODUCTS
========================================= */

function renderRelatedProducts(currentProduct) {

    const container =
        document.getElementById(
            "relatedProducts"
        );

    if (!container) return;


    const related =
        products
            .filter(
                product =>
                    product.id !==
                    currentProduct.id
            )
            .slice(0, 3);


    container.innerHTML =
        related
            .map(createProductCard)
            .join("");
}


/* =========================================
   INITIALIZE
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeProductFilter();

        initializeProductDetail();

    }
);

{
    id: 5,

    name; "New Product Name",

    category; "pharmaceutical",

    categoryName; "Pharmaceutical",

    image;
        "images/products/product-05.jpg",

    shortDescription;
        "Short product description.",

    description;
        "Full product description.",

    composition;
        "Active ingredients.",

    indication;
        "Product indication.",

    dosage;
        "Dosage information.",

    packaging;
        "Packaging information."
}
