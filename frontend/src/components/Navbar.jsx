import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { to: "/latest", label: "Latest" },
    { to: "/ai-studio", label: "AI Studio" },
  ];

  return (
    <nav style={navStyle}>
      <div style={logoStyle}>PolarCROSS</div>
      <div style={linksWrapperStyle}>
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            style={{
              ...linkStyle,
              color: location.pathname === link.to ? "#8FC1E3" : "white",
              borderBottom:
                location.pathname === link.to
                  ? "2px solid #8FC1E3"
                  : "2px solid transparent",
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

const navStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "1rem 2rem",
  background: "#0B2545",
  position: "sticky",
  top: 0,
  zIndex: 100,
};

const logoStyle = {
  color: "white",
  fontWeight: "bold",
  fontSize: "1.25rem",
  letterSpacing: "0.5px",
};

const linksWrapperStyle = {
  display: "flex",
  gap: "2rem",
};

const linkStyle = {
  textDecoration: "none",
  fontSize: "0.95rem",
  paddingBottom: "4px",
  transition: "color 0.2s",
};
