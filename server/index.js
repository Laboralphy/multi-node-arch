const ServiceApp = require('../libs/service-hub/ServiceApp');
const path = require('path');

class Application extends ServiceApp {
    start() {
        super.start({
            hub: {
                port: 3000,
                host: 'localhost'
            },
            port: 8888,
            index: path.resolve(__dirname, '../client/dist/'),
        });

    }

    connection(socket) {
        super.connection(socket);
        // this client will join room u1
        socket.on('cs-chat-message', ({content}) => {
            this.broadcast(socket, 'u1', 'sc-chat-message', {content});
        });
    }
}

module.exports = Application;
