const express = require('express');
const connection = require('./database/connection');


const routers = express.Router();
routers.get('/teste', async (request , response) =>{

    const {nome} = request.query;
    console.log(nome)
    
     const result = await connection('t').select('*')
                                        .where({track : `${nome}`});

    return response.json(result);
});

module.exports = routers;