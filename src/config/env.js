import dotenv from "dotenv";
dotenv.config();

function getEnv(name) {
	const value = process.env[name];

	if (!value) {
		throw new Error(`${name} is not defined`);
	}

	return value;
}

export const DATA_DIR = getEnv("DATA_DIR");
export const CLI_HOST = getEnv("CLI_HOST");
export const CLI_PORT = getEnv("CLI_PORT");
export const MONITOR_INTERVAL_MS = 1000;

