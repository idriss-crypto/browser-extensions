import {AbstractPageManager} from "./abstractPageManager";
import css from "!css-loader!sass-loader!./popup.scss";

export class DefaultPageManager extends AbstractPageManager {
    lastEvent = null;

    init() {
        console.log('aaaa')
        this.document.addEventListener('input', e => this.inputChanged(e.target))
        this.document.addEventListener('change', e => this.inputChanged(e.target))
    }

    inputChanged(input) {
        this.lastPopup?.remove();
        this.lastEvent = {date: new Date(), input: input, value: input.value}
        setTimeout(() => this.checkInputChanged(), 500)
    }

    async checkInputChanged() {
        if (new Date() - this.lastEvent?.date >= 500 && this.lastEvent?.input.value == this.lastEvent?.value && this.lastEvent?.value.length >= 3) {
            let event = this.lastEvent;
            let data = await this.apiCall(this.lastEvent?.value);
            if (data && Object.values(data.result).length > 0 && event == this.lastEvent) {
                this.showPopup(this.lastEvent.input, this.lastEvent.value, data.result);
            }
        }
    }

    showPopup(input, key, elements) {
        this.lastPopup?.remove();
        let div = this.document.createElement('div');
        this.lastPopup = div;
        this.document.body.append(div);
        div.attachShadow({mode: 'open'})
        let style = document.createElement('style')
        style.textContent = css.toString();
        div.shadowRoot.append(style)
        let rect = input.getBoundingClientRect()
        div.style.position = 'absolute';
        div.style.left = rect.left + 'px';
        div.style.top = rect.top + rect.height + 'px';
        div.style.width = rect.width + 'px';
        div.style.minWidth = '400px';
        div.style.zindex = 1000000;

        for (const elementsKey in elements) {
            console.log(elements[elementsKey])
            let item = document.createElement('div')
            let typeElement = document.createElement('div')
            typeElement.className = 'type'
            typeElement.textContent = elementsKey;
            item.append(typeElement)
            let keyElement = document.createElement('div')
            keyElement.className = 'key'
            keyElement.textContent = key;
            item.append(keyElement)
            let valueElement = document.createElement('div')
            valueElement.className = 'value'
            valueElement.textContent = elements[elementsKey];
            item.append(valueElement)
            div.shadowRoot.append(item)
        }
    }

    apiCall(value) {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage({type: "apiAddressesRequest", value}, response => {
                console.log(response);
                resolve(response);
            });
        });
    }
}