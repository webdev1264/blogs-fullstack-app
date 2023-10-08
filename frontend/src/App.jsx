import { useState, useEffect } from "react";
import blogService from "../services/blogs";
import Blogs from "./components/Blogs";
import "./App.css";

function App() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      if (initialBlogs) {
        setBlogs(initialBlogs);
      }
    });
  }, []);
  return (
    <>
      <h1>Vite + React</h1>
      <Blogs blogs={blogs} />
    </>
  );
}

export default App;
