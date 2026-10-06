import { sendRequest } from "../client.js";
import { getCurrentRequest } from "../ui/state.js";

export function handleCommand() {
	const request = getCurrentRequest();
	
	sendRequest(request);
}
