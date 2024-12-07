import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/Navbar';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ProfileProvider } from './components/ProfileProvider';

const ProfileForm = lazy(() => import('./components/ProfileForm'));
const ProfileDisplay = lazy(() => import('./components/ProfileDisplay'));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <ErrorBoundary>
      <ProfileProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Navigate to="/profile" replace />} />
                  <Route path="/profile-form" element={<ProfileForm />} />
                  <Route path="/profile" element={<ProfileDisplay />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Toaster position="bottom-right" />
          </div>
        </Router>
      </ProfileProvider>
    </ErrorBoundary>
  );
}

export default App;
