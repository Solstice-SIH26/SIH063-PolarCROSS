import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "1.5rem", padding: "1rem" }}>
      <Link to="/">Home</Link>
      <Link to="/latest">Latest</Link>
      <Link to="/ai-studio">AI Studio</Link>
    </nav>
  );
}
