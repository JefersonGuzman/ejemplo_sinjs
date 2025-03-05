import s from 'https://sinjs.com'

// Define el tamaño inicial de la fuente
let size = 20

// Monta el componente en el DOM
export default s.mount(() => [
    s`h1
      bc green
      border-radius:10;
      font-size:${size};
      animation 10s infinite linear{
          from {transform rotate(360deg)}
        }`({
        onclick: () => size += 10 // Incrementa el tamaño de la fuente al hacer clic
    },
        'Bigger') // Texto del elemento
])