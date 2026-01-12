import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      <Link to="/">Kirjaudu</Link> |{" "}
      <Link to="/create">Uusi tiketti</Link> |{" "}
      <Link to="/tickets">Omat tiketit</Link> |{" "}
      <Link to="/admin">IT-tuki</Link>
    </nav>
  );
}

export default Navbar;
