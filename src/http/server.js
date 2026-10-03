import express from "express";
import path from "path";
import { fileURLToPath } from "node:url";
import { HTTP_HOST, HTTP_PORT } from "../config/env.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const httpServer = express();

const WEB_DIR = path.join(__dirname, "../web");

httpServer.use("/", express.static(WEB_DIR));

httpServer.listen(HTTP_PORT, HTTP_HOST, () => {
	console.log(`http server running from port ${HTTP_HOST}:${HTTP_PORT}`);
});
