import { useState } from 'react'

export const NewBlogForm = ({ createNewBlog }) => {
  const [newBlogName, setNewBlogName] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')


  const addBlog = (e) => {
    e.preventDefault()
    createNewBlog({
      title: newBlogName,
      author: newBlogAuthor,
      url: newBlogUrl,
      likes: 0
    })
    setNewBlogName('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title: <input
            value={newBlogName}
            onChange={({ target }) => setNewBlogName(target.value)}required /> <br />
          author: <input
            value={newBlogAuthor}
            onChange={({ target }) => setNewBlogAuthor(target.value)}required /> <br />
          url: <input
            value={newBlogUrl}
            onChange={({ target }) => setNewBlogUrl(target.value)} required /> <br />

          <button type='submit'>Create</button>
        </div>
      </form>
    </div>
  )
}
