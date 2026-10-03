import { WebSocketServer } from "ws";
import {
	encodeMessage, decodeMessage, createSuccessResponse,
	createErrorResponse, parseMessages, validateServerRequest
} from "../socket/protocol.js";
import { W_SOC_PORT } from "../config/env.js";
import { handleRequest } from "../commands/handler.js";

export const wsServer = new WebSocketServer({
	port: W_SOC_PORT
});

wsServer.on("connection", (socket) => {
	console.log("web socket client connected");

	let watchInterval = null;
	let buffer = "";

	socket.on("message", async (data) => {
		const result = parseMessages(buffer, data);

		buffer = result.buffer;

		for (const message of result.messages) {
			let request;

			try {
				request = decodeMessage(message);
			} catch (err) {
				const errorResponse = createErrorResponse(err);

				socket.send(encodeMessage(errorResponse));
				continue;
			}

			try {
				validateServerRequest(request);
				if (request.command === "speed" && request.options?.watch) {
					if (watchInterval === null) {

						watchInterval = setInterval(async () => {
							const data = await handleRequest(request);
							const successResponse = createSuccessResponse(data);
							console.log("success response -", successResponse);
							socket.send(encodeMessage(successResponse));
						}, 1000);
					};
				}
				else {
					const data = await handleRequest(request);
					const successResponse = createSuccessResponse(data);
					socket.send(encodeMessage(successResponse));
				}
			} catch (err) {
				const errorResponse = createErrorResponse(err);

				socket.send(encodeMessage(errorResponse));
			}
		}
	});

	socket.on("close", () => {
		console.log("web socket client disconnected");
	});

	socket.on("error", (err) => {
		console.error("server error -", err);
	});
})

console.log(`web socket server running on port '${W_SOC_PORT}'`);


