const Login = ({
  handleLogin,
  userName,
  password,
  setUserName,
  setPassword,
}) => {
  return (
    <form onSubmit={handleLogin}>
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
