# Maze TV Client

This repository contains a sample frontend client for the open [maze tv api](https://www.tvmaze.com/api). It also contains a simple node server that uses redis to cache application requests.

If you have any questions regarding the thought process, or if you would like me to do some complementing work. Feel free to reach out. You can find my email in my github profile.

## Get started

You can start the application using docker, or maunally through pnpm

**Prequisites**
* docker (>= 24.0.6)

or 

* pnpm (>= 8.11.0)
* node (>= 18.18.2)
* redis (>= 7.2.3)

### Docker

Build the base image that the frontend and backend share

`docker build -f dockerfile.base . -t astra-tv-base:latest`

run `docker compose up`, this will start the frontend, backend, and redis server.

### Manual

To start the frontend, follow these steps
- `cd ./frontend`
- `pnpm install`
- `pnpm build && pnpm preview` (or `pnpm dev` for dev mode)
- go to `localhost:4173` (or `localhost:5173` if you used dev mode)

To start the backend, follow these steps
- `cd ./backend`
- `pnpm install`
- `pnpm start`

For instructions on how to set up redis, read their [official docs](https://redis.io/docs/get-started/data-store/)

## Tests

Both the frontend and backend have test suites. Follow below instructions to run them

### Frontend

The frontend testsuite is built an run with cypress. Some of the tests are e2e tests, which requires you to have the frontend running. 

- `cd ./frontend`
- `pnpm install`
- `pnpm dev`
- `pnpm test`

You can also use the cypress ui to run the tests
- `cd ./frontend`
- `pnpm cypress open`

To see the coverage report, open `frontend/coverage/lcov-report/index.html` in your favorite browser.

### Backend

- `cd ./backend`
- `pnpm test`

The coverage report is autmatically printed to the console as part of running the test suite.