import { useState, useEffect, useRef } from "react";
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import Logout from "./components/Logout";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Button from "./components/Button";
import Toggler from "./components/Toggler";
import blogService from "../services/blogs";
import loginService from "../services/login";
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
        setBlogs(initialBlogs);
      }
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const userData = JSON.parse(loggedUserJSON);
      setUser(userData);
    }
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
    setLoginVisible(false);
    localStorage.removeItem("loggedUser");
  };

  const handleCreateBlog = async (blogObj) => {
    try {
      blogService.setToken(user.token);
      const newBlog = await blogService.create(blogObj);
      setBlogs([...blogs, newBlog]);
      showSuccessMessage(newBlog);
      blogFormRef.current.toggleVisible();
    } catch (e) {
      console.log(e.message);
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

  // const button = () => (
  //   <Button
  //     handleLoginVisible={() => setLoginVisible(!loginVisible)}
  //     name={`${loginVisible ? "cancel" : "login"}`}
  //   />
  // );

  return (
    <>
      <h1>Blogs</h1>
      <Notification message={successMessage} className="success" />
      <Notification message={errorMessage} className="error" />
      {user && <Logout name={user.name} handleLogout={handleLogout} />}
      {!user && loginForm()}
      {user && blogForm()}
      <Blogs blogs={blogs} />
    </>
  );
}

export default App;
