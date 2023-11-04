import { useState } from "react";

const Blog = ({ blog, handleAddLike, handleDeleteBlog }) => {
  const [visible, setVisible] = useState(false);

  const { title, url, likes } = blog;

  const handleLike = () => {
    handleAddLike(blog);
  };

  const handleOnDelete = () => {
    const isDelete = confirm(`Remove blog ${title} by ${blog.user.name}`);
    if (isDelete) {
      handleDeleteBlog(blog);
    }
  };

  return (
    <div className="blog">
      {visible ? (
        <>
          <div className="title">{title}</div>
          <div className="url">{url}</div>
          <div>
            <span className="likes">{likes}</span>{" "}
            <button onClick={handleLike}>like</button>
          </div>
          <div className="user-name">{blog.user.name}</div>
          <button onClick={handleOnDelete}>delete</button>
        </>
      ) : (
        title
      )}
      <button onClick={() => setVisible(!visible)}>
        {visible ? "hide" : "view"}
      </button>
    </div>
  );
};

export default Blog;
