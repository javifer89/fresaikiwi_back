// crear y poner a escuchar al servidor
const http = require('http');

const app= require('./src/app');

//Configuración de .env
require('dotenv').config();

//Configuración de la BBDD
require('./src/config/db');

//Creación del servidor
const server = http.createServer(app)

//Definimos el puerto del servidor para levantar el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT);

//Listeners
server.on('listening', () => {
console.log(`server listening on ${PORT}`);
});

server.on('error', (error) => {
    console.log(error);
});
