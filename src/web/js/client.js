let socket = null;
let onMessage = null;

function connect() {
	socket = new WebSocket("ws://127.0.0.1:3001");

	socket.addEventListener("open", () => {
		console.log("web socket connected");
	})

	socket.addEventListener("message", (event) => {
		const response = JSON.parse(event.data);
		if (onMessage) {
			onMessage(response)
		}
	});

	socket.addEventListener("close", () => {
		console.log("WebSocket disconnected");
		socket = null;
	});

	socket.addEventListener("error", (error) => {
		console.error("WebSocket error:", error);
	});
}

export function sendRequest(request) {
	if (!socket) {
		connect();
	}

	if (socket.readyState === WebSocket.OPEN) {
		socket.send(JSON.stringify(request) + "\n");
		return;
	}

	socket.addEventListener("open", () => {
		socket.send(JSON.stringify(request) + "\n");
	},
		{ once: true }
	);
}

export function setMessageHandler(handler) {
	onMessage = handler;
}

export function closeConnection() {
	if (socket) {
		socket.close();
	}
}