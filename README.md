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

`docker build -f dockerfile.base . -t maze-tv-base:latest`

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

## What is missing?

Or what should I have done with more time? Short answer: A lot of things. 

It is always hard to know at what level you should keep the solution in these contexts. You want to show what you can do, while not spending too much time. Some people think it is a plus to go outside of the specified requirements, some think it is a sign of scope creep, and not being able to stick to what the assignment actually is about. It is hard to know how the reviewer of an assignment will interpret your work.

I tried to do a little bit of everything, if that makes sense. The main requirements are fulfilled, and some of the optional. I left out endless-scroll as there did not seem to be built-in pagination, or even a way of specifying a limit and cursor, in the maze-api. I didn't like the idea of creating an artifical pagination on the frontend, there wasn't enough data to warrant it. In hindsight, I could've done something with the schedule api, as you can specify what day you want shows for, and make it so it fetches the next day when you scroll to the bottom. 

I also realized just now that I didn't do the favorites thing 😅 If the solution isn't adequate, let me know if you want me to complement something.

Apart from that, like I said, there is a little bit of everything in the solution. 
- The frontend follows the specified requirements
- There is a backend layer, which caches requests and serves cached data if there is a hit. On miss it will call the maze api.
- The application is dockerized, and can be started using `docker compose`
- There are unit tests for the backend written using jest
- There are e2e cypress tests for the frontend, as well as component tests
- The test coverage is not 100%, which I strive to stick to otherwise. I think all code that the team writes should be tested. Not everything makes sense to test, but then it should be ignored from coverage collection, and there should be a good reason why.

Here's a couple of examples of things that I could've done given more time, or if the application was actually going to launch at some point.
- The design isn't great, you can barely call it adequate. Luckily I am not a designer.
- The user-experience can be significantly improved. One thing that I realized now and that is bugging me is that you don't remain in the same place in the list as you where if you navigate to the details page, and then go back.
- Lazy-loading
- Stream results
- Add ci pipelines for building, running tests etc.
- git commit/push hooks for keeping the code formatted and linted. You could also argue tests should be run for changed code.
- I am not 100% happy with naming conventions and folder structure. I would probably spend some time improving that. It isn't clear why some files are pascal case and others camel. I would probably consult some style guide for this.
- Proper error handling, the frontend components do not have error boundaries. The backend could also use some improvement here. It might even leak sensitive details now, as the error message is just passed to the frontend.
- Apply security policies to the backend. Right now it has no security measures taken whatsoever, other than a crude cors-policy.
- Add some more backend functionality for the purpose of the code test, perhaps collect some usage data in a database that could be used to display "trending" shows. 

The above list is not exhaustive, I might've missed obvious things that one should do in a real scenario. In summary, there many things one could do to improve the solution 😊