import {DefaultPageManager} from "./defaultPageManager";
import {StandalonePageManager} from "./standalonePageManager";

const defaultDomainList = [
    "binance.com",
    "coinbase.com",
    "kucoin.com",
    "ftx.com",
    "kraken.com",
    "bitfinex.com",
    "gate.io",
    "huobi.com",
    "binance.us",
    "bithumb.com",
    "bitstamp.net",
    "ftx.us",
    "bitflyer.com",
    "poloniex.com",
    "gemini.com",
    "coinone.co.kr",
    "bybit.com",
    "bittrex.com",
    "okex.com",
    "liquid.com",
    "coincheck.com",
    "crypto.com",
    "zaif.jp",
    "ascendex.com",
    "tokocrypto.com",
];

export function pageManagerFactory(document, url) {
    console.log('pageManagerFactory')
    if (defaultDomainList.some(x => url.hostname === x || url.hostname.endsWith('.' + x))) {
        return new DefaultPageManager(document)
    }
    if (url.hostname == "gjkikholgenelfadphkdbimailkhkonb") {
        return new StandalonePageManager(document)
    }
}