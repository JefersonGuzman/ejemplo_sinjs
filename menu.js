import s from 'https://sinjs.com'

// Define el tamaño inicial de la fuente
let size = 20

// Define las rutas y el contenido correspondiente
const routes = {
    home: () => s`h1`('Home Page'),
    about: () => s`h1`('About Page'),
    contact: () => s`h1`('Contact Page'),
    animation: () => s`h1
      border-radius:10;
      font-size:${size};
      animation 5s infinite alternate{
          from {color: red}
          to {color: blue}
        }`({
        onclick: () => size += 10 // Incrementa el tamaño de la fuente al hacer clic
    }, 'Change Color')
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
    s`button`({ onclick: () => navigate('home') }, 'Home'),
    s`button`({ onclick: () => navigate('about') }, 'About'),
    s`button`({ onclick: () => navigate('contact') }, 'Contact'),
    s`button`({ onclick: () => navigate('animation') }, 'Animation')
)

// Función para renderizar el contenido según la ruta actual
const render = () => {
    s.mount(() => [
        menu(),
        routes[currentRoute]()
    ], document.getElementById('app'))
}

// Inicializa la aplicación
render()