import { useEffect, useState } from 'react'
import PostCard from '../components/PostCard.jsx'
import { getPosts } from '../api/posts.js'

function HomePage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // AbortController cancels the request if the user leaves the page early
    const controller = new AbortController()

    getPosts({ signal: controller.signal })
      .then((data) => setPosts(data))
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [])

  if (loading) return <p className="status-msg">Loading posts…</p>
  if (error) return <p className="status-msg error">Could not load posts: {error}</p>

  return (
    <div className="blog-page">
      <div className="page-heading">
        <p className="eyebrow">Blog</p>
        <h1 className="page-title">All posts</h1>
        <p className="page-copy">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}, newest first.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="status-msg">No posts yet. Write the first one!</p>
      ) : (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post._id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default HomePage
