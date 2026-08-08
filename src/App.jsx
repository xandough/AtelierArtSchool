import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import CurriculumMap from './pages/CurriculumMap';
import Classroom from './pages/Classroom';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

function AppShell() {
  const { state } = useApp();

  if (!state.onboardingComplete) {
    return <Onboarding />;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div className="main-layout">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/curriculum" element={<CurriculumMap />} />
          <Route path="/classroom/:monthId" element={<Classroom />} />
          <Route path="/classroom/:monthId/:courseId" element={<Classroom />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppShell />
      </AppProvider>
    </BrowserRouter>
  );
}
