export default function Home() {
  return (
    <div style={pageStyle}>
      {/* ================= HERO ================= */}
      <section style={heroStyle}>
        <div style={heroOverlayStyle}>
          <div style={heroContentStyle}>
            <div style={heroEyebrowStyle}>INDIA'S POLAR KNOWLEDGE PORTAL</div>

            <h1 style={heroTitleStyle}>PolarCROSS</h1>

            <p style={heroSubtitleStyle}>
              Making India's Polar Science Accessible
            </p>

            <p style={heroDescriptionStyle}>
              Explore expeditions, scientific research, publications, datasets
              and multimedia from India's polar programme.
            </p>

            <div style={searchWrapperStyle}>
              <span style={searchIconStyle}>⌕</span>

              <input
                type="text"
                placeholder="Search expeditions, publications, datasets..."
                style={searchStyle}
              />

              <button style={searchButtonStyle}>Search</button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section style={statsWrapperStyle}>
        {stats.map((stat) => (
          <div key={stat.label} style={statCardStyle}>
            <div style={statNumberStyle}>{stat.value}</div>
            <div style={statLabelStyle}>{stat.label}</div>
          </div>
        ))}
      </section>

      {/* ================= FEATURED EXPEDITION ================= */}
      <section style={sectionWrapperStyle}>
        <div style={sectionHeaderStyle}>
          <div>
            <div style={sectionEyebrowStyle}>EXPEDITION HIGHLIGHT</div>
            <h2 style={sectionTitleStyle}>Featured Expedition</h2>
          </div>

          <span style={sectionLinkStyle}>Explore Expeditions →</span>
        </div>

        <div style={featuredCardStyle}>
          <div style={featuredImageWrapperStyle}>
            <img
              src="/expedition.jpg"
              alt="Polar expedition team"
              style={featuredImageStyle}
            />

            <div style={imageBadgeStyle}>EXPEDITION</div>
          </div>

          <div style={featuredContentStyle}>
            <div style={featuredMetaStyle}>INDIAN ANTARCTIC PROGRAMME</div>

            <h3 style={featuredTitleStyle}>{featured.title}</h3>

            <p style={featuredLocationStyle}>📍 {featured.location}</p>

            <p style={featuredDescriptionStyle}>{featured.description}</p>

            <div style={featuredTagsStyle}>
              <span style={tagStyle}>Glaciology</span>
              <span style={tagStyle}>Atmospheric Science</span>
              <span style={tagStyle}>Marine Biology</span>
            </div>

            <button style={exploreButtonStyle}>Explore Expedition →</button>
          </div>
        </div>
      </section>

      {/* ================= LATEST RESEARCH ================= */}
      <section style={sectionWrapperStyle}>
        <div style={sectionHeaderStyle}>
          <div>
            <div style={sectionEyebrowStyle}>KNOWLEDGE DISCOVERY</div>
            <h2 style={sectionTitleStyle}>Latest Research</h2>
          </div>

          <span style={sectionLinkStyle}>View All →</span>
        </div>

        <div style={feedGridStyle}>
          {latestResearch.map((item) => (
            <div key={item.id} style={feedCardStyle}>
              <div style={feedTopRowStyle}>
                <span style={feedTagStyle}>{item.tag}</span>
                <span style={feedDateStyle}>{item.date}</span>
              </div>

              <h4 style={feedTitleStyle}>{item.title}</h4>

              <p style={feedDescriptionStyle}>
                Explore the latest developments, findings and resources from
                India's polar research ecosystem.
              </p>

              <div style={readMoreStyle}>Read more →</div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= POLAR MAP ================= */}
      <section style={mapSectionWrapperStyle}>
        <div style={sectionHeaderStyle}>
          <div>
            <div style={sectionEyebrowStyle}>EXPLORE THE REGION</div>
            <h2 style={sectionTitleStyle}>Polar Map</h2>
          </div>

          <span style={sectionLinkStyle}>Open Full Map →</span>
        </div>

        <div style={mapPreviewStyle}>
          <div style={mapContentStyle}>
            <div style={globeStyle}>◉</div>

            <h3 style={mapTitleStyle}>Explore India's Polar Research</h3>

            <p style={mapTextStyle}>
              Discover research stations, expedition routes and scientific
              activity across the polar regions.
            </p>

            <div style={mapPointsStyle}>
              <span>● Maitri</span>
              <span>● Bharati</span>
              <span>● Arctic Research</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ================= DATA ================= */

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
    "A multidisciplinary research mission bringing together scientific teams working across glaciology, atmospheric science and marine research in one of Earth's most extreme environments.",
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

/* ================= PAGE ================= */

const pageStyle = {
  width: "100%",
  background: "#FFFFFF",
};

/* ================= HERO ================= */

const heroStyle = {
  minHeight: "520px",
  backgroundImage: "url('/glacier.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative",
};

const heroOverlayStyle = {
  minHeight: "520px",
  background:
    "linear-gradient(90deg, rgba(7, 29, 52, 0.9) 0%, rgba(7, 29, 52, 0.68) 48%, rgba(7, 29, 52, 0.2) 100%)",
  display: "flex",
  alignItems: "center",
};

const heroContentStyle = {
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "5rem 2.5rem",
  color: "#FFFFFF",
};

const heroEyebrowStyle = {
  fontSize: "0.82rem",
  fontWeight: "700",
  letterSpacing: "2px",
  color: "#A8D8F5",
  marginBottom: "1rem",
};

const heroTitleStyle = {
  fontSize: "4.5rem",
  lineHeight: 1,
  margin: 0,
  fontWeight: "700",
};

const heroSubtitleStyle = {
  fontSize: "1.45rem",
  margin: "1rem 0 0",
  color: "#EAF6FF",
};

const heroDescriptionStyle = {
  maxWidth: "620px",
  margin: "1.2rem 0 0",
  fontSize: "1rem",
  lineHeight: 1.7,
  color: "#E5EEF5",
};

const searchWrapperStyle = {
  display: "flex",
  alignItems: "center",
  maxWidth: "690px",
  marginTop: "2rem",
  background: "#FFFFFF",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0 12px 30px rgba(0,0,0,0.2)",
};

const searchIconStyle = {
  color: "#64748B",
  fontSize: "1.6rem",
  paddingLeft: "1rem",
};

const searchStyle = {
  flex: 1,
  border: "none",
  outline: "none",
  padding: "1rem",
  fontSize: "1rem",
  color: "#0B2545",
  minWidth: 0,
};

const searchButtonStyle = {
  border: "none",
  background: "#1E5F9C",
  color: "#FFFFFF",
  padding: "1rem 1.35rem",
  fontWeight: "700",
  cursor: "pointer",
};

/* ================= STATS ================= */

const statsWrapperStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "1rem",
  padding: "1.5rem 2rem",
  background: "#F4F8FC",
  borderBottom: "1px solid #E3EAF2",
};

const statCardStyle = {
  background: "#FFFFFF",
  border: "1px solid #E1E8F0",
  borderRadius: "10px",
  padding: "1.1rem 1.4rem",
  minWidth: "140px",
  textAlign: "center",
  boxShadow: "0 3px 10px rgba(11, 37, 69, 0.04)",
};

const statNumberStyle = {
  fontSize: "1.65rem",
  fontWeight: "700",
  color: "#0B2545",
};

const statLabelStyle = {
  fontSize: "0.78rem",
  color: "#64748B",
  marginTop: "0.3rem",
};

/* ================= SECTIONS ================= */

const sectionWrapperStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "3.5rem 2rem 0",
};

const mapSectionWrapperStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "3.5rem 2rem 4rem",
};

const sectionHeaderStyle = {
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "space-between",
  gap: "1rem",
  marginBottom: "1.3rem",
};

const sectionEyebrowStyle = {
  fontSize: "0.72rem",
  fontWeight: "700",
  letterSpacing: "1.5px",
  color: "#4F88B8",
  marginBottom: "0.25rem",
};

const sectionTitleStyle = {
  fontSize: "1.75rem",
  color: "#0B2545",
  margin: 0,
};

const sectionLinkStyle = {
  color: "#1E5F9C",
  fontSize: "0.9rem",
  fontWeight: "700",
  whiteSpace: "nowrap",
};

/* ================= FEATURED ================= */

const featuredCardStyle = {
  display: "grid",
  gridTemplateColumns: "1.05fr 1fr",
  gap: "0",
  background: "#F4F8FC",
  border: "1px solid #DCE6F0",
  borderRadius: "14px",
  overflow: "hidden",
  boxShadow: "0 8px 24px rgba(11, 37, 69, 0.06)",
};

const featuredImageWrapperStyle = {
  position: "relative",
  minHeight: "320px",
};

const featuredImageStyle = {
  width: "100%",
  height: "100%",
  minHeight: "320px",
  objectFit: "cover",
  display: "block",
};

const imageBadgeStyle = {
  position: "absolute",
  top: "1rem",
  left: "1rem",
  background: "rgba(7, 29, 52, 0.88)",
  color: "#A8D8F5",
  padding: "0.4rem 0.7rem",
  borderRadius: "20px",
  fontSize: "0.68rem",
  fontWeight: "700",
  letterSpacing: "0.8px",
};

const featuredContentStyle = {
  padding: "2rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const featuredMetaStyle = {
  fontSize: "0.7rem",
  fontWeight: "700",
  letterSpacing: "1.4px",
  color: "#4F88B8",
  marginBottom: "0.7rem",
};

const featuredTitleStyle = {
  margin: "0 0 0.55rem",
  color: "#0B2545",
  fontSize: "1.7rem",
};

const featuredLocationStyle = {
  margin: "0 0 1rem",
  color: "#4B647A",
  fontSize: "0.92rem",
};

const featuredDescriptionStyle = {
  margin: 0,
  color: "#475569",
  lineHeight: 1.7,
  fontSize: "0.95rem",
};

const featuredTagsStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.45rem",
  marginTop: "1.1rem",
};

const tagStyle = {
  background: "#DDECF8",
  color: "#1E5F9C",
  borderRadius: "20px",
  padding: "0.34rem 0.7rem",
  fontSize: "0.72rem",
  fontWeight: "700",
};

const exploreButtonStyle = {
  marginTop: "1.3rem",
  alignSelf: "flex-start",
  padding: "0.7rem 1rem",
  border: "none",
  borderRadius: "7px",
  background: "#0B2545",
  color: "#FFFFFF",
  fontWeight: "700",
  cursor: "pointer",
};

/* ================= LATEST ================= */

const feedGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "1rem",
};

const feedCardStyle = {
  background: "#FFFFFF",
  border: "1px solid #E1E8F0",
  borderRadius: "11px",
  padding: "1.2rem",
  minHeight: "190px",
  boxShadow: "0 4px 14px rgba(11, 37, 69, 0.04)",
};

const feedTopRowStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0.5rem",
};

const feedTagStyle = {
  display: "inline-block",
  fontSize: "0.67rem",
  fontWeight: "700",
  color: "#1E5F9C",
  background: "#DDECF8",
  padding: "0.25rem 0.6rem",
  borderRadius: "20px",
};

const feedDateStyle = {
  fontSize: "0.7rem",
  color: "#94A3B8",
};

const feedTitleStyle = {
  margin: "1rem 0 0.55rem",
  color: "#0B2545",
  fontSize: "1rem",
  lineHeight: 1.4,
};

const feedDescriptionStyle = {
  color: "#64748B",
  fontSize: "0.82rem",
  lineHeight: 1.6,
  margin: 0,
};

const readMoreStyle = {
  marginTop: "1rem",
  color: "#1E5F9C",
  fontSize: "0.78rem",
  fontWeight: "700",
};

/* ================= MAP ================= */

const mapPreviewStyle = {
  minHeight: "300px",
  borderRadius: "14px",
  overflow: "hidden",

  background:
    "radial-gradient(circle at 70% 35%, rgba(143,193,227,0.28), transparent 28%), linear-gradient(135deg, #0B2545, #123F68 60%, #1E5F9C)",

  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const mapContentStyle = {
  textAlign: "center",
  color: "#FFFFFF",
  padding: "2rem",
  maxWidth: "620px",
};

const globeStyle = {
  fontSize: "3.5rem",
  color: "#A8D8F5",
};

const mapTitleStyle = {
  margin: "0.8rem 0 0.5rem",
  fontSize: "1.55rem",
};

const mapTextStyle = {
  margin: 0,
  color: "#DCEFFF",
  lineHeight: 1.6,
};

const mapPointsStyle = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: "1rem",
  marginTop: "1.2rem",
  color: "#A8D8F5",
  fontSize: "0.8rem",
  fontWeight: "700",
};
