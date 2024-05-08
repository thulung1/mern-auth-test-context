import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { BASE_URL } from "../url";

function NavBar() {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = async () => {
    await axios.get(`${BASE_URL}/api/v1/users/logout`, {
      withCredentials: true,
    });
    localStorage.removeItem("token");
    setUser(null)
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <h3>
        <Link to={"/"}>Auth</Link>
      </h3>
      {!user && (
        <ul style={{ display: "flex", gap: "4px", listStyle: "none" }}>
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
          <li>
            <Link to={"/register"}>Register</Link>
          </li>
        </ul>
      )}

      {user && (
        <ul style={{ display: "flex", gap: "4px", listStyle: "none" }}>
          <button onClick={handleLogout}>Logout</button>
        </ul>
      )}
    </div>
  );
}

export default NavBar;
