const io = require('socket.io-client');
const Logger = require('../logger');
const c = require('ansi-colors');
const PROTO = require('./protocol');

/**
 * this is a client for the service hub
 */
class HubClient {
    constructor() {
        this._logger = new Logger();
        this._socket = null;
    }

    get logger() {
        return this._logger;
    }

    _connectedToServer(socket) {
        this.logger.log('connected to service hub');
        socket.on('disconnect', () => {
            // the server is disconnected, but it can come back
            // in that case the reconnection will be made automatically
            this.logger.log('disconnected from service hub');
        });
        socket.on('error', err => {
            this.logger.error('service hub has reported an error', err);
        });
    }

    connect({
        host,
        port,
        protocol = 'http',
        broadcast
    }) {
        return new Promise((resolve, reject) => {
            const sConnectionString = protocol + '://' + host + ':' + port;
            this.logger.log('connecting to service hub', sConnectionString);
            const socket = io.connect(sConnectionString);
            this._socket = socket;
            socket.on('connect', () => {
                this._connectedToServer(socket);
                resolve(true);
            });
            socket.on(PROTO.SC_BROADCAST, ({room, type, payload}) => {
                broadcast(room, type, payload);
            });
        });
    }

    broadcast(room, type, payload) {
        this._socket.emit(PROTO.CS_BROADCAST, {room, type, payload});
    }
}

module.exports = HubClient;
