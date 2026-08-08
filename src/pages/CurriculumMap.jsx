import { Link, useNavigate } from 'react-router-dom';
import { Lock, CheckCircle, ChevronRight, Star, Unlock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import CURRICULUM from '../data/curriculum';
import ProgressRing from '../components/ProgressRing';

const THEME_COLORS = {
  foundation: '#c9924f',
  perspective: '#7a9fc9',
  construction: '#9fc97a',
  anatomy: '#c97a9f',
  'anatomy-extremities': '#c97a9f',
  color: '#e8c96d',
  'dry-media': '#b8a8e8',
  'oil-painting': '#e87a3a',
  'water-media': '#6dc9e8',
  composition: '#c9a06d',
  'creature-design': '#6de8a0',
  'drapery-texture': '#e8b86d',
  digital: '#6db4e8',
  'advanced-perspective': '#7a9fc9',
  'extreme-anatomy': '#c97a9f',
  environment: '#7ac97a',
  illustration: '#c9c97a',
  sequential: '#c97a7a',
  sculpting: '#c4a882',
  'mixed-media': '#c98ae8',
  deconstruction: '#e87a9f',
  'manga-anime': '#e86dc9',
  'master-studies': '#e8c06d',
  capstone: '#e8b86d',
};

export default function CurriculumMap() {
  const { isMonthUnlocked, getMonthProgress, getFinalProjectScore } = useApp();
  const navigate = useNavigate();

  const year1 = CURRICULUM.filter(m => m.year === 1);
  const year2 = CURRICULUM.filter(m => m.year === 2);

  return (
    <div className="main-content">
      {/* Header */}
      <div className="page-header">
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>The Atelier</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '8px' }}>24-Month Curriculum</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-serif)', fontSize: '1rem' }}>
          A complete journey from first mark to professional portfolio. Each month unlocks upon passing its predecessor.
        </p>
        <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
          <LegendItem color="var(--color-success)" label="Completed (≥80%)" />
          <LegendItem color="var(--color-gold)" label="In Progress" />
          <LegendItem color="var(--color-text-muted)" label="Locked" />
        </div>
      </div>

      <div style={{ padding: '40px' }}>
        {/* Year 1 */}
        <YearSection year={1} months={year1} isMonthUnlocked={isMonthUnlocked} getMonthProgress={getMonthProgress} getFinalProjectScore={getFinalProjectScore} navigate={navigate} />
        <div style={{ height: '48px' }} />
        {/* Year 2 */}
        <YearSection year={2} months={year2} isMonthUnlocked={isMonthUnlocked} getMonthProgress={getMonthProgress} getFinalProjectScore={getFinalProjectScore} navigate={navigate} />
      </div>
    </div>
  );
}

function YearSection({ year, months, isMonthUnlocked, getMonthProgress, getFinalProjectScore, navigate }) {
  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
        <div>
          <p className="timeline-year-label">Year {year}</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-text-primary)' }}>
            {year === 1 ? 'The Foundation: Breaking Down Reality' : 'Advanced Application & Stylization'}
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
            {year === 1
              ? 'Months 1–12 · Line, Form, Anatomy, Color, and Traditional Media'
              : 'Months 13–24 · Digital, Narrative, Manga, and Your Capstone'}
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
        {months.map(m => {
          const unlocked = isMonthUnlocked(m.month);
          const progress = getMonthProgress(m);
          const scoreA = getFinalProjectScore(`M${String(m.month).padStart(2,'0')}-A`);
          const scoreB = getFinalProjectScore(`M${String(m.month).padStart(2,'0')}-B`);
          const passedA = scoreA !== null && scoreA >= 80;
          const passedB = scoreB !== null && scoreB >= 80;
          const fullyPassed = passedA && passedB;
          const themeColor = THEME_COLORS[m.theme] || 'var(--color-gold)';

          return (
            <div
              key={m.month}
              className={`month-card ${!unlocked ? 'locked' : fullyPassed ? 'completed' : progress > 0 ? 'current' : ''}`}
              onClick={() => unlocked && navigate(`/classroom/m${m.month}?tab=lessons`)}
            >
              {/* Color Accent Bar */}
              <div style={{ height: '3px', background: unlocked ? `linear-gradient(90deg, ${themeColor}88, ${themeColor})` : 'var(--color-surface-3)' }} />

              <div className="month-card-header">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', fontWeight: '700', color: themeColor, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        {unlocked ? `Month ${m.month}` : `Month ${m.month}`}
                      </span>
                      {fullyPassed && <CheckCircle size={14} style={{ color: 'var(--color-success)' }} />}
                      {!unlocked && <Lock size={12} style={{ color: 'var(--color-text-muted)' }} />}
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: '600', color: unlocked ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}>{m.title}</h3>
                  </div>
                  {unlocked && (
                    <ProgressRing percent={progress} size={44} strokeWidth={4} color={fullyPassed ? 'var(--color-success)' : themeColor} />
                  )}
                </div>
              </div>

              <div style={{ padding: '16px 20px' }}>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem', marginBottom: '12px', fontStyle: 'italic' }}>{m.subtitle}</p>

                {/* Courses */}
                {m.courses.map((course, ci) => {
                  const courseScore = getFinalProjectScore(course.id);
                  const coursePassed = courseScore !== null && courseScore >= 80;
                  return (
                    <div key={ci} style={{ marginBottom: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'var(--color-surface-3)', borderRadius: '8px' }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', marginBottom: '1px' }}>{course.id}</p>
                          <p style={{ fontSize: '0.8rem', color: unlocked ? 'var(--color-text-primary)' : 'var(--color-text-muted)', fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{course.title}</p>
                        </div>
                        <div style={{ flexShrink: 0, marginLeft: '8px' }}>
                          {coursePassed ? (
                            <span style={{ fontSize: '0.7rem', color: 'var(--color-success)' }}>✓ {courseScore}%</span>
                          ) : courseScore !== null ? (
                            <span style={{ fontSize: '0.7rem', color: '#e06a5a' }}>{courseScore}%</span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {unlocked && (
                  <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'flex-end' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-gold)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {fullyPassed ? 'Review' : progress > 0 ? 'Continue' : 'Start'} <ChevronRight size={13} />
                    </span>
                  </div>
                )}

                {!unlocked && (
                  <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
                    <Lock size={11} /> Complete Month {m.month - 1} with 80%+ to unlock
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function LegendItem({ color, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: color }} />
      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{label}</span>
    </div>
  );
}
