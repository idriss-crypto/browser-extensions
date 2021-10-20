import {AbstractPageManager} from "./abstractPageManager";

export class DefaultPageManager extends AbstractPageManager {
    lastEvent = null;

    init() {
        console.log('aaaa')
        this.document.addEventListener('input', e => this.inputChanged(e.target))
        this.document.addEventListener('change', e => this.inputChanged(e.target))
    }

    inputChanged(input) {
        this.lastEvent = {date: new Date(), input: input, value: input.value}
        setTimeout(() => this.checkInputChanged(), 500)
    }

    async checkInputChanged() {
        if (new Date() - this.lastEvent?.date >= 500 && this.lastEvent?.input.value == this.lastEvent?.value) {
            let data = await this.apiCall(this.lastEvent?.value);
            if (data && Object.values(data.result).length > 0) {
                this.showPopup(this.lastEvent.input, data.result);
            }
        }
    }

    showPopup(input, elements) {
        let div = this.document.createElement('div');
        this.document.body.append(div);
        div.attachShadow({mode: 'open'})
        let rect = input.getBoundingClientRect()
        div.style.position = 'absolute';
        div.style.left = rect.left + 'px';
        div.style.top = rect.top + rect.height + 'px';
        div.style.width = rect.width + 'px';
        div.style.minWidth = '200px';
        div.style.zindex = 1000000;

        for (const elementsKey in elements) {
            console.log(elements[elementsKey])
            let item = document.createElement('div')
            item.append(elementsKey)
            div.shadowRoot.append(item)

        }
    }

    async apiCall(value) {
        let request = await fetch("https://www.idriss-crypto.com/v1/Addresses?InputCombination=" + encodeURIComponent(value));
        return await request.json();
    }
}