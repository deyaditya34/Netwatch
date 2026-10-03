import { elements } from "./elements.js";
import { getCurrentRequest } from "./state.js";

export function renderResponse(response) {
    const request = getCurrentRequest();
    const data = response.data;

    switch (request.command) {
        case "status":
            elements.statusOutput.textContent = JSON.stringify(data, null, 2);
            break;

        case "usage":
            elements.usageOutput.textContent = JSON.stringify(data, null, 2);
            break;

        case "interface":
            elements.interfaceOutput.textContent = JSON.stringify(data, null, 2);
            break;

        case "speed":
            elements.speedOutput.textContent = JSON.stringify(data, null, 2);
            break;

        case "session":
            elements.sessionOutput.textContent = JSON.stringify(data, null, 2);
            break;

        case "notification":
            elements.notificationOutput.textContent = JSON.stringify(data, null, 2);
            break;

        case "limit":
            elements.limitOutput.textContent = JSON.stringify(data, null, 2);
            break;

        default:
            console.error(`Unknown command: ${request.command}`);
    }

}