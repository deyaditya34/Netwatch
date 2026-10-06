import { setMessageHandler } from "./client.js";
import { registerEvents } from "./ui/events.js";
import { renderResponse } from "./ui/renderer.js";
import { createStatusRequest } from "../js/commands/requests.js";
import { setCurrentRequest } from "./ui/state.js";
import { handleCommand } from "./commands/handler.js";
import { setNotificationHandler, getNotifications, renderNotifications } from "../notifications/notification.js";
import { elements } from "./ui/elements.js"

registerEvents();

setMessageHandler((message) => {
    
    renderResponse(message);

});

function loadInitialData() {
    const statusRequest = createStatusRequest();
    setCurrentRequest(statusRequest);
    handleCommand();
}

loadInitialData();

setNotificationHandler(() => {
    const notifications = getNotifications();

    elements.notificationCount.textContent = notifications.length;

    renderNotifications(elements.notificationList)
})
