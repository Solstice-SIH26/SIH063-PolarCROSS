export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section style={heroStyle}>
        <h1 style={{ fontSize: "3rem", margin: 0 }}>PolarCROSS</h1>
        <p
          style={{
            fontSize: "1.25rem",
            maxWidth: "600px",
            margin: "0.75rem auto 0",
          }}
        >
          Making India's Polar Science Accessible
        </p>
        <input
          type="text"
          placeholder="Search expeditions, publications, datasets..."
          style={searchStyle}
        />
      </section>

      {/* Key Stats */}
      <section style={statsWrapperStyle}>
        {stats.map((stat) => (
          <div key={stat.label} style={statCardStyle}>
            <div style={statNumberStyle}>{stat.value}</div>
            <div style={statLabelStyle}>{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Featured Expedition */}
      <section style={sectionWrapperStyle}>
        <h2 style={sectionTitleStyle}>Featured Expedition</h2>
        <div style={featuredCardStyle}>
          <div style={featuredImageStyle}>🧊</div>
          <div>
            <h3 style={{ margin: "0 0 0.5rem" }}>{featured.title}</h3>
            <p style={{ color: "#6B7280", margin: "0 0 0.75rem" }}>
              {featured.location}
            </p>
            <p style={{ margin: 0, lineHeight: 1.5 }}>{featured.description}</p>
          </div>
        </div>
      </section>

      {/* Latest Research Feed */}
      <section style={sectionWrapperStyle}>
        <h2 style={sectionTitleStyle}>Latest Research</h2>
        <div style={feedGridStyle}>
          {latestResearch.map((item) => (
            <div key={item.id} style={feedCardStyle}>
              <span style={feedTagStyle}>{item.tag}</span>
              <h4 style={{ margin: "0.5rem 0" }}>{item.title}</h4>
              <p style={{ color: "#6B7280", fontSize: "0.85rem", margin: 0 }}>
                {item.date}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Polar Map Preview */}
      <section style={sectionWrapperStyle}>
        <h2 style={sectionTitleStyle}>Polar Map</h2>
        <div style={mapPreviewStyle}>
          <p style={{ color: "#6B7280" }}>
            🗺️ Interactive polar map preview (placeholder)
          </p>
        </div>
      </section>
    </div>
  );
}

/* ---------- Fake Data ---------- */

const stats = [
  { label: "Expeditions", value: "42" },
  { label: "Publications", value: "1,240" },
  { label: "Datasets", value: "326" },
  { label: "Photo Collections", value: "250+" },
  { label: "Video Resources", value: "48" },
  { label: "Institutional Updates", value: "75" },
];

const featured = {
  title: "38th Indian Antarctic Expedition",
  location: "Bharati Research Station, Antarctica",
  description:
    "A multidisciplinary research mission studying glaciology, atmospheric science, and marine biology across the Antarctic coastline, with data collection ongoing through the summer research window.",
};

const latestResearch = [
  {
    id: 1,
    tag: "Publication",
    title: "Sea Ice Variability in the Southern Ocean",
    date: "Sep 20, 2026",
  },
  {
    id: 2,
    tag: "Dataset",
    title: "Maitri Station Weather Records 2020–2026",
    date: "Sep 15, 2026",
  },
  {
    id: 3,
    tag: "Expedition",
    title: "39th Antarctic Expedition — Team Departs",
    date: "Sep 10, 2026",
  },
  {
    id: 4,
    tag: "Media",
    title: "Photo Series: Life at Bharati Station",
    date: "Sep 5, 2026",
  },
];

/* ---------- Styles ---------- */

const heroStyle = {
  background: "linear-gradient(135deg, #0B2545, #1E5F9C)",
  color: "white",
  padding: "4rem 2rem",
  textAlign: "center",
};

const searchStyle = {
  marginTop: "1.5rem",
  padding: "0.75rem 1rem",
  width: "100%",
  maxWidth: "500px",
  borderRadius: "8px",
  border: "none",
  fontSize: "1rem",
};

const statsWrapperStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "1.5rem",
  padding: "2.5rem 1.5rem",
  background: "#F3F6FA",
};

const statCardStyle = {
  background: "white",
  borderRadius: "10px",
  padding: "1.25rem 1.5rem",
  minWidth: "140px",
  textAlign: "center",
  boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
};

const statNumberStyle = {
  fontSize: "1.75rem",
  fontWeight: "bold",
  color: "#0B2545",
};

const statLabelStyle = {
  fontSize: "0.85rem",
  color: "#6B7280",
  marginTop: "0.25rem",
};

const sectionWrapperStyle = {
  padding: "2.5rem 2rem",
  maxWidth: "1100px",
  margin: "0 auto",
};

const sectionTitleStyle = {
  fontSize: "1.5rem",
  color: "#0B2545",
  marginBottom: "1.25rem",
};

const featuredCardStyle = {
  display: "flex",
  gap: "1.5rem",
  background: "#F3F6FA",
  borderRadius: "12px",
  padding: "1.5rem",
  alignItems: "center",
};

const featuredImageStyle = {
  fontSize: "3rem",
  background: "#D7E9F7",
  borderRadius: "10px",
  padding: "1.5rem",
  flexShrink: 0,
};

const feedGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "1rem",
};

const feedCardStyle = {
  background: "white",
  border: "1px solid #E7EAF0",
  borderRadius: "10px",
  padding: "1rem",
};

const feedTagStyle = {
  fontSize: "0.7rem",
  fontWeight: "bold",
  color: "#1E5F9C",
  background: "#D7E9F7",
  padding: "0.2rem 0.6rem",
  borderRadius: "20px",
};

const mapPreviewStyle = {
  height: "280px",
  background: "#E7EAF0",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
