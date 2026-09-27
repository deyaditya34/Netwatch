# net_limiter

net_limiter is a lightweight Linux network monitor and CLI reporting tool built in Node.js. It polls interface byte counters from `/sys/class/net`, tracks cumulative and daily usage, exposes a local TCP command server, and can show live speed, session totals, and limit information from the command line.

## Features

- Tracks per-interface and total download/upload usage
- Monitors live network speed using byte deltas over time
- Saves persisted state and usage history to files in a configured data directory
- Exposes a socket-based CLI server for commands such as `usage`, `speed`, `session`, `status`, `limit`, and `notification`
- Sends desktop notifications with `notify-send` when usage crosses a configured threshold
- Supports limit tracking for a date range or rolling number of days

## Requirements

- Linux with `/sys/class/net` available
- Node.js 16 or newer
- `notify-send` installed for desktop notifications

## Installation

```bash
npm install
```

Update the `.env` file in the project root:

```env
DATA_DIR=data
CLI_HOST=127.0.0.1
CLI_PORT=4000
```

The application reads these values from `src/config/env.js` using `dotenv`, and it will fail at startup if any required variable is missing.

## Running the monitor

Start the monitoring service:

```bash
npm start
```

This starts the monitoring loop and the CLI server. The monitor continues running in the foreground and saves its state under the configured `DATA_DIR`.

## CLI usage

Run commands through the client entry point:

```bash
node src/socket/client.js "status"
node src/socket/client.js "usage --days 7"
node src/socket/client.js "usage --from 2026-09-01 --to 2026-09-15"
node src/socket/client.js "speed"
node src/socket/client.js "speed --watch"
node src/socket/client.js "session"
node src/socket/client.js "limit get"
node src/socket/client.js "limit set --amount 10 --days 30"
node src/socket/client.js "notification enable"
node src/socket/client.js "notification disable"
node src/socket/client.js "notification --threshold 2"
node src/socket/client.js "help"
```

### Supported commands

- `help`
- `usage --days <number>`
- `usage --from <date> --to <date>`
- `interface --days <number>`
- `interface --from <date> --to <date>`
- `speed`
- `speed --watch`
- `session`
- `status`
- `limit get`
- `limit set --amount <GB> --days <number>`
- `limit set --amount <GB> --from <date> --to <date>`
- `notification enable`
- `notification disable`
- `notification --threshold <GB>`

## Data and state files

The project creates and updates files under `DATA_DIR`:

- `state.json` — persisted monitor state, including totals, current daily usage, and notification state
- `usage.jsonl` — daily usage snapshots appended as JSON lines
- `state.json.tmp` — temporary file used while saving state atomically

## How it works

- `src/index.js` starts the monitor and loads persisted state
- `src/network/interfaces.js` enumerates active network interfaces
- `src/network/counters.js` reads `rx_bytes` and `tx_bytes` from `/sys/class/net/<iface>/statistics`
- `src/network/usage.js` calculates byte deltas and updates accumulated/daily totals
- `src/network/speed.js` calculates current download/upload speed
- `src/storage/state.js` saves state to disk
- `src/storage/usageHistory.js` stores historical usage totals for reporting
- `src/monitoring/monitor.js` runs the polling loop every second
- `src/socket/server.js` accepts CLI requests through a local TCP server
- `src/socket/client.js` send requests and renders the response

## Notification behavior

The monitor checks the current daily usage against a notification threshold. If notifications are enabled and the threshold is reached, it calls `notify-send` with a usage message. The threshold can be set with:

```bash
node src/socket/client.js "notification --threshold 2"
```

If no notification daemon exists in your desktop environment, the monitor can still run, but the notification command will fail when `notify-send` is unavailable.

## Troubleshooting

- If no interfaces are detected, verify that your machine has active Ethernet or Wi‑Fi interfaces under `/sys/class/net`
- If notifications do not appear, confirm `notify-send` is installed and available in `PATH`
- If the app stops updating, check terminal output for runtime errors; the monitor reinitializes interfaces after failures
- If the CLI reports an invalid request, verify the command matches the supported syntax exactly

## Notes

This project is intended for local monitoring on Linux workstations and is designed around direct access to the system network counters. It is not a general-purpose cross-platform traffic shaper or a full daemon manager.

## License

ISC
