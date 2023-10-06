import Blog from "./Blog";

const Blogs = ({ blogs }) => {
  return (
    <ul>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </ul>
  );
};

export default Blogs;
