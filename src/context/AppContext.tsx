import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface RepositoryDetail {
  name: string;
  full_name: string;
  isPrivate: boolean;
  forks_count: number;
  stargazers_count: number;
  open_issues_count: number;
  html_url: string;
  description: string;
}

interface AppContextType {
  repositoryDetail: RepositoryDetail | null;
  setRepositoryDetail: (detail: RepositoryDetail) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [repositoryDetail, setRepositoryDetail] = useState<RepositoryDetail | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const savedDetail = localStorage.getItem('repositoryDetail');
    if (savedDetail) {
      setRepositoryDetail(JSON.parse(savedDetail));
    }
  }, []);

  useEffect(() => {
    if (repositoryDetail) {
      localStorage.setItem('repositoryDetail', JSON.stringify(repositoryDetail));
    }
  }, [repositoryDetail]);

  return (
    <AppContext.Provider value={{ repositoryDetail, setRepositoryDetail, searchTerm, setSearchTerm }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
