#!/usr/bin/env node

const http = require('http');
const express = require('express');
const path = require('path');


// ========= CONFIG ============
const port = 10117;
const accessLog = true;


// ===== BEGIN BOILERPLATE =====
const app = express();
const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}

if(accessLog) {
    app.use(function(req, res, next) {
        res.on('finish', () => {
            console.log(req.method, req.path, '->', res.statusCode);
        });
        next();
    });
}

// ======= END BOILERPLATE ========
// start coding here