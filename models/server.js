const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        // Conexion a la base de datos
        this.conectarDB();

        // Middlewares: Los middlewares son funciones que añaden otra funcionalidad a mi webserver. 
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();



    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares() {

        // CORS: El cors nos permite proteger nuestro servidor de una manera superficial. En algunos buscadores como firefox, si no tengo el CORS me pueden salir errores
        this.app.use(cors()); // Y se pone aqui porque el CORS es un middleware

        //** lectura y parseo del body: OJO, SIN ESTO NO PODRIA RECIBIR NI MANUPULAR LAS COSAS DEL BODY DEL POSTMAN, O EL REQ EN LOS CONTROLLERS
        this.app.use( express.json() );

        // Directorio publico
        this.app.use(express.static('public')) //Esto abre mi html que hice en mi parpeta public y la corre en mi localhost

    }

    routes() {
        
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuarios')); //Asi es como tiene que empezar la ruta cuando hacemos peticiones en postman y en los navegadores por ejemplo localhost:8080/api/usuarios

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto: ' + this.port);
        });
    }

}

module.exports = Server;