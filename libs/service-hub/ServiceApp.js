const io = require('socket.io');
const http = require('http');
const express = require('express');
const HubClient = require('./HubClient');
const c = require('ansi-colors');

class ServiceApp {

    constructor() {
        this._clients = {};
        this._hub = new HubClient();
        this._app = null;
        this._wss = null;
    }

    get logger() {
        return this._hub.logger;
    }

    async connectToHub(options) {
        await this._hub.connect({
            host: options.hub.host,
            port: options.hub.port,
            broadcast: (room, type, payload) => this.broadcastReturn(room, type, payload)
        });
    }

    /**
     * send back broadcast
     * @param sender {Socket}
     * @param room
     * @param type
     * @param payload
     */
    broadcastReturn(sender, room, type, payload) {
        const {myself, node, client} = sender;
        let oSocket = myself ? this._clients[client] : this._wss;
        if (!!room) {
            oSocket = oSocket.to(room);
        }
        oSocket.emit(type, payload);
    }

    /**
     * sends an event to the hub
     * @param senderSocket
     * @param room
     * @param type
     * @param payload
     */
    broadcast(senderSocket, room, type, payload) {
        this._hub.broadcast(senderSocket.id, room, type, payload);
    }

    start(options) {
        // connection to hub is asynchronous
        // but we don't mind, the service app must go on
        const oPromCnx = this.connectToHub(options);

        // express webserver startup
        const oApplication = express();
        const oWebServer = http.createServer(oApplication);
        oWebServer.listen(options.port);
        this.logger.log('http service : listening on port', options.port);

        // routes
        oApplication.get('/*', express.static(options.index));

        // websocket init
        const oWebSocketServer = io(oWebServer);
        oWebSocketServer.on('connection', socket => {
            this.connection(socket);
        });
        this._app = oApplication;
        this._wss = oWebSocketServer;
    }

    connection(socket) {
        const clientId = socket.id;
        this.logger.log('web-client', clientId, c.green('connected'));
        this._clients[clientId] = socket;
        socket.on('disconnect', () => {
            this.logger.log('web-client', clientId, c.gray('disconnected'));
            delete this._clients[clientId];
        });
    }

    getClientRooms(socket) {
        return this._wss.sockets.manager.roomClients[socket.id];
    }
}

module.exports = ServiceApp;