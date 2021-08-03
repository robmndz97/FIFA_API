const express = require('express');
const router = express.Router();

const jugador  = require('../models/jugadores');

//RUTA PARA OBTENER JUGADORES POR EQUIPOS
router.post('/team', (req, res) => {
    const equipo = {
        "equipo": req.body.Name,
        "page": req.body.Page
    };
    const apikey = req.header('x-api-key');

    jugador.getJugadoresEquipo(equipo, (err, data, extras) => {
        if (data){
            res.json(
                {
                    "llave": apikey,
                    "Page": extras.pagina,
                    "totalPages": extras.totalPaginas,
                    "Items": extras.jugadoresPagina,
                    "totalItems": extras.totalJugadores,
                    "Players": data
                });
        }else{
            res.status(500).json({
                success: false,
                msg: "Error"
            })
        }
    })
})

//RUTA PARA OBTENER BUSQUEDA DE JUGADORES
router.get('/players', (req, res) =>{

    const data = {
        "search": req.query.search,
        "order": req.query.order,
        "page": req.query.page
    }
    
    jugador.busquedaJugadores(data, (err, data, extras) => {
        if (data){
            res.json(
                {
                    "Page": extras.pagina,
                    "totalPages": extras.totalPaginas,
                    "Items": extras.jugadoresPagina,
                    "totalItems": extras.totalJugadores,
                    "Players": data
                }
            )
        }else{
            res.status(500).json({
                success: false,
                msg: "Error"
            })
        }
    })
});


module.exports = router;