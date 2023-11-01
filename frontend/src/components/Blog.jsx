import { useState } from "react";
import blogService from "../../services/blogs";

const Blog = ({ blog, user, handleAddLike }) => {
  const [visible, setVisible] = useState(false);

  const { title, url, likes } = blog;

  const handleLike = async () => {
    try {
      const newBlog = { ...blog, likes: blog.likes + 1 };
      blogService.setToken(user.token);
      await blogService.like(newBlog);
      handleAddLike(newBlog);
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  };

  return (
    <div className="blog">
      {visible ? (
        <>
          <div>{title}</div>
          <div>{url}</div>
          <div>
            <span>{likes}</span> <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user.name}</div>
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
