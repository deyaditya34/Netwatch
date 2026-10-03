import { handleCommand } from "../commands/handler.js";
import { elements } from "./elements.js";
import { closeConnection } from "../client.js";
import { setCurrentRequest } from "./state.js";
import {
    createInterfaceDateRequest,
    createInterfaceDaysRequest,
    createLimitGetRequest,
    createLimitSetDaysRequest,
    createNotificationRequest,
    createUsageDateRequest,
    createUsageDaysRequest,
    createSpeedRequest,
    createLimitSetDateRequest,
    createSessionRequest,
    createStatusRequest
} from "../commands/requests.js";

export function registerEvents() {
    elements.statusButton.addEventListener("click", () => {
        const request = createStatusRequest();

        setCurrentRequest(request);

        handleCommand(request.command, request.options);
    });

    elements.usageDaysButton.addEventListener("click", () => {
        const request = createUsageDaysRequest(elements.usageDays.value);

        setCurrentRequest(request);

        handleCommand(request.command, request.options);
    });

    elements.usageDateButton.addEventListener("click", () => {
        const request = createUsageDateRequest(elements.usageFrom.value, elements.usageTo.value);

        setCurrentRequest(request);

        handleCommand(request.command, request.options);
    });

    elements.interfaceDaysButton.addEventListener("click", () => {
        const request = createInterfaceDaysRequest(elements.interfaceDays.value);

        setCurrentRequest(request);

        handleCommand(request.command, request.options);
    });

    elements.interfaceDateButton.addEventListener("click", () => {
        const request = createInterfaceDateRequest(
            elements.interfaceFrom.value,
            elements.interfaceTo.value
        );

        setCurrentRequest(request);

        handleCommand(request.command, request.options);
    });

    elements.speedButton.addEventListener("click", () => {
        const request = createSpeedRequest();

        setCurrentRequest(request);

        handleCommand(request.command, request.options);
    });

    elements.speedWatchButton.addEventListener("click", () => {
        const request = createSpeedRequest(true);

        setCurrentRequest(request);

        handleCommand(request.command, request.options);
    });

    elements.speedStopButton.addEventListener("click", () => {
        closeConnection();
    });

    elements.sessionButton.addEventListener("click", () => {
        const request = createSessionRequest();

        setCurrentRequest(request);

        handleCommand(request.command, request.options);
    });

    elements.notificationEnableButton.addEventListener("click", () => {
        const request = createNotificationRequest({}, "enable");

        setCurrentRequest(request);

        handleCommand(request.command, request.options, request.subCommand);
    });

    elements.notificationDisableButton.addEventListener("click", () => {
        const request = createNotificationRequest({}, "disable");

        setCurrentRequest(request);

        handleCommand(request.command, request.options, request.subCommand);
    });

    elements.notificationThresholdButton.addEventListener("click", () => {
        const request = createNotificationRequest({
            threshold: Number(elements.notificationThreshold.value)
        });

        setCurrentRequest(request);

        handleCommand(request.command, request.options);
    });

    elements.limitGetButton.addEventListener("click", () => {
        const request = createLimitGetRequest();

        setCurrentRequest(request);

        handleCommand(request.command, request.options, request.subCommand);
    });

    elements.limitDaysButton.addEventListener("click", () => {
        const request = createLimitSetDaysRequest(
            elements.limitDays.value,
            elements.limitDaysAmount.value
        );

        setCurrentRequest(request);

        handleCommand(request.command, request.options, request.subCommand);
    });

    elements.limitDateButton.addEventListener("click", () => {
        const request = createLimitSetDateRequest(
            elements.limitFrom.value,
            elements.limitTo.value,
            elements.limitDateAmount.value
        );

        setCurrentRequest(request);

        handleCommand(request.command, request.options, request.subCommand);
    });
}