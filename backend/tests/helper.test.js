const listHelper = require("../utils/list_helper");
const blogs = require("../data/blogs");

describe("total likes", () => {
  test("of empty list is zero", () => {
    const emptyBlogList = [];
    const result = listHelper.totalLikes(emptyBlogList);
    expect(result).toBe(0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const listWithOneBlog = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
    ];
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });
});

describe("favorite blog", () => {
  test("of a bigger list is calculated right", () => {
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual({
      // toEqual is better to use with objects instead of toBe method
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });
});

describe("most blogs by the author", () => {
  test("of a list of blogs is calculated right", () => {
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({ author: "Robert C. Martin", blogs: 3 });
  });
});

describe("most likes by the author", () => {
  test("of a list of blogs is calculated right", () => {
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({ author: "Edsger W. Dijkstra", likes: 17 });
  });
});
