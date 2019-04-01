# EOS claimer

Node script for EOS BP to claim their rewards automatically.

change your owner info in config.json.

## add claimer auth

```
cleos -u HTTP_ENDPOINT set account permission YOUR_PRODUCER_NAME claimer '{"threshold":1,"keys":[{"key":"YOUR_CLAIMER_PUBLIC_KEY","weight":1}]}' "active" -p YOUR_PRODUCER_NAME@active 

cleos -u HTTP_ENDPOINT set action permission YOUR_PRODUCER_NAME SYSTEM_CONTRACT claimrewards claimer
```