# WS06 Blog – Backend

Express REST API that stores blog posts in MongoDB using Mongoose.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

### Environment variables

Create a `.env` file in this folder (it is ignored by git):

```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/blog
PORT=3000
```

The app connects to the `blog` database. If `MONGODB_URI` is missing, the server still starts but logs a warning, and database requests will fail.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start with nodemon (restarts on file changes) |
| `npm start` | Start with plain Node |

## Project structure

```text
backend/
├─ server.js        # Express app, JSON parsing, routes, React build in production, 404/500 handlers, DB connection
├─ models/Post.js   # Mongoose schema and model
├─ routes/posts.js  # CRUD routes for /api/posts
├─ .env.example     # template for .env
└─ package.json
```

## Post model

| Field | Type | Rules |
|---|---|---|
| `title` | String | required, trimmed, min 3 characters |
| `content` | String | required, trimmed, min 10 characters |
| `author` | String | required, trimmed |
| `createdAt` / `updatedAt` | Date | added automatically (`timestamps: true`) |

## API

Base URL: `http://localhost:3000/api/posts`

| Method | Path | Body | Success | Errors |
|---|---|---|---|---|
| GET | `/` | – | 200, array of posts (newest first) | 500 |
| GET | `/:id` | – | 200, one post | 400 invalid id, 404 not found |
| POST | `/` | `{ title, content, author }` | 201, created post | 400 validation error |
| PUT | `/:id` | any of `{ title, content, author }` | 200, updated post | 400 invalid id or validation error, 404 not found |
| DELETE | `/:id` | – | 200, `{ message, id }` | 400 invalid id, 404 not found |

All responses are JSON. Errors use the form `{ "error": "message" }`. Unknown routes return `404 { "error": "Route not found" }`.

### Example requests

```bash
# Create
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Hello","content":"My first blog post here.","author":"Johnny"}'

# List
curl http://localhost:3000/api/posts

# Update
curl -X PUT http://localhost:3000/api/posts/<id> \
  -H "Content-Type: application/json" \
  -d '{"title":"Hello again"}'

# Delete
curl -X DELETE http://localhost:3000/api/posts/<id>
```

Updates run the schema validators too (`runValidators: true`), so the same rules apply to create and update.

## Serving the frontend in production

If `../frontend/dist` exists (after `npm run build` in the frontend), the server also serves the React app:

- `/api/...` routes work as described above. Unknown API routes return a JSON 404.
- Every other GET route returns `frontend/dist/index.html`, so React Router can handle routes like `/blog` and `/posts/:id`.

On Render, `PORT` comes from Render, and `MONGODB_URI` is set as an environment variable in the dashboard instead of a `.env` file.
