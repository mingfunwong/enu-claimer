const Eos = require('eosjs');
const config = require('./config.json');

cacheRewards();
//try every 10 min
setInterval(cacheRewards, 10 * 60 * 1000);
//////////////////////////
async function cacheRewards() {

    for (const claimer of config.claimers) {

        const { httpEndPoint, chainId, wif, producerName, permission, keyPrefix, systemContract } = claimer


        const eos = Eos({
            httpEndpoint: httpEndPoint,
            chainId: chainId,
            keyProvider: wif,
            keyPrefix: keyPrefix
        });

        await eos.transaction({
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
}
