import { ONE_GB } from "../config/constants.js";

export function notificationHandler(subCommand, options, STATE) {

	let result = {};
	if (subCommand) {
		if (subCommand === "enable") {
			STATE.notification.enabled = true;
		}
		else if (subCommand === "disable") {
			STATE.notification.enabled = false;
		}
	}

	if (options.threshold !== undefined) {
		STATE.notification.threshold = options.threshold * ONE_GB;
	}

	console.log("sub command -", subCommand);
	console.log("options -", options);
	console.log("STATE -", STATE);
	result.enabled = STATE.notification.enabled;
	result.threshold = `'${STATE.notification.threshold / ONE_GB}GB'`;
	console.log("result -", result);
	return result;
}
