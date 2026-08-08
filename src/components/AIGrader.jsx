import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Upload, X, Star, CheckCircle, AlertCircle, ExternalLink, Loader2, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import { gradeArtwork, getProgressFeedback, fileToBase64, getLetterGradeColor } from '../services/aiGrading';
import { useApp } from '../context/AppContext';

export default function AIGrader({ assignment, teacher, courseId, isFinalProject = false, onGradeComplete }) {
  const { state, dispatch } = useApp();
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isGrading, setIsGrading] = useState(false);
  const [gradingPhase, setGradingPhase] = useState('');
  const [grade, setGrade] = useState(null);
  const [error, setError] = useState('');
  const [expandedSection, setExpandedSection] = useState('strengths');
  const fileInputRef = useRef(null);

  const submissionId = `${courseId}_${assignment.title.replace(/\s+/g, '_')}`;
  const existingGrade = state.grades[submissionId];

  const handleFile = (file) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (JPG, PNG, WEBP, etc.)');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be under 10MB');
      return;
    }
    setError('');
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setGrade(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;
    if (!state.geminiApiKey) {
      setError('No API key configured. Go to Settings → AI Grading to add your Gemini API key.');
      return;
    }

    setIsGrading(true);
    setError('');

    try {
      setGradingPhase(`${teacher.name} is opening your submission...`);
      await sleep(800);
      setGradingPhase('Studying your composition and technique...');
      await sleep(1200);
      setGradingPhase('Evaluating against the rubric criteria...');

      const base64 = await fileToBase64(selectedFile);
      const result = await gradeArtwork({
        apiKey: state.geminiApiKey,
        imageBase64: base64,
        imageMimeType: selectedFile.type,
        assignment,
        teacher,
        studentName: state.studentName,
        isFinalProject,
      });

      setGradingPhase('Writing your feedback...');
      await sleep(600);

      setGrade(result);

      // Save grade to state
      const gradeData = {
        ...result,
        isFinalProject,
        courseId,
        score: result.overallScore,
        assignmentTitle: assignment.title,
        teacherName: teacher.name,
      };

      dispatch({
        type: 'SAVE_GRADE',
        payload: { submissionId, gradeData },
      });

      // Submit the assignment
      dispatch({
        type: 'SUBMIT_ASSIGNMENT',
        payload: {
          courseId,
          assignmentId: submissionId,
          submissionData: { fileName: selectedFile.name, score: result.overallScore },
        },
      });

      if (onGradeComplete) onGradeComplete(result);

    } catch (err) {
      setError(err.message || 'Grading failed. Please try again.');
    } finally {
      setIsGrading(false);
      setGradingPhase('');
    }
  };

  const displayGrade = grade || (existingGrade ? existingGrade : null);

  return (
    <div className="animate-fade-in">
      {!displayGrade && (
        <>
          {/* Upload Area */}
          <div
            className={`ai-grader-upload ${dragOver ? 'drag-over' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => !selectedFile && fileInputRef.current?.click()}
          >
            {!selectedFile ? (
              <div className="animate-fade-in">
                <div className="animate-float" style={{ fontSize: '3rem', marginBottom: '16px' }}>🎨</div>
                <p style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: '8px' }}>
                  Drop your artwork here
                </p>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '16px' }}>
                  or click to browse — JPG, PNG, WEBP up to 10MB
                </p>
                <button className="btn-outline" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
                  <Upload size={16} /> Choose File
                </button>
              </div>
            ) : (
              <div className="animate-scale-in" style={{ position: 'relative' }}>
                <img
                  src={previewUrl}
                  alt="Your submission"
                  style={{ maxHeight: '280px', maxWidth: '100%', borderRadius: '8px', objectFit: 'contain' }}
                />
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedFile(null); setPreviewUrl(null); }}
                  style={{ position: 'absolute', top: '-12px', right: '-12px', background: 'var(--color-surface-3)', border: '1px solid var(--color-border)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--color-text-secondary)' }}
                >
                  <X size={14} />
                </button>
                <p style={{ marginTop: '12px', color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>{selectedFile.name}</p>
              </div>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])} />
          </div>

          {error && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '14px 16px', background: 'var(--color-danger-dim)', border: '1px solid rgba(196,74,58,0.3)', borderRadius: '10px', marginTop: '16px' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <AlertCircle size={16} style={{ color: '#e06a5a', flexShrink: 0, marginTop: '2px' }} />
                <p style={{ color: '#e06a5a', fontSize: '0.875rem', lineHeight: 1.5 }}>{error}</p>
              </div>
              {/key|credentials|auth/i.test(error) && (
                <div style={{ display: 'flex', gap: '16px', marginTop: '4px', paddingTop: '8px', borderTop: '1px solid rgba(196,74,58,0.2)' }}>
                  <Link to="/settings" style={{ fontSize: '0.8rem', color: 'var(--color-gold)', fontWeight: '600', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    Open Settings →
                  </Link>
                  <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    Get Free Gemini API Key <ExternalLink size={12} />
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Grading Loading State */}
          {isGrading ? (
            <div style={{ textAlign: 'center', padding: '32px', marginTop: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
                <div className="teacher-avatar" style={{ width: '48px', height: '48px' }}>{teacher.initials}</div>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ color: 'var(--color-text-primary)', fontWeight: '500', fontSize: '0.9rem' }}>{teacher.name}</p>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>{teacher.specialty}</p>
                </div>
              </div>
              <div className="dot-pulse" style={{ justifyContent: 'center', marginBottom: '16px' }}>
                <span /><span /><span />
              </div>
              <p style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1rem' }}>
                {gradingPhase}
              </p>
            </div>
          ) : (
            selectedFile && (
              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                <button className="btn-gold" onClick={handleSubmit} style={{ fontSize: '1rem', padding: '14px 32px' }}>
                  <Star size={18} />
                  Submit for AI Grading
                </button>
              </div>
            )
          )}
        </>
      )}

      {/* Grade Results */}
      {displayGrade && (
        <GradeReport grade={displayGrade} teacher={teacher} isFinalProject={isFinalProject}
          expandedSection={expandedSection} setExpandedSection={setExpandedSection}
          onResubmit={() => { setGrade(null); setSelectedFile(null); setPreviewUrl(null); }}
        />
      )}
    </div>
  );
}

function GradeReport({ grade, teacher, isFinalProject, expandedSection, setExpandedSection, onResubmit }) {
  const score = grade.overallScore;
  const passed = score >= 80;
  const color = getLetterGradeColor(score);
  const pct = score;

  return (
    <div className="animate-fade-in-up">
      {/* Score Header */}
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center', padding: '24px', background: 'var(--color-surface-3)', borderRadius: '16px', marginBottom: '20px' }}>
        {/* Grade Circle */}
        <div style={{ '--grade-pct': `${pct * 3.6}deg`, position: 'relative', flexShrink: 0 }}>
          <div className="grade-circle score-reveal" style={{ background: `conic-gradient(${color} ${pct * 3.6}deg, var(--color-surface-3) 0)` }}>
            <div className="grade-circle-inner">
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: '700', color }}>{score}</span>
              <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', marginTop: '-2px' }}>/ 100</span>
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: '700', color }}>{grade.letterGrade}</span>
            {isFinalProject && (
              <span className={`badge ${passed ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: '0.8rem' }}>
                {passed ? '✓ Course Passed' : '✗ Resubmit Required'}
              </span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <div className="teacher-avatar" style={{ width: '32px', height: '32px', fontSize: '0.8rem' }}>{teacher.initials}</div>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Graded by {teacher.name}</p>
          </div>
          {isFinalProject && !passed && (
            <p style={{ color: '#e06a5a', fontSize: '0.8rem', background: 'var(--color-danger-dim)', padding: '8px 12px', borderRadius: '8px' }}>
              A score of 80 or higher is required to unlock the next month. Review the feedback and resubmit.
            </p>
          )}
          {isFinalProject && passed && (
            <p style={{ color: 'var(--color-success)', fontSize: '0.8rem', background: 'var(--color-success-dim)', padding: '8px 12px', borderRadius: '8px' }}>
              🎉 Excellent work! You've unlocked the next month's curriculum.
            </p>
          )}
        </div>
      </div>

      {/* Criterion Breakdown */}
      {grade.criterionScores && (
        <div style={{ marginBottom: '16px' }}>
          <h4 style={{ color: 'var(--color-text-secondary)', fontSize: '0.7rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>Rubric Breakdown</h4>
          {grade.criterionScores.map((c, i) => (
            <div key={i} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ color: 'var(--color-text-primary)', fontSize: '0.875rem' }}>{c.criterion}</span>
                <span style={{ color: getLetterGradeColor(c.score), fontWeight: '600', fontSize: '0.875rem' }}>{c.score}/100</span>
              </div>
              <div className="progress-bar-track" style={{ marginBottom: '4px' }}>
                <div className="progress-bar-fill" style={{ width: `${c.score}%`, background: `linear-gradient(90deg, ${getLetterGradeColor(c.score)}88, ${getLetterGradeColor(c.score)})` }} />
              </div>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.78rem', fontStyle: 'italic' }}>{c.comment}</p>
            </div>
          ))}
        </div>
      )}

      <div className="brushstroke-divider" />

      {/* Teacher's Comment */}
      <div style={{ padding: '20px', background: 'rgba(201,146,79,0.06)', border: '1px solid var(--color-border)', borderRadius: '12px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <div className="teacher-avatar">{teacher.initials}</div>
          <div>
            <p style={{ color: 'var(--color-gold)', fontWeight: '600', fontSize: '0.875rem', marginBottom: '8px' }}>{teacher.name} writes:</p>
            <p style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-serif)', fontSize: '1.05rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{grade.teacherComment}</p>
          </div>
        </div>
      </div>

      {/* Expandable Sections */}
      <CollapsibleSection title="Strengths" icon="✨" expanded={expandedSection === 'strengths'} onToggle={() => setExpandedSection(expandedSection === 'strengths' ? null : 'strengths')} accentColor="var(--color-success)">
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {grade.strengths?.map((s, i) => (
            <li key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
              <CheckCircle size={14} style={{ color: 'var(--color-success)', flexShrink: 0, marginTop: '3px' }} />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </CollapsibleSection>

      <CollapsibleSection title="Areas to Improve" icon="🎯" expanded={expandedSection === 'improve'} onToggle={() => setExpandedSection(expandedSection === 'improve' ? null : 'improve')} accentColor="var(--color-warning)">
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {grade.areasToImprove?.map((a, i) => (
            <li key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--color-warning)', fontWeight: '700', flexShrink: 0 }}>→</span>
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </CollapsibleSection>

      <CollapsibleSection title="Recommended Exercises" icon="📚" expanded={expandedSection === 'exercises'} onToggle={() => setExpandedSection(expandedSection === 'exercises' ? null : 'exercises')} accentColor="var(--color-gold)">
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {grade.recommendedExercises?.map((e, i) => (
            <li key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--color-gold)', flexShrink: 0 }}>•</span>
              <span>{e}</span>
            </li>
          ))}
        </ul>
        {grade.nextStepAdvice && (
          <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(201,146,79,0.08)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
            <p style={{ color: 'var(--color-gold-bright)', fontSize: '0.8rem', fontWeight: '600', marginBottom: '4px' }}>Next Session Focus:</p>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>{grade.nextStepAdvice}</p>
          </div>
        )}
      </CollapsibleSection>

      {/* Resubmit */}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        <button className="btn-ghost" onClick={onResubmit} style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
          Submit a different artwork
        </button>
      </div>
    </div>
  );
}

function CollapsibleSection({ title, icon, expanded, onToggle, accentColor, children }) {
  return (
    <div style={{ marginBottom: '8px', border: '1px solid var(--color-border)', borderRadius: '10px', overflow: 'hidden' }}>
      <button
        onClick={onToggle}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: expanded ? 'rgba(255,255,255,0.02)' : 'transparent', cursor: 'pointer', border: 'none', color: 'var(--color-text-primary)', fontFamily: 'var(--font-sans)', fontWeight: '500', fontSize: '0.9rem', gap: '8px' }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>{icon}</span>
          <span>{title}</span>
        </span>
        {expanded ? <ChevronUp size={16} style={{ color: 'var(--color-text-muted)' }} /> : <ChevronDown size={16} style={{ color: 'var(--color-text-muted)' }} />}
      </button>
      {expanded && (
        <div style={{ padding: '0 16px 16px', animation: 'fadeIn 0.2s ease' }}>
          {children}
        </div>
      )}
    </div>
  );
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
