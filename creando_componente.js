import s from 'https://sinjs.com'

// Define el componente de botón
const button = s(({ count = 0 }, [title]) => () =>
    s`button
    fs 50
    bc teal
    `({
        onclick: () => count++ // Incrementa el contador al hacer clic
    }, title, count) // Muestra el título y el contador
)

// Monta el componente en el DOM
s.mount(() => [
    s`h1 
        color tomato`
        ({ onclick: () => alert('hi') }, 'Hello world'), // Encabezado con alerta
    button` bc blue `('primario'), // Botón primario
    button` bc red `('secundario'), // Botón secundario
])