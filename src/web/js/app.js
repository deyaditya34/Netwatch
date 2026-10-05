import { setMessageHandler } from "./client.js";
import { registerEvents } from "./ui/events.js";
import { renderResponse } from "./ui/renderer.js";
import { createStatusRequest } from "../js/commands/requests.js";
import { setCurrentRequest } from "./ui/state.js";
import { handleCommand } from "./commands/handler.js";


registerEvents();

setMessageHandler((message) => {
    console.log("response -", message);
    renderResponse(message);

});

function loadInitialData() {
    const statusRequest = createStatusRequest();
    setCurrentRequest(statusRequest);
    handleCommand();
}

loadInitialData();

