import { useAuth } from "../AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav>
      <Link to="/">Home</Link>
      {isLoggedIn ? (
        <>
          <Link to="/account">Account</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Sign In</Link>
      )}
    </nav>
  );
};

export default Navbar;