import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { label: "Expeditions" },
    { label: "Research" },
    { label: "Media" },
    { label: "Polar Map" },
    { to: "/latest", label: "Latest", hasNew: true },
  ];

  const isActive = (path) => location.pathname === path;

  function closeMobile() {
    setMobileOpen(false);
  }

  return (
    <>
      <nav className="navbar">
        {/* BRAND */}
        <Link to="/" className="nav-brand" onClick={closeMobile}>
          <div className="nav-brand-icon">
            <svg
              width="23"
              height="23"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="32"
                cy="32"
                r="21"
                stroke="white"
                strokeWidth="2.8"
                opacity="0.8"
              />

              <path
                d="M32 10L37 27L54 32L37 37L32 54L27 37L10 32L27 27L32 10Z"
                fill="#A8D8F5"
              />

              <path
                d="M32 18L34.5 29.5L46 32L34.5 34.5L32 46L29.5 34.5L18 32L29.5 29.5L32 18Z"
                fill="white"
              />
            </svg>
          </div>

          <span className="nav-brand-text">PolarCROSS</span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="nav-links">
          {links.map((link) =>
            link.to ? (
              <Link
                key={link.label}
                to={link.to}
                className={`nav-link ${isActive(link.to) ? "active" : ""}`}
              >
                {link.label === "Latest" ? (
                  <span className="nav-latest">
                    {link.label}
                    {link.hasNew && <span className="latest-dot" />}
                  </span>
                ) : (
                  link.label
                )}
              </Link>
            ) : (
              <span key={link.label} className="nav-link disabled">
                {link.label}
              </span>
            ),
          )}

          <Link
            to="/ai-studio"
            className={`ai-nav-button ${
              isActive("/ai-studio") ? "active" : ""
            }`}
          >
            ✦ AI Studio
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="mobile-menu-button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="mobile-nav-menu">
          {links.map((link) =>
            link.to ? (
              <Link
                key={link.label}
                to={link.to}
                onClick={closeMobile}
                className={`mobile-nav-link ${
                  isActive(link.to) ? "active" : ""
                }`}
              >
                {link.label === "Latest" ? (
                  <span className="nav-latest">
                    Latest
                    <span className="latest-dot" />
                  </span>
                ) : (
                  link.label
                )}
              </Link>
            ) : (
              <span key={link.label} className="mobile-nav-link">
                {link.label}
              </span>
            ),
          )}

          <Link
            to="/ai-studio"
            onClick={closeMobile}
            className="mobile-nav-link mobile-ai-link"
          >
            ✦ AI Studio
          </Link>
        </div>
      )}
    </>
  );
}
