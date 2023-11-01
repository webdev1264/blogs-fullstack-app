import { useState } from "react";

const Login = ({ handleLogin }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(userName, password);
    setUserName("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label htmlFor="login">username </label>
        <input
          id="login"
          type="text"
          name="password"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
      </div>
      <div>
        <label htmlFor="password">password </label>
        <input
          id="password"
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <button>login</button>
    </form>
  );
};

export default Login;
