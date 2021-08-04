
//BOTON PARA BUSCAR SEGUN NOMBRE JUGADOR
$(document).on("click", "#ir-buscar", async function(){
    
    const buscador = $("#buscador").val();
    $("#equipo_busqueda").html(buscador);


    let template ="";
    
    //EN CASO DE NO TENER NINGUN VALOR EL BUSCADOR SE MOSTRAR EL SIGUIENTE MENSAJE EN LA TABLA
    if (buscador == "") {
        $('#paginacion').twbsPagination('destroy');

        template += `
            <tr>
                <td colspan="5">Ingrese el nombre del equipo en el buscador</td>
            </tr>
        `;
        $("#jugadores").html(template);
    } else {


        //AQUI SE HACE LA PETICION A LA API

        const reqAPI =  {
            method: 'POST', 
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({Name: buscador, Page: 1})
        }
        
        const req = await fetch("team", reqAPI);
        const reqJugadores = await req.json();

        
        let jugadores = reqJugadores.Players;
        let totalPaginas = reqJugadores.totalPages;


        //EN CASO DE QUE NO EXISTA EL EQUIPO MUESTRA EL SIGUIENTE MENSAJE
        if( jugadores.length <= 0){

            $('#paginacion').twbsPagination('destroy');

            template += `
            <tr>
                <td colspan="5">El equipo ingresado no existe</td>
            </tr>
            `;

            $("#jugadores").html(template);
            
        } else {

             //SE CREA PAGINACION EN LA PAGINA

            $('#paginacion').twbsPagination('destroy');

            $('#paginacion').twbsPagination({
                totalPages: totalPaginas,
                visiblePages: 5,
                prev: 'Prev',
                onPageClick: function (event, page) {
                
                    mostrarJugadores(buscador, page);       //AQUI MANEJAMOS LA PAGINATION, MOSTRANDO POR PAGINA

                }
            });


            //AQUI SE MOSTRARAN LOS JUGADORES EN LA TABLA
            jugadores.forEach(jugador => {
                template +=`
                
                    <tr scope="row">
                        <td><img src="/img/fifa.png" alt=""></td>
                        <td>${jugador.nombre}</td>
                        <td>${jugador.posicion_abrev}</td>
                        <td class="equipo" hidden>${jugador.equipo}</td>
                        <td class="nombre_full" hidden>${jugador.nombre_full}</td>
                        <td class="posicion_full" hidden>${jugador.posicion_full}</td>
                        <td class="pais">${jugador.nacionalidad}</td>
                        <td><button type="button" class="btn btn-sm btn-primary detalles" data-toggle="modal" data-target="#jugador-info">Ver</button><td>
                    </tr>
                
                `
            });
            $("#jugadores").html(template);
            
        }


       

    }

});

//AQUI SE MOSTRARAN LOS DATOS DEL JUGADOR SELECCIONADO EN EL MODAL
$(document).on("click", ".detalles", function(){
    let nombre = $(this)[0].parentElement.parentElement.getElementsByClassName("nombre_full")[0].innerHTML;
    let posicion = $(this)[0].parentElement.parentElement.getElementsByClassName("posicion_full")[0].innerHTML;
    let pais = $(this)[0].parentElement.parentElement.getElementsByClassName("pais")[0].innerHTML;


    $("#nombre_p").html(nombre);
    $("#posicion_p").html(posicion);
    $("#pais_p").html(pais);
});


//AQUI SE MUESTRAN LOS JUGADORES SEGUN LA PAGINA
async function mostrarJugadores(buscador, pagina){

    let template = "";

    const reqAPI =  {
        method: 'POST', 
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({Name: buscador, Page: pagina})
    }
    
    const req = await fetch("team", reqAPI);
    const reqJugadores = await req.json();

    let jugadores = reqJugadores.Players;


    //AQUI SE MOSTRARAN LOS JUGADORES EN LA TABLA
    jugadores.forEach(jugador => {
        template +=`
        
            <tr scope="row">
                <td><img src="/img/fifa.png" alt=""></td>
                <td>${jugador.nombre}</td>
                <td>${jugador.posicion_abrev}</td>
                <td class="nombre_full" hidden>${jugador.nombre_full}</td>
                <td class="posicion_full" hidden>${jugador.posicion_full}</td>
                <td class="pais">${jugador.nacionalidad}</td>
                <td><button type="button" class="btn btn-sm btn-primary detalles" data-toggle="modal" data-target="#jugador-info">Ver</button><td>
            </tr>
        
        `;
    });
    $("#jugadores").html(template);

    
}