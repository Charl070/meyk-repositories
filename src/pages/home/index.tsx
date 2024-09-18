import { useState, useEffect,memo } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { searchRepositories } from '../../api';
import Loader from '../../components/loader';
import RepositoryItem from '../../components/repositoryItem';
import { useAppContext } from '../../context/AppContext';

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  forks_count: number;
  stargazers_count: number;
  open_issues_count: number;
  isPrivate: boolean;
}

function Home() {
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm } = useAppContext();
  const [triggerSearch, setTriggerSearch] = useState(false);

  const { data, isError, isLoading, refetch } = useQuery(
    ['search', searchTerm],
    () => searchRepositories(searchTerm),
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (triggerSearch) {
      refetch();
      setTriggerSearch(false);
    }
  }, [triggerSearch, refetch]);

  const handleSearch = () => {
    navigate(`/?search=${searchTerm}`);
    setTriggerSearch(true);
  };

  const handleRepoClick = (repo: Repository) => {
    navigate(`/repository/${repo.id}`, { state: repo });
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    navigate('/');
  };

  const hasResults = data && data.length > 0;

  return (
    <div className="text-white min-h-screen max-h-screen flex bg-gradient-to-b from-gray-900 via-gray-950 to-green-900">
      <div className="flex-grow flex flex-col max-h-screen">
        <div className={`${hasResults ? 'sticky top-0 z-10 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-md' : 'flex-grow flex flex-col items-center justify-center'}`}>
          <div className={`w-full ${hasResults ? 'max-w-3xl mx-auto p-4' : 'flex flex-col items-center max-w-3xl mx-auto p-4'}`}>
            <h1 className="text-5xl font-bold my-4">Welcome to <span className="bg-gradient-to-r from-green-600 to-green-800 px-2 py-1 rounded-md">Myek</span></h1>
            <p className="text-gray-400 mb-4">Search, Explore, and Visualize GitHub Repositories</p>
            <div className="w-full relative mb-4">
              <input
                type="text"
                placeholder='Example: "python"'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full px-4 py-3 pr-12 border border-gray-500 rounded-lg focus:outline-none focus:border-blue-500 bg-transparent text-gray-200"
              />
              {searchTerm && (
                <button 
                  onClick={handleClearSearch}
                  className="absolute right-12 bg-transparent text-gray-600 hover:text-gray-800 top-1 bottom-1 px-2">
                  &#x2715;
                </button>
              )}
              <button
                onClick={handleSearch}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="absolute right-1 top-1 bottom-1 bg-green-600 text-white px-4 rounded-md disabled:bg-gray-500"
                disabled={!searchTerm}
              >
                {'>'}
              </button>
            </div>
          </div>
        </div>
        <div className="flex-grow overflow-y-auto w-full max-w-3xl mx-auto mt-4 px-4 max-h-[calc(100vh-8rem)]">
          {isLoading && <div className="mt-6 flex justify-center items-center"><Loader /></div>}
          {isError && <p className="text-center text-red-500 mt-4">Error fetching repositories</p>}
          {hasResults && (
            <div className="w-full space-y-4">
              <ul className="space-y-4">
                {data.map((repo) => (
                  <li key={repo.id}>
                    <RepositoryItem repo={repo} onClick={() => handleRepoClick(repo)} />
                  </li>
                ))}
              </ul>
            </div>
          )}
          {data && data.length === 0 && (
            <p className="mt-4 text-center text-gray-400">No repositories found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(Home);
