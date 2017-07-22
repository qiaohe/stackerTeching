var net = require("net");
var config = require('../config');
var socket = {};
module.exports = {
    start: function () {
        net.createServer(function (sock) {
            console.log('client connected, address -  ', sock.remoteAddress, ' port - ', sock.remotePort);
            socket = sock
            sock.setEncoding('utf8');
            sock.on('data', function (data) {
                console.log('got data from client - ', data);
                sock.write('welcome');
            });

            sock.on('end', function () {
                console.log('client disconnected');
            });

            sock.on('error', function (err) {
                console.log('socket error - ', err);
            });
        }).listen(config.socketServer.port, config.socketServer.host, function () {
            console.log('echo server bound at port' + config.socketServer.host);
        });
    },
    stop: function () {
        server.stop();
    },
    send: function (command) {
        socket.setEncoding('utf8');
        socket.write(command);
    }
}


