import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/authUtils";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("access");

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav style={{ padding: "15px", borderBottom: "1px solid #ccc" }}>
      <Link to="/">Home</Link> |{" "}
      <Link to="/products">Products</Link>
      {" | "}

      {token ? (
        <>
          <Link to="/cart">Cart</Link> |{" "}
          <Link to="/orders">Orders</Link> |{" "}
          <Link to="/profile">Profile</Link> |{" "}
          <button
            onClick={handleLogout}
            style={{
              background: "none",
              border: "none",
              color: "blue",
              cursor: "pointer",
              textDecoration: "underline",
              padding: 0,
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link> |{" "}
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;