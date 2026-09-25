import { useState } from "react";

export default function AIStudio() {
  const [source, setSource] = useState(sourceOptions[0]);
  const [audience, setAudience] = useState(audienceOptions[0]);
  const [platform, setPlatform] = useState(platformOptions[0]);
  const [tone, setTone] = useState(toneOptions[0]);
  const [generated, setGenerated] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleGenerate() {
    setLoading(true);
    setGenerated(null);

    // Fake generation delay — no real API call, just mock output
    setTimeout(() => {
      setGenerated({
        content: mockOutputs[platform] || mockOutputs.default,
        hashtags: mockHashtags,
        source: source,
      });
      setLoading(false);
    }, 900);
  }

  return (
    <div style={pageWrapperStyle}>
      <h1 style={titleStyle}>AI Outreach Studio</h1>
      <p style={subtitleStyle}>
        Turn research sources into audience-specific website and social media
        content.
      </p>

      <div style={layoutStyle}>
        {/* Controls Panel */}
        <div style={panelStyle}>
          <label style={labelStyle}>Research Source</label>
          <select
            style={selectStyle}
            value={source}
            onChange={(e) => setSource(e.target.value)}
          >
            {sourceOptions.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>

          <label style={labelStyle}>Target Audience</label>
          <select
            style={selectStyle}
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
          >
            {audienceOptions.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>

          <label style={labelStyle}>Platform</label>
          <select
            style={selectStyle}
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            {platformOptions.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>

          <label style={labelStyle}>Tone</label>
          <select
            style={selectStyle}
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            {toneOptions.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>

          <button
            style={generateButtonStyle}
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>

        {/* Output Panel */}
        <div style={outputPanelStyle}>
          {!generated && !loading && (
            <p style={{ color: "#6B7280" }}>
              Generated content will appear here.
            </p>
          )}

          {loading && (
            <p style={{ color: "#6B7280" }}>
              Generating content from source...
            </p>
          )}

          {generated && (
            <div>
              <div style={sourceRefStyle}>Source: {generated.source}</div>
              <p style={{ lineHeight: 1.6, whiteSpace: "pre-line" }}>
                {generated.content}
              </p>
              <div style={hashtagWrapperStyle}>
                {generated.hashtags.map((tag) => (
                  <span key={tag} style={hashtagStyle}>
                    {tag}
                  </span>
                ))}
              </div>
              <div style={actionsWrapperStyle}>
                <button style={editButtonStyle}>Edit</button>
                <button style={approveButtonStyle}>Approve</button>
                <button style={publishButtonStyle}>Publish</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Fake Data / Options ---------- */

const sourceOptions = [
  "38th Indian Antarctic Expedition Report",
  "Sea Ice Variability in the Southern Ocean (Publication)",
  "Maitri Station Weather Dataset 2020–2026",
];

const audienceOptions = ["Students", "General Public", "Researchers"];
const platformOptions = ["Instagram", "Twitter / X", "Website Article"];
const toneOptions = ["Friendly", "Formal", "Educational"];

const mockOutputs = {
  Instagram:
    "❄️ Did you know India has an active research station in Antarctica?\n\nOur team at Bharati Station is studying sea ice patterns that affect climate systems worldwide. Every measurement here helps scientists understand our changing planet. 🌍\n\nSwipe to see life at the station!",
  "Twitter / X":
    "New data from Bharati Station reveals shifting sea ice patterns in the Southern Ocean — a key indicator for global climate models. Full findings in our latest research release. 🧊",
  "Website Article":
    "India's Antarctic Research: Tracking Sea Ice in a Changing Climate\n\nResearchers at Bharati Station have released new findings on sea ice variability in the Southern Ocean, part of an ongoing multi-decadal monitoring effort. The data offers fresh insight into how polar ice systems are responding to global climate shifts, and underscores the importance of sustained, long-term observation in remote research environments.",
  default:
    "Generated outreach content will appear here based on the selected research source, audience, and platform.",
};

const mockHashtags = [
  "#PolarScience",
  "#Antarctica",
  "#ClimateResearch",
  "#NCPOR",
  "#IndiaInAntarctica",
];

/* ---------- Styles ---------- */

const pageWrapperStyle = {
  maxWidth: "1000px",
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

const layoutStyle = {
  display: "grid",
  gridTemplateColumns: "300px 1fr",
  gap: "1.5rem",
};

const panelStyle = {
  background: "white",
  border: "1px solid #E7EAF0",
  borderRadius: "10px",
  padding: "1.25rem",
  display: "flex",
  flexDirection: "column",
};

const labelStyle = {
  fontSize: "0.8rem",
  fontWeight: "bold",
  color: "#0B2545",
  marginTop: "1rem",
  marginBottom: "0.35rem",
};

const selectStyle = {
  padding: "0.5rem",
  borderRadius: "6px",
  border: "1px solid #D1D5DB",
  fontSize: "0.9rem",
};

const generateButtonStyle = {
  marginTop: "1.5rem",
  padding: "0.7rem",
  background: "#1E5F9C",
  color: "white",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  cursor: "pointer",
};

const outputPanelStyle = {
  background: "#F3F6FA",
  border: "1px solid #E7EAF0",
  borderRadius: "10px",
  padding: "1.5rem",
  minHeight: "300px",
};

const sourceRefStyle = {
  fontSize: "0.75rem",
  color: "#6B7280",
  marginBottom: "0.75rem",
  fontStyle: "italic",
};

const hashtagWrapperStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
  marginTop: "1rem",
};

const hashtagStyle = {
  background: "#D7E9F7",
  color: "#1E5F9C",
  fontSize: "0.8rem",
  padding: "0.3rem 0.7rem",
  borderRadius: "20px",
};

const actionsWrapperStyle = {
  display: "flex",
  gap: "0.75rem",
  marginTop: "1.5rem",
};

const editButtonStyle = {
  padding: "0.5rem 1rem",
  background: "white",
  border: "1px solid #D1D5DB",
  borderRadius: "6px",
  cursor: "pointer",
};

const approveButtonStyle = {
  padding: "0.5rem 1rem",
  background: "#DCEBDD",
  color: "#166534",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const publishButtonStyle = {
  padding: "0.5rem 1rem",
  background: "#0B2545",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};
