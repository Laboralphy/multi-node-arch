const io = require('socket.io');
const Logger = require('../logger');
const c = require('ansi-colors');
const protocol = require('./protocol');

class Hub {
    constructor() {
        this._io = null;
        this._logger = new Logger();
        this._hubClients = {};
        this._port = 3000;
    }

    get logger() {
        return this._logger;
    }

    /**
     * Each time a clientis connected, this method is called
     * @param socket {Socket}
     * @private
     */
    _hubClientConnected(socket) {
        const clientId = socket.id;
        this.logger.log('client', clientId, c.green('connected'));
        // register client
        this._hubClients[clientId] = socket;

        // when client disconnects
        socket.on('disconnect', () => {
            this.logger.log('client', clientId, c.gray('disconnected'));
            delete this._hubClients[clientId];
        });

        // when client wants to broadcast a message
        socket.on(protocol.CS_BROADCAST, ({room, type, payload}) => {
            for (let id in this._hubClients) {
                const oClient = this._hubClients[id];
                oClient.emit('broadcast', {room, type, payload});
            }
        });
    }

    /**
     * this method stats the service
     */
    start({port}) {
        return new Promise((resolve, reject) => {
            this._port = port;
            const oServerSocket = io.listen(port);
            this._io = oServerSocket;
            this.logger.log('listening on port', port);
            oServerSocket.on('connection', socket => {
                this._hubClientConnected(socket);
                resolve(true);
            });
        });
    }
}

module.exports = Hub;