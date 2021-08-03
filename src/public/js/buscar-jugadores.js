//SE CARGAN TODOS LOS JUGADORES AL INICIAR PAGINA
$(document).ready(async function () {
    
    let template = "";

    //PETICION A API
    
    API = `http://localhost:3000/api/v1/players?search=&order=asc&page=1`;
    const req = await fetch(API);
    const reqJugadores = await req.json();

    let jugadores = reqJugadores.Players;
    let totalPaginas = reqJugadores.totalPages;

    //SE CREA PAGINACION EN LA PAGINA

    $('#paginacion').twbsPagination('destroy')

    $('#paginacion').twbsPagination({
        totalPages: totalPaginas,
        visiblePages: 5,
        onPageClick: function (event, page) {
          
            mostrarJugadores("", page);       //AQUI MANEJAMOS LA PAGINATION, MOSTRANDO POR PAGINA

        }
    });


    //AQUI SE MOSTRARAN LOS JUGADORES EN LA TABLA
    jugadores.forEach(jugador => {
        template +=`
        
            <tr scope="row">
                <td><img src="/img/fifa.png" alt=""></td>
                <td>${jugador.nombre}</td>
                <td>${jugador.posicion_abrev}</td>
                <td class="equipo">${jugador.equipo}</td>
                <td class="nombre_full" hidden>${jugador.nombre_full}</td>
                <td class="posicion_full" hidden>${jugador.posicion_full}</td>
                <td class="pais" hidden>${jugador.nacionalidad}</td>
                <td><button type="button" class="btn btn-sm btn-primary detalles" data-toggle="modal" data-target="#jugador-info">Ver</button><td>
            </tr>
        
        `
    });

    $("#jugadores").html(template);


});


//BOTON PARA BUSCAR SEGUN NOMBRE JUGADOR
$(document).on("click", "#ir-buscar", async function(){
    
    const buscador = $("#buscador").val();
    let template ="";
    
    //EN CASO DE NO TENER NINGUN VALOR EL BUSCADOR SE MOSTRAR EL SIGUIENTE MENSAJE EN LA TABLA
    if (buscador == "") {

        $('#paginacion').twbsPagination('destroy');

        template += `
            <tr>
                <td colspan="5">Ingrese el nombre de jugador en el buscador</td>
            </tr>
        `;
        $("#jugadores").html(template);

    } else {

        //AQUI SE HACE LA PETICION A LA API

        API = `http://localhost:3000/api/v1/players?search=${buscador}&order=asc&page=1`;
        const req = await fetch(API);
        const reqJugadores = await req.json();

        let jugadores = reqJugadores.Players;
        let totalPaginas = reqJugadores.totalPages;


        //SE CREA PAGINACION EN LA PAGINA

        $('#paginacion').twbsPagination('destroy')

        $('#paginacion').twbsPagination({
            totalPages: totalPaginas,
            visiblePages: 5,
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
                    <td class="equipo">${jugador.equipo}</td>
                    <td class="nombre_full" hidden>${jugador.nombre_full}</td>
                    <td class="posicion_full" hidden>${jugador.posicion_full}</td>
                    <td class="pais" hidden>${jugador.nacionalidad}</td>
                    <td><button type="button" class="btn btn-sm btn-primary detalles" data-toggle="modal" data-target="#jugador-info">Ver</button><td>
                </tr>
            
            `
        });
        $("#jugadores").html(template);

    }

});

//AQUI SE MOSTRARAN LOS DATOS DEL JUGADOR SELECCIONADO EN EL MODAL
$(document).on("click", ".detalles", function(){
    let nombre = $(this)[0].parentElement.parentElement.getElementsByClassName("nombre_full")[0].innerHTML;
    let posicion = $(this)[0].parentElement.parentElement.getElementsByClassName("posicion_full")[0].innerHTML;
    let pais = $(this)[0].parentElement.parentElement.getElementsByClassName("pais")[0].innerHTML;
    let equipo = $(this)[0].parentElement.parentElement.getElementsByClassName("equipo")[0].innerHTML;


    $("#nombre_p").html(nombre);
    $("#posicion_p").html(posicion);
    $("#pais_p").html(pais);
    $("#equipo_p").html(equipo);
});


//AQUI SE MUESTRAN LOS JUGADORES SEGUN LA PAGINA
async function mostrarJugadores(buscador, pagina){

    let template = "";

    API = `http://localhost:3000/api/v1/players?search=${buscador}&order=asc&page=${pagina}`;
    const req = await fetch(API);
    const reqJugadores = await req.json();

    let jugadores = reqJugadores.Players;

    jugadores.forEach(jugador => {
        template +=`
        
            <tr scope="row">
                <td><img src="/img/fifa.png" alt=""></td>
                <td>${jugador.nombre}</td>
                <td>${jugador.posicion_abrev}</td>
                <td class="equipo">${jugador.equipo}</td>
                <td class="nombre_full" hidden>${jugador.nombre_full}</td>
                <td class="posicion_full" hidden>${jugador.posicion_full}</td>
                <td class="pais" hidden>${jugador.nacionalidad}</td>
                <td><button type="button" class="btn btn-sm btn-primary detalles" data-toggle="modal" data-target="#jugador-info">Ver</button><td>
            </tr>
        
        `
    });
    $("#jugadores").html(template);

    
}