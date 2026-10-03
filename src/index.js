import { readdir, access, mkdir, writeFile } from "fs/promises";
import { startMonitoring } from "./monitoring/monitor.js";
import { loadState } from "./storage/state.js";
import { initialize } from "./network/interfaces.js";
import { initializeStorage } from "./storage/initializeStorage.js";
import { socketServer } from "./socket/server.js";
import { wsServer } from "./websocket/server.js";
import { httpServer } from "./http/server.js";

async function start() {
	await initializeStorage();
	await loadState();
	await initialize();

	await startMonitoring();
}

start();


