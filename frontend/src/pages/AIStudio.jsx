import { useEffect, useRef, useState } from "react";

const STEP_MS = 650;

export default function AIStudio() {
  const [source, setSource] = useState(sourceOptions[0]);
  const [audience, setAudience] = useState(audienceOptions[0]);
  const [platform, setPlatform] = useState(platformOptions[0]);
  const [tone, setTone] = useState(toneOptions[0]);
  const [language, setLanguage] = useState("English");
  const [contentType, setContentType] = useState("Social Media Post");

  // Settings as currently selected in the form
  const config = {
    source,
    audience,
    platform,
    tone,
    language,
    contentType: resolveType(platform, contentType),
  };

  const [generated, setGenerated] = useState(() => buildOutput(config));
  const [runConfig, setRunConfig] = useState(generated.config);

  // "pipeline" -> "streaming" -> "done"
  const [phase, setPhase] = useState("done");
  const [stage, setStage] = useState(0);
  const [revealed, setRevealed] = useState(generated.content.length);

  // "draft" -> "approved" -> "published"
  const [status, setStatus] = useState("draft");
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  const timers = useRef([]);

  useEffect(() => {
    const pending = timers.current;

    return () => {
      pending.forEach((id) => {
        clearTimeout(id);
        clearInterval(id);
      });
    };
  }, []);

  function clearTimers() {
    timers.current.forEach((id) => {
      clearTimeout(id);
      clearInterval(id);
    });

    timers.current.length = 0;
  }

  function handleGenerate() {
    clearTimers();

    const output = buildOutput(config);

    setRunConfig(output.config);
    setPhase("pipeline");
    setStage(0);
    setStatus("draft");
    setEditing(false);
    setCopied(false);

    // Step through the pipeline
    pipelineSteps.forEach((_, i) => {
      if (i === 0) return;

      timers.current.push(setTimeout(() => setStage(i), i * STEP_MS));
    });

    // Then stream the finished text in
    timers.current.push(
      setTimeout(() => {
        setGenerated(output);
        setRevealed(0);
        setPhase("streaming");

        let position = 0;

        const id = setInterval(() => {
          position += 7;
          setRevealed(position);

          if (position >= output.content.length) {
            clearInterval(id);
            setPhase("done");
          }
        }, 18);

        timers.current.push(id);
      }, pipelineSteps.length * STEP_MS),
    );
  }

  function handleContentChange(value) {
    setGenerated((prev) => ({ ...prev, content: value }));

    // Any edit after approval sends it back for review
    if (status === "approved") setStatus("draft");
  }

  function handleCopy() {
    navigator.clipboard?.writeText(generated.content).catch(() => {});

    setCopied(true);

    timers.current.push(setTimeout(() => setCopied(false), 1600));
  }

  const loading = phase === "pipeline";
  const streaming = phase === "streaming";
  const ready = phase === "done";

  const settingsChanged =
    JSON.stringify(config) !== JSON.stringify(generated.config);

  const shownText = generated.content.slice(0, revealed);

  const statusPill = statusPills[status];

  return (
    <div style={pageWrapperStyle}>
      <style>{`@keyframes pcPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>

      <div style={pageIntroStyle}>
        <div style={eyebrowStyle}>POLARCROSS CONTENT ENGINE</div>

        <h1 style={titleStyle}>AI Outreach Studio</h1>

        <p style={subtitleStyle}>
          Turn scientific research into audience-specific website and social
          media content.
        </p>
      </div>

      <div className="ai-layout">
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
            style={{
              ...selectStyle,
              opacity: platform === "Website Article" ? 0.65 : 1,
            }}
            value={config.contentType}
            disabled={platform === "Website Article"}
            onChange={(e) => setContentType(e.target.value)}
          >
            {typeOptionsFor(platform).map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>

          <button
            style={{
              ...generateButtonStyle,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "wait" : "pointer",
            }}
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "Generating..." : "✦ Generate Content"}
          </button>

          {settingsChanged && ready && (
            <div style={hintStyle}>
              Settings changed — generate again to apply them.
            </div>
          )}
        </div>

        {/* ================= OUTPUT ================= */}
        <div style={outputPanelStyle}>
          <div style={outputTopRowStyle}>
            <div>
              <div style={outputEyebrowStyle}>AI-GENERATED OUTREACH</div>

              <h2 style={outputTitleStyle}>
                {loading ? runConfig.contentType : generated.config.contentType}
              </h2>
            </div>

            <div style={badgeStackStyle}>
              <div style={verifiedBadgeStyle}>✓ Source Grounded</div>

              {!loading && (
                <div style={{ ...statusPillBase, ...statusPill.style }}>
                  {statusPill.label}
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <div style={pipelineWrapStyle}>
              <div style={pipelineTitleStyle}>Generating outreach content</div>

              <div style={progressTrackStyle}>
                <div
                  style={{
                    ...progressFillStyle,
                    width: `${((stage + 1) / pipelineSteps.length) * 100}%`,
                  }}
                />
              </div>

              {pipelineSteps.map((build, i) => {
                const step = build(runConfig);
                const done = i < stage;
                const active = i === stage;

                return (
                  <div
                    key={step.title}
                    style={{
                      ...pipelineRowStyle,
                      opacity: done || active ? 1 : 0.45,
                    }}
                  >
                    <div
                      style={{
                        ...pipelineIconStyle,
                        ...(done
                          ? pipelineIconDone
                          : active
                            ? pipelineIconActive
                            : {}),
                      }}
                    >
                      {done ? "✓" : active ? "✦" : i + 1}
                    </div>

                    <div>
                      <div style={pipelineStepTitleStyle}>{step.title}</div>
                      <div style={pipelineStepDetailStyle}>{step.detail}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <>
              <div style={sourceBoxStyle}>
                <div style={sourceBoxLabelStyle}>RESEARCH SOURCE</div>

                <div style={sourceBoxValueStyle}>{generated.config.source}</div>

                <div style={sourceMetaStyle}>
                  {generated.passages} passages retrieved ·{" "}
                  {generated.refs.length} references linked
                </div>
              </div>

              {status === "published" && (
                <div style={publishedBannerStyle}>
                  ✓ Published — sent to the PolarCROSS publishing queue.
                </div>
              )}

              <div style={contentCardStyle}>
                <div style={platformRowStyle}>
                  <span style={platformBadgeStyle}>
                    {generated.config.platform}
                  </span>

                  <span style={audienceBadgeStyle}>
                    {generated.config.audience}
                  </span>

                  <span style={audienceBadgeStyle}>{generated.format}</span>
                </div>

                <h3 style={contentHeadingStyle}>{generated.heading}</h3>

                {editing ? (
                  <textarea
                    style={textareaStyle}
                    value={generated.content}
                    onChange={(e) => handleContentChange(e.target.value)}
                    rows={Math.min(
                      18,
                      Math.max(6, generated.content.split("\n").length + 2),
                    )}
                  />
                ) : (
                  <p style={contentTextStyle}>
                    {shownText}
                    {streaming && <span style={caretStyle}>▍</span>}
                  </p>
                )}

                <div style={metaLineStyle}>{generated.meta}</div>
              </div>

              <div className="ai-details">
                <div style={detailCardStyle}>
                  <div style={detailLabelStyle}>Audience</div>
                  <div style={detailValueStyle}>
                    {generated.config.audience}
                  </div>
                </div>

                <div style={detailCardStyle}>
                  <div style={detailLabelStyle}>Platform</div>
                  <div style={detailValueStyle}>
                    {generated.config.platform}
                  </div>
                </div>

                <div style={detailCardStyle}>
                  <div style={detailLabelStyle}>Language</div>
                  <div style={detailValueStyle}>
                    {generated.config.language}
                  </div>
                </div>

                <div style={detailCardStyle}>
                  <div style={detailLabelStyle}>Tone</div>
                  <div style={detailValueStyle}>{generated.config.tone}</div>
                </div>
              </div>

              <div style={refsBoxStyle}>
                <div style={sourceBoxLabelStyle}>SOURCE REFERENCES</div>

                {generated.refs.map((ref) => (
                  <div key={ref.n} style={refRowStyle}>
                    <span style={refNumberStyle}>[{ref.n}]</span>

                    <span>
                      <span style={refTitleStyle}>{ref.title}</span>
                      <span style={refMetaStyle}>
                        {" "}
                        — {ref.org} · {ref.loc}
                      </span>
                    </span>
                  </div>
                ))}
              </div>

              <div style={hashtagSectionStyle}>
                <div style={hashtagTitleStyle}>{generated.tagLabel}</div>

                <div style={hashtagWrapperStyle}>
                  {generated.hashtags.map((tag) => (
                    <span key={tag} style={hashtagStyle}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div style={actionsWrapperStyle}>
                <button
                  style={editButtonStyle}
                  onClick={handleCopy}
                  disabled={!ready}
                >
                  {copied ? "✓ Copied" : "Copy"}
                </button>

                <button
                  style={{
                    ...editButtonStyle,
                    ...(!ready || status === "published" ? disabledStyle : {}),
                  }}
                  onClick={() => setEditing((e) => !e)}
                  disabled={!ready || status === "published"}
                >
                  {editing ? "Done" : "Edit"}
                </button>

                <button
                  style={{
                    ...approveButtonStyle,
                    ...(!ready || editing || status !== "draft"
                      ? disabledStyle
                      : {}),
                  }}
                  onClick={() => setStatus("approved")}
                  disabled={!ready || editing || status !== "draft"}
                >
                  ✓ {status === "draft" ? "Approve" : "Approved"}
                </button>

                <button
                  style={{
                    ...publishButtonStyle,
                    ...(status !== "approved" ? disabledStyle : {}),
                  }}
                  onClick={() => setStatus("published")}
                  disabled={status !== "approved"}
                  title={
                    status === "draft"
                      ? "Approve the draft before publishing"
                      : undefined
                  }
                >
                  {status === "published" ? "Published ✓" : "Publish"}
                </button>
              </div>

              <div style={noteStyle}>
                Prototype — content is generated from pre-written templates, not
                a live model.
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= GENERATION LOGIC ================= */

function resolveType(platform, contentType) {
  if (platform === "Website Article") return "Website Article";

  return contentType === "Educational Summary"
    ? "Educational Summary"
    : "Social Media Post";
}

function typeOptionsFor(platform) {
  return platform === "Website Article"
    ? ["Website Article"]
    : ["Social Media Post", "Educational Summary"];
}

function buildOutput(cfg) {
  const src = sources[cfg.source];
  const L = cfg.language === "Hindi" ? "hi" : "en";
  const t = toneStyles[cfg.tone][L];

  const hook = t.hookPrefix + src.hook[L];
  const facts = src.facts.map((f) => f[L]);
  const angle = angles[cfg.audience][L];
  const cta = ctas[cfg.audience][L];
  const slide = L === "hi" ? "स्लाइड" : "Slide";
  const cite = (i) => ` [${src.facts[i].ref}]`;

  const isWebsite = cfg.platform === "Website Article";
  const isTwitter = cfg.platform === "Twitter / X";
  const isEducational = cfg.contentType === "Educational Summary";

  let content;
  let format;

  if (isWebsite) {
    format = "Article";

    content = [
      hook,
      facts[0] + cite(0),
      facts[1] + cite(1),
      facts[2] + cite(2),
      angle,
      cta,
    ].join("\n\n");
  } else if (isTwitter && isEducational) {
    format = "Thread · 5 posts";

    content = [
      `1/ ${hook}`,
      `2/ ${facts[0]}`,
      `3/ ${facts[1]}`,
      `4/ ${facts[2]}`,
      `5/ ${cta}`,
    ].join("\n\n");
  } else if (isTwitter) {
    format = "Single post";

    content = `${t.shortPrefix}${src.short[L]}${
      t.signoff ? " " + t.signoff : ""
    }`;
  } else if (isEducational) {
    format = "Carousel · 5 slides";

    content = [
      `${slide} 1\n${hook}`,
      `${slide} 2\n${facts[0]}`,
      `${slide} 3\n${facts[1]}`,
      `${slide} 4\n${facts[2]}`,
      `${slide} 5\n${angle} ${cta}`,
    ].join("\n\n");
  } else {
    format = "Caption";

    content = [
      hook,
      `${t.bullet}${facts[0]}\n${t.bullet}${facts[1]}`,
      angle,
      `${cta}${t.signoff ? " " + t.signoff : ""}`,
    ].join("\n\n");
  }

  const words = content.trim().split(/\s+/).length;

  let meta = `${words} words`;

  if (isTwitter && !isEducational) {
    meta = `${content.length} / 280 characters`;
  } else if (isWebsite) {
    meta = `${words} words · ${Math.max(1, Math.round(words / 200))} min read`;
  }

  const tagCount = isTwitter ? 3 : isWebsite ? 4 : 5;

  return {
    config: cfg,
    content,
    format,
    meta,
    heading: src.title[L],
    hashtags: src.tags.slice(0, tagCount),
    tagLabel: isWebsite ? "Suggested Keywords" : "Suggested Hashtags",
    refs: src.refs,
    passages: src.facts.length,
  };
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

const pipelineSteps = [
  (c) => ({
    title: "Retrieving source passages",
    detail: `Matching relevant sections of "${c.source}"`,
  }),
  (c) => ({
    title: "Drafting content",
    detail: `Writing for ${c.audience.toLowerCase()} in a ${c.tone.toLowerCase()} tone`,
  }),
  (c) => ({
    title: "Adapting for channel",
    detail: `Formatting for ${c.platform} · ${c.language}`,
  }),
  () => ({
    title: "Attaching source references",
    detail: "Linking each claim back to the original research",
  }),
  () => ({
    title: "Preparing editorial review",
    detail: "Draft ready for human approval",
  }),
];

const sources = {
  "38th Indian Antarctic Expedition Report": {
    title: {
      en: "Inside India's 38th Antarctic Expedition",
      hi: "भारत के 38वें अंटार्कटिक अभियान की झलक",
    },
    hook: {
      en: "What does it take to do science at the bottom of the world?",
      hi: "दुनिया के सबसे दक्षिणी छोर पर विज्ञान करने के लिए क्या-क्या चाहिए?",
    },
    facts: [
      {
        ref: 1,
        en: "A multidisciplinary team worked across glaciology, atmospheric science and marine research at Bharati Station.",
        hi: "भारती स्टेशन पर एक बहु-विषयक दल ने हिमनद विज्ञान, वायुमंडलीय विज्ञान और समुद्री अनुसंधान में काम किया।",
      },
      {
        ref: 1,
        en: "Long-term monitoring helps scientists separate natural year-to-year variation from lasting change in polar systems.",
        hi: "लंबे समय की निगरानी से वैज्ञानिक सामान्य वार्षिक उतार-चढ़ाव और ध्रुवीय तंत्र में स्थायी बदलाव के बीच अंतर कर पाते हैं।",
      },
      {
        ref: 2,
        en: "Observations and samples collected during the expedition feed datasets that the wider research community can reuse.",
        hi: "अभियान के दौरान जुटाए गए अवलोकन और नमूने ऐसे डेटासेट बनाते हैं जिन्हें व्यापक शोध समुदाय दोबारा उपयोग कर सकता है।",
      },
    ],
    short: {
      en: "India's 38th Antarctic Expedition brought glaciologists, atmospheric scientists and marine researchers together at Bharati Station to study one of Earth's most extreme environments.",
      hi: "भारत के 38वें अंटार्कटिक अभियान में भारती स्टेशन पर हिमनद, वायुमंडल और समुद्री विज्ञान के शोधकर्ताओं ने मिलकर धरती के सबसे कठिन वातावरणों में से एक का अध्ययन किया।",
    },
    tags: [
      "#PolarScience",
      "#Antarctica",
      "#IndiaInAntarctica",
      "#NCPOR",
      "#BharatiStation",
      "#ClimateResearch",
    ],
    refs: [
      {
        n: 1,
        title: "38th Indian Antarctic Expedition Report — Scientific Summary",
        org: "NCPOR",
        loc: "Sections 2–4",
      },
      {
        n: 2,
        title: "Expedition Dataset Catalogue — Bharati Station",
        org: "PolarCROSS Repository",
        loc: "Catalogue entry",
      },
    ],
  },

  "Sea Ice Variability in the Southern Ocean (Publication)": {
    title: {
      en: "Why Antarctic Sea Ice Matters",
      hi: "अंटार्कटिक समुद्री बर्फ़ क्यों मायने रखती है",
    },
    hook: {
      en: "Every year, a vast belt of sea ice grows and melts around Antarctica.",
      hi: "हर साल अंटार्कटिका के चारों ओर समुद्री बर्फ़ की एक विशाल पट्टी बनती और पिघलती है।",
    },
    facts: [
      {
        ref: 1,
        en: "Sea-ice extent swings with the seasons, and the pattern differs from one part of the Southern Ocean to another.",
        hi: "समुद्री बर्फ़ का विस्तार मौसम के साथ घटता-बढ़ता है और दक्षिणी महासागर के अलग-अलग हिस्सों में इसका पैटर्न अलग होता है।",
      },
      {
        ref: 1,
        en: "Changes in sea ice influence ocean circulation, weather patterns and the ecosystems that depend on the ice.",
        hi: "समुद्री बर्फ़ में बदलाव महासागरीय धाराओं, मौसम के पैटर्न और बर्फ़ पर निर्भर पारिस्थितिक तंत्रों को प्रभावित करते हैं।",
      },
      {
        ref: 2,
        en: "Consistent multi-year observations are what let researchers tell short-term swings from long-term trends.",
        hi: "कई वर्षों के सतत अवलोकन ही शोधकर्ताओं को अल्पकालिक उतार-चढ़ाव और दीर्घकालिक रुझानों में फ़र्क़ करने देते हैं।",
      },
    ],
    short: {
      en: "Antarctic sea ice grows and shrinks every year. Tracking how it varies across the Southern Ocean helps us understand ocean circulation, weather and polar ecosystems.",
      hi: "अंटार्कटिक समुद्री बर्फ़ हर साल बढ़ती और घटती है। दक्षिणी महासागर में इसके बदलावों पर नज़र रखने से महासागरीय धाराओं, मौसम और ध्रुवीय पारिस्थितिकी को समझने में मदद मिलती है।",
    },
    tags: [
      "#SeaIce",
      "#SouthernOcean",
      "#Antarctica",
      "#ClimateScience",
      "#PolarScience",
      "#NCPOR",
    ],
    refs: [
      {
        n: 1,
        title: "Sea Ice Variability in the Southern Ocean",
        org: "Journal publication",
        loc: "Abstract & Discussion",
      },
      {
        n: 2,
        title: "Southern Ocean Sea-Ice Transect Dataset",
        org: "PolarCROSS Repository",
        loc: "Dataset record",
      },
    ],
  },

  "Maitri Station Weather Dataset 2020–2026": {
    title: {
      en: "Six Years of Weather at Maitri Station",
      hi: "मैत्री स्टेशन के छह वर्षों का मौसम",
    },
    hook: {
      en: "Six years of Antarctic weather, recorded around the clock at Maitri Station.",
      hi: "मैत्री स्टेशन पर चौबीसों घंटे दर्ज किया गया अंटार्कटिका के मौसम का छह वर्षों का लेखा-जोखा।",
    },
    facts: [
      {
        ref: 1,
        en: "Maitri Station has logged temperature, wind and pressure through the Antarctic seasons from 2020 to 2026.",
        hi: "मैत्री स्टेशन ने 2020 से 2026 तक अंटार्कटिक मौसमों में तापमान, हवा और दबाव दर्ज किए हैं।",
      },
      {
        ref: 1,
        en: "A continuous record from one location makes it easier to spot unusual events and slow shifts in local climate.",
        hi: "एक ही स्थान का सतत रिकॉर्ड असामान्य घटनाओं और स्थानीय जलवायु में धीमे बदलावों को पहचानना आसान बनाता है।",
      },
      {
        ref: 2,
        en: "The dataset is catalogued in the PolarCROSS repository so researchers and educators can find and reuse it.",
        hi: "यह डेटासेट PolarCROSS रिपॉज़िटरी में सूचीबद्ध है ताकि शोधकर्ता और शिक्षक इसे खोज और दोबारा उपयोग कर सकें।",
      },
    ],
    short: {
      en: "Six years of continuous weather records from Maitri Station (2020–2026) are now searchable on PolarCROSS: temperature, wind and pressure from Antarctica.",
      hi: "मैत्री स्टेशन (2020–2026) के छह वर्षों के सतत मौसम रिकॉर्ड अब PolarCROSS पर खोजे जा सकते हैं: अंटार्कटिका से तापमान, हवा और दबाव।",
    },
    tags: [
      "#Maitri",
      "#Antarctica",
      "#WeatherData",
      "#OpenData",
      "#PolarScience",
      "#NCPOR",
    ],
    refs: [
      {
        n: 1,
        title: "Maitri Station Weather Dataset 2020–2026",
        org: "NCPOR",
        loc: "Data tables",
      },
      {
        n: 2,
        title: "Maitri Station Observation Metadata",
        org: "PolarCROSS Repository",
        loc: "Metadata record",
      },
    ],
  },
};

const angles = {
  Students: {
    en: "This is real science you can study, question and one day be part of.",
    hi: "यह असली विज्ञान है जिसे आप पढ़ सकते हैं, जिस पर सवाल उठा सकते हैं और एक दिन जिसका हिस्सा भी बन सकते हैं।",
  },
  "General Public": {
    en: "What happens at the poles shapes weather, sea levels and food chains far from the ice, including here in India.",
    hi: "ध्रुवों पर जो होता है वह बर्फ़ से बहुत दूर, भारत समेत, मौसम, समुद्र-स्तर और खाद्य शृंखलाओं को प्रभावित करता है।",
  },
  Researchers: {
    en: "Cross-referencing these records with related datasets can strengthen comparative analysis and future field planning.",
    hi: "इन रिकॉर्ड का संबंधित डेटासेट से मिलान तुलनात्मक विश्लेषण और भावी फ़ील्ड योजना को मज़बूत कर सकता है।",
  },
  "Science Communicators": {
    en: "A clear, verifiable story like this makes it easier to explain polar research without losing scientific accuracy.",
    hi: "ऐसी स्पष्ट और सत्यापन-योग्य कहानी से ध्रुवीय शोध को वैज्ञानिक सटीकता खोए बिना समझाना आसान हो जाता है।",
  },
};

const ctas = {
  Students: {
    en: "Explore the research and datasets on PolarCROSS.",
    hi: "PolarCROSS पर शोध और डेटासेट देखें।",
  },
  "General Public": {
    en: "Discover India's polar research on PolarCROSS.",
    hi: "PolarCROSS पर भारत का ध्रुवीय शोध जानें।",
  },
  Researchers: {
    en: "Access the source record and related datasets on PolarCROSS.",
    hi: "PolarCROSS पर मूल रिकॉर्ड और संबंधित डेटासेट देखें।",
  },
  "Science Communicators": {
    en: "Find the full source and citations on PolarCROSS before you share.",
    hi: "साझा करने से पहले PolarCROSS पर पूरा स्रोत और संदर्भ देखें।",
  },
};

const toneStyles = {
  Friendly: {
    en: { bullet: "❄️ ", hookPrefix: "", shortPrefix: "", signoff: "🧊🇮🇳" },
    hi: { bullet: "❄️ ", hookPrefix: "", shortPrefix: "", signoff: "🧊🇮🇳" },
  },
  Formal: {
    en: { bullet: "• ", hookPrefix: "", shortPrefix: "", signoff: "" },
    hi: { bullet: "• ", hookPrefix: "", shortPrefix: "", signoff: "" },
  },
  Educational: {
    en: {
      bullet: "→ ",
      hookPrefix: "Explainer: ",
      shortPrefix: "Did you know? ",
      signoff: "",
    },
    hi: {
      bullet: "→ ",
      hookPrefix: "समझिए: ",
      shortPrefix: "क्या आप जानते हैं? ",
      signoff: "",
    },
  },
};

const statusPills = {
  draft: {
    label: "● Draft — pending review",
    style: { background: "#FEF3C7", color: "#92400E" },
  },
  approved: {
    label: "✓ Approved — ready to publish",
    style: { background: "#DCFCE7", color: "#166534" },
  },
  published: {
    label: "● Published",
    style: { background: "#0B2545", color: "#FFFFFF" },
  },
};

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

const hintStyle = {
  marginTop: "0.7rem",
  color: "#92400E",
  fontSize: "0.74rem",
  lineHeight: 1.5,
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

const badgeStackStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: "0.4rem",
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

const statusPillBase = {
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

const sourceMetaStyle = {
  marginTop: "0.3rem",
  fontSize: "0.72rem",
  color: "#4F88B8",
  fontWeight: "600",
};

const publishedBannerStyle = {
  background: "#DCFCE7",
  color: "#166534",
  border: "1px solid #BBF7D0",
  borderRadius: "8px",
  padding: "0.7rem 0.95rem",
  marginBottom: "1rem",
  fontSize: "0.82rem",
  fontWeight: "700",
};

const contentCardStyle = {
  background: "#FFFFFF",
  border: "1px solid #E0E7EF",
  borderRadius: "10px",
  padding: "1.3rem",
};

const platformRowStyle = {
  display: "flex",
  flexWrap: "wrap",
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

const caretStyle = {
  color: "#4F88B8",
  animation: "pcPulse 0.8s infinite",
};

const textareaStyle = {
  display: "block",
  width: "100%",
  marginTop: "0.85rem",
  padding: "0.8rem",
  border: "1px solid #8FC1E3",
  borderRadius: "8px",
  background: "#F8FAFC",
  color: "#334155",
  fontSize: "0.93rem",
  lineHeight: 1.7,
  resize: "vertical",
  outline: "none",
  boxShadow: "0 0 0 3px rgba(143, 193, 227, 0.14)",
};

const metaLineStyle = {
  marginTop: "0.9rem",
  paddingTop: "0.7rem",
  borderTop: "1px solid #EEF2F6",
  color: "#94A3B8",
  fontSize: "0.72rem",
  fontWeight: "600",
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

const refsBoxStyle = {
  marginTop: "1rem",
  background: "#FFFFFF",
  border: "1px solid #E0E7EF",
  borderRadius: "8px",
  padding: "0.8rem 0.95rem",
};

const refRowStyle = {
  display: "flex",
  gap: "0.5rem",
  marginTop: "0.45rem",
  fontSize: "0.78rem",
  lineHeight: 1.5,
};

const refNumberStyle = {
  color: "#1E5F9C",
  fontWeight: "700",
  flexShrink: 0,
};

const refTitleStyle = {
  color: "#0B2545",
  fontWeight: "600",
};

const refMetaStyle = {
  color: "#64748B",
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
  flexWrap: "wrap",
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

const disabledStyle = {
  opacity: 0.45,
  cursor: "not-allowed",
};

const noteStyle = {
  marginTop: "1.1rem",
  color: "#94A3B8",
  fontSize: "0.72rem",
  textAlign: "right",
};

/* ----- pipeline (loading) ----- */

const pipelineWrapStyle = {
  maxWidth: "520px",
  margin: "1.2rem auto 0",
  padding: "0.5rem 0.5rem 1rem",
};

const pipelineTitleStyle = {
  color: "#0B2545",
  fontSize: "1rem",
  fontWeight: "700",
  marginBottom: "0.8rem",
  textAlign: "center",
};

const progressTrackStyle = {
  height: "5px",
  borderRadius: "5px",
  background: "#DDECF8",
  overflow: "hidden",
  marginBottom: "1.1rem",
};

const progressFillStyle = {
  height: "100%",
  borderRadius: "5px",
  background: "linear-gradient(90deg, #1E5F9C, #65B7E6)",
  transition: "width 0.45s ease",
};

const pipelineRowStyle = {
  display: "flex",
  alignItems: "flex-start",
  gap: "0.85rem",
  padding: "0.65rem 0",
  transition: "opacity 0.3s ease",
};

const pipelineIconStyle = {
  width: "26px",
  height: "26px",
  borderRadius: "50%",
  display: "grid",
  placeItems: "center",
  flexShrink: 0,
  background: "#EEF2F6",
  color: "#94A3B8",
  fontSize: "0.75rem",
  fontWeight: "700",
};

const pipelineIconDone = {
  background: "#DCFCE7",
  color: "#166534",
};

const pipelineIconActive = {
  background: "#DDECF8",
  color: "#1E5F9C",
  animation: "pcPulse 0.9s infinite",
};

const pipelineStepTitleStyle = {
  color: "#0B2545",
  fontSize: "0.88rem",
  fontWeight: "700",
};

const pipelineStepDetailStyle = {
  marginTop: "0.15rem",
  color: "#64748B",
  fontSize: "0.78rem",
  lineHeight: 1.5,
};
