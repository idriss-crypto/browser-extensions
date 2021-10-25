import {pageManagerFactory} from "../../common/pageManagers/factory";

pageManagerFactory(document, document.location).then(x=>x?.init())