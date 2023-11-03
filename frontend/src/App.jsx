import { useState, useEffect, useRef } from "react";
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import Logout from "./components/Logout";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Toggler from "./components/Toggler";
import blogService from "../services/blogs";
import loginService from "../services/login";
import helper from "../utils/helper";
import "./App.css";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      if (initialBlogs) {
        const sortedBlogs = helper.sortBlogs(initialBlogs);
        setBlogs(sortedBlogs);
      }
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loggedUserJSON = localStorage.getItem("loggedUser");
        if (loggedUserJSON) {
          const userData = JSON.parse(loggedUserJSON);
          loginService.setToken(userData.token);
          const tokenStatus = await loginService.auth();
          if (tokenStatus === 200) {
            setUser(userData);
          }
        }
      } catch (e) {
        console.log(e.message);
        setUser(null);
        localStorage.removeItem("loggedUser");
      }
    };
    fetchData();
  }, []);

  const showSuccessMessage = (blog) => {
    setSuccessMessage(`Added ${blog.title}`);
    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
  };

  const showErrorMessage = (message) => {
    setErrorMessage(`Error: ${message}`);
    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
  };

  const handleLogin = async (userName, password) => {
    try {
      const userData = await loginService.login({ userName, password });
      if (userData) {
        const userDataJSON = JSON.stringify(userData);
        localStorage.setItem("loggedUser", userDataJSON);
        setUser(userData);
      }
    } catch (e) {
      console.log(e);
      showErrorMessage(e.message);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("loggedUser");
  };

  const handleCreateBlog = async (blogObj) => {
    try {
      blogService.setToken(user.token);
      const newBlog = await blogService.create(blogObj);
      const updatedBlogs = [...blogs, newBlog];
      const sortedBlogs = helper.sortBlogs(updatedBlogs);
      setBlogs(sortedBlogs);
      showSuccessMessage(newBlog);
      blogFormRef.current.toggleVisible();
    } catch (e) {
      console.log(e.message);
      showErrorMessage(e.message);
    }
  };

  const handleDeleteBlog = async (blogObj) => {
    try {
      blogService.setToken(user.token);
      await blogService.deleteBlog(blogObj);
      const updatedBlogs = blogs.filter((blog) => blog.id !== blogObj.id);
      const sortedBlogs = helper.sortBlogs(updatedBlogs);
      setBlogs(sortedBlogs);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleAddLike = async (blogObj) => {
    try {
      if (user) {
        const newBlog = { ...blogObj, likes: blogObj.likes + 1 };
        blogService.setToken(user.token);
        const updatedBlog = await blogService.like(newBlog);
        const updatedBlogs = blogs.map((blog) => {
          if (blog.id === updatedBlog.id) {
            return updatedBlog;
          }
          return blog;
        });
        const sortedBlogs = helper.sortBlogs(updatedBlogs);
        setBlogs(sortedBlogs);
      }
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  };

  const loginForm = () => (
    <Toggler buttonLabel="login">
      <Login handleLogin={handleLogin} />
    </Toggler>
  );

  const blogForm = () => {
    return (
      <Toggler buttonLabel="create blog" ref={blogFormRef}>
        <BlogForm handleCreateBlog={handleCreateBlog} />
      </Toggler>
    );
  };

  const content = () => {
    return (
      <>
        <Logout name={user.name} handleLogout={handleLogout} />
        {blogForm()}
        <Blogs
          blogs={blogs}
          user={user}
          handleAddLike={handleAddLike}
          handleDeleteBlog={handleDeleteBlog}
        />
      </>
    );
  };

  return (
    <>
      <h1>Blogs</h1>
      <Notification message={successMessage} className="success" />
      <Notification message={errorMessage} className="error" />
      {user ? content() : loginForm()}
    </>
  );
}

export default App;
