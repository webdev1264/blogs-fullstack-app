import axios from "axios";

const baseUrl = "/api/login";

let token;

const setToken = (newToken) => {
  token = newToken;
};

const login = async (user) => {
  const response = await axios.post(baseUrl, user);
  return response.data;
};

const auth = async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(baseUrl, config);
  return response.status;
};

export default { login, auth, setToken };
