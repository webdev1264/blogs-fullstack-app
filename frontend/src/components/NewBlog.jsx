const NewBlog = ({
  handleCreateBlog,
  title,
  author,
  url,
  setTitle,
  setAuthor,
  setUrl,
}) => {
  return (
    <form onSubmit={handleCreateBlog}>
      <div>
        <label htmlFor="title">title </label>
        <input
          id="title"
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>
      <div>
        <label>author </label>
        <input
          id="author"
          type="text"
          name="author"
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
        />
      </div>
      <div>
        <label>url </label>
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

export default NewBlog;
