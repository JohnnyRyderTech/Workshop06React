// All HTTP calls to the backend live in this one file.
// Vite proxies /api/* to http://localhost:3000 during development.
const BASE = '/api/posts'

async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  const data = await res.json().catch(() => null)

  if (!res.ok) {
    throw new Error(data?.error ?? `Request failed: ${res.status}`)
  }

  return data
}

export const getPosts = (options) => request(BASE, options)
export const getPost = (id, options) => request(`${BASE}/${id}`, options)
export const createPost = (payload) =>
  request(BASE, { method: 'POST', body: JSON.stringify(payload) })
export const updatePost = (id, payload) =>
  request(`${BASE}/${id}`, { method: 'PUT', body: JSON.stringify(payload) })
export const deletePost = (id) => request(`${BASE}/${id}`, { method: 'DELETE' })
