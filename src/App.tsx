import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import TopBar from './components/layout/TopBar';
import BottomNav from './components/layout/BottomNav';
import Home from './pages/Home';
import Income from './pages/Income';
import Expenses from './pages/Expenses';
import Goals from './pages/Goals';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Documentation from './pages/Documentation';
import Profile from './pages/Profile';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  function PrivateRoute({ children }: { children: React.ReactNode }) {
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
  }

  function PublicRoute({ children }: { children: React.ReactNode }) {
    return !isAuthenticated ? <>{children}</> : <Navigate to="/" />;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login onLogin={handleLogin} />
            </PublicRoute>
          }
        />
        
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        <Route
          path="/documentation"
          element={<Documentation />}
        />
        
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <div className="min-h-screen bg-[#F2F2F2]">
                <TopBar onLogout={handleLogout} />
                <main className="pt-24 pb-20 px-4 max-w-7xl mx-auto">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/income" element={<Income />} />
                    <Route path="/expenses" element={<Expenses />} />
                    <Route path="/goals" element={<Goals />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                </main>
                <BottomNav />
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}