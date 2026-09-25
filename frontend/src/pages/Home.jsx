export default function Home() {
  return (
    <div className="home-page">
      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <div className="hero-eyebrow">
              INDIA'S POLAR KNOWLEDGE PORTAL
            </div>

            <h1 className="hero-title">
              PolarCROSS
            </h1>

            <p className="hero-subtitle">
              Making India's Polar Science Accessible
            </p>

            <p className="hero-description">
              Explore expeditions, scientific research,
              publications, datasets and multimedia from
              India's polar research programme.
            </p>

            <div className="hero-search">
              <span className="hero-search-icon">
                ⌕
              </span>

              <input
                type="text"
                placeholder="Search expeditions, publications, datasets..."
              />

              <button>Search</button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        {stats.map((stat) => (
          <div
            className="stat-card"
            key={stat.label}
          >
            <div className="stat-number">
              {stat.value}
            </div>

            <div className="stat-label">
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      {/* FEATURED EXPEDITION */}
      <section className="section">
        <div className="section-heading">
          <div>
            <div className="section-eyebrow">
              EXPEDITION HIGHLIGHT
            </div>

            <h2 className="section-title">
              Featured Expedition
            </h2>
          </div>

          <span className="section-link">
            Explore Expeditions →
          </span>
        </div>

        <div className="featured-card">
          <div className="featured-image-wrap">
            <img
              src="/expedition.jpg"
              alt="Researchers during a polar expedition"
              className="featured-image"
            />

            <span className="featured-image-badge">
              EXPEDITION
            </span>
          </div>

          <div className="featured-content">
            <div className="featured-meta">
              INDIAN ANTARCTIC PROGRAMME
            </div>

            <h3 className="featured-title">
              38th Indian Antarctic Expedition
            </h3>

            <p className="featured-location">
              📍 Bharati Research Station, Antarctica
            </p>

            <p className="featured-description">
              A multidisciplinary research mission bringing
              together scientific teams working across
              glaciology, atmospheric science and marine
              research in one of Earth's most extreme
              environments.
            </p>

            <div className="featured-tags">
              <span className="tag">Glaciology</span>
              <span className="tag">
                Atmospheric Science
              </span>
              <span className="tag">Marine Research</span>
            </div>

            <button className="featured-button">
              Explore Expedition →
            </button>
          </div>
        </div>
      </section>

      {/* LATEST RESEARCH */}
      <section className="section">
        <div className="section-heading">
          <div>
            <div className="section-eyebrow">
              KNOWLEDGE DISCOVERY
            </div>

            <h2 className="section-title">
              Latest Research
            </h2>
          </div>

          <span className="section-link">
            View All →
          </span>
        </div>

        <div className="research-grid">
          {latestResearch.map((item) => (
            <article
              key={item.id}
              className="research-card"
            >
              <div className="research-top">
                <span className="research-category">
                  {item.tag}
                </span>

                <span className="research-date">
                  {item.date}
                </span>
              </div>

              <h3 className="research-title">
                {item.title}
              </h3>

              <p className="research-text">
                Explore recent scientific findings,
                research resources and developments from
                India's polar knowledge ecosystem.
              </p>

              <div className="research-more">
                Read more →
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* POLAR MAP */}
      <section className="section">
        <div className="section-heading">
          <div>
            <div className="section-eyebrow">
              EXPLORE THE REGION
            </div>

            <h2 className="section-title">
              Polar Map
            </h2>
          </div>

          <span className="section-link">
            Open Full Map →
          </span>
        </div>

        <div className="map-preview">
          <div className="map-inner">
            <div className="map-icon">
              ◉
            </div>

            <h3 className="map-title">
              Explore India's Polar Research
            </h3>

            <p className="map-description">
              Discover research stations, expedition
              locations and scientific activity across
              the polar regions.
            </p>

            <div className="map-points">
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


/* =========================================================
   DATA
   ========================================================= */

const stats = [
  {
    label: "Expeditions",
    value: "42",
  },
  {
    label: "Publications",
    value: "1,240",
  },
  {
    label: "Datasets",
    value: "326",
  },
  {
    label: "Photo Collections",
    value: "250+",
  },
  {
    label: "Video Resources",
    value: "48",
  },
  {
    label: "Institutional Updates",
    value: "75",
  },
];

const latestResearch = [
  {
    id: 1,
    tag: "Publication",
    title:
      "Sea Ice Variability in the Southern Ocean",
    date: "Sep 20, 2026",
  },
  {
    id: 2,
    tag: "Dataset",
    title:
      "Maitri Station Weather Records 2020–2026",
    date: "Sep 15, 2026",
  },
  {
    id: 3,
    tag: "Expedition",
    title:
      "39th Antarctic Expedition — Team Departs",
    date: "Sep 10, 2026",
  },
  {
    id: 4,
    tag: "Media",
    title:
      "Photo Series: Life at Bharati Station",
    date: "Sep 5, 2026",
  },
];