import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useQuery } from 'react-query';
import { ThemeProvider, useTheme } from './context/theme/ThemContext';
import { RepositoryContext, useRepository, RepositoryProvider } from './context/repository/RepositoryContext';
import { QueryClientProvider, QueryClient } from 'react-query';
import Splash from './pages/splash';
import Home from './pages/home';


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
        <QueryClientProvider client={queryClient} >
          <div className={`app ${theme}`}>
        {showSplash && <Splash />}
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </div>
        </QueryClientProvider>
        
      </RepositoryProvider>
      
    </ThemeProvider>
  )
}

export default App;