import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { AppProvider } from './context/AppContext';
import Splash from './pages/splash';
import Home from './pages/home';
import Loader from './components/loader';
//import RepositoryDetails from './pages/repository/RepositoryDetails';

function App() {
  const queryClient = new QueryClient();
  const [showSplash, setShowSplash] = useState(true);

  const RepoDetails = lazy(() => import('./pages/repository/RepositoryDetails'));

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
                <Suspense fallback={<Loader />}>
                <Router>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/repository/:id" element={<RepoDetails />} />
                  </Routes>
                </Router>
                </Suspense>
              </div>
            )}
          </div>
        </QueryClientProvider>
      </AppProvider>
  );
}

export default App;
