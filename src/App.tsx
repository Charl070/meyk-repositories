import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { AppProvider } from './context/AppContext';
import Splash from './pages/splash';
import Home from './pages/home';
import RepositoryDetails from './pages/repository/RepositoryDetails';

function App() {
  const queryClient = new QueryClient();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
      <AppProvider>
        <QueryClientProvider client={queryClient}>
          <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-green-900">
            {showSplash ? (
              <Splash />
            ) : (
              <div className='app'>
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
      </AppProvider>
  );
}

export default App;
