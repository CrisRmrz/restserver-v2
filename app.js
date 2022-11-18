//*Como ordenar las librerias e importaciones
//Primero las que vienen ya en vosual studio como la libreria fs
//const fs = require('fs') Como por ejemplo esta

//Segundo van las de terceros
require('dotenv').config();

//Luego las creadas por mi
const Server = require('./models/server');





const server = new Server();

server.listen();