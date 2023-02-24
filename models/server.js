//importaciones
const express = require('express');
const cors = require('cors');
const {dbConection} = require('../database/config');

class Server {
    constructor (){
        // config inicial 
        this.app = express();
        this.port = process.env.PORT;
        this.cursoPath= '/api/curso';
        this.usuariosPath = '/api/usuario';
        this.authPath='/api/auth';
        this.usuario_cursoPath='/api/usuario_curso';
        //conectar a base de datos

        this.conectarDB();

        //middlewares
        this.middlewares();
        
        //rutas del api 
        this.routes();

    }
    //conexión
    async conectarDB(){
        await dbConection();
    }

    //middlewares
    middlewares(){
    //cors
    this.app.use(cors());

    //lectura y parseo del body parte json del testeo
    this.app.use(express.json());
    //durectorio publico
    this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.authPath,require('../routes/auth'));
        this.app.use(this.cursoPath,require('../routes/curso'));
        this.app.use(this.usuariosPath, require('../routes/usuario'));
        this.app.use(this.usuario_cursoPath,require('../routes/usuario_curso'));
        
    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log('server escuchando en el puerto', this.port);
        })
    }
}

//exportamos clase server
module.exports= Server;