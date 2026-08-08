import { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import {
  ChevronRight, Clock, CheckCircle, Lock, User
} from 'lucide-react';
import { addDays } from 'date-fns';
import { useApp } from '../context/AppContext';
import CURRICULUM from '../data/curriculum';
import AIGrader from '../components/AIGrader';
import DueDateBadge from '../components/DueDateBadge';

const TABS = ['overview', 'lessons', 'assignments', 'final-project', 'resources'];
const TAB_LABELS = {
  overview: 'Overview',
  lessons: 'Lessons',
  assignments: 'Weekly Work',
  'final-project': 'Final Project',
  resources: 'References',
};

export default function Classroom() {
  const { monthId, courseId } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  // Read tab from URL ?tab=lessons etc., default to 'lessons' so clicking a course shows lessons immediately
  const activeTab = TABS.includes(searchParams.get('tab')) ? searchParams.get('tab') : 'lessons';
  const setActiveTab = (tab) => setSearchParams({ tab }, { replace: true });
  const {
    state, dispatch,
    isLessonCompleted, isAssignmentSubmitted,
    getFinalProjectScore, getEnrollmentDate,
  } = useApp();

  // monthId from route /classroom/:monthId could be "m1" or "1"
  const monthNum = parseInt(String(monthId || '').replace(/^m/i, ''), 10);
  const monthData = CURRICULUM.find(m => m.month === monthNum);

  let course, otherCourse;
  if (courseId && monthData) {
    course = monthData.courses.find(c => c.id === courseId);
    otherCourse = monthData.courses.find(c => c.id !== courseId);
  } else if (monthData) {
    course = monthData.courses[0];
    otherCourse = monthData.courses[1];
  }

  if (!monthData || !course) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column', gap: '16px', color: 'var(--color-text-secondary)' }}>
        <p style={{ fontSize: '3rem' }}>🎨</p>
        <p>Course not found (month {monthId}).</p>
        <button className="btn-outline" onClick={() => navigate('/')}>Go to Dashboard</button>
      </div>
    );
  }

  const enrollment = getEnrollmentDate();
  const monthStart = enrollment ? addDays(enrollment, (monthNum - 1) * 30) : null;
  const finalScore = getFinalProjectScore(course.id);
  const finalPassed = finalScore !== null && finalScore >= 80;

  return (
    <div className="main-content">
      {/* Hero */}
      <div className="classroom-hero">
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px', fontSize: '0.75rem', color: 'var(--color-text-muted)', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', padding: 0, fontSize: '0.75rem' }}>Dashboard</button>
            <ChevronRight size={12} />
            <span>Month {monthNum}: {monthData.title}</span>
            <ChevronRight size={12} />
            <span style={{ color: 'var(--color-gold)' }}>{course.id}</span>
          </div>

          <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '240px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                <span className="badge badge-gold">{course.id}</span>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>Year {monthData.year} · Month {monthNum}</span>
                {finalPassed && <span className="badge badge-success">✓ Completed</span>}
              </div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '6px', lineHeight: 1.2 }}>
                {course.title}
              </h1>
              <p style={{ color: 'var(--color-gold-bright)', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1rem', marginBottom: '12px' }}>
                {monthData.subtitle}
              </p>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '600px' }}>
                {course.description}
              </p>
            </div>

            {/* Teacher Card */}
            {course.teacher && (
              <div style={{ background: 'rgba(201,146,79,0.06)', border: '1px solid var(--color-border)', borderRadius: '14px', padding: '20px', minWidth: '220px', maxWidth: '300px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                  <div className="teacher-avatar">{course.teacher.initials}</div>
                  <div>
                    <p style={{ fontWeight: '600', color: 'var(--color-text-primary)', fontSize: '0.9rem' }}>{course.teacher.name}</p>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>{course.teacher.specialty}</p>
                  </div>
                </div>
                <p style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  {course.teacher.quote}
                </p>
              </div>
            )}
          </div>

          {/* Switch Course */}
          {otherCourse && (
            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>Also this month:</span>
              <button
                onClick={() => navigate(`/classroom/m${monthNum}/${otherCourse.id}`)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-gold)', fontSize: '0.8rem', background: 'none', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '4px 12px', cursor: 'pointer' }}
              >
                {otherCourse.id}: {otherCourse.title.length > 30 ? otherCourse.title.slice(0, 30) + '…' : otherCourse.title}
                <ChevronRight size={12} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tab Bar */}
      <div className="tab-bar">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`tab-item ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {TAB_LABELS[tab]}
            {tab === 'final-project' && finalPassed && (
              <span style={{ marginLeft: '5px', fontSize: '0.65rem', color: 'var(--color-success)' }}>✓</span>
            )}
            {tab === 'final-project' && finalScore !== null && !finalPassed && (
              <span style={{ marginLeft: '5px', fontSize: '0.65rem', color: 'var(--color-danger)' }}>{finalScore}%</span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ padding: '32px 40px' }}>
        {activeTab === 'overview' && (
          <OverviewTab course={course} monthData={monthData} />
        )}
        {activeTab === 'lessons' && (
          <LessonsTab
            course={course}
            state={state}
            dispatch={dispatch}
            isLessonCompleted={isLessonCompleted}
          />
        )}
        {activeTab === 'assignments' && (
          <AssignmentsTab
            course={course}
            monthStart={monthStart}
            state={state}
            dispatch={dispatch}
            isAssignmentSubmitted={isAssignmentSubmitted}
          />
        )}
        {activeTab === 'final-project' && (
          <FinalProjectTab
            course={course}
            finalScore={finalScore}
            finalPassed={finalPassed}
            state={state}
          />
        )}
        {activeTab === 'resources' && (
          <ResourcesTab course={course} monthData={monthData} />
        )}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Overview Tab
// ────────────────────────────────────────────────────────────
function OverviewTab({ course, monthData }) {
  return (
    <div className="animate-fade-in">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        {/* Course Info */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '16px' }}>
            Course Structure
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <InfoRow icon="📖" label="Lessons" value={`${course.lessons?.length || 0} daily lessons`} />
            <InfoRow icon="📋" label="Weekly Work" value={`${course.weeklyAssignments?.length || 0} weekly assignments`} />
            <InfoRow icon="⭐" label="Final Project" value={course.finalProject?.title || 'Capstone project'} />
            <InfoRow icon="⏱" label="Est. Time" value={`${(course.lessons?.length || 0) * 50} min of lessons`} />
            <InfoRow icon="🎯" label="Pass Score" value="80% on final project" />
          </div>
        </div>

        {/* Studio Challenge */}
        {monthData.studioChallenge && (
          <div className="glass-card" style={{ padding: '24px', borderColor: 'rgba(201,146,79,0.2)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: '600', color: 'var(--color-gold-bright)', marginBottom: '8px' }}>
              🎨 Studio Practice Challenge
            </h3>
            <p style={{ fontWeight: '600', color: 'var(--color-text-primary)', fontSize: '0.9rem', marginBottom: '6px' }}>
              {monthData.studioChallenge.title}
            </p>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '10px' }}>
              {monthData.studioChallenge.description}
            </p>
            <span className="badge badge-gold">{monthData.studioChallenge.frequency}</span>
          </div>
        )}
      </div>

      {/* About the Teacher */}
      {course.teacher && (
        <div style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: '14px', padding: '28px', marginBottom: '24px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={16} style={{ color: 'var(--color-gold)' }} /> About Your Professor
          </h3>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div className="teacher-avatar" style={{ width: '64px', height: '64px', fontSize: '1.4rem', flexShrink: 0 }}>
              {course.teacher.initials}
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '4px' }}>
                {course.teacher.name}
              </p>
              <p style={{ color: 'var(--color-gold)', fontSize: '0.8rem', marginBottom: '12px' }}>
                {course.teacher.specialty}
              </p>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                {course.teacher.bio}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Master Reference */}
      {course.finalProject?.masterArtistReference && (
        <div style={{ background: 'rgba(201,146,79,0.04)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '20px' }}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>
            This Month's Master Study Reference
          </p>
          <p style={{ fontFamily: 'var(--font-display)', color: 'var(--color-gold-bright)', fontSize: '1rem' }}>
            {course.finalProject.masterArtistReference}
          </p>
        </div>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Lessons Tab — fixed: no useState inside map
// ────────────────────────────────────────────────────────────
function LessonsTab({ course, state, dispatch, isLessonCompleted }) {
  const [expanded, setExpanded] = useState(null);

  const handleToggle = (idx) => {
    const completed = isLessonCompleted(course.id, idx);
    const prevCompleted = idx === 0 || isLessonCompleted(course.id, idx - 1);
    if (!prevCompleted && !completed) return; // locked
    setExpanded(prev => prev === idx ? null : idx);
  };

  const handleComplete = (e, idx) => {
    e.stopPropagation();
    if (isLessonCompleted(course.id, idx)) {
      dispatch({ type: 'UNCOMPLETE_LESSON', payload: { courseId: course.id, lessonIndex: idx } });
    } else {
      dispatch({ type: 'COMPLETE_LESSON', payload: { courseId: course.id, lessonIndex: idx } });
    }
  };

  const lessons = course.lessons || [];
  const completedCount = lessons.filter((_, i) => isLessonCompleted(course.id, i)).length;
  const totalLessons = lessons.length;
  const pct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div className="animate-fade-in">
      {/* Progress header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--color-text-primary)', marginBottom: '4px' }}>
            Daily Lessons
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
            {completedCount} of {totalLessons} completed · click any available lesson to open it
          </p>
        </div>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-gold-bright)' }}>
          {pct}%
        </span>
      </div>
      <div className="progress-bar-track" style={{ marginBottom: '24px', height: '8px' }}>
        <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
      </div>

      {/* Lesson list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {lessons.map((lesson, idx) => {
          const completed = isLessonCompleted(course.id, idx);
          const prevCompleted = idx === 0 || isLessonCompleted(course.id, idx - 1);
          const isOpen = expanded === idx;
          const isAvailable = prevCompleted || completed;

          return (
            <div
              key={idx}
              className={`lesson-card ${completed ? 'completed' : ''} ${!isAvailable ? 'locked' : ''}`}
              onClick={() => handleToggle(idx)}
              role="button"
              tabIndex={isAvailable ? 0 : -1}
              onKeyDown={e => e.key === 'Enter' && handleToggle(idx)}
              aria-expanded={isOpen}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                {/* Status icon */}
                <div style={{ flexShrink: 0, marginTop: '2px' }}>
                  {completed ? (
                    <CheckCircle size={20} style={{ color: 'var(--color-success)' }} />
                  ) : !isAvailable ? (
                    <Lock size={18} style={{ color: 'var(--color-text-muted)' }} />
                  ) : (
                    <div style={{
                      width: '20px', height: '20px', borderRadius: '50%',
                      border: '2px solid var(--color-gold)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: isOpen ? 'rgba(201,146,79,0.15)' : 'transparent',
                    }}>
                      <span style={{ color: 'var(--color-gold)', fontSize: '0.6rem', fontWeight: '700' }}>{idx + 1}</span>
                    </div>
                  )}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>Day {idx + 1}</span>
                      <span className={`badge ${completed ? 'badge-success' : isAvailable ? 'badge-gold' : 'badge-muted'}`} style={{ fontSize: '0.62rem' }}>
                        {completed ? '✓ Done' : isAvailable ? 'Available' : 'Locked'}
                      </span>
                    </div>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', flexShrink: 0 }}>{lesson.duration}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: '600', color: completed ? 'var(--color-text-secondary)' : 'var(--color-text-primary)', lineHeight: 1.3 }}>
                    {lesson.title}
                  </h3>
                </div>

                {isAvailable && (
                  <ChevronRight
                    size={16}
                    style={{
                      color: 'var(--color-text-muted)',
                      flexShrink: 0,
                      marginTop: '4px',
                      transform: isOpen ? 'rotate(90deg)' : 'none',
                      transition: 'transform 0.2s ease',
                    }}
                  />
                )}
              </div>

              {/* Expanded content */}
              {isOpen && (
                <div
                  className="animate-fade-in"
                  style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--color-border)' }}
                  onClick={e => e.stopPropagation()}
                >
                  {/* Lesson body */}
                  <div style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: '0.92rem',
                    lineHeight: 1.85,
                    fontFamily: 'var(--font-serif)',
                    marginBottom: '20px',
                    whiteSpace: 'pre-wrap',
                  }}>
                    {lesson.content}
                  </div>

                  {/* Key Terms */}
                  {lesson.keyTerms?.length > 0 && (
                    <div style={{ marginBottom: '16px' }}>
                      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                        Key Terms
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {lesson.keyTerms.map((term, i) => (
                          <span key={i} className="badge badge-gold" style={{ fontSize: '0.75rem' }}>{term}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Exercise */}
                  {lesson.exercise && (
                    <div style={{
                      background: 'rgba(201,146,79,0.06)',
                      border: '1px solid rgba(201,146,79,0.2)',
                      borderRadius: '10px',
                      padding: '16px',
                      marginBottom: '20px',
                    }}>
                      <p style={{ color: 'var(--color-gold)', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                        📐 Practice Exercise
                      </p>
                      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>{lesson.exercise}</p>
                    </div>
                  )}

                  {/* Mark complete button */}
                  <button
                    className={completed ? 'btn-outline' : 'btn-gold'}
                    onClick={(e) => handleComplete(e, idx)}
                    style={{ fontSize: '0.875rem' }}
                  >
                    {completed ? '↩ Mark as Incomplete' : '✓ Mark as Complete'}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Assignments Tab — FIXED: useState pulled out of .map()
// ────────────────────────────────────────────────────────────
function AssignmentCard({ wa, idx, course, monthStart, state, isAssignmentSubmitted }) {
  const [showGrader, setShowGrader] = useState(false);
  const assignmentId = `${course.id}_week${wa.week}`;
  const submitted = isAssignmentSubmitted(course.id, assignmentId);
  const dueDate = monthStart ? addDays(monthStart, wa.dueDay) : null;
  const gradeKey = `${course.id}_${wa.title.replace(/\s+/g, '_')}`;
  const grade = state.grades?.[gradeKey];

  return (
    <div className="assignment-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
            <span className="badge badge-muted" style={{ fontSize: '0.65rem' }}>Week {wa.week}</span>
            <DueDateBadge dueDate={dueDate} submitted={submitted} showFull />
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: '600', color: 'var(--color-text-primary)' }}>
            {wa.title}
          </h3>
        </div>
        {grade && (
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: '700', color: 'var(--color-gold-bright)' }}>
            {grade.overallScore}%
          </span>
        )}
      </div>

      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '16px' }}>
        {wa.brief}
      </p>

      {/* Rubric pills */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
        {wa.rubric?.map((r, ri) => (
          <div key={ri} style={{ background: 'var(--color-surface-3)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '6px 12px' }}>
            <p style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>{r.criterion}</p>
            <p style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--color-gold)' }}>{r.weight}%</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Clock size={12} style={{ color: 'var(--color-text-muted)' }} />
        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{wa.estimatedTime}</span>
        <button
          className={submitted && grade ? 'btn-outline' : 'btn-gold'}
          style={{ marginLeft: 'auto', fontSize: '0.8rem', padding: '8px 16px' }}
          onClick={() => setShowGrader(v => !v)}
        >
          {showGrader ? 'Hide' : submitted && grade ? 'View Grade' : submitted ? 'Resubmit' : 'Submit & Grade'}
        </button>
      </div>

      {showGrader && (
        <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--color-border)' }}>
          <AIGrader
            assignment={wa}
            teacher={course.teacher}
            courseId={course.id}
            isFinalProject={false}
            onGradeComplete={() => setShowGrader(false)}
          />
        </div>
      )}
    </div>
  );
}

function AssignmentsTab({ course, monthStart, state, isAssignmentSubmitted }) {
  return (
    <div className="animate-fade-in">
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--color-text-primary)', marginBottom: '8px' }}>
        Weekly Assignments
      </h2>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginBottom: '24px' }}>
        Complete and submit your work for AI grading by your professor. Each assignment builds toward the final project.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {(course.weeklyAssignments || []).map((wa, idx) => (
          <AssignmentCard
            key={idx}
            wa={wa}
            idx={idx}
            course={course}
            monthStart={monthStart}
            state={state}
            isAssignmentSubmitted={isAssignmentSubmitted}
          />
        ))}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Final Project Tab
// ────────────────────────────────────────────────────────────
function FinalProjectTab({ course, finalScore, finalPassed, state }) {
  const [showGrader, setShowGrader] = useState(false);
  const fp = course.finalProject;

  if (!fp) {
    return <p style={{ color: 'var(--color-text-secondary)' }}>No final project defined for this course.</p>;
  }

  return (
    <div className="animate-fade-in">
      {/* Status banner */}
      {finalScore !== null && (
        <div style={{
          padding: '16px 20px',
          background: finalPassed ? 'var(--color-success-dim)' : 'var(--color-danger-dim)',
          border: `1px solid ${finalPassed ? 'rgba(74,156,109,0.3)' : 'rgba(196,74,58,0.3)'}`,
          borderRadius: '12px',
          marginBottom: '24px',
          display: 'flex', alignItems: 'center', gap: '12px',
        }}>
          {finalPassed && <CheckCircle size={20} style={{ color: 'var(--color-success)' }} />}
          <div>
            <p style={{ fontWeight: '600', color: finalPassed ? 'var(--color-success)' : '#e06a5a', fontSize: '0.9rem' }}>
              {finalPassed
                ? `✓ Project Passed — Score: ${finalScore}%`
                : `Score: ${finalScore}% — 80% required to advance`}
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
              {finalPassed
                ? 'The next month is now unlocked.'
                : 'Review the feedback below and resubmit when ready.'}
            </p>
          </div>
        </div>
      )}

      {/* Project brief */}
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '8px' }}>
        {fp.title}
      </h2>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <span className="badge badge-gold">⏱ {fp.estimatedTime}</span>
        <span className="badge badge-warning">⭐ Pass: {fp.passingScore}%</span>
        {fp.masterArtistReference && (
          <span className="badge badge-muted">Ref: {fp.masterArtistReference.split('—')[0].trim()}</span>
        )}
      </div>

      <div style={{
        color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.8,
        fontFamily: 'var(--font-serif)', whiteSpace: 'pre-wrap',
        background: 'var(--color-surface-2)', border: '1px solid var(--color-border)',
        borderRadius: '12px', padding: '24px', marginBottom: '24px',
      }}>
        {fp.brief}
      </div>

      {/* Rubric */}
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--color-text-primary)', marginBottom: '12px' }}>
        Grading Rubric
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
        {fp.rubric?.map((r, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '12px 16px', background: 'var(--color-surface-2)',
            border: '1px solid var(--color-border)', borderRadius: '8px',
          }}>
            <span style={{ color: 'var(--color-text-primary)', fontSize: '0.875rem' }}>{r.criterion}</span>
            <span style={{ color: 'var(--color-gold)', fontWeight: '600', fontSize: '0.875rem' }}>{r.weight}%</span>
          </div>
        ))}
      </div>

      {/* Master reference */}
      {fp.masterArtistReference && (
        <div style={{ background: 'rgba(201,146,79,0.05)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
            Master Reference
          </p>
          <p style={{ color: 'var(--color-gold-bright)', fontFamily: 'var(--font-display)', fontSize: '0.95rem' }}>
            {fp.masterArtistReference}
          </p>
        </div>
      )}

      {/* Submit button */}
      <button
        className="btn-gold"
        style={{ fontSize: '1rem', padding: '14px 32px' }}
        onClick={() => setShowGrader(v => !v)}
      >
        {showGrader
          ? 'Hide Submission'
          : finalScore !== null
            ? '🔄 Resubmit Final Project'
            : '🎨 Submit Final Project for Grading'}
      </button>

      {showGrader && (
        <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--color-border)' }}>
          <p style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-serif)', fontStyle: 'italic', marginBottom: '20px', fontSize: '1rem' }}>
            Upload a clear photo or scan of your completed project. {course.teacher?.name} will grade your submission.
          </p>
          <AIGrader
            assignment={fp}
            teacher={course.teacher}
            courseId={course.id}
            isFinalProject={true}
            onGradeComplete={() => setShowGrader(false)}
          />
        </div>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Resources Tab
// ────────────────────────────────────────────────────────────
function ResourcesTab({ course, monthData }) {
  const refs = course.references || [];
  return (
    <div className="animate-fade-in">
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--color-text-primary)', marginBottom: '8px' }}>
        Reading List & References
      </h2>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginBottom: '24px' }}>
        Your professor's recommended reading for this course. The more you absorb, the faster you'll grow.
      </p>

      {refs.length === 0 ? (
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>No references listed for this course.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
          {refs.map((ref, i) => (
            <div key={i} style={{
              background: 'var(--color-surface-2)', border: '1px solid var(--color-border)',
              borderRadius: '12px', padding: '20px',
              display: 'flex', gap: '16px', alignItems: 'flex-start',
            }}>
              <div style={{
                width: '48px', height: '60px',
                background: `hsl(${(i * 47 + 30) % 360}deg 30% 18%)`,
                borderRadius: '6px', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.2rem', border: '1px solid var(--color-border)',
              }}>📘</div>
              <div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '2px' }}>
                  {ref.title}
                </p>
                <p style={{ color: 'var(--color-gold)', fontSize: '0.8rem', marginBottom: '6px' }}>by {ref.author}</p>
                {ref.note && (
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', fontStyle: 'italic' }}>{ref.note}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Studio Practice */}
      {monthData.studioChallenge && (
        <div style={{ background: 'rgba(201,146,79,0.05)', border: '1px solid rgba(201,146,79,0.2)', borderRadius: '14px', padding: '24px' }}>
          <p style={{ color: 'var(--color-gold)', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
            🎨 Studio Practice Challenge
          </p>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--color-text-primary)', marginBottom: '8px' }}>
            {monthData.studioChallenge.title}
          </h3>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '12px' }}>
            {monthData.studioChallenge.description}
          </p>
          <span className="badge badge-gold">{monthData.studioChallenge.frequency}</span>
        </div>
      )}
    </div>
  );
}

// Shared utility
function InfoRow({ icon, label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <span style={{ fontSize: '1rem', flexShrink: 0 }}>{icon}</span>
      <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', minWidth: '110px' }}>{label}</span>
      <span style={{ color: 'var(--color-text-primary)', fontSize: '0.875rem' }}>{value}</span>
    </div>
  );
}
