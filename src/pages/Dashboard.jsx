import { Link } from 'react-router-dom';
import { format, addDays } from 'date-fns';
import {
  BookOpen, Clock, Target, TrendingUp,
  ChevronRight, Star, Flame, Award, Calendar, Lock,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import CURRICULUM from '../data/curriculum';
import ProgressRing from '../components/ProgressRing';
import StreakTracker from '../components/StreakTracker';
import DueDateBadge from '../components/DueDateBadge';

export default function Dashboard() {
  const {
    state, getCurrentMonth, isMonthUnlocked,
    getMonthProgress, getFinalProjectScore,
  } = useApp();

  const currentMonth = getCurrentMonth();
  const monthData = CURRICULUM.find(m => m.month === currentMonth);
  const enrollment = state.enrollmentDate ? new Date(state.enrollmentDate) : null;

  const overallProgress = calculateOverallProgress(state);
  const upcomingAssignments = getUpcomingAssignments(state, CURRICULUM, enrollment);
  const completedThisWeek = getCompletedThisWeek(state);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="main-content" style={{ minHeight: '100vh' }}>
      {/* Hero Header */}
      <div style={{
        background: 'linear-gradient(135deg, var(--color-surface) 0%, var(--color-surface-2) 100%)',
        borderBottom: '1px solid var(--color-border)',
        padding: '40px 40px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 50%, rgba(201,146,79,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>{greeting}</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '6px' }}>
            Welcome back, <span className="text-gold-gradient">{state.studentName}</span>.
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-serif)', fontSize: '1rem' }}>
            {monthData ? `Month ${currentMonth}: ${monthData.title}` : 'Your journey awaits.'}
            {enrollment && (
              <span style={{ color: 'var(--color-text-muted)', marginLeft: '12px', fontSize: '0.85rem' }}>
                Since {format(enrollment, 'MMMM d, yyyy')}
              </span>
            )}
          </p>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginTop: '32px' }}>
          <StatCard icon="🎓" label="Current Month" value={`Month ${currentMonth}`} sub={`Year ${currentMonth <= 12 ? 'I' : 'II'}`} />
          <StatCard icon="🔥" label="Study Streak" value={`${state.streak?.currentStreak || 0} days`} sub={`Best: ${state.streak?.longestStreak || 0} days`} />
          <StatCard icon="✅" label="Completed This Week" value={String(completedThisWeek)} sub="study sessions" />
          <StatCard icon="📚" label="Overall Progress" value={`${overallProgress}%`} sub="of curriculum" />
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{ padding: '32px 40px', display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px', alignItems: 'start' }}>
        {/* Left Column */}
        <div>
          {/* Continue Where You Left Off */}
          {monthData && (
            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrendingUp size={18} style={{ color: 'var(--color-gold)' }} />
                Continue Where You Left Off
              </h2>
              <div style={{ display: 'grid', gap: '12px' }}>
                {monthData.courses.map((course) => {
                  const progress = getMonthProgress({ courses: [course] });
                  const score = getFinalProjectScore(course.id);
                  const passed = score !== null && score >= 80;

                  // Figure out which tab to land on: if all lessons done → assignments/final-project, else lessons
                  const lessons = course.lessons || [];
                  const completedLessons = lessons.filter((_, i) =>
                    state.progress?.[course.id]?.lessonsCompleted?.includes(i)
                  ).length;
                  const allLessonsDone = lessons.length > 0 && completedLessons >= lessons.length;
                  const destTab = allLessonsDone ? 'assignments' : 'lessons';

                  return (
                    // Deep-link directly to the lessons (or assignments) tab
                    <Link
                      key={course.id}
                      to={`/classroom/m${monthData.month}/${course.id}?tab=${destTab}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <div
                        className="glass-card"
                        style={{ padding: '20px', cursor: 'pointer', transition: 'all 0.25s', display: 'flex', gap: '16px', alignItems: 'center' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-border-strong)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                      >
                        <ProgressRing percent={progress} size={56} strokeWidth={5} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                            <p style={{ fontSize: '0.7rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600' }}>{course.id}</p>
                            {passed && <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>✓ Passed</span>}
                          </div>
                          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '2px' }}>{course.title}</p>
                          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                            Prof. {course.teacher?.name?.split(' ').pop()} · {completedLessons}/{lessons.length} lessons done
                          </p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-gold)', flexShrink: 0 }}>
                          <span style={{ fontSize: '0.8rem' }}>
                            {passed ? 'Review' : allLessonsDone ? 'Assignments →' : 'Lessons →'}
                          </span>
                          <ChevronRight size={16} />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* Month Map Preview */}
          <section style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: '600', color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={18} style={{ color: 'var(--color-gold)' }} />
                Your Curriculum Path
              </h2>
              <Link to="/curriculum" style={{ color: 'var(--color-gold)', fontSize: '0.8rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                View All <ChevronRight size={14} />
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '8px' }}>
              {CURRICULUM.slice(0, 12).map(m => {
                const unlocked = isMonthUnlocked(m.month);
                const progress = getMonthProgress(m);
                const isCurrent = m.month === currentMonth;
                return (
                  <Link
                    key={m.month}
                    to={unlocked ? `/classroom/m${m.month}?tab=lessons` : '#'}
                    onClick={e => !unlocked && e.preventDefault()}
                    style={{ textDecoration: 'none' }}
                  >
                    <div style={{
                      padding: '12px',
                      background: isCurrent ? 'rgba(201,146,79,0.1)' : 'var(--color-surface-2)',
                      border: `1px solid ${isCurrent ? 'rgba(201,146,79,0.35)' : progress === 100 ? 'rgba(74,156,109,0.25)' : 'var(--color-border)'}`,
                      borderRadius: '10px',
                      opacity: unlocked ? 1 : 0.4,
                      cursor: unlocked ? 'pointer' : 'not-allowed',
                      transition: 'all 0.2s',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <span style={{ fontSize: '0.7rem', color: isCurrent ? 'var(--color-gold)' : 'var(--color-text-muted)', fontWeight: '600' }}>
                          M{String(m.month).padStart(2, '0')}
                        </span>
                        {!unlocked
                          ? <Lock size={10} style={{ color: 'var(--color-text-muted)' }} />
                          : progress === 100
                            ? <span style={{ fontSize: '0.7rem' }}>✓</span>
                            : progress > 0
                              ? <span style={{ fontSize: '0.65rem', color: 'var(--color-gold)' }}>{progress}%</span>
                              : null}
                      </div>
                      <p style={{ fontSize: '0.75rem', fontWeight: '500', color: 'var(--color-text-primary)', lineHeight: 1.3, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                        {m.title}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <div>
          {/* Progress Ring */}
          <div style={{ marginBottom: '20px', padding: '24px', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: '14px', textAlign: 'center' }}>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Overall Progress</p>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
              <ProgressRing percent={overallProgress} size={100} strokeWidth={8} />
            </div>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>
              {Math.round(overallProgress * 2.4)} / 240 lessons complete
            </p>
          </div>

          {/* Streak */}
          <div style={{ marginBottom: '20px' }}>
            <StreakTracker />
          </div>

          {/* Upcoming Assignments — NOW CLICKABLE */}
          <div style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: '14px', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={14} style={{ color: 'var(--color-gold)' }} />
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: 'var(--color-text-primary)' }}>Upcoming Due Dates</h3>
            </div>
            {upcomingAssignments.length === 0 ? (
              <div style={{ padding: '24px', textAlign: 'center' }}>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>No upcoming assignments.</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>Start your lessons to see due dates here.</p>
                {monthData && (
                  <Link
                    to={`/classroom/m${currentMonth}/${monthData.courses[0]?.id}?tab=lessons`}
                    style={{ display: 'inline-block', marginTop: '12px', color: 'var(--color-gold)', fontSize: '0.8rem', textDecoration: 'none', fontWeight: '500' }}
                  >
                    Start Month {currentMonth} →
                  </Link>
                )}
              </div>
            ) : (
              upcomingAssignments.slice(0, 5).map((a, i) => (
                // Each assignment row is a Link that navigates to the assignments tab of that course
                <Link
                  key={i}
                  to={`/classroom/m${a.monthNum}/${a.courseId}?tab=assignments`}
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <div
                    style={{
                      padding: '14px 20px',
                      borderBottom: i < upcomingAssignments.length - 1 ? '1px solid var(--color-border)' : 'none',
                      cursor: 'pointer',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,146,79,0.04)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-primary)', marginBottom: '3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {a.title}
                        </p>
                        <p style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>{a.courseName}</p>
                      </div>
                      <DueDateBadge dueDate={a.dueDate} submitted={a.submitted} />
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* Inspirational Quote */}
          <div style={{ marginTop: '20px', padding: '20px', background: 'rgba(201,146,79,0.05)', border: '1px solid var(--color-border)', borderRadius: '14px' }}>
            <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '8px' }}>
              {monthData?.courses?.[0]?.teacher?.quote || '"The eye sees only what the mind is prepared to comprehend."'}
            </p>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>— {monthData?.courses?.[0]?.teacher?.name || 'The Masters'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, sub }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '16px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>{icon}</span>
        <div>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>{label}</p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: '700', color: 'var(--color-gold-bright)', lineHeight: 1 }}>{value}</p>
          {sub && <p style={{ color: 'var(--color-text-muted)', fontSize: '0.72rem', marginTop: '2px' }}>{sub}</p>}
        </div>
      </div>
    </div>
  );
}

function calculateOverallProgress(state) {
  const courseIds = Object.keys(state.progress);
  if (courseIds.length === 0) return 0;
  let completed = 0;
  for (const id of courseIds) {
    completed += state.progress[id]?.lessonsCompleted?.length || 0;
  }
  return Math.min(100, Math.round((completed / 240) * 100));
}

function getUpcomingAssignments(state, curriculum, enrollment) {
  if (!enrollment) return [];
  const assignments = [];
  for (const month of curriculum) {
    const monthStart = addDays(enrollment, (month.month - 1) * 30);
    for (const course of month.courses) {
      for (const wa of (course.weeklyAssignments || [])) {
        const dueDate = addDays(monthStart, wa.dueDay);
        const assignmentId = `${course.id}_week${wa.week}`;
        const submitted = !!state.progress[course.id]?.assignmentsSubmitted?.[assignmentId];
        assignments.push({
          title: wa.title,
          courseName: course.title,
          dueDate,
          submitted,
          monthNum: month.month,
          courseId: course.id, // ← was missing before, needed for the Link
        });
      }
    }
  }
  return assignments
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .filter(a => !a.submitted);
}

function getCompletedThisWeek(state) {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const studyDates = state.streak?.studyDates || [];
  return studyDates.filter(d => new Date(d) >= weekAgo).length;
}
