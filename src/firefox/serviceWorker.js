browser.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.type === 'apiAddressesRequest') {
            fetch("https://www.idriss-crypto.com/v1/Addresses?InputCombination=" + encodeURIComponent(request.value))
                .then(fetchRequest => fetchRequest.json())
                .then(x => sendResponse(x));
            return true;
        }
    }
);