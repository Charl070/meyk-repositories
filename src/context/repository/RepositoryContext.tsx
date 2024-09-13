import React, { createContext, useContext, useState } from 'react';

interface Owner {
    login: string,
    name: string,
    avatar_url: string,
    gravatar_id: string,
    url: string,
    html_url: string,
    followers_url: string,
    following_url: string,
    gists_url: string,
    starred_url: string,
    subscriptions_url: string,
    organizations_url: string,
    repos_url: string,
    events_url: string,
    received_events_url: string,
    type: string,
    site_admin: boolean
  }

  interface Licence {
    key: string,
    name: string,
    url: string,
  }

interface Repository  {
    id: number,
    name: string,
    full_name: string,
    private: boolean,
    owner: Owner,
    html_url:string,
    description: string,
    fork: boolean,
    url: string,
    forks_url: string,
    keys_url: string,
    collaborators_url: string,
    teams_url: string,
    commits_url: string,
    created_at: string,
    updated_at: string,
    pushed_at: string,
    git_url: string,
    clone_url: string,
    homepage: string,
    size: number,
    stargazers_count: number,
    watchers_count: number,
    language: string,
    has_issues: true,
    has_projects: true,
    has_downloads: true,
    has_wiki: false,
    has_pages: true,
    has_discussions: true,
    forks_count: number,
    mirror_url: null,
    archived: boolean ,
    disabled: false,
    open_issues_count: 622,
    license: Licence,
    allow_forking: boolean,
    is_template: boolean,
    topics: string[],
    visibility: string,
    forks: number,
    open_issues: number,
    watchers: number,
    score: number
  }

// Define the shape of the context value
interface RepositoryContextType {
  selectedRepository: Repository | null;
  setSelectedRepository: React.Dispatch<React.SetStateAction<Repository | null>>;
}

const RepositoryContext = createContext<RepositoryContextType | undefined>(undefined);

const RepositoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedRepository, setSelectedRepository] = useState<Repository | null>(null);

  const value = {
    selectedRepository,
    setSelectedRepository,
  };

  return (
    <RepositoryContext.Provider value={value}>
      {children}
    </RepositoryContext.Provider>
  );
};

const useRepository = () => {
  const context = useContext(RepositoryContext);
  if (context === undefined) {
    throw new Error('useRepository must be used within a RepositoryProvider');
  }
  return context;
};

export { RepositoryContext, RepositoryProvider, useRepository };
