// Importar Express
const express = require('express');

// Crear la aplicación de Express
const app = express();

// Configurar una ruta
app.get('/', (req, res) => {
    res.send('¡Hola, mundo desde Express!');
});

// Configurar el puerto
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
