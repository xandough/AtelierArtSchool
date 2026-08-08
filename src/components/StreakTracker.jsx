import { useApp } from '../context/AppContext';

export default function StreakTracker({ compact = false }) {
  const { state } = useApp();
  const { streak } = state;
  const currentStreak = streak.currentStreak || 0;
  const longestStreak = streak.longestStreak || 0;
  const studyDates = streak.studyDates || [];

  // Last 28 days of activity
  const today = new Date();
  const days = Array.from({ length: 28 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (27 - i));
    const dateStr = d.toDateString();
    const isToday = d.toDateString() === today.toDateString();
    const active = studyDates.includes(dateStr);
    return { dateStr, active, isToday };
  });

  if (compact) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span className="streak-flame">🔥</span>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: '700', color: 'var(--color-gold-bright)' }}>{currentStreak}</span>
        <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>day streak</span>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: '14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <span className="streak-flame">🔥</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: '700', color: 'var(--color-gold-bright)', lineHeight: 1 }}>{currentStreak}</span>
            <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', alignSelf: 'flex-end', paddingBottom: '4px' }}>day streak</span>
          </div>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>Best: {longestStreak} days</p>
        </div>
        {currentStreak > 0 && (
          <div style={{ textAlign: 'right' }}>
            <span className="badge badge-gold" style={{ fontSize: '0.75rem' }}>Active</span>
          </div>
        )}
      </div>

      {/* Calendar grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
        {['S','M','T','W','T','F','S'].map((d, i) => (
          <div key={i} style={{ textAlign: 'center', fontSize: '0.6rem', color: 'var(--color-text-muted)', paddingBottom: '4px', fontWeight: '600' }}>{d}</div>
        ))}
        {/* Offset for first day */}
        {Array.from({ length: (new Date(days[0].dateStr).getDay()) }, (_, i) => (
          <div key={`e${i}`} />
        ))}
        {days.map((day, i) => (
          <div
            key={i}
            className={`streak-day ${day.active ? (day.isToday ? 'today' : 'active') : ''}`}
            title={day.dateStr}
            style={{ margin: 'auto' }}
          />
        ))}
      </div>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.7rem', marginTop: '8px' }}>Last 28 days · {studyDates.length} total sessions</p>
    </div>
  );
}
