import {AbstractPageManager} from "./abstractPageManager";

export class DefaultPageManager extends AbstractPageManager {
    lastEvent = null;

    init() {
        console.log('aaaa')
        this.document.addEventListener('input', e => this.inputChanged(e.target))
        this.document.addEventListener('change', e => this.inputChanged(e.target))
    }

    inputChanged(input) {
        this.lastEvent = {date: new DateTime(), input: input, value: input.value}
        setTimeout(() => this.checkInputChanged(), 500)
    }

    checkInputChanged() {
        if (new Date() - this.lastEvent?.date >= 500 && this.lastEvent?.input.value == this.lastEvent?.value) {
            this.showPopup()
        }
    }

    showPopup(input) {
        let div = this.document.createElement('div');
        this.document.body.append(div);
    }
}