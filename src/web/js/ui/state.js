let currentRequest = null;

export function setCurrentRequest(request) {
    currentRequest = request;
}

export function getCurrentRequest() {
    return currentRequest;
}   