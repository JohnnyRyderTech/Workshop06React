function ContactPage() {
  return (
    <section className="panel page-panel">
      <p className="eyebrow">Contact</p>
      <h1 className="page-title">Need help while building the API?</h1>
      <p className="page-copy">
        Test one endpoint at a time with Postman or the browser's Network tab, and keep the frontend requests pointed at the existing <code>/api/posts</code> routes.
      </p>
      <p className="page-copy">
        During development, run the React app through Vite and the backend separately. Vite proxies every <code>/api</code> request to the Express server on port 3000.
      </p>
    </section>
  )
}

export default ContactPage