import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ThemeProvider, useTheme } from './context/theme/ThemContext';
import { RepositoryProvider } from './context/repository/RepositoryContext';
import Splash from './pages/splash';
import Home from './pages/home';
import RepositoryDetails from './pages/repository/RepositoryDetails';

function App() {
  const { theme } = useTheme();
  const queryClient = new QueryClient();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <ThemeProvider>
      <RepositoryProvider>
        <QueryClientProvider client={queryClient}>
          {/* Main gradient background */}
          <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-green-900">
            {/* Conditionally render either the splash screen or the main app */}
            {showSplash ? (
              <Splash />
            ) : (
              <div className={`app ${theme}`}>
                <Router>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/repository/:id" element={<RepositoryDetails />} />
                  </Routes>
                </Router>
              </div>
            )}
          </div>
        </QueryClientProvider>
      </RepositoryProvider>
    </ThemeProvider>
  );
}

export default App;
