import axios from "axios";

const baseUrl = "/api/blogs";

let token;

const setToken = (newToken) => {
  token = newToken;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newBlog) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const deleteBlog = async (blog) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config);
  return response.status;
};

const like = async (blog) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config);
  return response.data;
};

export default { getAll, create, setToken, deleteBlog, like };
