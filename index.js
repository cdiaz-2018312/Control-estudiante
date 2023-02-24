// importaciones principales
require('dotenv').config();
//importacion de archivos
const Server = require ('./models/server');

//instacia de un server
const servidorIniciado= new Server();

//llamar al metodo listen que levanta el server
servidorIniciado.listen();