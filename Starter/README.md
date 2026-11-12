# WS06 Blog – Application

This folder contains the two parts of the application:

| Folder | What it is | Port |
|---|---|---|
| [`backend/`](backend/) | Express + Mongoose REST API for blog posts | 3000 |
| [`frontend/`](frontend/) | React + Vite single-page application | 5173 |

## Running the app

Run the backend and the frontend in separate terminals.

```bash
# Terminal 1 – backend
cd backend
npm install
cp .env.example .env    # add your MONGODB_URI
npm run dev

# Terminal 2 – frontend
cd frontend
npm install
npm run dev
```

Then open `http://localhost:5173`.

## How the parts connect

```text
Browser ──► Vite dev server :5173 ──(proxy /api/*)──► Express :3000 ──► MongoDB Atlas
```

The React app only calls relative URLs like `/api/posts`. In development, Vite forwards them to the Express server.

## Production

In production (Render), the frontend is built into `frontend/dist`, and the Express server serves it together with the API. Every route that isn't `/api/...` returns `index.html`, so React Router handles it. See the Deployment section in the [main README](../README.md#deployment-render).
