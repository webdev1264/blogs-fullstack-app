const sortBlogs = (blogs) => {
  return blogs.sort((a, b) => a.likes - b.likes);
};

export default { sortBlogs };
