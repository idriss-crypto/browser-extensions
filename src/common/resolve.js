// load the smart contract the same way you did in the library
import {RequestLimiter} from "./RequestLimiter";

globalThis.window = globalThis;
const Web3 = require("web3/dist/web3.min.js");
const requestLimiter = new RequestLimiter([{amount: 40, time: 1000}]);
var walletTags = {
    evm: {
        ETH: {

            "Tally ETH": "f368de8673a59b860b71f54c7ba8ab17f0b9648ad014797e5f8d8fa9f7f1d11a",
            "Trust ETH": "",
            "Public ETH": "",
        },
        BNB: {
            "Metamask BNB": "",
            "Essentials BNB": "",
        },
        USDT: {
            "Metamask USDT": "",
            "Binance USDT": "",
            "Coinbase USDT": "",
            "Exchange USDT": "",
            "Private USDT": "",
            "Essentials USDT": "",
        },
        USDC: {
            "Metamask USDC": "",
            "Binance USDC": "",
            "Coinbase USDC": "",
            "Exchange USDC": "",
            "Private USDC": "",
            "Essentials USDC": "",
        },
        ELA: {
            "Essentials ELA SC": "",
        },
        TLOS: {
            "Essentials TLOS": "",
        },
        MATIC: {
            "Essentials MATIC": "",
        },
        LINK: {
            "Essentials LINK": "",
        },
        HT: {
            "Essentials HT": "",
        },
        FSN: {
            "Essentials FSN": "",
        },
        FTM: {
            "Essentials FTM": "",
        },
        AVAX: {
            "Essentials AVAX": "",
        },
        BTC: {
            "Essentials BTC": "",
        },
        ERC20: {
            ERC20: "",
        },
    },
    btc: {
        BTC: {
            "Binance BTC": "",
            "Coinbase BTC": "",
            "Exchange BTC": "",
            "Private BTC": "",
        },
        ELA: {
            "Essentials ELA": "",
        },
    },
    sol: {
        SOL: {
            "Solana SOL": "",
            "Coinbase SOL": "",
            "Trust SOL": "",
            "Binance SOL": "",
            "Phantom SOL": "",
        },
    },
};

const regPh = /^(\+\(?\d{1,4}\s?)\)?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/;
const regM = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
const regT = /^@[^\s]+/;

function lowerFirst(string_) {
    return string_.charAt(0).toLowerCase() + string_.slice(1);
}

function convertPhone(string_) {
    // allow for letters because secret word can follow phone number
    return string_.replace(/[^\da-zA-Z]/, "")
}

async function digestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    return hashHex;
}

const web3 = new Web3(new Web3.providers.HttpProvider("https://rpc-mumbai.maticvigil.com"))
const contract = generateContract();

function generateContract() {
    return new web3.eth.Contract(
        [
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "adminAddress",
                        "type": "address"
                    }
                ],
                "name": "addAdmin",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "hashPub",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "hashID",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "address_",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "ownerAddress",
                        "type": "address"
                    }
                ],
                "name": "addIDriss",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "hashPub",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "hashID",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "address_",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "token",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "ownerAddress",
                        "type": "address"
                    }
                ],
                "name": "addIDrissToken",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "hashPub",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "changeOwner",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "adminAddress",
                        "type": "address"
                    }
                ],
                "name": "deleteAdmin",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "hashPub",
                        "type": "string"
                    }
                ],
                "name": "deleteIDriss",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "newPrice",
                        "type": "uint256"
                    }
                ],
                "name": "setPrice",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "Increment",
                "type": "event"
            },
            {
                "inputs": [],
                "name": "withdrawl",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "tokenContract",
                        "type": "address"
                    }
                ],
                "name": "withdrawTokens",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "countAdding",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "countDeleting",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "creationTime",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "hashPub",
                        "type": "string"
                    }
                ],
                "name": "getIDriss",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "name": "IDrissOwners",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "mapKeys",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "name": "payDates",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "price",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ]
        , '0x4a85839aEc7ab18496C35115002EB53BE604b24E');
}

export async function resolveLowPriority(identifier, coin = "", network = "") {
    return await requestLimiter.schedule(() => simpleResolve(identifier, coin, network))
}

// call this function also for twitter plugin functionality?
export async function simpleResolve(identifier, coin = "", network = "") {
    let twitterID;
    let identifierT;
    identifier = lowerFirst(identifier).replace(" ", "");
    if (identifier.match(regPh)) {
        identifier = convertPhone(identifier)
    } else if (!identifier.match(regM) && !identifier.match(regT)) {
        throw new Error("Not a valid input. Input must start with valid phone number, email or @twitter handle.")
    }
    if (identifier.match(regT)) {
        // make API call to get twitter id
        identifierT = identifier;
        // endpoint: /v1/getTwitterID, method:GET
        identifier = 123 //api call here or custom twitter lookup, try catch block if twitter handle not found return error "Twitter handle not found"
    }

    let foundMatchesPromises = {}
    for (let [network_, coins] of Object.entries(walletTags)) {
        if (network && network_ != network) continue;
        for (let [coin_, tags] of Object.entries(coins)) {
            if (coin && coin_ != coin) continue;
            for (let [tag_, tag_key] of Object.entries(tags)) {
                foundMatchesPromises[tag_] = digestMessage(identifier.concat(tag_key)).then(digested => contract.methods.getIDriss(digested).call());
            }
        }
    }
    ///awaiting on the end for better performance
    let foundMatches = {}
    for (let [tag_, promise] of Object.entries(foundMatchesPromises)) {
        try {
            let address = await promise;
            if (address) {
                foundMatches[tag_] = address;
            }
        } catch (e) {
            console.warn(e);
        }
    }

    // return twitter id when twitter id was searched for
    if (twitterID) {
        return {"input": identifierT, "result": foundMatches, "twitterID": identifier}
    } else {
        return {"input": identifier, "result": foundMatches}
    }
    // catch block if coin/network (combination) is invalid/not found
}