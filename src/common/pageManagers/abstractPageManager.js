export class AbstractPageManager {
    static defaultDomainList = ["binance.com", "coinbase.com"];

    constructor(document) {
        this.document = document;
    }

    static async get(document, url) {
        console.log('aaaa')
        if (this.defaultDomainList.some(x => x === url.hostname || x.endsWith('.' + url.hostname))) {
            const {DefaultPageManager} = import("./defaultPageManager")
            return new DefaultPageManager(document)
        }
        const {DefaultPageManager} = import("./defaultPageManager")
        return new DefaultPageManager(document)
    }
}