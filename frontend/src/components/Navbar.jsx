import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { label: "Expeditions" },
    { label: "Research" },
    { label: "Media" },
    { label: "Polar Map" },
    { to: "/latest", label: "Latest" },
    { to: "/ai-studio", label: "AI Studio" },
  ];

  return (
    <nav style={navStyle}>
      <div style={logoStyle}>PolarCROSS</div>

      <div style={linksWrapperStyle}>
        {links.map((link) =>
          link.to ? (
            <Link
              key={link.label}
              to={link.to}
              style={{
                ...linkStyle,
                color: location.pathname === link.to ? "#A8D8F5" : "#FFFFFF",
                borderBottom:
                  location.pathname === link.to
                    ? "2px solid #8FC1E3"
                    : "2px solid transparent",
              }}
            >
              {link.label}
            </Link>
          ) : (
            <span
              key={link.label}
              style={{
                ...linkStyle,
                color: "#FFFFFF",
                borderBottom: "2px solid transparent",
                cursor: "default",
              }}
            >
              {link.label}
            </span>
          ),
        )}
      </div>
    </nav>
  );
}

const navStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  minHeight: "82px",
  padding: "1rem 3rem",

  background: "linear-gradient(90deg, #071D34 0%, #0B2D4F 52%, #123F68 100%)",

  borderBottom: "1px solid rgba(168, 216, 245, 0.28)",
  boxShadow: "0 4px 18px rgba(3, 18, 33, 0.22)",

  position: "sticky",
  top: 0,
  zIndex: 100,
};

const logoStyle = {
  color: "#FFFFFF",
  fontWeight: "bold",
  fontSize: "1.55rem",
  letterSpacing: "0.4px",
  whiteSpace: "nowrap",
  flexShrink: 0,
};

const linksWrapperStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "2rem",
  marginLeft: "2rem",
  whiteSpace: "nowrap",
  overflowX: "auto",
};

const linkStyle = {
  textDecoration: "none",
  fontSize: "1rem",
  paddingBottom: "5px",
  transition: "all 0.2s ease",
  flexShrink: 0,
};
