export function createRequest(command, options = {}, subCommand = undefined) {
    const request = {
        command,
        options
    };

    if (subCommand !== undefined) {
        request.subCommand = subCommand;
    };

    return request;
}

export function createStatusRequest() {
    return createRequest("status");
}

export function createSessionRequest() {
    return createRequest("session");
}

export function createSpeedRequest(watch = false) {
    return createRequest(
        "speed",
        { watch }
    );
}

export function createUsageDaysRequest(days) {
    return createRequest(
        "usage",
        {
            days: Number(days)
        }
    );
}

export function createUsageDateRequest(from, to) {
    return createRequest(
        "usage",
        {
            from,
            to
        }
    );
}

export function createInterfaceDaysRequest(days) {
    return createRequest(
        "interface",
        {
            days: Number(days)
        }
    );
}

export function createInterfaceDateRequest(from, to) {
    return createRequest(
        "interface",
        {
            from,
            to
        }
    );
}

export function createNotificationRequest(options = {}, subCommand = undefined) {
    return createRequest("notification", options, subCommand);
}

export function createLimitGetRequest() {
    return createRequest("limit", {}, "get");
}

export function createLimitSetDaysRequest(days, amount) {
    return createRequest(
        "limit",
        {
            days: Number(days),
            amount: Number(amount)
        },
        "set"
    );
}

export function createLimitSetDateRequest(from, to, amount) {
    return createRequest(
        "limit",
        {
            from,
            to,
            amount: Number(amount)
        },
        "set"
    );
}