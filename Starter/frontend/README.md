# WS06 Blog – Frontend

React single-page application for the WS06 blog, built with Vite and React Router.

## Setup

Start the [backend](../backend/) first, then:

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Preview the production build |

## Routes

| Path | Page | What it does |
|---|---|---|
| `/` | `LandingPage` | Introduction and links to the blog |
| `/about` | `AboutPage` | Background of the workshop |
| `/contact` | `ContactPage` | Development tips |
| `/blog` | `HomePage` | Lists all posts from `GET /api/posts` |
| `/posts/new` | `NewPostPage` | Creates a post with `POST /api/posts` |
| `/posts/:id` | `PostPage` | Shows one post; delete with `DELETE /api/posts/:id` |
| `/posts/:id/edit` | `EditPostPage` | Loads the post and saves with `PUT /api/posts/:id` |
| `*` | `NotFoundPage` | 404 page for unknown routes |

## Project structure

```text
src/
├─ main.jsx              # entry point
├─ App.jsx               # route definitions
├─ api/posts.js          # all fetch calls to the backend
├─ components/
│  ├─ Header.jsx         # navigation with NavLink
│  ├─ PostCard.jsx       # post preview in the list
│  └─ PostForm.jsx       # shared form for create and edit
├─ pages/                # one component per route
├─ App.css
└─ index.css
```

## How it works

- **API module:** `src/api/posts.js` wraps `fetch`. It sends JSON and throws an error with the server's message when a request fails, so pages only need `try/catch` or `.catch()`.
- **Data loading:** pages fetch in `useEffect` and track `loading` and `error` state. An `AbortController` cancels the request if the user leaves the page before it finishes.
- **Forms:** `PostForm` uses uncontrolled inputs. On submit, the page reads the values with `FormData`, sends them, and navigates to the post when the request succeeds.
- **Proxy:** `vite.config.js` forwards `/api` requests to `http://localhost:3000`, so the frontend only uses relative URLs.
