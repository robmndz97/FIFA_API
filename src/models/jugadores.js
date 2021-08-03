const { json } = require('body-parser');
const connection = require('../../config/connectiondb');

let jugadorModel = {};

CANTIDAD_JUGADORES_PAGINA = 10;


//OBTIENE LOS JUGADORES SEGÚN EQUIPO
jugadorModel.getJugadoresEquipo = async function (equipo, callback) {

    if(connection){
        
        //PRIMERA PETICION A LA BD PARA SABER LA CANTIDAD DE JUGADORES
        connection.query(`SELECT COUNT(*) as numero FROM datos_jugador WHERE equipo = "${equipo.equipo}";`, function(err, rows){

            if(err){

                throw err;

            }else{

                //EN CASO DE NO HABER INGRESADO NUMERO DE PAGINA O DE NO SER ESTE UN ENTERO LE DAREMOS EL VALOR DE 1
                if( equipo.page== null || equipo.page <= 0 || /^\s+$/.test(equipo.page) || !Number.isInteger(equipo.page)) {
                    equipo.page = 1;
                }

                var cantidadJugadores = rows[0].numero;                                         //OBTENEMOS EL NUMERO DE JUGADORES QUE TIENE ESE EQUIPO
                var numeroPaginas = Math.ceil(cantidadJugadores/CANTIDAD_JUGADORES_PAGINA);     //OBTENEMOS EL NUMERO DE PAGINAS TOTALES QUE TENDRA
                var offset = (equipo.page-1)*CANTIDAD_JUGADORES_PAGINA;                         //OBTENEMOS OFFSET PARA LA CONSULTA

                //HACEMOS LA PETICION A LA BD PARA OBTENER JUGADORES
                connection.query(`SELECT nombre, nombre_full, posicion_abrev, posicion_full, nacionalidad FROM datos_jugador WHERE equipo = "${equipo.equipo}" LIMIT ${CANTIDAD_JUGADORES_PAGINA} OFFSET ${offset};`, function(err, rows){
                    
                    if(err){

                        throw err;

                    }else{

                        //OBJETO CON LOS DATOS EXTRA QUE SE PIDEN EN LA API
                        const datos = {
                            "totalJugadores": cantidadJugadores,
                            "totalPaginas": numeroPaginas,
                            "jugadoresPagina": rows.length,
                            "pagina": equipo.page
                        }

                        callback(null, rows, datos);
                    }
                })
            }
        })

        
        

    }
}

//OBTIENE A LOS JUGADORES ENCONTRADOS SEGUN BUSQUEDA
jugadorModel.busquedaJugadores = async function (datos, callback){

    if (connection){

        var buscador = datos.search;
        var order = datos.order;
        var pagina = parseInt(datos.page);

        //PRIMERA PETICION A LA BD PARA SABER LA CANTIDAD DE JUGADORES
        connection.query(`SELECT COUNT(*) as numero FROM datos_jugador WHERE nombre LIKE "${buscador}%";`, function(err, rows){

            if(err){

                throw err;

            }else{

                

                //EN CASO DE NO HABER INGRESADO NUMERO DE PAGINA O DE NO SER ESTE UN ENTERO LE DAREMOS EL VALOR DE 1
                if( pagina == null || pagina <= 0 || /^\s+$/.test(pagina) || !Number.isInteger(pagina)) {
                    pagina = 1;
                };

                //SI ORDER VIENE VACIÓ SE LE ASIGNA ASC Y TAMBIEN SI ES DIFERENTE DE ASC O DESC
                if( order== null || order == 0 || /^\s+$/.test(order) || (order !== "asc" && order!=="desc")) {
                    order = "asc";
                };


                var cantidadJugadores = rows[0].numero;                                         //OBTENEMOS EL NUMERO DE JUGADORES QUE TIENE ESE EQUIPO
                var numeroPaginas = Math.ceil(cantidadJugadores/CANTIDAD_JUGADORES_PAGINA);     //OBTENEMOS EL NUMERO DE PAGINAS TOTALES QUE TENDRA
                var offset = (pagina-1)*CANTIDAD_JUGADORES_PAGINA;                         //OBTENEMOS OFFSET PARA LA CONSULTA

                //HACEMOS LA PETICION A LA BD PARA OBTENER JUGADORES
                connection.query(`SELECT nombre, nombre_full, posicion_abrev, posicion_full, nacionalidad, equipo FROM datos_jugador WHERE nombre LIKE "${buscador}%" ORDER BY nombre ${order} LIMIT ${CANTIDAD_JUGADORES_PAGINA} OFFSET ${offset};`, function(err, rows){

                    if(err){

                        throw err;

                    }else{

                        //OBJETO CON LOS DATOS EXTRA QUE SE PIDEN EN LA API
                        const datos = {
                            "totalJugadores": cantidadJugadores,
                            "totalPaginas": numeroPaginas,
                            "jugadoresPagina": rows.length,
                            "pagina": pagina
                        }

                        callback(null, rows, datos);
                    }

                })

            }

        });

        

    }
}



module.exports = jugadorModel;