import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { searchRepositories } from '../../api';
import Loader from '../../components/loader';
import RepositoryItem from '../../components/repositoryItem'; 
import SideNav from '../../components/sideNav'; // Assuming you use this component

function Home() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isError, isLoading, refetch } = useQuery('search', () => searchRepositories(searchTerm), {
    enabled: false,
  });

  const handleSearch = () => {
    refetch();   
  };

  const handleRepoClick = (repo: any) => {
    navigate(`/repository/${repo.id}`, { state: { repo } });
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    refetch();
  };

  const sideNavItems = [
    { label: 'History', path: '/history' },
    { label: 'Settings', path: '/settings' },
    // Add more items as needed
  ];

  return (
    <div className="text-white min-h-screen flex bg-gradient-to-b from-gray-900 via-gray-950 to-green-900">
      {/* Sidebar */}
      <SideNav items={sideNavItems} />

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center">
        {/* Centered Search Container */}
        <div className="flex flex-col items-center w-full max-w-3xl mx-auto p-4">
          <h1 className="text-5xl font-bold my-4">Welcome to <span className="bg-gradient-to-r from-green-600 to-green-800 px-2 py-1 rounded-md">Myek</span></h1>
          <p className="text-gray-400 mb-8">Search, Explore, and Visualize GitHub Repositories</p>

          {/* Search Input with Button Inside */}
          <div className="w-full max-w-lg relative">
            <input
              type="text"
              placeholder='Example: "python"'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pr-12 border border-gray-500 rounded-lg focus:outline-none focus:border-blue-500 bg-transparent text-gray-200"
            />
            {searchTerm && (
              <button 
                onClick={handleClearSearch}
                className="absolute right-12 bg-transparent text-gray-600 hover:text-gray-800 p-2">
                &#x2715; {/* Unicode character for 'X' */}
              </button>
            )}
            <button
              onClick={handleSearch}
              className="absolute right-1 top-1 bottom-1 bg-green-600 text-white px-4 rounded-md disabled:bg-gray-500"
              disabled={!searchTerm}
            >
              {'>'}
            </button>
          </div>
        </div>

        {/* Search Results */}
        <div className="w-full max-w-3xl mx-auto mt-6 px-4">
          {isLoading && <div className='mt-6'><Loader /></div>}
          {isError && <p>Error fetching repositories</p>}
          {data && (
            <div className="w-full space-y-4">
              {data.length > 0 ? (
                <ul className="space-y-4">
                  {data.map((repo) => (
                    <li key={repo.id}>
                      <RepositoryItem repo={repo} onClick={() => handleRepoClick(repo)} />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-center text-gray-400">No repositories found</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
