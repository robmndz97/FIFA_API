const express = require('express');
const router = express.Router();
var Request = require("request");
const fetch = require('node-fetch');
const path = require('path');




//RUTA PARA HACER PETICION A API 
router.post('/team', (req, res) => {

    //DATOS REQUEST
    req = {
        "headers": { "content-type": "application/json" },
        "url": "http://localhost:3000/api/v1/team",
        "body": JSON.stringify({
            "Name": req.body.Name,
            "Page": req.body.Page
        })
    };

    // SE HACE REQUEST
    Request.post(req , (error, response, body) => {
        if(error) {
            res.status(500).json({
                success: false,
                msg: "Error"
            })
        }
        res.send(body);
    });


})


//PAGINA DE BUSQUEDA DE JUGADORES POR NOMBRE
router.get('/busqueda_jugadores', async (req, res) => {

    res.setHeader('Content-type', 'text/html');
    res.sendFile('jugadores.html', {
        root: path.join(__dirname, '../views/')
    });
})

//PAGINA BUSCA JUGADORES POR EQUIPO
router.get('/jugadores_equipo', async (req, res) => {

    res.setHeader('Content-type', 'text/html');
    res.sendFile('jugadores-team.html', {
        root: path.join(__dirname, '../views/')
    });
})


module.exports = router;