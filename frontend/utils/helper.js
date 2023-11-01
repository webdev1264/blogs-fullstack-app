const sortBlogs = (blogs) => {
  return blogs.sort((a, b) => b.likes - a.likes);
};

export default { sortBlogs };
