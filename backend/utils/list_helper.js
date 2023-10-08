// const blogs = require("../data/blogs");

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  let mostLikedBlog = { ...blogs[0] };
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > mostLikedBlog.likes) {
      mostLikedBlog = { ...blogs[i] };
    }
  }
  const { title, author, likes } = mostLikedBlog;
  return { title, author, likes };
};

const mostBlogs = (blogs) => {
  const authors = blogs.reduce((stats, blog) => {
    if (blog.author in stats) {
      stats[blog.author] += 1;
    } else {
      stats[blog.author] = 1;
    }
    return stats;
  }, {});
  const keys = Object.keys(authors);
  return keys.reduce((mostBlogs, author, index) => {
    if (index === 0) {
      mostBlogs = { author, blogs: authors[author] };
      return mostBlogs;
    }
    if (authors[author] > mostBlogs.blogs) {
      mostBlogs = { author, blogs: authors[author] };
    }
    return mostBlogs;
  }, {});
};

const mostLikes = (blogs) => {
  const authors = blogs.reduce((stats, blog) => {
    if (blog.author in stats) {
      stats[blog.author] += blog.likes;
    } else {
      stats[blog.author] = blog.likes;
    }
    return stats;
  }, {});
  const keys = Object.keys(authors);
  return keys.reduce((mostLikes, author, index) => {
    if (index === 0) {
      mostLikes = { author, blogs: authors[author] };
      return mostLikes;
    }
    if (authors[author] > mostLikes.blogs) {
      mostLikes = { author, likes: authors[author] };
    }
    return mostLikes;
  }, {});
};

module.exports = { totalLikes, favoriteBlog, mostBlogs, mostLikes };
