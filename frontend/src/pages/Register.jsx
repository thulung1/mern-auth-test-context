import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../url";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      setError(false);
      const res = await axios.post(`${BASE_URL}/api/v1/users/register`, {
        username,
        email,
        password,
      });
      if (res.data) {
        setError(false);
        navigate("/login");
      }
    } catch (error) {
      setError(true);
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <h3>Register</h3>
      <input
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        type="text"
        placeholder="username"
      />
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
      <button onClick={handleRegister}>Register</button>
      <div>
        <p style={{ color: "red" }}>{error && "Something went wrong"}</p>
      </div>
    </div>
  );
}

export default Register;
