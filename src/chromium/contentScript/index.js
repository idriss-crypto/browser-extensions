import {AbstractPageManager} from "../../common/pageManagers/abstractPageManager";

console.log("plugin", chrome, chrome.runtime);
console.log(AbstractPageManager.get(document, document.URL))
AbstractPageManager.get(document, document.URL).then(pm => pm?.init())