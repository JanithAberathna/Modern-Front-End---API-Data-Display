import React, { useEffect, useState } from 'react'

export default function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!res.ok) throw new Error('Network response was not ok')
        const data = await res.json()
        setUsers(data)
      } catch (err) {
        setError(err.message || 'Failed to fetch')
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  if (loading) return <div className="container"><p className="loading">Loading...</p></div>
  if (error) return <div className="container"><p className="error">Error: {error}</p></div>

  return (
    <div className="container">
      <header>
        <h1>Team Directory</h1>
        <p className="muted">Data from JSONPlaceholder /users</p>
      </header>

      <div className="grid">
        {users.map(u => (
          <article className="card" key={u.id}>
            <h2>{u.name}</h2>
            <p><strong>Email:</strong> <a href={`mailto:${u.email}`}>{u.email}</a></p>
            <p><strong>Website:</strong> <a href={`https://${u.website}`} target="_blank" rel="noreferrer">{u.website}</a></p>
          </article>
        ))}
      </div>
    </div>
  )
}
