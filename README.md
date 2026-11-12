# Workshop 06 – React Blog with a REST API

A full-stack blog application built for **Workshop 06** of the *Web kehitys 2 – Full Stack* course at Laurea University of Applied Sciences.

The frontend is a React single-page application (Vite + React Router). It talks to an Express REST API that stores posts in MongoDB Atlas through Mongoose. Users can list, read, create, edit and delete blog posts.

## Features

- Blog list with loading, error and empty states
- Single post view with author, date and content
- Create and edit posts with a shared form component
- Delete a post and return to the blog list
- Server-side validation (Mongoose) with error messages shown in the UI
- Client-side routing with a 404 page for unknown routes
- All HTTP calls in one API module (`src/api/posts.js`)

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 6, React Router 7 |
| Backend | Node.js, Express 4 |
| Database | MongoDB Atlas, Mongoose 8 |
| Dev tools | nodemon, Vite dev server proxy |

## Project structure

```text
Workshop06React/
├─ README.md            # this file
├─ requirements.md      # original workshop requirements
└─ Starter/
   ├─ backend/          # Express + Mongoose REST API (port 3000)
   │  ├─ models/Post.js
   │  ├─ routes/posts.js
   │  └─ server.js
   └─ frontend/         # React + Vite SPA (port 5173)
      ├─ vite.config.js
      └─ src/
         ├─ api/posts.js
         ├─ components/
         └─ pages/
```

The `Starter/` folder name comes from the original workshop template. The completed solution is inside it.

## Getting started

### Prerequisites

- Node.js 18 or newer
- A MongoDB Atlas cluster (or a local MongoDB) and its connection string

### 1. Start the backend

```bash
cd Starter/backend
npm install
cp .env.example .env     # then put your own MONGODB_URI in .env
npm run dev
```

The API runs at `http://localhost:3000/api/posts`.

### 2. Start the frontend (in a second terminal)

```bash
cd Starter/frontend
npm install
npm run dev
```

Open `http://localhost:5173`. Vite proxies every `/api` request to the backend on port 3000, so no CORS setup is needed during development.

## REST API

| Method | Endpoint | Description | Success | Errors |
|---|---|---|---|---|
| GET | `/api/posts` | List all posts, newest first | 200 | 500 |
| GET | `/api/posts/:id` | Get one post | 200 | 400, 404, 500 |
| POST | `/api/posts` | Create a post | 201 | 400, 500 |
| PUT | `/api/posts/:id` | Update a post | 200 | 400, 404, 500 |
| DELETE | `/api/posts/:id` | Delete a post | 200 | 400, 404, 500 |

More details are in [`Starter/backend/README.md`](Starter/backend/README.md) and [`Starter/frontend/README.md`](Starter/frontend/README.md).

## Author

JohnnyRyderTech – Business IT student at Laurea University of Applied Sciences.

## License

MIT – see [LICENSE](LICENSE).
