const express = require('express');
const cors = require('cors');
require('dotenv').config();
const MySQLConnection = require('../database/mysql');

class Server{
    constructor(){
     this.app=express();
     this.port=process.env.MYSQLPORT;
     this.reporteServicioPath='/api/reporte'
     this.middlewares();
     this.routes();
    }

//Metodo que establece las rutas de la API
routes(){
//Creamos la primera peticion
this.app.use(this.reporteServicioPath,require('../routes/reporteTransporte'));
}

//Funciones que tiene el express y que me permite usarlas reutilizando codigo
middlewares(){
    this.app.use(express.static('public'));
    this.app.use(cors());
    //Habilitar el parseo de los datos del body
    this.app.use(express.json());
}

listen(){
    this.app.listen(this.port || 3000, ()=>{ 
         console.log(`El servidor esta corriendo en el puerto: ${this.port}`);
    });
}

mySQLDBConect(){
    MySQLConnection()
}

}
module.exports=Server;

