import { createContext, useContext, useReducer, useEffect } from 'react';
import { addDays, isAfter, isBefore, differenceInDays, parseISO } from 'date-fns';

const AppContext = createContext(null);

const STORAGE_KEY = 'atelier_v1';

const initialState = {
  studentName: '',
  geminiApiKey: '',
  enrollmentDate: null,
  onboardingComplete: false,
  // progress: { [courseId]: { lessonsCompleted: Set, assignmentsSubmitted: {}, finalProjectScore: null } }
  progress: {},
  // grades: { [submissionId]: { score, feedback, gradedAt } }
  grades: {},
  // streak: { lastStudyDate, currentStreak, longestStreak, studyDates: [] }
  streak: { lastStudyDate: null, currentStreak: 0, longestStreak: 0, studyDates: [] },
  // Notification preferences
  notifications: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'HYDRATE':
      return { ...initialState, ...action.payload };

    case 'COMPLETE_ONBOARDING':
      return {
        ...state,
        studentName: action.payload.name,
        geminiApiKey: action.payload.apiKey,
        enrollmentDate: new Date().toISOString(),
        onboardingComplete: true,
      };

    case 'UPDATE_API_KEY':
      return { ...state, geminiApiKey: action.payload };

    case 'COMPLETE_LESSON': {
      const { courseId, lessonIndex } = action.payload;
      const courseProgress = state.progress[courseId] || { lessonsCompleted: [], assignmentsSubmitted: {}, finalProjectScore: null };
      const updated = {
        ...state,
        progress: {
          ...state.progress,
          [courseId]: {
            ...courseProgress,
            lessonsCompleted: courseProgress.lessonsCompleted.includes(lessonIndex)
              ? courseProgress.lessonsCompleted
              : [...courseProgress.lessonsCompleted, lessonIndex],
          },
        },
      };
      return recordStudyDay(updated);
    }

    case 'UNCOMPLETE_LESSON': {
      const { courseId, lessonIndex } = action.payload;
      const courseProgress = state.progress[courseId] || { lessonsCompleted: [], assignmentsSubmitted: {}, finalProjectScore: null };
      return {
        ...state,
        progress: {
          ...state.progress,
          [courseId]: {
            ...courseProgress,
            lessonsCompleted: courseProgress.lessonsCompleted.filter(i => i !== lessonIndex),
          },
        },
      };
    }

    case 'SUBMIT_ASSIGNMENT': {
      const { courseId, assignmentId, submissionData } = action.payload;
      const courseProgress = state.progress[courseId] || { lessonsCompleted: [], assignmentsSubmitted: {}, finalProjectScore: null };
      return {
        ...state,
        progress: {
          ...state.progress,
          [courseId]: {
            ...courseProgress,
            assignmentsSubmitted: {
              ...courseProgress.assignmentsSubmitted,
              [assignmentId]: { ...submissionData, submittedAt: new Date().toISOString() },
            },
          },
        },
      };
    }

    case 'SAVE_GRADE': {
      const { submissionId, gradeData } = action.payload;
      const newState = {
        ...state,
        grades: {
          ...state.grades,
          [submissionId]: { ...gradeData, gradedAt: new Date().toISOString() },
        },
      };
      // If this is a final project grade, save the score
      if (gradeData.isFinalProject) {
        const { courseId, score } = gradeData;
        const courseProgress = newState.progress[courseId] || { lessonsCompleted: [], assignmentsSubmitted: {}, finalProjectScore: null };
        newState.progress = {
          ...newState.progress,
          [courseId]: {
            ...courseProgress,
            finalProjectScore: score,
          },
        };
      }
      return newState;
    }

    case 'RECORD_STUDY_DAY':
      return recordStudyDay(state);

    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, { ...action.payload, id: Date.now(), read: false }],
      };

    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(n =>
          n.id === action.payload ? { ...n, read: true } : n
        ),
      };

    default:
      return state;
  }
}

function recordStudyDay(state) {
  const today = new Date().toDateString();
  const { streak } = state;

  if (streak.studyDates.includes(today)) return state;

  const lastDate = streak.lastStudyDate ? new Date(streak.lastStudyDate) : null;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  let newStreak = streak.currentStreak;
  if (!lastDate || lastDate.toDateString() === yesterday.toDateString()) {
    newStreak = streak.currentStreak + 1;
  } else if (lastDate.toDateString() !== today) {
    newStreak = 1; // Streak broken
  }

  return {
    ...state,
    streak: {
      lastStudyDate: new Date().toISOString(),
      currentStreak: newStreak,
      longestStreak: Math.max(streak.longestStreak, newStreak),
      studyDates: [...streak.studyDates, today],
    },
  };
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'HYDRATE', payload: parsed });
      }
    } catch (e) {
      console.error('Failed to load saved data:', e);
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (state.onboardingComplete) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (e) {
        console.error('Failed to save data:', e);
      }
    }
  }, [state]);

  // ============================================================
  // Derived values
  // ============================================================

  const getMonthProgress = (monthData) => {
    if (!monthData?.courses) return 0;
    let totalLessons = 0;
    let completedLessons = 0;
    for (const course of monthData.courses) {
      const cp = state.progress[course.id];
      totalLessons += course.lessons.length;
      completedLessons += cp?.lessonsCompleted?.length || 0;
    }
    return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  };

  const getCourseProgress = (courseId, totalLessons) => {
    const cp = state.progress[courseId];
    if (!cp || totalLessons === 0) return 0;
    return Math.round((cp.lessonsCompleted.length / totalLessons) * 100);
  };

  const isMonthUnlocked = (month) => {
    if (month === 1) return true;
    const prevMonth = month - 1;
    // Find the CURRICULUM month data — imported here we don't have it, so we use progress
    // Check that both courses of the previous month have finalProjectScore >= 80
    const prevMonthKey_A = `M${String(prevMonth).padStart(2,'0')}-A`;
    const prevMonthKey_B = `M${String(prevMonth).padStart(2,'0')}-B`;
    const scoreA = state.progress[prevMonthKey_A]?.finalProjectScore ?? null;
    const scoreB = state.progress[prevMonthKey_B]?.finalProjectScore ?? null;
    return scoreA !== null && scoreA >= 80 && scoreB !== null && scoreB >= 80;
  };

  const isLessonCompleted = (courseId, lessonIndex) => {
    return state.progress[courseId]?.lessonsCompleted?.includes(lessonIndex) || false;
  };

  const isAssignmentSubmitted = (courseId, assignmentId) => {
    return !!state.progress[courseId]?.assignmentsSubmitted?.[assignmentId];
  };

  const getGrade = (submissionId) => {
    return state.grades[submissionId] || null;
  };

  const getFinalProjectScore = (courseId) => {
    return state.progress[courseId]?.finalProjectScore ?? null;
  };

  const getEnrollmentDate = () => {
    return state.enrollmentDate ? new Date(state.enrollmentDate) : null;
  };

  const getDueDate = (courseId, dueDay) => {
    const enrollment = getEnrollmentDate();
    if (!enrollment) return null;
    // Extract month number from courseId (e.g., M01-A -> 1)
    const monthMatch = courseId.match(/M(\d+)/);
    const monthNum = monthMatch ? parseInt(monthMatch[1]) : 1;
    const monthStartDate = addDays(enrollment, (monthNum - 1) * 30);
    return addDays(monthStartDate, dueDay);
  };

  const getOverallProgress = () => {
    const courseIds = Object.keys(state.progress);
    if (courseIds.length === 0) return 0;
    let total = 0;
    let completed = 0;
    for (const id of courseIds) {
      const cp = state.progress[id];
      total += (cp.lessonsCompleted?.length || 0);
    }
    // Rough estimate: 5 lessons × 24 months × 2 courses = 240 total
    const maxLessons = 240;
    return Math.min(100, Math.round((total / maxLessons) * 100));
  };

  const getCurrentMonth = () => {
    const enrollment = getEnrollmentDate();
    if (!enrollment) return 1;
    const daysSinceEnrollment = differenceInDays(new Date(), enrollment);
    return Math.min(24, Math.floor(daysSinceEnrollment / 30) + 1);
  };

  const value = {
    state,
    dispatch,
    // Helpers
    getMonthProgress,
    getCourseProgress,
    isMonthUnlocked,
    isLessonCompleted,
    isAssignmentSubmitted,
    getGrade,
    getFinalProjectScore,
    getEnrollmentDate,
    getDueDate,
    getOverallProgress,
    getCurrentMonth,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
