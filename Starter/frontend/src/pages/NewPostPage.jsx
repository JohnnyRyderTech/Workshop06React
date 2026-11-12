import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PostForm from '../components/PostForm.jsx'
import { createPost } from '../api/posts.js'

function NewPostPage() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    // Read the values from the submitted form (PostForm uses uncontrolled inputs)
    const formData = new FormData(e.target)
    const payload = {
      title: formData.get('title'),
      content: formData.get('content'),
      author: formData.get('author'),
    }

    try {
      const created = await createPost(payload)
      navigate(`/posts/${created._id}`)
    } catch (err) {
      setError(err.message)
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h1 className="page-title">New post</h1>
      {error && <p className="status-msg error">Could not create post: {error}</p>}
      <PostForm onSubmit={handleSubmit} submitting={submitting} />
    </div>
  )
}

export default NewPostPage
