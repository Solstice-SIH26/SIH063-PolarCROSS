export default function Latest() {
  return (
    <div style={pageWrapperStyle}>
      <h1 style={titleStyle}>Latest</h1>
      <p style={subtitleStyle}>
        New expeditions, research, publications, and institutional updates.
      </p>

      <div style={feedListStyle}>
        {feedItems.map((item) => (
          <div key={item.id} style={feedCardStyle}>
            <span style={{ ...tagStyle, ...tagColors[item.tag] }}>
              {item.tag}
            </span>
            <h3 style={{ margin: "0.6rem 0 0.3rem" }}>{item.title}</h3>
            <p style={{ margin: 0, color: "#374151", lineHeight: 1.5 }}>
              {item.summary}
            </p>
            <p
              style={{
                margin: "0.6rem 0 0",
                color: "#6B7280",
                fontSize: "0.8rem",
              }}
            >
              {item.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Fake Data ---------- */

const feedItems = [
  {
    id: 1,
    tag: "Expedition",
    title: "39th Indian Antarctic Expedition Departs",
    summary:
      "A new research team has departed for Bharati Station to continue long-term glaciology and atmospheric monitoring programs.",
    date: "Sep 22, 2026",
  },
  {
    id: 2,
    tag: "Publication",
    title: "Sea Ice Variability in the Southern Ocean",
    summary:
      "New peer-reviewed findings on multi-decadal sea ice trends observed near the Indian research stations.",
    date: "Sep 20, 2026",
  },
  {
    id: 3,
    tag: "Dataset",
    title: "Maitri Station Weather Records (2020–2026)",
    summary:
      "A newly released dataset covering six years of temperature, wind, and pressure readings from Maitri Station.",
    date: "Sep 15, 2026",
  },
  {
    id: 4,
    tag: "Media",
    title: "Photo Series: Life at Bharati Station",
    summary:
      "A curated photo collection documenting daily research operations and the surrounding Antarctic landscape.",
    date: "Sep 5, 2026",
  },
  {
    id: 5,
    tag: "Institutional",
    title: "NCPOR Signs New Research Collaboration",
    summary:
      "A new agreement expands joint polar research initiatives with international partner institutions.",
    date: "Aug 30, 2026",
  },
];

const tagColors = {
  Expedition: { background: "#D7E9F7", color: "#1E5F9C" },
  Publication: { background: "#E7EAF0", color: "#0B2545" },
  Dataset: { background: "#DCEBDD", color: "#166534" },
  Media: { background: "#F3E8D7", color: "#92400E" },
  Institutional: { background: "#EDE7F6", color: "#4C1D95" },
};

/* ---------- Styles ---------- */

const pageWrapperStyle = {
  maxWidth: "800px",
  margin: "0 auto",
  padding: "2.5rem 1.5rem",
};

const titleStyle = {
  fontSize: "2rem",
  color: "#0B2545",
  margin: 0,
};

const subtitleStyle = {
  color: "#6B7280",
  marginTop: "0.5rem",
  marginBottom: "2rem",
};

const feedListStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

const feedCardStyle = {
  background: "white",
  border: "1px solid #E7EAF0",
  borderRadius: "10px",
  padding: "1.25rem 1.5rem",
};

const tagStyle = {
  display: "inline-block",
  fontSize: "0.7rem",
  fontWeight: "bold",
  padding: "0.2rem 0.6rem",
  borderRadius: "20px",
};
