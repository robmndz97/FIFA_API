const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'jugadores',
    user: 'root',
    password: '',
    encoding: 'utf8',
    charset: 'utf8mb4'
})

connection.connect(function(error){
    if(error){
        console.log("ERROR CONEXION CON BASE DE DATOS")
        throw error;
        
        die;
    }else{
        console.log("Conexión a la base de datos exitosa");
    }
})

function cerrarConexion(){
    connection.end();
}

module.exports = connection;