import s from 'https://sinjs.com'

// Define el tamaño inicial de la fuente
let size = 20

// Define las rutas de las imágenes
const images = {
    bannerHome: 'https://www.semana.com/resizer/v2/DYCNCZXVYNG3RORZV7HPI2GOMI.jpg?auth=b7b75c355866f370a1a0e8b4bd9470ea6a799e5a1693f4d71510909c6986f711&smart=true&quality=75&width=1280&height=720',
    bannerAbout: 'https://www.guiarepsol.com/content/dam/repsol-guia/contenidos-imagenes/viajar/nos-gusta/tiendas-antiguas-del-barrio-de-salamanca-madrid/gr-cms-media-featured_images-aperturra-mantequeria-bf8a36c1-c799-4418-afd8-28b82fe95561-mantequeria_alemana-6-jpg__1020x620_q84.jpg',
    bannerContact: 'https://www.teamcore.net/wp-content/uploads/2024/07/10-consejos-para-la-tienda-ideal.jpg',

}

// Define los productos con precios
let products = {}

// Función para cargar los productos desde el archivo JSON
const loadProducts = async () => {
    try {
        const response = await fetch('src/data/products.json')
        const data = await response.json()
        products = data.products.reduce((acc, product) => {
            acc[product.id] = product
            return acc
        }, {})
        render()
    } catch (error) {
        console.error('Error al cargar los productos:', error)
    }
}

// Inicializa la aplicación cargando los productos
loadProducts()

// Carrito de compras
let cart = []

// Define las rutas y el contenido correspondiente
const routes = {
    home: () => s`div`(
        banner('Bienvenido a Nuestra Tienda', images.bannerHome),
        s`section`(
            s`h2`('Bienvenido a Nuestra Tienda'),
            s`p`('Somos una empresa local dedicada a ofrecer los mejores productos del barrio. Desde alimentos frescos hasta artículos de hogar, tenemos todo lo que necesitas.')
        ),
        carousel(),
        cardsSection()
    ),
    about: () => s`div`(
        banner('Sobre Nosotros', images.bannerAbout),
        s`section`(
            s`h2`('Sobre Nosotros'),
            s`p`('Nuestra tienda fue fundada en 2020 con el objetivo de proporcionar productos de alta calidad a precios accesibles. Nos enorgullece ser parte de esta comunidad y trabajar para mejorar la vida de nuestros vecinos.')
        ),
        carousel(),
        cardsSection()
    ),
    contact: () => s`div`(
        banner('Contáctanos', images.bannerContact),
        s`section`(
            s`h2`('Contáctanos'),
            s`p`('Estamos ubicados en la Calle Principal #123. Puedes llamarnos al (555) 123-4567 o enviarnos un correo a contacto@tiendadelbarrio.com.')
        ),
        carousel(),
        cardsSection()
    )
}

// Estado reactivo para la ruta actual
let currentRoute = 'home'

// Función para cambiar la ruta
const navigate = (route) => {
    currentRoute = route
    render()
}

// Estado para el menú móvil
let isMenuOpen = false

// Función para alternar el menú móvil
const toggleMenu = () => {
    isMenuOpen = !isMenuOpen
    render()
}

// Función para agregar productos al carrito
const addToCart = (productId) => {
    const product = products[productId]
    cart.push(product)
    updateCartIcon()
}

const updateCartIcon = () => {
    const cartIcon = document.querySelector('.cart-icon')
    cartIcon.textContent = `🛒 (${cart.length})`
}

// Función para mostrar el carrito
const showCart = () => {
    const cartContent = cart.map(product => `${product.name} - $${product.price}`).join('\n')
    const total = cart.reduce((sum, product) => sum + product.price, 0)
    alert(`Carrito de Compras:\n${cartContent}\n\nTotal: $${total}`)
}

// Función para enviar el carrito por WhatsApp
const sendCartByWhatsApp = () => {
    const cartContent = cart.map(product => `${product.name} - $${product.price}`).join('%0A')
    const total = cart.reduce((sum, product) => sum + product.price, 0)
    const message = `Carrito de Compras:%0A${cartContent}%0A%0ATotal: $${total}`
    const whatsappUrl = `https://wa.me/573186844157?text=${message}`
    window.open(whatsappUrl, '_blank')
}


// Componente de menú
const menu = () => s`nav`(
    s`div.menu-toggle`({ onclick: toggleMenu }, '☰'),
    s`div.menu-items${isMenuOpen ? '.open' : ''}`(
        s`button`({ onclick: () => navigate('home') }, 'Inicio'),
        s`button`({ onclick: () => navigate('about') }, 'Sobre Nosotros'),
        s`button`({ onclick: () => navigate('contact') }, 'Contáctanos')
    ),
    s`div.cart-icon`({ onclick: showCart }, `🛒 (${cart.length})`)
)

// Componente de banner
const banner = (title, imgSrc) => s`div.banner`(
    s`img`({ src: imgSrc, class: 'banner-img' }),
    s`h1.banner-title`(title)
)

// Componente de carrusel
const carousel = () => s`div.carousel`(
    s`div.carousel-item`('Frutas Frescas'),
    s`div.carousel-item`('Verduras Orgánicas'),
    s`div.carousel-item`('Artículos de Hogar')
)

// Componente de sección de tarjetas
const cardsSection = () => s`div.cards-section`(
    s`div.card-buttons`(
        s`button`({ id: 'button-destacados', onclick: () => showCardContent('destacados') }, 'Productos Destacados'),
        s`button`({ id: 'button-ofertas', onclick: () => showCardContent('ofertas') }, 'Ofertas Especiales'),
        s`button`({ id: 'button-nuevos', onclick: () => showCardContent('nuevos') }, 'Nuevos Productos')
    ),
    s`div.card-content`({ id: 'card-content' })
)

window.addToCart = addToCart


// Función para mostrar el contenido de la tarjeta
const showCardContent = (category) => {
    const content = document.getElementById('card-content')
    const categoryProducts = Object.values(products).filter(product => product.category === category)
    if (categoryProducts.length > 0) {
        content.innerHTML = categoryProducts.map(product => `
            <div class="product">
                <img src="${product.img}" alt="${product.name}">
                <p>${product.name}</p>
                <p>Precio: $${product.price}</p>
                <button onclick="addToCart(${product.id})">Agregar al Carrito</button>
            </div>
        `).join('')
    } else {
        content.innerHTML = `<p>No hay productos en esta categoría</p>`
    }

    // Resetear el estilo de todos los botones
    document.querySelectorAll('.card-buttons button').forEach(button => {
        button.classList.remove('selected')
    })

    // Aplicar el estilo al botón seleccionado
    document.getElementById(`button-${category}`).classList.add('selected')
}

// Función para renderizar el contenido según la ruta actual
const render = () => {
    s.mount(() => [
        menu(),
        routes[currentRoute](),
        footer()
    ], document.getElementById('app'))
}

// Componente de pie de página
const footer = () => s`footer`(
    s`button`({ onclick: sendCartByWhatsApp }, 'Terminar Compra por WhatsApp'),
    s`p`('© 2025 Tienda del Barrio')
)

// Inicializa la aplicación
render()

// Estilos CSS
const styles = `
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
    }
    #app {
        padding-bottom: 60px; /* Espacio para el footer */
    }

    .product {
        border: 1px solid #ccc;
        margin: 1em;
        padding: 2em;
    }
    .product img {
        width: 180px !important;
        height: 180px !important;
        object-fit: cover;
    }
    .product h3{
        font-size: 1.5em;
    }
    .product p {
        margin: 0.5em 0;
    }
    .product button {
        padding: 0.5em 1em;
        background-color: #333;
        color: white;
        border: none;
        cursor: pointer;
    }
    .product button:hover {
        background-color: #555;
    }

    nav {
        display: flex;
        justify-content: space-between;
        background-color: #333;
        padding: 1em;
        align-items: center;
    }
    .menu-toggle {
        display: none;
        font-size: 1.5em;
        color: white;
        cursor: pointer;
    }
    .menu-items {
        display: flex;
        justify-content: space-around;
        flex-grow: 1;
    }
    .menu-items button {
        color: white;
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1em;
    }
    .menu-items.open {
        display: block;
    }
    .cart-icon {
        font-size: 1.5em;
        color: white;
        cursor: pointer;
        background-color: #156109;
        border-radius: 10px;
        padding: 10px;
    }
    .banner {
        position: relative;
        text-align: center;
        color: white;
        height: 300px; /* Altura fija para el banner */
    }
    .banner-img {
        width: 100%;
        height: 100%;
        object-fit: cover; /* Mantener la proporción de la imagen */
        animation: fadeIn 2s;
    }
    .banner-title {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: slideUp 2s;
        background-color: black;
        padding: 10px;
    }
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes slideUp {
        from { transform: translate(-50%, 100%); }
        to { transform: translate(-50%, -50%); }
    }
    .carousel {
        display: flex;
        overflow-x: scroll;
        padding: 1em;
    }
    .carousel-item {
        min-width: 200px;
        margin: 0 1em;
        background-color: #ddd;
        padding: 1em;
        text-align: center;
    }
    .cards-section {
        display: flex;
        padding: 1em;
        padding-bottom: 10%;
    }
    .card-buttons {
        display: flex;
        flex-direction: column;
        margin-right: 1em;
    }
    .card-buttons button {
        margin-bottom: 0.5em;
        padding: 0.5em;
        background-color: #f0f0f0;
        border: 1px solid #ccc;
        cursor: pointer;
    }
    .card-buttons button.selected {
        background-color: #007bff;
        color: white;
    }
    .card-content {
        flex-grow: 1;
        background-color: #f9f9f9;
        padding: 1em;
        text-align: center;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding-bottom: 10%;
    }
    .card-content img {
        width: 100%;
        height: auto;
    }
    .card-content button {
        margin-top: 1em;
        padding: 0.5em 1em;
        background-color: #007bff;
        color: white;
        border: none;
        cursor: pointer;
    }
    footer {
        background-color: #333;
        color: white;
        text-align: center;
        padding: 1em;
        position: fixed;
        width: 100%;
        bottom: 0;
    }
    footer button {
        background-color:rgb(5, 117, 5);
        color: white;
        border-radius: 8px;
        padding: 0.5em 1em;
        cursor: pointer;
    }
    @media (max-width: 768px) {
        .menu-toggle {
            display: block;
        }
        .menu-items {
            display: none;
            flex-direction: column;
            width: 100%;
            background-color: #333;
        }
        .menu-items button {
            padding: 1em;
            text-align: left;
            border-top: 1px solid #444;
        }
        .menu-items.open {
            display: flex;
        }
    }
`
const styleSheet = document.createElement("style")
styleSheet.type = "text/css"
styleSheet.innerText = styles
document.head.appendChild(styleSheet)