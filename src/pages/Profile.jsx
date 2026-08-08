import { useState } from 'react';
import { format } from 'date-fns';
import { Award, BookOpen, CheckCircle, Star, TrendingUp, Calendar, Image } from 'lucide-react';
import { useApp } from '../context/AppContext';
import CURRICULUM from '../data/curriculum';
import ProgressRing from '../components/ProgressRing';
import StreakTracker from '../components/StreakTracker';
import { getLetterGradeColor } from '../services/aiGrading';

export default function Profile() {
  const { state, getCurrentMonth, getFinalProjectScore, isMonthUnlocked } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const currentMonth = getCurrentMonth();
  const enrollment = state.enrollmentDate ? new Date(state.enrollmentDate) : null;

  // Gather all grades
  const allGrades = Object.entries(state.grades || {}).filter(([, g]) => g?.overallScore !== undefined);
  const finalProjectGrades = allGrades.filter(([, g]) => g.isFinalProject);
  const avgScore = allGrades.length > 0
    ? Math.round(allGrades.reduce((acc, [, g]) => acc + g.overallScore, 0) / allGrades.length)
    : null;

  // Count completed lessons
  const totalCompleted = Object.values(state.progress || {}).reduce((acc, cp) => acc + (cp.lessonsCompleted?.length || 0), 0);

  // Months fully passed
  const monthsPassed = CURRICULUM.filter(m => {
    const sA = getFinalProjectScore(`M${String(m.month).padStart(2,'0')}-A`);
    const sB = getFinalProjectScore(`M${String(m.month).padStart(2,'0')}-B`);
    return sA !== null && sA >= 80 && sB !== null && sB >= 80;
  }).length;

  return (
    <div className="main-content">
      {/* Header */}
      <div className="page-header">
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Avatar */}
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--color-gold-dim), var(--color-surface-3))',
            border: '3px solid var(--color-border-strong)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--color-gold-bright)',
            flexShrink: 0,
          }}>
            {state.studentName?.[0]?.toUpperCase()}
          </div>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '4px' }}>
              {state.studentName}
            </h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
              Student · The Atelier Fine Art Academy
              {enrollment && <span style={{ color: 'var(--color-text-muted)', marginLeft: '12px' }}>Enrolled {format(enrollment, 'MMMM yyyy')}</span>}
            </p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
              <span className="badge badge-gold"><Star size={10} /> Month {currentMonth}</span>
              <span className="badge badge-muted"><Award size={10} /> {monthsPassed} months completed</span>
              <span className="badge badge-muted"><BookOpen size={10} /> {totalCompleted} lessons done</span>
            </div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <ProgressRing percent={Math.min(100, Math.round((currentMonth / 24) * 100))} size={72} strokeWidth={6} label="Journey" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tab-bar">
        {['overview', 'grades', 'streaks'].map(tab => (
          <button key={tab} className={`tab-item ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ padding: '32px 40px' }}>
        {activeTab === 'overview' && (
          <div className="animate-fade-in">
            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
              {[
                { label: 'Lessons Completed', value: totalCompleted, icon: '📚', sub: 'of 240 total' },
                { label: 'Months Passed', value: monthsPassed, icon: '🎓', sub: 'of 24 total' },
                { label: 'Average Score', value: avgScore !== null ? `${avgScore}%` : '—', icon: '⭐', sub: 'across all grades' },
                { label: 'Day Streak', value: state.streak?.currentStreak || 0, icon: '🔥', sub: `best: ${state.streak?.longestStreak || 0}` },
                { label: 'Submissions', value: allGrades.length, icon: '✅', sub: 'graded by AI' },
                { label: 'Final Projects', value: finalProjectGrades.length, icon: '🏆', sub: `${finalProjectGrades.filter(([,g]) => g.score >= 80).length} passed` },
              ].map((s, i) => (
                <div key={i} style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '20px' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{s.icon}</div>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-gold-bright)', lineHeight: 1 }}>{s.value}</p>
                  <p style={{ color: 'var(--color-text-primary)', fontSize: '0.8rem', fontWeight: '500', marginTop: '4px' }}>{s.label}</p>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.72rem' }}>{s.sub}</p>
                </div>
              ))}
            </div>

            {/* Curriculum Progress Overview */}
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--color-text-primary)', marginBottom: '16px' }}>Curriculum Progress</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {CURRICULUM.slice(0, Math.min(currentMonth + 1, 24)).map(m => {
                const scoreA = getFinalProjectScore(`M${String(m.month).padStart(2,'0')}-A`);
                const scoreB = getFinalProjectScore(`M${String(m.month).padStart(2,'0')}-B`);
                const passedA = scoreA !== null && scoreA >= 80;
                const passedB = scoreB !== null && scoreB >= 80;
                const lessonsA = state.progress[`M${String(m.month).padStart(2,'0')}-A`]?.lessonsCompleted?.length || 0;
                const lessonsB = state.progress[`M${String(m.month).padStart(2,'0')}-B`]?.lessonsCompleted?.length || 0;
                const totalLessons = (m.courses[0]?.lessons?.length || 5) * 2;
                const progress = Math.round(((lessonsA + lessonsB) / totalLessons) * 100);

                return (
                  <div key={m.month} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '10px 0' }}>
                    <span style={{ minWidth: '24px', fontSize: '0.75rem', color: 'var(--color-text-muted)', fontVariantNumeric: 'tabular-nums' }}>{m.month}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-primary)', fontWeight: '500' }}>{m.title}</span>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          {scoreA !== null && <span style={{ fontSize: '0.72rem', color: getLetterGradeColor(scoreA) }}>A: {scoreA}%</span>}
                          {scoreB !== null && <span style={{ fontSize: '0.72rem', color: getLetterGradeColor(scoreB) }}>B: {scoreB}%</span>}
                        </div>
                      </div>
                      <div className="progress-bar-track" style={{ height: '4px' }}>
                        <div className="progress-bar-fill" style={{
                          width: `${progress}%`,
                          background: passedA && passedB ? 'linear-gradient(90deg, var(--color-success), #7ab84a)' : 'linear-gradient(90deg, var(--color-gold-dim), var(--color-gold-bright))'
                        }} />
                      </div>
                    </div>
                    {passedA && passedB ? (
                      <CheckCircle size={16} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
                    ) : (
                      <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', minWidth: '32px', textAlign: 'right' }}>{progress}%</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'grades' && (
          <div className="animate-fade-in">
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--color-text-primary)', marginBottom: '16px' }}>Grade History</h2>
            {allGrades.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--color-text-muted)' }}>
                <p style={{ fontSize: '3rem', marginBottom: '16px' }}>📋</p>
                <p>No grades yet. Submit your first assignment to see your grades here.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[...allGrades].reverse().map(([submissionId, grade], i) => (
                  <div key={i} style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: `conic-gradient(${getLetterGradeColor(grade.overallScore)} ${grade.overallScore * 3.6}deg, var(--color-surface-3) 0)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: '0.85rem', color: getLetterGradeColor(grade.overallScore) }}>{grade.letterGrade}</span>
                      </div>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', gap: '6px', marginBottom: '2px' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>{grade.courseId}</span>
                        {grade.isFinalProject && <span className="badge badge-gold" style={{ fontSize: '0.6rem' }}>Final Project</span>}
                      </div>
                      <p style={{ fontWeight: '500', color: 'var(--color-text-primary)', fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{grade.assignmentTitle}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        {grade.teacherName} · {grade.gradedAt ? format(new Date(grade.gradedAt), 'MMM d, yyyy') : 'Recently graded'}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: '700', color: getLetterGradeColor(grade.overallScore) }}>{grade.overallScore}</p>
                      <p style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>/ 100</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'streaks' && (
          <div className="animate-fade-in">
            <div style={{ maxWidth: '480px' }}>
              <StreakTracker />
              <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
                  <p style={{ fontSize: '2rem', marginBottom: '4px' }}>🔥</p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: '700', color: 'var(--color-gold-bright)' }}>{state.streak?.currentStreak || 0}</p>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>Current Streak</p>
                </div>
                <div style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
                  <p style={{ fontSize: '2rem', marginBottom: '4px' }}>🏆</p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: '700', color: 'var(--color-gold-bright)' }}>{state.streak?.longestStreak || 0}</p>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>Best Streak</p>
                </div>
              </div>
              <div style={{ marginTop: '12px', background: 'rgba(201,146,79,0.05)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '16px' }}>
                <p style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  "The secret of getting ahead is getting started. The secret of getting started is breaking your complex, overwhelming tasks into small, manageable tasks."
                </p>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.72rem', marginTop: '8px' }}>— Mark Twain</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
