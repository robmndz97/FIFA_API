const fetch = require('node-fetch');
const connection = require('./config/connectiondb');

API = `https://www.easports.com/fifa/ultimate-team/api/fut/item`;

async function extraerDatos () {


    console.log("Extrayendo datos dataset API...");

    //HACEMOS PRIMERA PETICIÓN A API PARA OBTENER NUMERO TOTAL DE PAGINAS
    const res = await fetch(API);
    const APIRes = await res.json();

    const numeroPaginas = APIRes.totalPages;    //ALMACENAMOS NUMERO TOTAL DE PAGINAS EN VARIABLE
    let contador = 0;                             //CONTADOR DE ELEMENTOS EXTRAÍDOS DE API


    //COMENZAMOS A ITERAR EN CADA UNA DE LAS PAGINAS DE API PARA EXTRAER TODOS LOS DATOS
    for (let i = 1; i < numeroPaginas+1; i++) {
        
        let APIPage = `https://www.easports.com/fifa/ultimate-team/api/fut/item?page=${i}`;     //LINK DE API CON EL NUMERO DE PAGINA

        let resPage = await fetch(APIPage);                                                     
        let pageRes = await resPage.json();

        console.log("Extrayendo pagina "+ i +" de "+ numeroPaginas + "..");

        let jugadoresPage = pageRes.items;          //OBTENEMOS LOS JUGADORES DE ITEMS

        let datosJugador = [];                      
        let jugadoresPagina = [];

        //AQUÍ SE OBTENDRÁ LA INFORMACIÓN DE LOS JUGADORES DE LA PAGINA i
        jugadoresPage.forEach(jugador => {

            datosJugador = [jugador.name, jugador.firstName+" "+jugador.lastName, jugador.position, jugador.positionFull, jugador.nation.name, jugador.club.name];
            jugadoresPagina.push(datosJugador);

            contador++;
            
        });


        var query = "INSERT INTO datos_jugador (nombre, nombre_full, posicion_abrev, posicion_full, nacionalidad, equipo) VALUES ?;";

        //SE ALMACENAN TODOS LOS JUGADORES EN LA PAGINA i
        connection.query(query, [jugadoresPagina], function(err){
            if (err){
                console.log("ERROR AL INSERTAR DATOS")
            }else{
                console.log("Datos insertados en la base de datos");
            }
        })

        
        
    }

    console.log("");
    console.log(contador + " datos extraídos y almacenados en la base de datos.");
    process.exit();

    

};

extraerDatos();

