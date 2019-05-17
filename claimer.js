const Eos = require('eosjs');
const config = require('./config.json');
const httpEndPoint = config.httpEndPoint;
const chainId = config.chainId;
const wif = config.wif;
const producerName = config.producerName;
const permission = config.permission;
const keyPrefix = config.keyPrefix;
const systemContract = config.systemContract;

var eos = Eos({
    httpEndpoint: httpEndPoint,
    chainId: chainId,
    keyProvider: wif,
    keyPrefix: keyPrefix
});


cacheRewards();
//try every 10 min
setInterval(cacheRewards, 10 * 60 * 1000 + 5000);
//////////////////////////
function cacheRewards() {
    eos.transaction({
        // ...headers,
        actions: [
            {
                account: systemContract,
                name: 'claimrewards',
                authorization: [{
                    actor: producerName,
                    permission: permission
                }],
                data: {
                    owner: producerName
                }
            }
        ]
    }).then(res => {
        console.log(res);
    }, err => {
        console.error(err);
        //retry
        // cacheRewards();
    });
}
