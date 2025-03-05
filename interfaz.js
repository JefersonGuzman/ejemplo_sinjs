import s from 'https://sinjs.com'

// Define el tamaño inicial de la fuente
let size = 20

// Define las rutas de las imágenes
const images = {
    bannerHome: 'https://www.semana.com/resizer/v2/DYCNCZXVYNG3RORZV7HPI2GOMI.jpg?auth=b7b75c355866f370a1a0e8b4bd9470ea6a799e5a1693f4d71510909c6986f711&smart=true&quality=75&width=1280&height=720',
    bannerAbout: 'https://www.guiarepsol.com/content/dam/repsol-guia/contenidos-imagenes/viajar/nos-gusta/tiendas-antiguas-del-barrio-de-salamanca-madrid/gr-cms-media-featured_images-aperturra-mantequeria-bf8a36c1-c799-4418-afd8-28b82fe95561-mantequeria_alemana-6-jpg__1020x620_q84.jpg',
    bannerContact: 'https://www.teamcore.net/wp-content/uploads/2024/07/10-consejos-para-la-tienda-ideal.jpg',
    productosDestacados: 'https://www.pensarempresa.com/wp-content/uploads/2020/11/Fiesta-de-Espa%C3%B1a.jpg',
    ofertasEspeciales: 'https://goya.es/storage/productos/w200_h200/2067-frijoles-negros-guisados-1000x1000.png.webp',
    nuevosProductos: 'https://goya.es/storage/categoriaproductos/frutos-secos-goya.webp'
}

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

// Componente de menú
const menu = () => s`nav`(
    s`button`({ onclick: () => navigate('home') }, 'Inicio'),
    s`button`({ onclick: () => navigate('about') }, 'Sobre Nosotros'),
    s`button`({ onclick: () => navigate('contact') }, 'Contáctanos')
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
        s`button`({ id: 'button-1', onclick: () => showCardContent(1) }, 'Productos Destacados'),
        s`button`({ id: 'button-2', onclick: () => showCardContent(2) }, 'Ofertas Especiales'),
        s`button`({ id: 'button-3', onclick: () => showCardContent(3) }, 'Nuevos Productos')
    ),
    s`div.card-content`({ id: 'card-content' })
)

// Función para mostrar el contenido de la tarjeta
const showCardContent = (cardNumber) => {
    const content = document.getElementById('card-content')
    let cardContent = ''
    switch (cardNumber) {
        case 1:
            cardContent = `<img src="${images.productosDestacados}"><p>Descubre nuestros productos más populares, seleccionados por su calidad y precio.</p>`
            break
        case 2:
            cardContent = `<img src="${images.ofertasEspeciales}"><p>Aprovecha nuestras ofertas especiales y ahorra en tus compras diarias.</p>`
            break
        case 3:
            cardContent = `<img src="${images.nuevosProductos}"><p>Explora los nuevos productos que hemos añadido a nuestro catálogo.</p>`
            break
    }
    content.innerHTML = cardContent

    // Resetear el estilo de todos los botones
    document.querySelectorAll('.card-buttons button').forEach(button => {
        button.classList.remove('selected')
    })

    // Aplicar el estilo al botón seleccionado
    document.getElementById(`button-${cardNumber}`).classList.add('selected')
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
    nav {
        display: flex;
        justify-content: space-around;
        background-color: #333;
        padding: 1em;
    }
    nav button {
        color: white;
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1em;
    }
    .banner {
        position: relative;
        text-align: center;
        color: white;
    }
    .banner-img {
        width: 100%;
        height: auto;
        animation: fadeIn 2s;
    }
    .banner-title {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: slideUp 2s;
        background-color:black;
        padding:10px
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
    }
    .card-content img {
        width: 350px;
        height: 350px;
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
`
const styleSheet = document.createElement("style")
styleSheet.type = "text/css"
styleSheet.innerText = styles
document.head.appendChild(styleSheet)