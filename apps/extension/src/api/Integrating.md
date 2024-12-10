# Using LI.FI in our Backend
## Overview
Wih the introduction to the copilot in our extension we want to allow our users to copy every movement from the wallets they track. This is why we want to integrate the LI.FI SDK into our backend and extension, to enable all cross-chain transactions. The backend endpoint will receive the user intended action info and return the transaction data to be signed/sent by the user in the frontend.

## Resources
[Li.Fi SDK docs](https://docs.li.fi/integrate-li.fi-sdk/li.fi-sdk-overview)

## Integration

### Endpoint
We want to receive the following data from the frontend:
- origin chain
- destination chain
- origin token
- destination token
- and an amount input (probably in $, if not in origin chain token denomination)

Here's an example of the data we want to receive in the body of the request:
```json
{
    "fromAddress": "0x32B2304953a56Be7eb58a5b564Be1b6A5358761A",
    "originChain": 10,
    "destinationChain": 42161,
    "originToken": "0x0000000000000000000000000000000000000000",
    "destinationToken": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    "amount": 10000000000000000
}
```
There are [more parameters](https://docs.li.fi/integrate-li.fi-sdk/request-routes-quotes#other-quote-parameters) that can be added to the SDK request, but these are the ones we need for now.

### LiFi SDK

