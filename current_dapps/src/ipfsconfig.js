

const { create } = require('ipfs-http-client')

//localy
// const client = create('http://127.0.0.1:5001');


// infura in prod

const client = create('https://ipfs.infura.io:5001/api/v0');

module.exports={client}