import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { searchRepositories   
 } from '../../api';

 interface Data {
   items: any[];
   total_count: number;
   incomplete_results: boolean;
 }

function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isError, isLoading, refetch } = useQuery('search', () => searchRepositories(searchTerm), {
    enabled: false,
  });

  const handleSearch = () => {
    if (searchTerm) {
      refetch();
    }
  };

  return (
    <div className="text-white min-h-screen bg-gray-950 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Myek Repositories</h1>
      <div className="flex flex-col items-center w-full max-w-md">
        <input
          type="text"
          placeholder="Search for repositories"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 mb-4 text-gray-900 bg-gray-200 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-500"
        >
          Search
        </button>
        {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching repositories</p>}
      {data && (
          <div className="mt-6 w-full">
            {data.length > 0 ? (
              <ul className="space-y-4">
                {data.map((repo) => (
                  <li
                    key={repo.id}
                    className="p-4 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 cursor-pointer"
                    //onClick={() => handleRepoClick(repo)}
                  >
                    <h2 className="text-xl font-semibold">{repo.name}</h2>
                    <p className="text-gray-400">{repo.description || 'No description available'}</p>
                    <div className="mt-2 flex space-x-4 text-gray-300">
                      <span>Forks: {repo.forks_count}</span>
                      <span>Stars: {repo.stargazers_count}</span>
                      <span>Issues: {repo.open_issues_count}</span>
                    </div>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-2 text-blue-500 hover:underline"
                    >
                      View on GitHub
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-gray-400">No repositories found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;