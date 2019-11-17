const ServiceApp = require('../libs/service-hub/ServiceApp');
const path = require('path');

class App extends ServiceApp {
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

        console.log(this.getClientRooms(socket));
        socket.on('cs-chat-message', ({content}) => {
            this.broadcast('u1', 'chat-message', {content});
        });
    }
}

const oApplication = new App();
oApplication.start();