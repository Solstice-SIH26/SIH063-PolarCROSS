import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* ---------- Custom marker icons (CSS-drawn, so no image assets needed) ---------- */

const iconCache = {};

function getIcon(type, selected) {
  const key = `${type}-${selected}`;

  if (!iconCache[key]) {
    iconCache[key] = L.divIcon({
      className: `pc-marker pc-marker--${type.toLowerCase()} ${
        selected ? "pc-marker--selected" : ""
      }`,
      html: `<span>${typeGlyph[type]}</span>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      popupAnchor: [0, -16],
    });
  }

  return iconCache[key];
}

/* ---------- Moves the map when region or selection changes ---------- */

function MapController({ region, selected, markerRefs }) {
  const map = useMap();

  useEffect(() => {
    const view = regions[region];
    map.flyTo(view.center, view.zoom, { duration: 1.1 });
  }, [region, map]);

  useEffect(() => {
    if (!selected) return;

    map.flyTo([selected.lat, selected.lng], Math.max(map.getZoom(), 6), {
      duration: 1.1,
    });

    map.once("moveend", () => {
      markerRefs.current[selected.id]?.openPopup();
    });
  }, [selected, map, markerRefs]);

  return null;
}

/* ---------- Page ---------- */

export default function PolarMap() {
  const [region, setRegion] = useState("All");
  const [category, setCategory] = useState("All");
  const [selectedId, setSelectedId] = useState(null);
  const markerRefs = useRef({});

  const visible = locations.filter(
    (loc) =>
      (region === "All" || loc.region === region) &&
      (category === "All" || loc.type === category),
  );

  // Selection is only valid while the selected marker is still visible
  const selected = visible.find((loc) => loc.id === selectedId) || null;

  return (
    <div className="page-shell">
      <div className="page-eyebrow">EXPLORE THE REGION</div>

      <h1 className="page-title">Polar Map</h1>

      <p className="page-subtitle">
        Research stations, expedition sites and scientific activity across
        India's Antarctic and Arctic programmes.
      </p>

      {/* FILTERS */}
      <div className="map-toolbar">
        <div className="map-chip-group">
          {Object.keys(regions).map((name) => (
            <button
              key={name}
              className={`map-chip ${region === name ? "active" : ""}`}
              onClick={() => {
                setRegion(name);
                setSelectedId(null);
              }}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="map-chip-group">
          {categories.map((name) => (
            <button
              key={name}
              className={`map-chip map-chip--soft ${
                category === name ? "active" : ""
              }`}
              onClick={() => setCategory(name)}
            >
              {name === "All" ? "All types" : name}
            </button>
          ))}
        </div>
      </div>

      <div className="map-layout">
        {/* SIDEBAR */}
        <aside className="map-sidebar">
          {selected ? (
            <div className="map-detail">
              <button
                className="map-detail-back"
                onClick={() => setSelectedId(null)}
              >
                ← All locations
              </button>

              <div className="map-detail-meta">
                {selected.type.toUpperCase()} · {selected.region.toUpperCase()}
              </div>

              <h3 className="map-detail-title">{selected.name}</h3>

              <p className="map-detail-place">📍 {selected.place}</p>

              <p className="map-detail-text">{selected.summary}</p>

              <div className="map-detail-stats">
                {selected.stats.map((stat) => (
                  <div key={stat.label} className="map-detail-stat">
                    <div className="map-detail-stat-value">{stat.value}</div>
                    <div className="map-detail-stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="featured-tags">
                {selected.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="map-detail-coords">
                {formatCoord(selected.lat, "N", "S")} ·{" "}
                {formatCoord(selected.lng, "E", "W")}
              </div>
            </div>
          ) : (
            <>
              <div className="map-list-title">
                {visible.length} location{visible.length === 1 ? "" : "s"}
              </div>

              <div className="map-list">
                {visible.map((loc) => (
                  <button
                    key={loc.id}
                    className="map-list-item"
                    onClick={() => setSelectedId(loc.id)}
                  >
                    <span
                      className={`map-dot map-dot--${loc.type.toLowerCase()}`}
                    />

                    <span className="map-list-text">
                      <span className="map-list-name">{loc.name}</span>
                      <span className="map-list-sub">
                        {loc.type} · {loc.place}
                      </span>
                    </span>
                  </button>
                ))}

                {visible.length === 0 && (
                  <p className="map-empty">No locations match these filters.</p>
                )}
              </div>
            </>
          )}
        </aside>

        {/* MAP */}
        <div className="map-wrap">
          <MapContainer
            center={regions.All.center}
            zoom={regions.All.zoom}
            minZoom={2}
            worldCopyJump
            scrollWheelZoom
            className="map-canvas"
          >
            <LayersControl position="topright">
              <LayersControl.BaseLayer checked name="Satellite">
                <TileLayer
                  attribution="Tiles &copy; Esri"
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                />
              </LayersControl.BaseLayer>

              <LayersControl.BaseLayer name="Light">
                <TileLayer
                  attribution="&copy; OpenStreetMap contributors &copy; CARTO"
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                  subdomains="abcd"
                />
              </LayersControl.BaseLayer>
            </LayersControl>

            {visible.map((loc) => (
              <Marker
                key={loc.id}
                position={[loc.lat, loc.lng]}
                icon={getIcon(loc.type, loc.id === selectedId)}
                ref={(marker) => {
                  if (marker) markerRefs.current[loc.id] = marker;
                }}
                eventHandlers={{ click: () => setSelectedId(loc.id) }}
              >
                <Popup>
                  <div className="map-popup">
                    <div className="map-popup-meta">
                      {loc.type.toUpperCase()}
                    </div>
                    <div className="map-popup-title">{loc.name}</div>
                    <div className="map-popup-place">{loc.place}</div>
                    <p className="map-popup-text">{loc.summary}</p>
                  </div>
                </Popup>
              </Marker>
            ))}

            <MapController
              region={region}
              selected={selected}
              markerRefs={markerRefs}
            />
          </MapContainer>

          <div className="map-legend">
            <span>
              <span className="map-dot map-dot--station" /> Station
            </span>
            <span>
              <span className="map-dot map-dot--expedition" /> Expedition
            </span>
            <span>
              <span className="map-dot map-dot--research" /> Research
            </span>
          </div>
        </div>
      </div>

      <p className="map-note">
        Prototype view — station coordinates are approximate; expedition and
        research entries use illustrative sample data.
      </p>
    </div>
  );
}

function formatCoord(value, pos, neg) {
  return `${Math.abs(value).toFixed(2)}° ${value >= 0 ? pos : neg}`;
}

/* =========================================================
   DATA
   ========================================================= */

const typeGlyph = {
  Station: "✦",
  Expedition: "➤",
  Research: "◆",
};

const categories = ["All", "Station", "Expedition", "Research"];

const regions = {
  All: { center: [-5, 30], zoom: 2 },
  Antarctica: { center: [-72, 44], zoom: 4 },
  Arctic: { center: [79, 15], zoom: 5 },
};

const locations = [
  /* ---------- Stations ---------- */
  {
    id: "maitri",
    name: "Maitri Station",
    type: "Station",
    region: "Antarctica",
    place: "Schirmacher Oasis, Antarctica",
    lat: -70.77,
    lng: 11.73,
    summary:
      "India's long-running permanent Antarctic research station, supporting year-round meteorology, geology and upper-atmosphere studies.",
    stats: [
      { label: "Established", value: "1989" },
      { label: "Winter crew", value: "~25" },
      { label: "Active projects", value: "12" },
    ],
    tags: ["Meteorology", "Geology", "Atmospheric Science"],
  },
  {
    id: "bharati",
    name: "Bharati Station",
    type: "Station",
    region: "Antarctica",
    place: "Larsemann Hills, Antarctica",
    lat: -69.41,
    lng: 76.19,
    summary:
      "India's newest Antarctic station, a base for glaciology, oceanography and long-term environmental monitoring in the Larsemann Hills.",
    stats: [
      { label: "Established", value: "2012" },
      { label: "Winter crew", value: "~47" },
      { label: "Active projects", value: "15" },
    ],
    tags: ["Glaciology", "Marine Research", "Climate"],
  },
  {
    id: "himadri",
    name: "Himadri Station",
    type: "Station",
    region: "Arctic",
    place: "Ny-Ålesund, Svalbard",
    lat: 78.92,
    lng: 11.93,
    summary:
      "India's Arctic research station, supporting atmospheric, glacial and fjord studies in the Svalbard archipelago.",
    stats: [
      { label: "Established", value: "2008" },
      { label: "Season", value: "Year-round" },
      { label: "Active projects", value: "8" },
    ],
    tags: ["Arctic", "Glaciology", "Fjord Studies"],
  },

  /* ---------- Expeditions ---------- */
  {
    id: "iae-38",
    name: "38th Indian Antarctic Expedition",
    type: "Expedition",
    region: "Antarctica",
    place: "Bharati Research Station",
    lat: -69.3,
    lng: 75.6,
    summary:
      "A multidisciplinary mission bringing together glaciology, atmospheric science and marine research teams.",
    stats: [
      { label: "Season", value: "2018–19" },
      { label: "Team size", value: "42" },
      { label: "Datasets", value: "18" },
    ],
    tags: ["Glaciology", "Atmospheric Science", "Marine Research"],
  },
  {
    id: "iae-39",
    name: "39th Indian Antarctic Expedition",
    type: "Expedition",
    region: "Antarctica",
    place: "En route to Bharati Station",
    lat: -66.2,
    lng: 58.4,
    summary:
      "The latest expedition team has departed to continue long-term glaciology and atmospheric monitoring programmes.",
    stats: [
      { label: "Season", value: "2026–27" },
      { label: "Team size", value: "46" },
      { label: "Status", value: "Underway" },
    ],
    tags: ["Glaciology", "Monitoring"],
  },
  {
    id: "so-transect",
    name: "Southern Ocean Sea-Ice Transect",
    type: "Expedition",
    region: "Antarctica",
    place: "Southern Ocean",
    lat: -62.5,
    lng: 38.0,
    summary:
      "A ship-based transect sampling sea-ice extent, ocean temperature and salinity along the route south.",
    stats: [
      { label: "Season", value: "2025–26" },
      { label: "Stations sampled", value: "34" },
      { label: "Datasets", value: "6" },
    ],
    tags: ["Oceanography", "Sea Ice"],
  },
  {
    id: "svalbard-field",
    name: "Kongsfjorden Field Campaign",
    type: "Expedition",
    region: "Arctic",
    place: "Kongsfjorden, Svalbard",
    lat: 78.99,
    lng: 12.4,
    summary:
      "A summer field campaign studying glacier-fed fjord ecosystems and meltwater influence on marine life.",
    stats: [
      { label: "Season", value: "Summer 2026" },
      { label: "Team size", value: "14" },
      { label: "Datasets", value: "4" },
    ],
    tags: ["Fjord Studies", "Marine Biology"],
  },

  /* ---------- Research sites ---------- */
  {
    id: "schirmacher",
    name: "Schirmacher Oasis Glaciology Site",
    type: "Research",
    region: "Antarctica",
    place: "Schirmacher Oasis, Antarctica",
    lat: -70.74,
    lng: 11.4,
    summary:
      "Ice-flow and surface mass-balance measurements across the oasis margin, feeding long-term glacier change records.",
    stats: [
      { label: "Since", value: "2005" },
      { label: "Publications", value: "21" },
      { label: "Datasets", value: "9" },
    ],
    tags: ["Glaciology", "Mass Balance"],
  },
  {
    id: "larsemann-atm",
    name: "Larsemann Hills Atmospheric Monitoring",
    type: "Research",
    region: "Antarctica",
    place: "Larsemann Hills, Antarctica",
    lat: -69.45,
    lng: 76.35,
    summary:
      "Continuous measurement of aerosols, radiation and trace gases in one of the cleanest atmospheric environments on Earth.",
    stats: [
      { label: "Since", value: "2013" },
      { label: "Publications", value: "17" },
      { label: "Datasets", value: "12" },
    ],
    tags: ["Atmospheric Science", "Aerosols"],
  },
  {
    id: "svalbard-ice",
    name: "Svalbard Glacier Mass-Balance Site",
    type: "Research",
    region: "Arctic",
    place: "Svalbard, Arctic",
    lat: 79.0,
    lng: 11.8,
    summary:
      "Stake and radar surveys tracking seasonal and long-term mass balance of a land-terminating Arctic glacier.",
    stats: [
      { label: "Since", value: "2010" },
      { label: "Publications", value: "11" },
      { label: "Datasets", value: "5" },
    ],
    tags: ["Glaciology", "Arctic", "Climate"],
  },
];
