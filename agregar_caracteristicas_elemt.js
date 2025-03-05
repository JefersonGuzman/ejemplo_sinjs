import s from 'https://sinjs.com'

// Monta el componente en el DOM
s.mount(() => [
    s`h1 
        color tomato`
        ({ onclick: () => alert('hi') }, 'Hello world'), // Encabezado con alerta
    s`button 
        fs 50 
        bc teal`
        ('hello') // Botón con texto
])