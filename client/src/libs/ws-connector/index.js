class WsConnector {
    constructor() {
        this._socket = null;
    }

    isConnected() {
        return !!this._socket && this._socket.connected;
    }

    get socket() {
        return this._socket;
    }

    connect() {
        return new Promise((resolve, reject) => {
            if (this.isConnected()) {
                resolve(true);
                return;
            }
            const socket = io(window.location.protocol + '//' + window.location.host);
            if (!socket) {
                reject('could not get websocket instance');
            }
            this._socket = socket;
            socket.on('connect', () => {
                resolve(true);
            });

            this.handleServerEvents(socket);
        });
    }

    handleServerEvents(socket) {

    }


}

export default WsConnector;