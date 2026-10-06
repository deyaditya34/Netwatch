const notifications = [];

let onNotification = null;

export function notify(message) {
    const now = new Date();

    const notification = {
        message,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString()
    }

    notifications.unshift(notification)

    if (onNotification) {
        onNotification(message);
    }
}

export function getNotifications() {
    return notifications;
}

export function setNotificationHandler(handler) {
    onNotification = handler;
}

export function renderNotifications(container) {

    container.innerHTML = "";

    for (const notification of notifications) {

        const item = document.createElement("div");

        item.className = "notification-item";

        const message = document.createElement("div");

        message.className = "notification-message";

        message.textContent = notification.message;


        const timestamp = document.createElement("div");

        timestamp.className = "notification-time";

        timestamp.textContent =
            `${notification.date} ${notification.time}`;


        item.appendChild(message);
        item.appendChild(timestamp);

        container.appendChild(item);
    }
}