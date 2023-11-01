import { useState } from "react";

const BlogForm = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleCreateBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="input-wrapper">
        <label htmlFor="title">title </label>
        <input
          id="title"
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="author">author </label>
        <input
          id="author"
          type="text"
          name="author"
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="url">url </label>
        <input
          id="url"
          type="text"
          name="url"
          onChange={(e) => setUrl(e.target.value)}
          value={url}
        />
      </div>
      <button>create</button>
    </form>
  );
};

export default BlogForm;
