import { handleCommand } from "../commands/handler.js";
import { elements } from "./elements.js";
import { closeConnection } from "../client.js";
import { setCurrentRequest } from "./state.js";
import {
    createInterfaceDateRequest,
    createInterfaceDaysRequest,
    createLimitGetRequest,
    createLimitSetDaysRequest,
    createUsageDateRequest,
    createUsageDaysRequest,
    createSpeedRequest,
    createLimitSetDateRequest,
    createSessionRequest,
    createStatusRequest,
    createNotificationToggleRequest,
    createNotificationThresholdRequest
} from "../commands/requests.js";

export function registerEvents() {
    elements.statusButton.addEventListener("click", () => {
        const request = createStatusRequest();

        setCurrentRequest(request);

        handleCommand();
    });

    elements.usageDaysForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const request = createUsageDaysRequest(elements.usageDays.value);

        setCurrentRequest(request);

        handleCommand();
    });

    elements.usageDateForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const request = createUsageDateRequest(elements.usageFrom.value, elements.usageTo.value);

        setCurrentRequest(request);

        handleCommand();
    });

    elements.interfaceDaysForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const request = createInterfaceDaysRequest(elements.interfaceDays.value);

        setCurrentRequest(request);

        handleCommand();
    });

    elements.interfaceDateForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const request = createInterfaceDateRequest(
            elements.interfaceFrom.value,
            elements.interfaceTo.value
        );

        setCurrentRequest(request);

        handleCommand();
    });

    elements.speedButton.addEventListener("click", () => {
        const request = createSpeedRequest();

        setCurrentRequest(request);

        handleCommand();
    });

    elements.speedWatchButton.addEventListener("click", () => {
        const request = createSpeedRequest(true);

        setCurrentRequest(request);

        handleCommand();
    });

    elements.speedStopButton.addEventListener("click", () => {
        closeConnection();
    });

    elements.sessionButton.addEventListener("click", () => {
        const request = createSessionRequest();

        setCurrentRequest(request);

        handleCommand();
    });

    elements.notificationToggleButton.addEventListener("click", () => {
        const enabled = elements.notificationToggleButton.value === "enable";

        const subCommand = enabled ? "disable" : "enable";

        const request = createNotificationToggleRequest(subCommand);

        setCurrentRequest(request);

        handleCommand();
    });

    elements.notificationThresholdForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const request = createNotificationThresholdRequest(
            Number(elements.notificationThreshold.value)
        );

        setCurrentRequest(request);

        handleCommand();
    });

    elements.limitGetButton.addEventListener("click", () => {
        const request = createLimitGetRequest();

        setCurrentRequest(request);

        handleCommand();
    });

    elements.limitDaysForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const request = createLimitSetDaysRequest(
            elements.limitDays.value,
            elements.limitDaysAmount.value
        );

        setCurrentRequest(request);

        handleCommand();
    });

    elements.limitDateForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const request = createLimitSetDateRequest(
            elements.limitFrom.value,
            elements.limitTo.value,
            elements.limitDateAmount.value
        );

        setCurrentRequest(request);

        handleCommand();
    });

}