import s from 'https://sinjs.com'

// Monta el componente en el DOM
s.mount(() => [
    s`input`(), // Primer campo de entrada
    s(() => {
        let hi = 'yo'
        return () => [...Array(8)].map((x, i) =>
            s`li`('item is', i, hi) // Crea 8 elementos de lista
        )
    }),
    s`input`() // Segundo campo de entrada
])