    var args = require('minimist') (process.argv.slice(2));
    var extend = require('extend');  

    //Store environment variable
    var environment = args.env || "test";
    
    var express = require('express');
    var bodyParser = require('body-parser');
    var path = require('path');
    
    
    var app = express(); 


    var common_conf = {
        name: "pkmmo game server",
        version: "0.0.1",
        environment: environment,
        max_player: 100,
        data_paths: {
            items: __dirname + "\\Game Data\\" + "Items\\",
            maps:  __dirname + "\\Game Data\\" + "Maps\\",
        
        },
        starting_zone: "rm_map_home"
    };

    var conf = {
        production: {
            ip: args.ip || "0.0.0.0",
            port: args.port || 8081,
            database: "mongodb: //127.0.0.1/pkmmo_test"
        },

        test: {
            ip: args.ip || "0.0.0.0",
            port :args.port || 8082,
            database: "mongodb://127.0.0.1/pkmmo_test"
        }
    };

    extend(false, conf.production, common_conf);
    extend(false, conf.test, common_conf);

    module.exports = config = conf[environment];

  

  

