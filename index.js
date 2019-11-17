// multiple node process architecture


const ServiceHub = require('./libs/service-hub');

const sh = new ServiceHub.Hub();
sh.start({
    port: 3000
});