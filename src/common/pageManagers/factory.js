import {DefaultPageManager} from "./defaultPageManager";

const defaultDomainList = ["binance.com", "coinbase.com"];

export function pageManagerFactory(document, url) {
    console.log('aaaa')
    if (defaultDomainList.some(x => x === url.hostname || x.endsWith('.' + url.hostname))) {
        return new DefaultPageManager(document)
    }
    return new DefaultPageManager(document)
}