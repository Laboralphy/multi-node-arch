const {HubClient} = require('./libs/service-hub');

const client = new HubClient();
client.connect({
    host: 'localhost',
    port: 3000,
});

console.log('--------------------');
console.log('--------------------');
console.log('--------------------');
console.log('--------------------');
console.log('--------------------');
setTimeout(() => {
    client.broadcast('t', 'msg', {cool: 'stuff'});
}, 2000);