/**
 * Provided by Cesar Valdez Restituyo on 27/04/2017.
 */
'use strict';

let Events = require('http');

let Probe = function(app, logger) {
    var _log = logger || console.info;

    let _probe = function(evt, req) {
        let start_timer = Date.now(); //process.hrtime();

        return (o) => {
            let end_timer = Date.now();
            _log('URL hit [', evt ,']: ', req.originalUrl ,'took ', (end_timer - start_timer), 'ms');
        }
    };

    this.hook = function(req, res, next) {
        res.on('finish', _probe('finish',req));
        res.on('close', _probe('close', req));

        req.on('connect', _probe('connect', req));
        req.on('abort', _probe('abort', req));
        req.on('response', _probe('response', req));


        next();
    }
};

module.exports = Probe;