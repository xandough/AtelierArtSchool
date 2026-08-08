import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import App from '../App';
import { AppProvider } from '../context/AppContext';
import Dashboard from '../pages/Dashboard';
import CurriculumMap from '../pages/CurriculumMap';
import Classroom from '../pages/Classroom';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';

// Helper to seed localStorage
function setupInitialState(overrides = {}) {
  const defaultState = {
    studentName: 'Test Artist',
    geminiApiKey: 'test-key-123',
    enrollmentDate: new Date().toISOString(),
    onboardingComplete: true,
    progress: {
      'M01-A': { lessonsCompleted: [0], assignmentsSubmitted: {}, finalProjectScore: 90 },
      'M01-B': { lessonsCompleted: [], assignmentsSubmitted: {}, finalProjectScore: 85 }
    },
    grades: {},
    streak: { lastStudyDate: new Date().toISOString(), currentStreak: 5, longestStreak: 10, studyDates: [new Date().toDateString()] },
    notifications: [],
    ...overrides
  };
  window.localStorage.setItem('atelier_v1', JSON.stringify(defaultState));
}

describe('The Atelier App - Page and Route Integration Tests', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders Onboarding when onboardingComplete is false', () => {
    render(<App />);
    expect(screen.getByText(/Welcome, Artist/i)).toBeInTheDocument();
  });

  it('renders Dashboard correctly when onboarding is complete', () => {
    setupInitialState();
    render(<App />);
    expect(screen.getByText(/Welcome back,/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Test Artist/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Continue Where You Left Off/i)).toBeInTheDocument();
  });

  it('navigates to Classroom /classroom/m1 when lesson/course button is clicked', () => {
    setupInitialState();
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppProvider>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/classroom/:monthId" element={<Classroom />} />
            <Route path="/classroom/:monthId/:courseId" element={<Classroom />} />
          </Routes>
        </AppProvider>
      </MemoryRouter>
    );

    // Find course card link
    const courseCard = screen.getAllByText('Line & Spatial Awareness')[0];
    expect(courseCard).toBeInTheDocument();

    // Click link to classroom
    fireEvent.click(courseCard);

    // Classroom teacher name should now be in document
    expect(screen.getByText(/Prof. Eleanor Voss/i)).toBeInTheDocument();
  });

  it('renders CurriculumMap correctly and allows month navigation', () => {
    setupInitialState();
    render(
      <MemoryRouter initialEntries={['/curriculum']}>
        <AppProvider>
          <Routes>
            <Route path="/curriculum" element={<CurriculumMap />} />
            <Route path="/classroom/:monthId" element={<Classroom />} />
          </Routes>
        </AppProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('24-Month Curriculum')).toBeInTheDocument();
    expect(screen.getByText('Year 1')).toBeInTheDocument();
    expect(screen.getByText('Year 2')).toBeInTheDocument();

    // Click on Month 1 card
    const month1Title = screen.getByText('Line, Space & The First Mark');
    fireEvent.click(month1Title);

    // Should navigate to classroom month 1
    expect(screen.getByText(/Prof. Eleanor Voss/i)).toBeInTheDocument();
  });

  it('renders Classroom correctly for /classroom/m1 and switches tabs', () => {
    setupInitialState();
    render(
      <MemoryRouter initialEntries={['/classroom/m1']}>
        <AppProvider>
          <Routes>
            <Route path="/classroom/:monthId" element={<Classroom />} />
            <Route path="/classroom/:monthId/:courseId" element={<Classroom />} />
          </Routes>
        </AppProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Prof. Eleanor Voss/i)).toBeInTheDocument();

    // Test switching tabs
    const assignmentsTab = screen.getByRole('button', { name: /Weekly Work/i });
    fireEvent.click(assignmentsTab);
    expect(screen.getByText(/Weekly Assignments/i)).toBeInTheDocument();

    const finalProjTab = screen.getByRole('button', { name: /Final Project/i });
    fireEvent.click(finalProjTab);
    expect(screen.getByText(/Grading Rubric/i)).toBeInTheDocument();
  });

  it('renders Profile page correctly with user stats and tabs', () => {
    setupInitialState();
    render(
      <MemoryRouter initialEntries={['/profile']}>
        <AppProvider>
          <Profile />
        </AppProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Test Artist')).toBeInTheDocument();
    expect(screen.getByText('Curriculum Progress')).toBeInTheDocument();

    // Switch to Grades tab
    const gradesTab = screen.getByRole('button', { name: 'Grades' });
    fireEvent.click(gradesTab);
    expect(screen.getByText('Grade History')).toBeInTheDocument();
  });

  it('renders Settings page correctly and allows updating API Key', () => {
    setupInitialState({ geminiApiKey: '' });
    render(
      <MemoryRouter initialEntries={['/settings']}>
        <AppProvider>
          <Settings />
        </AppProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Settings')).toBeInTheDocument();
    const input = screen.getByPlaceholderText('AIzaSy...');
    fireEvent.change(input, { target: { value: 'AIzaTestNewKey123' } });

    const saveBtn = screen.getByText('Save Key');
    fireEvent.click(saveBtn);

    expect(screen.getByText(/API key configured — AI grading is active/i)).toBeInTheDocument();
  });
});
