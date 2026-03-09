import { useState, useEffect, useRef } from "react";

const GOALS = ["Brand Awareness", "Lead Generation", "Product Launch", "Sales Conversion", "App Downloads", "Event Promotion"];
const TONES = ["Professional", "Playful & Fun", "Luxury & Premium", "Bold & Edgy", "Warm & Friendly", "Inspirational"];
const BUDGETS = ["Under ₹10K", "₹10K–₹50K", "₹50K–₹2L", "₹2L–₹10L", "₹10L+"];
const PLATFORMS = ["Instagram", "LinkedIn", "Facebook", "Twitter/X", "YouTube", "Email"];
const INDUSTRIES = ["E-Commerce", "SaaS / Tech", "Fashion & Lifestyle", "Health & Wellness", "Education / EdTech", "Food & Beverage", "Real Estate", "Finance", "Travel", "Other"];

const STEPS = ["Brief", "Audience", "Strategy", "Generate"];

function ProgressBar({ step }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 48 }}>
      {STEPS.map((s, i) => (
        <div key={s} style={{ display: "flex", alignItems: "center", flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
              background: i < step ? "#22c55e" : i === step ? "#f59e0b" : "#1a1a1a",
              border: i === step ? "2px solid #f59e0b" : i < step ? "2px solid #22c55e" : "2px solid #2a2a2a",
              fontSize: 12, fontWeight: 700, color: i <= step ? "#0a0a0a" : "#444",
              fontFamily: "'DM Sans', sans-serif", transition: "all 0.3s"
            }}>
              {i < step ? "✓" : i + 1}
            </div>
            <div style={{ fontSize: 10, color: i === step ? "#f59e0b" : i < step ? "#22c55e" : "#444", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>{s}</div>
          </div>
          {i < STEPS.length - 1 && (
            <div style={{ flex: 1, height: 1, background: i < step ? "#22c55e33" : "#1a1a1a", margin: "0 8px", marginBottom: 22, transition: "all 0.3s" }} />
          )}
        </div>
      ))}
    </div>
  );
}

function CopyBtn({ text, label = "COPY" }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} style={{
      background: copied ? "#22c55e22" : "#1a1a1a", border: `1px solid ${copied ? "#22c55e" : "#2a2a2a"}`,
      color: copied ? "#22c55e" : "#666", padding: "5px 12px", fontSize: 10,
      cursor: "pointer", borderRadius: 2, fontFamily: "'DM Sans', sans-serif",
      letterSpacing: "0.08em", transition: "all 0.2s", whiteSpace: "nowrap"
    }}>
      {copied ? "✓ COPIED" : label}
    </button>
  );
}

function Tag({ label, color = "#f59e0b" }) {
  return (
    <span style={{
      background: `${color}15`, border: `1px solid ${color}33`, color, padding: "3px 10px",
      fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
      fontFamily: "'DM Sans', sans-serif", borderRadius: 2
    }}>{label}</span>
  );
}

function SectionCard({ title, tag, tagColor, children, accent = false }) {
  return (
    <div style={{
      background: "#0f0f0f", border: `1px solid ${accent ? "#f59e0b33" : "#1a1a1a"}`,
      borderTop: `3px solid ${accent ? "#f59e0b" : "#2a2a2a"}`,
      borderRadius: 4, padding: 28, marginBottom: 20,
      animation: "fadeUp 0.5s ease forwards"
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700 }}>{title}</div>
        {tag && <Tag label={tag} color={tagColor || "#f59e0b"} />}
      </div>
      {children}
    </div>
  );
}

function AdVariant({ variant, index }) {
  const colors = ["#f59e0b", "#818cf8", "#34d399"];
  const labels = ["AWARENESS", "CONVERSION", "RETARGETING"];
  const c = colors[index] || "#f59e0b";
  return (
    <div style={{ background: "#111", border: `1px solid ${c}22`, borderLeft: `3px solid ${c}`, borderRadius: 4, padding: 20, marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <Tag label={labels[index] || `VARIANT ${index + 1}`} color={c} />
        <CopyBtn text={`${variant.headline}\n\n${variant.body}\n\n${variant.cta}`} />
      </div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, marginBottom: 8, color: "#f0ede6" }}>{variant.headline}</div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#999", lineHeight: 1.8, marginBottom: 12 }}>{variant.body}</div>
      <div style={{ display: "inline-block", background: c, color: "#0a0a0a", padding: "8px 20px", fontSize: 13, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", borderRadius: 2 }}>{variant.cta}</div>
    </div>
  );
}

function SocialPost({ platform, post }) {
  const icons = { Instagram: "📸", LinkedIn: "💼", Facebook: "👥", "Twitter/X": "🐦", YouTube: "🎬", Email: "📧" };
  const chars = { "Twitter/X": 280, Instagram: 2200, LinkedIn: 3000, Facebook: 63206 };
  const limit = chars[platform];
  const count = post?.length || 0;
  return (
    <div style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 4, padding: 20, marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#f59e0b", fontWeight: 600 }}>{icons[platform] || "📢"} {platform}</div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {limit && <span style={{ fontSize: 10, color: count > limit ? "#ef4444" : "#555", fontFamily: "'DM Sans', sans-serif" }}>{count}/{limit}</span>}
          <CopyBtn text={post} />
        </div>
      </div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#ccc", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{post}</div>
    </div>
  );
}

function EmailCard({ email, index }) {
  const labels = ["Welcome / Intro Email", "Nurture / Value Email", "Conversion / Offer Email"];
  const sublabels = ["Sent immediately", "Sent Day 3", "Sent Day 7"];
  return (
    <div style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 4, padding: 24, marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#f59e0b", fontWeight: 600, marginBottom: 4 }}>{labels[index]}</div>
          <div style={{ fontSize: 10, color: "#444", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.08em" }}>{sublabels[index]}</div>
        </div>
        <CopyBtn text={`Subject: ${email.subject}\n\n${email.body}`} label="COPY EMAIL" />
      </div>
      <div style={{ background: "#0f0f0f", border: "1px solid #f59e0b22", padding: 12, borderRadius: 2, marginBottom: 12 }}>
        <span style={{ fontSize: 10, color: "#555", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.08em" }}>SUBJECT: </span>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#f59e0b" }}>{email.subject}</span>
      </div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#ccc", lineHeight: 1.9, whiteSpace: "pre-wrap" }}>{email.body}</div>
    </div>
  );
}

function KpiCard({ kpi }) {
  return (
    <div style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 4, padding: 16, marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#f0ede6", fontWeight: 500 }}>{kpi.metric}</div>
          <div style={{ fontSize: 11, color: "#555", fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>{kpi.description}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#f59e0b", fontWeight: 700 }}>{kpi.target}</div>
          <div style={{ fontSize: 10, color: "#444", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.06em" }}>TARGET</div>
        </div>
      </div>
    </div>
  );
}

function LoadingScreen({ progress, steps }) {
  return (
    <div style={{ textAlign: "center", padding: "80px 40px" }}>
      <div style={{
        width: 80, height: 80, borderRadius: "50%",
        border: "3px solid #1a1a1a", borderTop: "3px solid #f59e0b",
        animation: "spin 1s linear infinite", margin: "0 auto 40px"
      }} />
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
        Building Your Campaign
      </div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#666", marginBottom: 40 }}>
        AI is crafting every element — this takes ~15 seconds
      </div>
      <div style={{ maxWidth: 400, margin: "0 auto" }}>
        <div style={{ background: "#111", borderRadius: 4, height: 4, marginBottom: 24 }}>
          <div style={{ background: "#f59e0b", height: "100%", width: `${progress}%`, borderRadius: 4, transition: "width 0.5s ease" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: s.done ? "#22c55e" : s.active ? "#f59e0b" : "#333" }}>
              <span>{s.done ? "✓" : s.active ? "◌" : "○"}</span>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    brand: "", product: "", usp: "", industry: "E-Commerce",
    audience: "", ageRange: "", painPoint: "", desire: "",
    goal: "Brand Awareness", tone: "Professional", platforms: ["Instagram"],
    budget: "₹10K–₹50K", duration: "30 days"
  });
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingSteps, setLoadingSteps] = useState([]);
  const [campaign, setCampaign] = useState(null);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("core");
  const resultsRef = useRef(null);

  const togglePlatform = (p) => {
    setForm(f => ({
      ...f, platforms: f.platforms.includes(p) ? f.platforms.filter(x => x !== p) : [...f.platforms, p]
    }));
  };

  const canNext = () => {
    if (step === 0) return form.brand && form.product && form.usp;
    if (step === 1) return form.audience && form.painPoint && form.desire;
    if (step === 2) return form.platforms.length > 0;
    return true;
  };

  const buildPrompt = () => `You are a world-class marketing strategist and creative director at a top ad agency. Build a COMPLETE, DETAILED, READY-TO-USE marketing campaign.

CAMPAIGN BRIEF:
- Brand: ${form.brand}
- Product/Service: ${form.product}
- Unique Selling Point: ${form.usp}
- Industry: ${form.industry}
- Target Audience: ${form.audience}
- Age Range: ${form.ageRange || "not specified"}
- Pain Point: ${form.painPoint}
- Desire/Goal: ${form.desire}
- Campaign Goal: ${form.goal}
- Tone of Voice: ${form.tone}
- Platforms: ${form.platforms.join(", ")}
- Budget: ${form.budget}
- Duration: ${form.duration}

Return ONLY a valid JSON object. No markdown. No explanation. No preamble. Exact format:
{
  "core": {
    "headline": "one powerful campaign headline that encapsulates everything",
    "tagline": "short memorable tagline under 10 words",
    "positioningStatement": "2-3 sentence brand positioning statement for this campaign",
    "hook": "one irresistible opening hook sentence",
    "campaignName": "a creative name for this campaign",
    "brandVoiceTips": ["tip1", "tip2", "tip3"]
  },
  "adVariants": [
    {
      "headline": "awareness ad headline",
      "body": "3-4 sentence awareness ad body copy",
      "cta": "CTA button text"
    },
    {
      "headline": "conversion ad headline",
      "body": "3-4 sentence conversion-focused ad body copy",
      "cta": "CTA button text"
    },
    {
      "headline": "retargeting ad headline",
      "body": "3-4 sentence retargeting ad body copy for warm audiences",
      "cta": "CTA button text"
    }
  ],
  "socialPosts": {
    ${form.platforms.map(p => `"${p}": "complete ready-to-post caption with emojis and hashtags appropriate for ${p}"`).join(",\n    ")}
  },
  "emailSequence": [
    {
      "subject": "welcome email subject line",
      "body": "complete welcome email body 5-6 sentences, warm and engaging"
    },
    {
      "subject": "nurture email subject line",
      "body": "complete value email body 5-6 sentences, educational and helpful"
    },
    {
      "subject": "conversion email subject line with urgency",
      "body": "complete offer email body 5-6 sentences, persuasive with clear CTA"
    }
  ],
  "contentIdeas": [
    {
      "type": "Reel/Short Video",
      "title": "video title",
      "concept": "detailed concept of what to shoot and say, 3-4 sentences",
      "hook": "first 3 seconds hook line"
    },
    {
      "type": "Carousel Post",
      "title": "carousel title",
      "concept": "what each slide should show, 3-4 sentences",
      "hook": "cover slide headline"
    },
    {
      "type": "Blog / Long-form",
      "title": "article title",
      "concept": "article angle and structure, 3-4 sentences",
      "hook": "opening line of the article"
    }
  ],
  "strategy": {
    "targetingInsights": ["insight1", "insight2", "insight3"],
    "competitorAngle": "how to position against competitors, 2-3 sentences",
    "budgetAllocation": [
      { "channel": "channel name", "percentage": "X%", "rationale": "why" },
      { "channel": "channel name", "percentage": "X%", "rationale": "why" },
      { "channel": "channel name", "percentage": "X%", "rationale": "why" }
    ],
    "contentCalendar": [
      { "week": "Week 1", "theme": "Launch / Awareness", "actions": ["action1", "action2", "action3"] },
      { "week": "Week 2", "theme": "Engagement / Education", "actions": ["action1", "action2", "action3"] },
      { "week": "Week 3", "theme": "Social Proof / Trust", "actions": ["action1", "action2", "action3"] },
      { "week": "Week 4", "theme": "Conversion Push", "actions": ["action1", "action2", "action3"] }
    ],
    "kpis": [
      { "metric": "Reach", "target": "X people", "description": "what reach means for this campaign" },
      { "metric": "Engagement Rate", "target": "X%", "description": "likes, comments, shares" },
      { "metric": "CTR", "target": "X%", "description": "click through rate on ads" },
      { "metric": "Conversions", "target": "X units/leads", "description": "primary conversion goal" },
      { "metric": "ROAS", "target": "X:1", "description": "return on ad spend" }
    ],
    "doList": ["do1", "do2", "do3", "do4"],
    "dontList": ["dont1", "dont2", "dont3", "dont4"]
  }
}`;

  const generate = async () => {
    setLoading(true);
    setLoadingProgress(0);
    setError("");
    const steps = [
      { label: "Analyzing your brand brief...", done: false, active: true },
      { label: "Crafting campaign identity & headlines...", done: false, active: false },
      { label: "Writing 3 ad copy variants...", done: false, active: false },
      { label: "Creating platform-specific social posts...", done: false, active: false },
      { label: "Building 3-email nurture sequence...", done: false, active: false },
      { label: "Generating content ideas & scripts...", done: false, active: false },
      { label: "Finalizing strategy, KPIs & calendar...", done: false, active: false },
    ];
    setLoadingSteps(steps);

    const animate = (idx, prog) => {
      setLoadingSteps(prev => prev.map((s, i) => ({ ...s, done: i < idx, active: i === idx })));
      setLoadingProgress(prog);
    };

    const timings = [
      [0, 5], [1, 20], [2, 35], [3, 50], [4, 65], [5, 80], [6, 92]
    ];
    const timers = timings.map(([idx, prog], i) =>
      setTimeout(() => animate(idx, prog), i * 1800)
    );

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4000,
          messages: [{ role: "user", content: buildPrompt() }]
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `Server error ${res.status} — check Vercel logs`);
      }
      if (!data.content || !Array.isArray(data.content)) {
        throw new Error("Bad response: " + JSON.stringify(data).slice(0, 150));
      }

      const text = data.content.map(i => i.text || "").join("");
      const clean = text.replace(/```json|```/g, "").trim();

      let parsed;
      try {
        parsed = JSON.parse(clean);
      } catch (jsonErr) {
        throw new Error("AI returned invalid JSON — please try again.");
      }

      timers.forEach(clearTimeout);
      setLoadingProgress(100);
      setLoadingSteps(prev => prev.map(s => ({ ...s, done: true, active: false })));
      setTimeout(() => {
        setCampaign(parsed);
        setLoading(false);
        setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
      }, 800);
    } catch (e) {
      timers.forEach(clearTimeout);
      setError("❌ " + (e.message || "Unknown error — check Vercel Function Logs"));
      setLoading(false);
    }
  };

  const SECTIONS = [
    { id: "core", label: "Campaign Core" },
    { id: "ads", label: "Ad Copies" },
    { id: "social", label: "Social Media" },
    { id: "email", label: "Email Sequence" },
    { id: "content", label: "Content Ideas" },
    { id: "strategy", label: "Strategy & KPIs" },
  ];

  const exportAll = () => {
    if (!campaign) return;
    const c = campaign;
    let text = `==============================\n${form.brand.toUpperCase()} — ${c.core.campaignName}\n==============================\n\n`;
    text += `HEADLINE: ${c.core.headline}\nTAGLINE: ${c.core.tagline}\nPOSITIONING: ${c.core.positioningStatement}\n\n`;
    text += `--- AD COPIES ---\n`;
    c.adVariants.forEach((v, i) => {
      text += `\nVariant ${i + 1}:\n${v.headline}\n${v.body}\nCTA: ${v.cta}\n`;
    });
    text += `\n--- SOCIAL POSTS ---\n`;
    Object.entries(c.socialPosts).forEach(([p, post]) => { text += `\n[${p}]\n${post}\n`; });
    text += `\n--- EMAIL SEQUENCE ---\n`;
    c.emailSequence.forEach((e, i) => { text += `\nEmail ${i + 1}:\nSubject: ${e.subject}\n${e.body}\n`; });
    text += `\n--- STRATEGY ---\n`;
    text += `\nCompetitor Angle: ${c.strategy.competitorAngle}\n`;
    text += `\nDo's:\n${c.strategy.doList.map(d => `• ${d}`).join("\n")}`;
    text += `\n\nDon'ts:\n${c.strategy.dontList.map(d => `• ${d}`).join("\n")}`;
    navigator.clipboard.writeText(text);
    alert("Full campaign copied to clipboard!");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#f0ede6", fontFamily: "'Georgia', serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
        .field { width:100%; background:#111; border:1px solid #2a2a2a; color:#f0ede6; padding:14px 16px; font-size:15px; font-family:'DM Sans',sans-serif; outline:none; transition:border-color 0.2s; border-radius:2px; resize:none; }
        .field:focus { border-color:#f59e0b; }
        .field::placeholder { color:#444; }
        .label { font-size:11px; color:#f59e0b; letter-spacing:0.12em; text-transform:uppercase; font-family:'DM Sans',sans-serif; display:block; margin-bottom:8px; }
        .pill { padding:8px 16px; border-radius:2px; font-size:12px; font-family:'DM Sans',sans-serif; cursor:pointer; transition:all 0.2s; border:1px solid #2a2a2a; letter-spacing:0.03em; }
        .nav-tab { padding:12px 20px; background:transparent; border:none; cursor:pointer; font-family:'DM Sans',sans-serif; font-size:12px; letter-spacing:0.06em; text-transform:uppercase; transition:all 0.2s; white-space:nowrap; border-bottom:2px solid transparent; }
        .next-btn { width:100%; padding:16px; background:#f59e0b; color:#0a0a0a; border:none; font-size:14px; font-weight:700; cursor:pointer; font-family:'DM Sans',sans-serif; letter-spacing:0.1em; text-transform:uppercase; transition:all 0.2s; border-radius:2px; }
        .next-btn:hover { background:#fbbf24; }
        .next-btn:disabled { opacity:0.3; cursor:not-allowed; background:#f59e0b; }
        .back-btn { padding:16px 32px; background:transparent; color:#666; border:1px solid #2a2a2a; font-size:14px; font-weight:600; cursor:pointer; font-family:'DM Sans',sans-serif; letter-spacing:0.08em; text-transform:uppercase; transition:all 0.2s; border-radius:2px; }
        .back-btn:hover { border-color:#555; color:#999; }
        select.field { appearance:none; }
      `}</style>

      {/* Top Nav */}
      <div style={{ borderBottom: "1px solid #1a1a1a", padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "#0a0a0a", zIndex: 100 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 900, letterSpacing: "-0.01em" }}>
            Campaign<span style={{ color: "#f59e0b" }}>AI</span>
          </div>
          <div style={{ fontSize: 9, color: "#333", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.15em", textTransform: "uppercase" }}>Marketing Intelligence Studio</div>
        </div>
        {campaign && (
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#f59e0b" }}>✦ {campaign.core.campaignName}</div>
            <button onClick={exportAll} style={{ background: "#f59e0b", color: "#0a0a0a", border: "none", padding: "8px 20px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.08em", borderRadius: 2 }}>
              EXPORT ALL
            </button>
            <button onClick={() => { setCampaign(null); setStep(0); setForm({ brand:"",product:"",usp:"",industry:"E-Commerce",audience:"",ageRange:"",painPoint:"",desire:"",goal:"Brand Awareness",tone:"Professional",platforms:["Instagram"],budget:"₹10K–₹50K",duration:"30 days" }); }} style={{ background: "transparent", color: "#555", border: "1px solid #2a2a2a", padding: "8px 20px", fontSize: 11, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.08em", borderRadius: 2 }}>
              NEW CAMPAIGN
            </button>
          </div>
        )}
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px" }}>

        {/* === LANDING / FORM === */}
        {!campaign && !loading && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 54, fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: 16 }}>
                Your Complete<br /><span style={{ color: "#f59e0b" }}>AI Campaign</span><br />in 60 Seconds
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#555", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
                Fill a 3-step brief. Get ad copies, social posts, a full email sequence, content ideas, and a 4-week strategy — all ready to use.
              </div>
            </div>

            <ProgressBar step={step} />

            {/* STEP 0: Brand Brief */}
            {step === 0 && (
              <div style={{ animation: "fadeUp 0.4s ease" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, marginBottom: 8 }}>Tell us about your Brand</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#555", marginBottom: 32 }}>The more specific you are, the better your campaign output.</div>
                <div style={{ display: "grid", gap: 20 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                    <div>
                      <label className="label">Brand / Company Name *</label>
                      <input className="field" placeholder="e.g. GlowUp Skincare" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} />
                    </div>
                    <div>
                      <label className="label">Industry</label>
                      <select className="field" value={form.industry} onChange={e => setForm({ ...form, industry: e.target.value })}>
                        {INDUSTRIES.map(i => <option key={i}>{i}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="label">Product / Service Name *</label>
                    <input className="field" placeholder="e.g. Vitamin C Brightening Serum 30ml" value={form.product} onChange={e => setForm({ ...form, product: e.target.value })} />
                  </div>
                  <div>
                    <label className="label">Unique Selling Point (USP) *</label>
                    <textarea className="field" rows={3} placeholder="What makes you different? e.g. 'Only Indian skincare brand with 3x clinical proof at under ₹500'" value={form.usp} onChange={e => setForm({ ...form, usp: e.target.value })} />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 1: Audience */}
            {step === 1 && (
              <div style={{ animation: "fadeUp 0.4s ease" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, marginBottom: 8 }}>Define Your Audience</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#555", marginBottom: 32 }}>AI writes better copy when it knows who it's talking to.</div>
                <div style={{ display: "grid", gap: 20 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
                    <div>
                      <label className="label">Target Audience Description *</label>
                      <input className="field" placeholder="e.g. Working women in metro cities, health-conscious" value={form.audience} onChange={e => setForm({ ...form, audience: e.target.value })} />
                    </div>
                    <div>
                      <label className="label">Age Range</label>
                      <input className="field" placeholder="e.g. 25–40" value={form.ageRange} onChange={e => setForm({ ...form, ageRange: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label className="label">Their Biggest Pain Point *</label>
                    <textarea className="field" rows={3} placeholder="What problem keeps them up at night? e.g. 'Dull, uneven skin tone from pollution and stress despite trying many products'" value={form.painPoint} onChange={e => setForm({ ...form, painPoint: e.target.value })} />
                  </div>
                  <div>
                    <label className="label">Their Deepest Desire *</label>
                    <textarea className="field" rows={3} placeholder="What do they really want? e.g. 'Glowing, clear skin with visible results in 2 weeks without harsh chemicals'" value={form.desire} onChange={e => setForm({ ...form, desire: e.target.value })} />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Strategy */}
            {step === 2 && (
              <div style={{ animation: "fadeUp 0.4s ease" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, marginBottom: 8 }}>Set Your Strategy</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#555", marginBottom: 32 }}>Tell us where, how, and what you're going for.</div>
                <div style={{ display: "grid", gap: 28 }}>
                  <div>
                    <label className="label">Campaign Goal</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {GOALS.map(g => (
                        <button key={g} className="pill" onClick={() => setForm({ ...form, goal: g })}
                          style={{ background: form.goal === g ? "#f59e0b" : "#111", color: form.goal === g ? "#0a0a0a" : "#666", borderColor: form.goal === g ? "#f59e0b" : "#2a2a2a" }}>
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="label">Tone of Voice</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {TONES.map(t => (
                        <button key={t} className="pill" onClick={() => setForm({ ...form, tone: t })}
                          style={{ background: form.tone === t ? "#f59e0b" : "#111", color: form.tone === t ? "#0a0a0a" : "#666", borderColor: form.tone === t ? "#f59e0b" : "#2a2a2a" }}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="label">Platforms (select all that apply) *</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {PLATFORMS.map(p => (
                        <button key={p} className="pill" onClick={() => togglePlatform(p)}
                          style={{ background: form.platforms.includes(p) ? "#f59e0b" : "#111", color: form.platforms.includes(p) ? "#0a0a0a" : "#666", borderColor: form.platforms.includes(p) ? "#f59e0b" : "#2a2a2a" }}>
                          {form.platforms.includes(p) ? "✓ " : ""}{p}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                    <div>
                      <label className="label">Budget Range</label>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        {BUDGETS.map(b => (
                          <button key={b} className="pill" onClick={() => setForm({ ...form, budget: b })}
                            style={{ background: form.budget === b ? "#f59e0b" : "#111", color: form.budget === b ? "#0a0a0a" : "#666", borderColor: form.budget === b ? "#f59e0b" : "#2a2a2a", textAlign: "left" }}>
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="label">Campaign Duration</label>
                      <select className="field" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })}>
                        {["7 days", "14 days", "30 days", "60 days", "90 days", "Ongoing"].map(d => <option key={d}>{d}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Nav Buttons */}
            <div style={{ display: "flex", gap: 12, marginTop: 40 }}>
              {step > 0 && <button className="back-btn" onClick={() => setStep(s => s - 1)}>← Back</button>}
              {step < 3 ? (
                <button className="next-btn" disabled={!canNext()} onClick={() => { if (step === 2) { setStep(3); generate(); } else setStep(s => s + 1); }}>
                  {step === 2 ? "✦ Generate Full Campaign" : "Next →"}
                </button>
              ) : null}
            </div>
            {error && <div style={{ marginTop: 16, color: "#ef4444", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>{error}</div>}

            {/* What you'll get */}
            {step === 0 && (
              <div style={{ marginTop: 60, borderTop: "1px solid #1a1a1a", paddingTop: 40 }}>
                <div style={{ fontSize: 11, color: "#444", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", marginBottom: 20 }}>What you'll receive</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                  {[["Campaign Core", "Headline · Tagline · Hook · Positioning"],["3 Ad Copies","Awareness · Conversion · Retargeting"],["Social Posts","Platform-ready captions for all channels"],["Email Sequence","3-part nurture flow: Intro → Value → Convert"],["Content Ideas","3 content formats with full scripts & concepts"],["4-Week Calendar","Week-by-week action plan + KPIs + Budget Split"]].map(([t, d]) => (
                    <div key={t} style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 4, padding: 16 }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#f59e0b", marginBottom: 6 }}>{t}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#555", lineHeight: 1.6 }}>{d}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* === LOADING === */}
        {loading && <LoadingScreen progress={loadingProgress} steps={loadingSteps} />}

        {/* === RESULTS === */}
        {campaign && (
          <div ref={resultsRef} style={{ animation: "fadeUp 0.5s ease" }}>
            {/* Hero Result */}
            <div style={{ background: "#0f0f0f", border: "1px solid #2a2a2a", borderTop: "4px solid #f59e0b", borderRadius: 4, padding: "36px 36px 28px", marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <Tag label={campaign.core.campaignName} color="#f59e0b" />
                <div style={{ display: "flex", gap: 8 }}>
                  <Tag label={form.goal} color="#818cf8" />
                  <Tag label={form.tone} color="#34d399" />
                </div>
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 900, lineHeight: 1.08, letterSpacing: "-0.02em", marginBottom: 14 }}>{campaign.core.headline}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontStyle: "italic", color: "#f59e0b", marginBottom: 20 }}>"{campaign.core.tagline}"</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#777", lineHeight: 1.8, borderTop: "1px solid #1a1a1a", paddingTop: 16 }}>{campaign.core.positioningStatement}</div>
            </div>

            {/* Section Nav */}
            <div style={{ display: "flex", gap: 0, overflowX: "auto", borderBottom: "1px solid #1a1a1a", marginBottom: 24 }}>
              {SECTIONS.map(s => (
                <button key={s.id} className="nav-tab" onClick={() => setActiveSection(s.id)}
                  style={{ color: activeSection === s.id ? "#f59e0b" : "#444", borderBottomColor: activeSection === s.id ? "#f59e0b" : "transparent" }}>
                  {s.label}
                </button>
              ))}
            </div>

            {/* SECTION: Campaign Core */}
            {activeSection === "core" && (
              <div>
                <SectionCard title="Campaign Identity" accent>
                  <div style={{ display: "grid", gap: 16 }}>
                    <div style={{ background: "#111", borderRadius: 4, padding: 20 }}>
                      <div style={{ fontSize: 10, color: "#555", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", marginBottom: 8 }}>Opening Hook</div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontStyle: "italic", lineHeight: 1.5 }}>{campaign.core.hook}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: "#555", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", marginBottom: 12 }}>Brand Voice Guidelines</div>
                      <div style={{ display: "grid", gap: 8 }}>
                        {campaign.core.brandVoiceTips?.map((tip, i) => (
                          <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                            <span style={{ color: "#f59e0b", marginTop: 1 }}>✦</span>
                            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#ccc", lineHeight: 1.7 }}>{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </SectionCard>
              </div>
            )}

            {/* SECTION: Ad Copies */}
            {activeSection === "ads" && (
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#555", marginBottom: 20, lineHeight: 1.7 }}>
                  Three ad copy variants built for different stages of your funnel — run them as Meta Ads, Google Ads, or use them as landing page copy.
                </div>
                {campaign.adVariants?.map((v, i) => <AdVariant key={i} variant={v} index={i} />)}
              </div>
            )}

            {/* SECTION: Social Media */}
            {activeSection === "social" && (
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#555", marginBottom: 20, lineHeight: 1.7 }}>
                  Platform-optimised captions with appropriate tone, length, and hashtags. Copy and paste directly.
                </div>
                {Object.entries(campaign.socialPosts || {}).map(([platform, post]) => (
                  <SocialPost key={platform} platform={platform} post={post} />
                ))}
              </div>
            )}

            {/* SECTION: Email */}
            {activeSection === "email" && (
              <div>
                <div style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 4, padding: 16, marginBottom: 20, display: "flex", gap: 16, alignItems: "center" }}>
                  <span style={{ fontSize: 20 }}>📧</span>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#777", lineHeight: 1.7 }}>
                    A complete 3-email nurture sequence. Email 1 welcomes, Email 2 educates, Email 3 converts. Use in Mailchimp, Klaviyo, or any ESP.
                  </div>
                </div>
                {campaign.emailSequence?.map((email, i) => <EmailCard key={i} email={email} index={i} />)}
              </div>
            )}

            {/* SECTION: Content Ideas */}
            {activeSection === "content" && (
              <div>
                {campaign.contentIdeas?.map((idea, i) => (
                  <SectionCard key={i} title={idea.title} tag={idea.type} tagColor={["#f59e0b", "#818cf8", "#34d399"][i]}>
                    <div style={{ display: "grid", gap: 14 }}>
                      <div style={{ background: "#111", border: "1px solid #f59e0b22", borderRadius: 4, padding: 14 }}>
                        <div style={{ fontSize: 10, color: "#f59e0b", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", marginBottom: 6 }}>Opening Hook</div>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontStyle: "italic" }}>{idea.hook}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, color: "#555", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", marginBottom: 8 }}>Concept</div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#ccc", lineHeight: 1.8 }}>{idea.concept}</div>
                      </div>
                    </div>
                  </SectionCard>
                ))}
              </div>
            )}

            {/* SECTION: Strategy */}
            {activeSection === "strategy" && (
              <div>
                {/* Targeting */}
                <SectionCard title="Audience Targeting Insights" accent>
                  <div style={{ display: "grid", gap: 10 }}>
                    {campaign.strategy?.targetingInsights?.map((t, i) => (
                      <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "#111", padding: 14, borderRadius: 4 }}>
                        <span style={{ color: "#f59e0b", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700, minWidth: 20 }}>0{i + 1}</span>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#ccc", lineHeight: 1.7 }}>{t}</span>
                      </div>
                    ))}
                  </div>
                </SectionCard>

                {/* Budget */}
                <SectionCard title="Budget Allocation">
                  <div style={{ display: "grid", gap: 10 }}>
                    {campaign.strategy?.budgetAllocation?.map((b, i) => (
                      <div key={i} style={{ display: "flex", gap: 16, alignItems: "center", background: "#111", padding: 16, borderRadius: 4 }}>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: "#f59e0b", minWidth: 60 }}>{b.percentage}</div>
                        <div>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: "#f0ede6" }}>{b.channel}</div>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#666", marginTop: 4 }}>{b.rationale}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionCard>

                {/* KPIs */}
                <SectionCard title="KPIs & Success Metrics">
                  {campaign.strategy?.kpis?.map((k, i) => <KpiCard key={i} kpi={k} />)}
                </SectionCard>

                {/* 4-Week Calendar */}
                <SectionCard title="4-Week Content Calendar">
                  <div style={{ display: "grid", gap: 12 }}>
                    {campaign.strategy?.contentCalendar?.map((week, i) => (
                      <div key={i} style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 4, padding: 20 }}>
                        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
                          <Tag label={week.week} color={["#f59e0b", "#818cf8", "#34d399", "#f87171"][i]} />
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#f0ede6" }}>{week.theme}</div>
                        </div>
                        <div style={{ display: "grid", gap: 6 }}>
                          {week.actions?.map((a, j) => (
                            <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                              <span style={{ color: "#444", fontSize: 12, marginTop: 2 }}>→</span>
                              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#999", lineHeight: 1.6 }}>{a}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionCard>

                {/* Do's & Don'ts */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <SectionCard title="✓ Do's">
                    <div style={{ display: "grid", gap: 8 }}>
                      {campaign.strategy?.doList?.map((d, i) => (
                        <div key={i} style={{ display: "flex", gap: 10, background: "#22c55e0a", border: "1px solid #22c55e22", borderRadius: 4, padding: 12 }}>
                          <span style={{ color: "#22c55e", fontSize: 12 }}>✓</span>
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#ccc", lineHeight: 1.6 }}>{d}</span>
                        </div>
                      ))}
                    </div>
                  </SectionCard>
                  <SectionCard title="✗ Don'ts">
                    <div style={{ display: "grid", gap: 8 }}>
                      {campaign.strategy?.dontList?.map((d, i) => (
                        <div key={i} style={{ display: "flex", gap: 10, background: "#ef44440a", border: "1px solid #ef444422", borderRadius: 4, padding: 12 }}>
                          <span style={{ color: "#ef4444", fontSize: 12 }}>✗</span>
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#ccc", lineHeight: 1.6 }}>{d}</span>
                        </div>
                      ))}
                    </div>
                  </SectionCard>
                </div>

                {/* Competitor */}
                <SectionCard title="Competitive Positioning">
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#ccc", lineHeight: 1.9 }}>
                    {campaign.strategy?.competitorAngle}
                  </div>
                </SectionCard>
              </div>
            )}

            <div style={{ textAlign: "center", marginTop: 48, fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#222", letterSpacing: "0.1em" }}>
              CAMPAIGNAI · BUILT WITH CLAUDE · AI-POWERED MARKETING
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
