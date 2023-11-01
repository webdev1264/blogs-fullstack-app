import Blog from "./Blog";

const Blogs = ({ blogs, handleAddLike, handleDeleteBlog }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleAddLike={handleAddLike}
          handleDeleteBlog={handleDeleteBlog}
        />
      ))}
    </div>
  );
};

export default Blogs;
