export default function Latest() {
  return (
    <div className="page-shell">
      <div className="page-eyebrow">POLARCROSS KNOWLEDGE FEED</div>

      <h1 className="page-title">Latest</h1>

      <p className="page-subtitle">
        New expeditions, research, publications and institutional updates.
      </p>

      <div className="latest-list">
        {feedItems.map((item) => (
          <article key={item.id} className="latest-card">
            <div className="latest-card-top">
              <span className="latest-tag" style={tagColors[item.tag]}>
                {item.tag}
              </span>

              <span className="latest-date">{item.date}</span>
            </div>

            <h3>{item.title}</h3>

            <p>{item.summary}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   DATA
   ========================================================= */

const feedItems = [
  {
    id: 1,
    tag: "Expedition",
    title: "39th Indian Antarctic Expedition Departs",
    summary:
      "A new research team has departed for Bharati Station to continue long-term glaciology and atmospheric monitoring programmes.",
    date: "Sep 22, 2026",
  },
  {
    id: 2,
    tag: "Publication",
    title: "Sea Ice Variability in the Southern Ocean",
    summary:
      "New research findings examine multi-decadal sea ice trends observed near the Indian research stations.",
    date: "Sep 20, 2026",
  },
  {
    id: 3,
    tag: "Dataset",
    title: "Maitri Station Weather Records (2020–2026)",
    summary:
      "A newly released dataset covering temperature, wind and pressure observations from Maitri Station.",
    date: "Sep 15, 2026",
  },
  {
    id: 4,
    tag: "Media",
    title: "Photo Series: Life at Bharati Station",
    summary:
      "A curated photo collection documenting daily research operations and the Antarctic landscape.",
    date: "Sep 5, 2026",
  },
  {
    id: 5,
    tag: "Institutional",
    title: "NCPOR Signs New Research Collaboration",
    summary:
      "A new collaboration expands joint polar research initiatives with international partner institutions.",
    date: "Aug 30, 2026",
  },
];

const tagColors = {
  Expedition: {
    background: "#DCECF8",
    color: "#1E5F9C",
  },

  Publication: {
    background: "#E8EDF2",
    color: "#0B2545",
  },

  Dataset: {
    background: "#DCFCE7",
    color: "#166534",
  },

  Media: {
    background: "#E8F2F8",
    color: "#17658E",
  },

  Institutional: {
    background: "#E8EEF7",
    color: "#315579",
  },
};
