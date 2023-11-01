import Blog from "./Blog";

const Blogs = ({ blogs, user, handleAddLike }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          handleAddLike={handleAddLike}
        />
      ))}
    </div>
  );
};

export default Blogs;
