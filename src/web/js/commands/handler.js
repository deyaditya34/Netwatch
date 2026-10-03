import { sendRequest } from "../client.js";
import { getCurrentRequest } from "../ui/state.js";

export function handleCommand(command, options = {}, subCommand = null) {
	const request = getCurrentRequest();
	sendRequest(request);
}
