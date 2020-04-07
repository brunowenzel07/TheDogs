const express = require('express');
const connection = require('./database/connection');
const tls = require('tls');
const Betfair = require('betfair-api-node');
const routers = express.Router();


routers.get('/teste', async (request, response) => {
    const { nome } = request.query;
    console.log(nome);

    const result = await connection('t').select('*')
        .where({ track: `${nome}` });

    return response.json(result);
})

routers.get('/listaCorrida', async (req, res) => {
    
    console.log(betfair)
    const test = await betfair.listMarketCatalogue({
        "eventTypeIds": ["7"],
        "marketCountries": ["US"],
        "marketTypeCodes": ["WIN"],
        "marketStartTime": { "from": new Date().toJSON() },
    }, "1", ["RUNNER_DESCRIPTION", "EVENT", "MARKET_START_TIME", "COMPETITION"]
    ).then((response) => {
        return response;
    })
    return res.json(test);

})

routers.get('/testebet', async (req, res) => {

    /*	Socket connection options */

    var options = {
        host: 'stream-api.betfair.com',
        port: 443
    }

    /*	Establish connection to the socket */

    var client = tls.connect(options, function () {
        console.log("Connected");
    });

    client.write('{"op": "authentication", "appKey": "XQzvGbEmSL9JwR7n", "session": "bjxzb6bS6izN8isJbfcZHpnRMiODhPuBrowEVm7zhjE="}\r\n');


    //  client.write('{"op":"orderSubscription","orderFilter":{"includeOverallPosition":false,"customerStrategyRefs":["betstrategy1"],"partitionMatchedByStrategyRef":true},"segmentationEnabled":true}\r\n');

    client.write('{"op":"marketSubscription","id":2,"marketFilter":{"marketIds":["1.170272618"]},"marketDataFilter":{"fields":["EX_BEST_OFFERS_DISP","SP_TRADED","SP_PROJECTED"]}}\r\n');

    // client.write('{"op":"marketSubscription","id":2,"marketFilter":{"eventTypeIds":["4339"],"countryCodes":["AU"]}}\r\n');

    var retortno
    client.on('data', function (data) {
        //  console.log(JSON.parse(data))
        const data1 = JSON.parse(data)
        //console.log(data1['mc'])
        const mc = data1['mc']
        for (i in mc) {
            retortno = JSON.stringify(mc[i].id)
            console.log(retortno)
            const rc = mc[i].rc
            for(r in rc){
                console.log(rc[r])

            }
            //   const rc = i[rc]
        }


    });

    client.on('close', function () {
        console.log('Connection closed');
    });

    client.on('error', function (err) {
        // console.log('Error:" + err)
    });

    return res.json(retortno);
})

module.exports = routers;
