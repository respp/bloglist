import React from 'react'

export const CommentForm = () => {
    const addComment = e =>{
        alert('new comment')
    }

  return (
    <div>
      <h2>Comment</h2>
      <form onSubmit={addComment}>
          <label htmlFor="title">title: </label>
          <input
            id="title"
            name="title"
            required
          />
          <button type="submit">Send</button>
      </form>
    </div>
  )
}
