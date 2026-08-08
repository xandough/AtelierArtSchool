import { useState } from "react";
import { useApp } from "../context/AppContext";
import { cleanApiKey } from "../services/aiGrading";
import { Palette, ArrowRight, Eye, EyeOff, ExternalLink } from "lucide-react";

export default function Onboarding() {
  const { dispatch } = useApp();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);

  const handleComplete = () => {
    dispatch({
      type: "COMPLETE_ONBOARDING",
      payload: { name: name.trim(), apiKey: cleanApiKey(apiKey) },
    });
  };

  return (
    <div className="onboarding-container">
      <div className="animate-fade-in-up" style={{ maxWidth: "520px", width: "100%", position: "relative", zIndex: 2 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div className="animate-float" style={{ display: "inline-flex", width: "72px", height: "72px", background: "linear-gradient(135deg, var(--color-gold-dim), var(--color-gold))", borderRadius: "20px", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
            <Palette size={32} color="#0e0e12" />
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: "700", color: "var(--color-text-primary)", marginBottom: "8px", lineHeight: 1.2 }}>The Atelier</h1>
          <p style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.1rem" }}>Fine Art Academy</p>
        </div>

        {step === 1 && (
          <div className="glass-card-strong animate-scale-in" style={{ padding: "40px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: "600", color: "var(--color-text-primary)", marginBottom: "8px" }}>Welcome, Artist.</h2>
            <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.7, marginBottom: "32px", fontFamily: "var(--font-serif)", fontSize: "1rem" }}>
              You are about to begin a 24-month journey that will take you from your first mark to a professional-level portfolio. Every day matters. Every hour counts.
            </p>
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", color: "var(--color-text-secondary)", fontSize: "0.8rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>What should we call you?</label>
              <input
                className="input-field"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && name.trim() && setStep(2)}
                autoFocus
              />
            </div>
            <button
              className="btn-gold"
              style={{ width: "100%", justifyContent: "center", fontSize: "1rem", padding: "16px" }}
              onClick={() => setStep(2)}
              disabled={!name.trim()}
            >
              Continue <ArrowRight size={18} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="glass-card-strong animate-scale-in" style={{ padding: "40px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: "600", color: "var(--color-text-primary)", marginBottom: "8px" }}>AI-Powered Grading</h2>
            <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.7, marginBottom: "8px", fontFamily: "var(--font-serif)", fontSize: "1rem" }}>
              Your professors will grade your artwork using Google Gemini AI — giving you real, personalized feedback as if from a human teacher.
            </p>
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.8rem", marginBottom: "24px", lineHeight: 1.6 }}>
              To enable this feature, provide a free Gemini API key. Your key is stored locally on your device and never sent to any server other than Google's API.
            </p>

            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", color: "var(--color-text-secondary)", fontSize: "0.8rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>Gemini API Key</label>
              <div style={{ position: "relative" }}>
                <input
                  className="input-field"
                  type={showKey ? "text" : "password"}
                  placeholder="AIza..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  style={{ paddingRight: "48px" }}
                />
                <button
                  onClick={() => setShowKey(!showKey)}
                  style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)", padding: "4px" }}
                >
                  {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: "var(--color-gold)", fontSize: "0.8rem", marginBottom: "24px", textDecoration: "none" }}>
              <ExternalLink size={12} /> Get a free API key at Google AI Studio
            </a>

            <div style={{ display: "flex", gap: "12px" }}>
              <button className="btn-outline" onClick={() => setStep(3)} style={{ flex: 1, justifyContent: "center" }}>
                Skip for now
              </button>
              <button
                className="btn-gold"
                onClick={() => setStep(3)}
                style={{ flex: 2, justifyContent: "center" }}
              >
                Continue <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="glass-card-strong animate-scale-in" style={{ padding: "40px", textAlign: "center" }}>
            <div style={{ fontSize: "4rem", marginBottom: "20px" }}>🎨</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: "700", color: "var(--color-gold-bright)", marginBottom: "12px" }}>
              Ready, {name}.
            </h2>
            <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.8, marginBottom: "16px", fontFamily: "var(--font-serif)", fontSize: "1.1rem" }}>
              Your 24-month curriculum begins today. Month 1 is unlocked and your professors are ready.
            </p>
            <div style={{ background: "rgba(201,146,79,0.08)", border: "1px solid var(--color-border)", borderRadius: "10px", padding: "16px", marginBottom: "32px" }}>
              <p style={{ color: "var(--color-gold)", fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.95rem", lineHeight: 1.7 }}>
                “The secret of getting ahead is getting started. The secret of getting started is breaking your complex, overwhelming tasks into small, manageable tasks, and then starting on the first one.”
              </p>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.75rem", marginTop: "8px" }}>— Mark Twain</p>
            </div>
            <button
              className="btn-gold"
              style={{ fontSize: "1.1rem", padding: "18px 48px" }}
              onClick={handleComplete}
            >
              Enter The Atelier <Palette size={20} />
            </button>
          </div>
        )}

        {/* Step dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "24px" }}>
          {[1,2,3].map(s => (
            <div key={s} style={{ width: s === step ? "24px" : "8px", height: "8px", borderRadius: "100px", background: s === step ? "var(--color-gold)" : "var(--color-surface-3)", transition: "all 0.3s ease" }} />
          ))}
        </div>
      </div>
    </div>
  );
}
