import axios from "axios";
import { useContext, useState } from "react";
import { BASE_URL } from "../url";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/users/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      if (res.data) {
        navigate("/");
        localStorage.setItem("token", res.data.token);
        setUser(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>Login</h3>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="text"
        placeholder="email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
