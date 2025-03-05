import s from 'https://sinjs.com'

// Define el tamaño inicial de la fuente
let size = 20

// Monta el componente en el DOM
export default s.mount(() => [
    s`h1
      border-radius:10;
      font-size:${size};
      animation 5s infinite alternate{
          from {color: red}
          to {color: blue}
        }`({
        onclick: () => size += 10 // Incrementa el tamaño de la fuente al hacer clic
    },
        'Change Color') // Texto del elemento
])