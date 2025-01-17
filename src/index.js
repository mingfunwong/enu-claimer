require('dotenv').config();
const Eos = require('eosjs');

cacheRewards();
//try every 24 hours
setInterval(cacheRewards, 1 * 60 * 60 * 1000 + 5000);
//////////////////////////
async function cacheRewards() {
  const { httpEndPoint, chainId, wif, producerName, permission, keyPrefix, systemContract } = process.env;

  const eos = Eos({
    httpEndpoint: httpEndPoint,
    chainId: chainId,
    keyProvider: wif,
    keyPrefix: keyPrefix,
  });

  await eos
    .transaction({
      // ...headers,
      actions: [
        {
          account: systemContract,
          name: 'claimrewards',
          authorization: [
            {
              actor: producerName,
              permission: permission,
            },
          ],
          data: {
            owner: producerName,
          },
        },
      ],
    })
    .then(
      res => {
        console.log(res);
      },
      err => {
        console.error(err);
        //retry
        // cacheRewards();
      }
    );
}
