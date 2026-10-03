import net from "net";
import {
	encodeMessage, decodeMessage, createSuccessResponse,
	createErrorResponse, parseMessages, validateServerRequest
} from "./protocol.js";
import { handleRequest } from "../commands/handler.js";
import { CLI_HOST, CLI_PORT } from "../config/env.js";

const HOST = CLI_HOST;
const PORT = CLI_PORT;

export const socketServer = net.createServer((socket) => {
	console.log("client connected");

	let watchInterval = null;
	let buffer = "";

	socket.on("data", async (data) => {
		const result = parseMessages(buffer, data);
		buffer = result.buffer;

		for (const message of result.messages) {
			let request;

			try {
				request = decodeMessage(message);
			} catch (err) {
				const errorResponse = createErrorResponse(err);

				socket.write(encodeMessage(errorResponse));
				continue;
			}

			try {
				validateServerRequest(request);

				if (request.command === "speed" && request.options?.watch) {
					if (watchInterval === null) {

						watchInterval = setInterval(async () => {
							const data = await handleRequest(request);
							const successResponse = createSuccessResponse(data);

							socket.write(encodeMessage(successResponse));
						}, 1000);
					};
				}
				else {
					const data = await handleRequest(request);
					const successResponse = createSuccessResponse(data);
					socket.write(encodeMessage(successResponse));
					socket.end();
				}
			} catch (err) {
				const errorResponse = createErrorResponse(err);

				socket.write(encodeMessage(errorResponse));
			}
		}
	});

	socket.on("close", () => {
		if (watchInterval) {
			clearInterval(watchInterval);
			watchInterval = null;
		}
		console.log("close event: Client disconnected");
	});

	socket.on("end", () => {
		console.log("end event: client disconnected");
	});

	socket.on("error", (err) => {
		console.error("Client socket error -", err.message);
	});
});

socketServer.on("error", (err) => {
	console.error("Server error -", err.message);
});

socketServer.listen(PORT, HOST, () => {
	console.log(`server is listening on ${HOST}:${PORT}`);
});

