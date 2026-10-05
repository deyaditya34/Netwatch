# Netwatch

Netwatch is a Linux-focused network usage monitor built in Node.js. It reads interface counters from `/sys/class/net`, tracks total and daily traffic, shows live speeds, supports usage limits, and exposes both a command-line interface and a browser dashboard.

## Overview

The app starts a monitor loop that samples every active network interface, computes bandwidth deltas over time, stores the resulting state, and exposes that data through multiple interfaces:

- a TCP socket server for CLI requests
- a WebSocket server for browser live updates
- an HTTP server that serves the local dashboard
- optional desktop notifications when usage crosses the configured threshold

## Architecture and runtime flow

The actual startup flow is defined in `src/index.js`:

1. initialize storage directories and persisted state
2. load saved state from disk
3. detect active network interfaces
4. start the monitoring loop
5. keep the CLI, WebSocket, and HTTP servers running alongside the monitor

The key pieces are:

- `src/network/interfaces.js` discovers active interfaces such as Wi‑Fi and Ethernet
- `src/network/counters.js` reads `rx_bytes` and `tx_bytes` from `/sys/class/net/<iface>/statistics`
- `src/network/usage.js` calculates traffic deltas and updates totals
- `src/network/speed.js` calculates current throughput values
- `src/monitoring/monitor.js` runs the sample loop
- `src/socket/server.js` hosts the TCP CLI request server
- `src/websocket/server.js` hosts the browser real-time data feed
- `src/http/server.js` serves the static dashboard from `src/web`
- `src/web/js/client.js` connects the browser UI to the WebSocket server

## Features

- Tracks per-interface and aggregate download/upload totals
- Computes current network speed from byte deltas over time
- Tracks daily, session, and accumulated usage
- Stores usage snapshots in a data directory for reporting and limits
- Supports limits by rolling days or by explicit date range
- Enables or disables usage notifications with a threshold
- Exposes a browser dashboard plus a socket-based command interface

## Browser dashboard

The browser app is served from `src/web` and includes sections for:

- status overview
- usage totals over days or date ranges
- interface-by-interface breakdowns
- live speed monitoring
- session statistics
- notification controls
- current usage limit and limit-setting forms

Open the dashboard in a browser at:

```text
http://127.0.0.1:3000
```

The browser client connects to the WebSocket server at the same host using the configured WebSocket port, which is `3001` by default. The frontend code uses `window.location.hostname` and `window.location.protocol` so it adapts to the current host and uses `wss://` when the page is served over HTTPS.

## Requirements

- Linux with `/sys/class/net` available
- Node.js 16 or newer
- `notify-send` installed if notification support is required

## Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root with the required configuration:

```env
DATA_DIR=data
CLI_HOST=127.0.0.1
CLI_PORT=3000
W_SOC_HOST=127.0.0.1
W_SOC_PORT=3001
HTTP_HOST=127.0.0.1
HTTP_PORT=3002
```

The app reads these values from `src/config/env.js` using `dotenv`; if any required variable is missing, startup fails.

## Running the app

Start the monitor and server stack:

```bash
npm start
```

This starts:

- the network monitor loop
- the TCP CLI server on `127.0.0.1:3000`
- the WebSocket server on `127.0.0.1:3001`
- the HTTP dashboard server on `127.0.0.1:3002`

## CLI usage

You can send commands through the socket client:

```bash
node src/socket/client.js "help"
node src/socket/client.js "status"
node src/socket/client.js "session"
node src/socket/client.js "usage --days 7"
node src/socket/client.js "usage --from 2026-09-01 --to 2026-09-15"
node src/socket/client.js "interface --days 7"
node src/socket/client.js "interface --from 2026-09-01 --to 2026-09-15"
node src/socket/client.js "speed"
node src/socket/client.js "speed --watch"
node src/socket/client.js "limit get"
node src/socket/client.js "limit set --amount 10 --days 30"
node src/socket/client.js "limit set --amount 5 --from 2026-09-01 --to 2026-09-30"
node src/socket/client.js "notification enable"
node src/socket/client.js "notification disable"
node src/socket/client.js "notification --threshold 2"
```

### Supported commands

- `help`
- `status`
- `session`
- `usage --days <number>`
- `usage --from <date> --to <date>`
- `interface --days <number>`
- `interface --from <date> --to <date>`
- `speed`
- `speed --watch`
- `limit get`
- `limit set --amount <GB> --days <number>`
- `limit set --amount <GB> --from <date> --to <date>`
- `notification enable`
- `notification disable`
- `notification --threshold <GB>`

## Data and storage

The app creates or updates files under the configured `DATA_DIR`:

- `state.json` — persisted monitor state, including totals, session info, daily usage, and limit metadata
- `usage.jsonl` — append-only JSON Lines log of usage snapshots
- temporary state files created during save operations

## Notifications

If notifications are enabled and the active daily usage exceeds the configured threshold, the app calls `notify-send`. This is useful when a daily or session usage cap is nearing its limit.

Example:

```bash
node src/socket/client.js "notification --threshold 2"
```

If your system does not have a notification daemon available, the app can still run, but notifications will fail when `notify-send` is not available in `PATH`.

## Troubleshooting

- If no interfaces are reported, confirm that the machine has active Ethernet or Wi‑Fi adapters under `/sys/class/net`.
- If a command is rejected, double-check the command syntax and option names.
- If the browser dashboard does not load, confirm that the HTTP server is running on `:3002` and the WebSocket server is running on `:3001`.
- If notifications do not appear, ensure `notify-send` is available in `PATH`.
- If the monitor stops updating, inspect the console output for runtime errors or interface initialization issues.

## Notes

This project is intended for local Linux monitoring and is built around direct access to system network counters. It is not a general-purpose cross-platform traffic shaper or a full daemon manager.

## License

ISC
