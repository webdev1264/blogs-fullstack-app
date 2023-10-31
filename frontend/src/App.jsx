import { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import Logout from "./components/Logout";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import blogService from "../services/blogs";
import loginService from "../services/login";
import "./App.css";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await loginService.login({ userName, password });
      if (userData) {
        const userDataJSON = JSON.stringify(userData);
        localStorage.setItem("loggedUser", userDataJSON);
        setUser(userData);
        setUserName("");
        setPassword("");
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

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      blogService.setToken(user.token);
      const newBlog = await blogService.create({ title, author, url });
      setBlogs([...blogs, newBlog]);
      setTitle("");
      setAuthor("");
      setUrl("");
      showSuccessMessage(newBlog);
    } catch (e) {
      console.log(e.message);
    }
  };

  if (user === null) {
    return (
      <>
        <h1>Login to application</h1>
        <Notification message={errorMessage} className="error" />
        <Login
          handleLogin={handleLogin}
          userName={userName}
          password={password}
          setUserName={setUserName}
          setPassword={setPassword}
        />
      </>
    );
  }
  return (
    <>
      <h1>List of blogs</h1>
      <Notification message={successMessage} className="success" />
      <Notification message={errorMessage} className="error" />
      <div>
        <p>
          {user.name} <span>logged in</span>{" "}
          <Logout handleLogout={handleLogout} />
        </p>
        <NewBlog
          handleCreateBlog={handleCreateBlog}
          title={title}
          author={author}
          url={url}
          setTitle={setTitle}
          setAuthor={setAuthor}
          setUrl={setUrl}
        />
      </div>
      <Blogs blogs={blogs} />
    </>
  );
}

export default App;
