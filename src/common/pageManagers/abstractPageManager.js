import css from "./popup.scss";

export class AbstractPageManager {

    constructor(document) {
        this.document = document;
    }

    generatePopupContent(div, key, elements, callback) {
        div.attachShadow({mode: 'open'})
        let style = document.createElement('style')
        style.textContent = css.toString();
        div.shadowRoot.append(style);
        for (const elementsKey in elements) {
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
            item.onmousedown = () => callback(elements[elementsKey])
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