import { setMessageHandler } from "./client.js";
import { registerEvents } from "./ui/events.js";
import { renderResponse } from "./ui/renderer.js";


registerEvents();

setMessageHandler((message) => {
    console.log("Received message:", message);

    renderResponse(message);

});

