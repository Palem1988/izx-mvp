var express = require('express');

var EthereumWallet = require('../lib/ethereum_wallet');
var EthereumConnection = require('../lib/ethereum_connection');
var IzxToken = require('../lib/contracts/izx_token');

var router = express.Router();


router.use(function timeLog(req, res, next) {
    next();
});


router.get('/:hash', function(req, res, next) {

    var hash = req.params.hash;

    var euthereum = new EthereumConnection();

    euthereum.web3.eth.getTransactionReceipt( hash,
            function(error, result){
                euthereum.engine.stop();
                if(error || !result) {
                    res.json({
                        error: String(error)
                    } );
                }else{
                    res.json(result);
                }

            }
    );




});

module.exports = router;
