import { useState } from 'react';
import { Eye, EyeOff, Key, Trash2, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { cleanApiKey } from '../services/aiGrading';

export default function Settings() {
  const { state, dispatch } = useApp();
  const [apiKey, setApiKey] = useState(state.geminiApiKey || '');
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const handleSaveKey = () => {
    const cleaned = cleanApiKey(apiKey);
    dispatch({ type: 'UPDATE_API_KEY', payload: cleaned });
    setApiKey(cleaned);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="main-content">
      <div className="page-header">
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '6px' }}>Settings</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Manage your account and AI grading configuration.</p>
      </div>

      <div style={{ padding: '32px 40px', maxWidth: '640px' }}>

        {/* AI Grading */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--color-text-primary)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Key size={18} style={{ color: 'var(--color-gold)' }} /> AI Grading — Gemini API Key
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '16px' }}>
            Your Gemini API key powers AI-graded assignments. It is stored only in your browser's local storage and is never sent to any server other than Google's API directly.
          </p>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <input
                className="input-field"
                type={showKey ? 'text' : 'password'}
                placeholder="AIzaSy..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                style={{ paddingRight: '48px' }}
              />
              <button
                onClick={() => setShowKey(!showKey)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', padding: '4px' }}
              >
                {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <button
              className="btn-gold"
              onClick={handleSaveKey}
              disabled={!apiKey.trim()}
              style={{ flexShrink: 0 }}
            >
              {saved ? <><CheckCircle size={16} /> Saved!</> : 'Save Key'}
            </button>
          </div>

          {state.geminiApiKey && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-success)', fontSize: '0.8rem', marginBottom: '8px' }}>
              <CheckCircle size={13} /> API key configured — AI grading is active
            </div>
          )}

          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--color-gold)', fontSize: '0.8rem', textDecoration: 'none' }}
          >
            <ExternalLink size={12} /> Get a free API key at Google AI Studio
          </a>
        </section>

        <div className="brushstroke-divider" />

        {/* Account */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--color-text-primary)', marginBottom: '16px' }}>Account Information</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: '10px' }}>
              <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Student Name</span>
              <span style={{ color: 'var(--color-text-primary)', fontSize: '0.875rem', fontWeight: '500' }}>{state.studentName}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: '10px' }}>
              <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Enrollment Date</span>
              <span style={{ color: 'var(--color-text-primary)', fontSize: '0.875rem', fontWeight: '500' }}>
                {state.enrollmentDate ? new Date(state.enrollmentDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '—'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: '10px' }}>
              <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Data Storage</span>
              <span style={{ color: 'var(--color-text-primary)', fontSize: '0.875rem', fontWeight: '500' }}>Local (browser only)</span>
            </div>
          </div>
        </section>

        <div className="brushstroke-divider" />

        {/* PWA Install Hint */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--color-text-primary)', marginBottom: '8px' }}>Install as App</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>
            The Atelier is a Progressive Web App. You can install it on your device for a full-screen, offline-friendly experience:
          </p>
          <ul style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', lineHeight: 1.8, marginTop: '8px', paddingLeft: '20px' }}>
            <li><strong style={{ color: 'var(--color-text-primary)' }}>Desktop (Chrome/Edge):</strong> Click the install icon in the address bar</li>
            <li><strong style={{ color: 'var(--color-text-primary)' }}>iOS Safari:</strong> Tap Share → "Add to Home Screen"</li>
            <li><strong style={{ color: 'var(--color-text-primary)' }}>Android Chrome:</strong> Tap the three-dot menu → "Add to Home screen"</li>
          </ul>
        </section>

        <div className="brushstroke-divider" />

        {/* Danger Zone */}
        <section>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: '#e06a5a', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={18} /> Danger Zone
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '16px' }}>
            Resetting your progress will permanently delete all lesson completions, grades, and streak data. This cannot be undone.
          </p>
          {!confirmReset ? (
            <button
              onClick={() => setConfirmReset(true)}
              className="btn-outline"
              style={{ borderColor: 'rgba(196,74,58,0.4)', color: '#e06a5a' }}
            >
              <Trash2 size={14} /> Reset All Progress
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <p style={{ color: '#e06a5a', fontSize: '0.85rem' }}>Are you sure? This is permanent.</p>
              <button onClick={handleReset} style={{ background: '#c44a3a', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '600' }}>
                Yes, Reset Everything
              </button>
              <button onClick={() => setConfirmReset(false)} className="btn-ghost">Cancel</button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
