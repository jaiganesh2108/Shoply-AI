import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "15px", borderBottom: "1px solid #ccc" }}>
      <Link to="/">Home</Link> |{" "}
      <Link to="/products">Products</Link> |{" "}
      <Link to="/cart">Cart</Link> |{" "}
      <Link to="/orders">Orders</Link> |{" "}
      <Link to="/login">Login</Link> |{" "}
      <Link to="/signup">Signup</Link>
    </nav>
  );
}

export default Navbar;