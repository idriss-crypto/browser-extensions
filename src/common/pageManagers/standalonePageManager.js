import {AbstractPageManager} from "./abstractPageManager";

export class StandalonePageManager extends AbstractPageManager {
    init() {
        this.document.addEventListener('input', async e => {
            const results = this.document.createElement('div')
            results.className = 'results';
            this.document.querySelector('.results').replaceWith(results)
            let data = await this.apiCall(e.target.value);
            if (data?.result && Object.values(data.result).length > 0) {
                this.generatePopupContent(results, data.input, data.result, value => {
                    navigator.clipboard.writeText(value)
                })
            }
        })
    }
}