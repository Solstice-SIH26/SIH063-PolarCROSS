import { useState } from "react";

export default function AIStudio() {
  const [source, setSource] = useState(sourceOptions[0]);
  const [audience, setAudience] = useState(audienceOptions[0]);
  const [platform, setPlatform] = useState(platformOptions[0]);
  const [tone, setTone] = useState(toneOptions[0]);
  const [language, setLanguage] = useState("English");
  const [contentType, setContentType] = useState("Social Media Post");

  const [generated, setGenerated] = useState({
    content: mockOutputs.Instagram,
    hashtags: mockHashtags,
    source: sourceOptions[0],
  });

  const [loading, setLoading] = useState(false);

  function handleGenerate() {
    setLoading(true);

    setTimeout(() => {
      setGenerated({
        content: mockOutputs[platform] || mockOutputs.default,
        hashtags: mockHashtags,
        source,
      });

      setLoading(false);
    }, 900);
  }

  return (
    <div style={pageWrapperStyle}>
      <div style={pageIntroStyle}>
        <div style={eyebrowStyle}>POLARCROSS CONTENT ENGINE</div>

        <h1 style={titleStyle}>AI Outreach Studio</h1>

        <p style={subtitleStyle}>
          Turn scientific research into audience-specific website and social
          media content.
        </p>
      </div>

      <div style={layoutStyle}>
        {/* ================= CONTROLS ================= */}
        <div style={panelStyle}>
          <div style={panelHeadingStyle}>Content Configuration</div>

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

          <label style={labelStyle}>Language</label>

          <select
            style={selectStyle}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>English</option>
            <option>Hindi</option>
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

          <label style={labelStyle}>Content Type</label>

          <select
            style={selectStyle}
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
          >
            <option>Social Media Post</option>
            <option>Website Article</option>
            <option>Educational Summary</option>
          </select>

          <button
            style={{
              ...generateButtonStyle,
              opacity: loading ? 0.7 : 1,
            }}
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "Generating..." : "✦ Generate Content"}
          </button>
        </div>

        {/* ================= OUTPUT ================= */}
        <div style={outputPanelStyle}>
          <div style={outputTopRowStyle}>
            <div>
              <div style={outputEyebrowStyle}>AI-GENERATED OUTREACH</div>

              <h2 style={outputTitleStyle}>{contentType}</h2>
            </div>

            <div style={verifiedBadgeStyle}>✓ Source Grounded</div>
          </div>

          {loading ? (
            <div style={loadingStateStyle}>
              <div style={loadingSpinnerStyle}>✦</div>

              <h3 style={loadingTitleStyle}>Generating outreach content</h3>

              <p style={loadingTextStyle}>
                Processing the selected research source for the chosen audience
                and platform.
              </p>
            </div>
          ) : (
            <>
              <div style={sourceBoxStyle}>
                <div style={sourceBoxLabelStyle}>RESEARCH SOURCE</div>

                <div style={sourceBoxValueStyle}>{generated.source}</div>
              </div>

              <div style={contentCardStyle}>
                <div style={platformRowStyle}>
                  <span style={platformBadgeStyle}>{platform}</span>

                  <span style={audienceBadgeStyle}>{audience}</span>
                </div>

                <h3 style={contentHeadingStyle}>
                  {platform === "Website Article"
                    ? "India's Journey into Polar Science"
                    : "India's Journey to Antarctica 🇮🇳❄️"}
                </h3>

                <p style={contentTextStyle}>{generated.content}</p>
              </div>

              <div style={detailsGridStyle}>
                <div style={detailCardStyle}>
                  <div style={detailLabelStyle}>Audience</div>
                  <div style={detailValueStyle}>{audience}</div>
                </div>

                <div style={detailCardStyle}>
                  <div style={detailLabelStyle}>Platform</div>
                  <div style={detailValueStyle}>{platform}</div>
                </div>

                <div style={detailCardStyle}>
                  <div style={detailLabelStyle}>Language</div>
                  <div style={detailValueStyle}>{language}</div>
                </div>

                <div style={detailCardStyle}>
                  <div style={detailLabelStyle}>Tone</div>
                  <div style={detailValueStyle}>{tone}</div>
                </div>
              </div>

              <div style={hashtagSectionStyle}>
                <div style={hashtagTitleStyle}>Suggested Hashtags</div>

                <div style={hashtagWrapperStyle}>
                  {generated.hashtags.map((tag) => (
                    <span key={tag} style={hashtagStyle}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div style={actionsWrapperStyle}>
                <button style={editButtonStyle}>Edit</button>

                <button style={approveButtonStyle}>✓ Approve</button>

                <button style={publishButtonStyle}>Publish</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= DATA ================= */

const sourceOptions = [
  "38th Indian Antarctic Expedition Report",
  "Sea Ice Variability in the Southern Ocean (Publication)",
  "Maitri Station Weather Dataset 2020–2026",
];

const audienceOptions = [
  "Students",
  "General Public",
  "Researchers",
  "Science Communicators",
];

const platformOptions = ["Instagram", "Twitter / X", "Website Article"];

const toneOptions = ["Friendly", "Formal", "Educational"];

const mockOutputs = {
  Instagram:
    "India's Antarctic expeditions bring together scientists to study some of Earth's most extreme environments. From sea-ice dynamics to atmospheric processes, every observation helps us better understand our changing planet.\n\nExplore India's polar research and discover the science behind the expedition.",

  "Twitter / X":
    "India's Antarctic expeditions generate valuable observations on sea ice, atmosphere and polar ecosystems. Each expedition contributes to a better understanding of our changing planet. 🧊🇮🇳",

  "Website Article":
    "India's Antarctic research programme brings scientists together to study one of Earth's most extreme environments. Expedition observations contribute to research on sea ice, climate processes, atmospheric conditions and polar ecosystems. Long-term scientific observations help researchers understand changes across the Antarctic region and their wider environmental significance.",

  default:
    "Generated outreach content based on the selected scientific research source.",
};

const mockHashtags = [
  "#PolarScience",
  "#Antarctica",
  "#ClimateResearch",
  "#NCPOR",
  "#IndiaInAntarctica",
];

/* ================= STYLES ================= */

const pageWrapperStyle = {
  maxWidth: "1180px",
  margin: "0 auto",
  padding: "3rem 2rem 4rem",
};

const pageIntroStyle = {
  marginBottom: "2rem",
};

const eyebrowStyle = {
  fontSize: "0.72rem",
  fontWeight: "700",
  letterSpacing: "1.6px",
  color: "#4F88B8",
  marginBottom: "0.45rem",
};

const titleStyle = {
  fontSize: "2.45rem",
  color: "#0B2545",
  margin: 0,
};

const subtitleStyle = {
  color: "#64748B",
  marginTop: "0.55rem",
  marginBottom: 0,
  fontSize: "1rem",
};

const layoutStyle = {
  display: "grid",
  gridTemplateColumns: "320px 1fr",
  gap: "1.5rem",
  alignItems: "start",
};

const panelStyle = {
  background: "#FFFFFF",
  border: "1px solid #DEE7F0",
  borderRadius: "12px",
  padding: "1.35rem",
  boxShadow: "0 5px 18px rgba(11, 37, 69, 0.05)",
};

const panelHeadingStyle = {
  fontSize: "0.92rem",
  fontWeight: "700",
  color: "#0B2545",
  paddingBottom: "0.8rem",
  borderBottom: "1px solid #E7EDF3",
  marginBottom: "0.4rem",
};

const labelStyle = {
  display: "block",
  fontSize: "0.76rem",
  fontWeight: "700",
  color: "#0B2545",
  marginTop: "0.95rem",
  marginBottom: "0.38rem",
};

const selectStyle = {
  width: "100%",
  padding: "0.68rem 0.7rem",
  borderRadius: "7px",
  border: "1px solid #CBD5E1",
  background: "#F8FAFC",
  color: "#0F172A",
  fontSize: "0.87rem",
  outline: "none",
};

const generateButtonStyle = {
  width: "100%",
  marginTop: "1.4rem",
  padding: "0.82rem",
  background: "linear-gradient(90deg, #0B2545, #1E5F9C)",
  color: "#FFFFFF",
  border: "none",
  borderRadius: "7px",
  fontWeight: "700",
  cursor: "pointer",
  fontSize: "0.9rem",
};

const outputPanelStyle = {
  background: "#F4F8FC",
  border: "1px solid #DEE7F0",
  borderRadius: "12px",
  padding: "1.5rem",
  minHeight: "520px",
  boxShadow: "0 5px 18px rgba(11, 37, 69, 0.05)",
};

const outputTopRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "1rem",
  marginBottom: "1rem",
};

const outputEyebrowStyle = {
  fontSize: "0.68rem",
  letterSpacing: "1.3px",
  fontWeight: "700",
  color: "#4F88B8",
};

const outputTitleStyle = {
  margin: "0.25rem 0 0",
  color: "#0B2545",
  fontSize: "1.35rem",
};

const verifiedBadgeStyle = {
  background: "#DCFCE7",
  color: "#166534",
  padding: "0.38rem 0.68rem",
  borderRadius: "20px",
  fontSize: "0.7rem",
  fontWeight: "700",
  whiteSpace: "nowrap",
};

const sourceBoxStyle = {
  background: "#EAF3F9",
  border: "1px solid #D5E5F1",
  borderRadius: "8px",
  padding: "0.8rem 0.95rem",
  marginBottom: "1rem",
};

const sourceBoxLabelStyle = {
  fontSize: "0.65rem",
  fontWeight: "700",
  letterSpacing: "1px",
  color: "#64748B",
  marginBottom: "0.25rem",
};

const sourceBoxValueStyle = {
  fontSize: "0.86rem",
  fontWeight: "600",
  color: "#0B2545",
};

const contentCardStyle = {
  background: "#FFFFFF",
  border: "1px solid #E0E7EF",
  borderRadius: "10px",
  padding: "1.3rem",
};

const platformRowStyle = {
  display: "flex",
  gap: "0.45rem",
  marginBottom: "0.9rem",
};

const platformBadgeStyle = {
  display: "inline-block",
  padding: "0.3rem 0.65rem",
  borderRadius: "20px",
  background: "#DDECF8",
  color: "#1E5F9C",
  fontSize: "0.68rem",
  fontWeight: "700",
};

const audienceBadgeStyle = {
  display: "inline-block",
  padding: "0.3rem 0.65rem",
  borderRadius: "20px",
  background: "#EEF2F6",
  color: "#475569",
  fontSize: "0.68rem",
  fontWeight: "700",
};

const contentHeadingStyle = {
  margin: 0,
  color: "#0B2545",
  fontSize: "1.15rem",
};

const contentTextStyle = {
  margin: "0.85rem 0 0",
  color: "#334155",
  fontSize: "0.93rem",
  lineHeight: 1.75,
  whiteSpace: "pre-line",
};

const detailsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "0.7rem",
  marginTop: "1rem",
};

const detailCardStyle = {
  background: "#FFFFFF",
  border: "1px solid #E0E7EF",
  borderRadius: "8px",
  padding: "0.75rem",
};

const detailLabelStyle = {
  color: "#94A3B8",
  fontSize: "0.67rem",
  fontWeight: "700",
  marginBottom: "0.28rem",
};

const detailValueStyle = {
  color: "#0B2545",
  fontSize: "0.78rem",
  fontWeight: "700",
};

const hashtagSectionStyle = {
  marginTop: "1rem",
};

const hashtagTitleStyle = {
  fontSize: "0.74rem",
  color: "#0B2545",
  fontWeight: "700",
  marginBottom: "0.5rem",
};

const hashtagWrapperStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.45rem",
};

const hashtagStyle = {
  background: "#DDECF8",
  color: "#1E5F9C",
  fontSize: "0.72rem",
  padding: "0.3rem 0.62rem",
  borderRadius: "20px",
  fontWeight: "600",
};

const actionsWrapperStyle = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "0.65rem",
  marginTop: "1.35rem",
};

const editButtonStyle = {
  padding: "0.58rem 0.95rem",
  background: "#FFFFFF",
  border: "1px solid #CBD5E1",
  borderRadius: "7px",
  color: "#334155",
  fontWeight: "600",
  cursor: "pointer",
};

const approveButtonStyle = {
  padding: "0.58rem 0.95rem",
  background: "#DCFCE7",
  color: "#166534",
  border: "none",
  borderRadius: "7px",
  fontWeight: "700",
  cursor: "pointer",
};

const publishButtonStyle = {
  padding: "0.58rem 0.95rem",
  background: "#0B2545",
  color: "#FFFFFF",
  border: "none",
  borderRadius: "7px",
  fontWeight: "700",
  cursor: "pointer",
};

const loadingStateStyle = {
  minHeight: "360px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
};

const loadingSpinnerStyle = {
  color: "#4F88B8",
  fontSize: "2.2rem",
};

const loadingTitleStyle = {
  margin: "0.7rem 0 0.4rem",
  color: "#0B2545",
};

const loadingTextStyle = {
  maxWidth: "480px",
  color: "#64748B",
  lineHeight: 1.6,
  margin: 0,
};
