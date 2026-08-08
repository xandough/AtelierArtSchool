import { useEffect, useRef } from 'react';

export default function ProgressRing({ percent = 0, size = 80, strokeWidth = 6, color = 'var(--color-gold-bright)', trackColor = 'var(--color-surface-3)', children, label }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', display: 'block' }}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={trackColor} strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)', filter: `drop-shadow(0 0 6px ${color}55)` }}
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {children || (
          <>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: size * 0.22, fontWeight: '700', color, lineHeight: 1 }}>{percent}%</span>
            {label && <span style={{ fontSize: size * 0.12, color: 'var(--color-text-muted)', marginTop: 2 }}>{label}</span>}
          </>
        )}
      </div>
    </div>
  );
}
