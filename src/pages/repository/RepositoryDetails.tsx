import React, { useState, useEffect, memo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchRepositoryIssues } from '../../api';
import Loader from '../../components/loader';
import { VictoryPie } from 'victory';
import { useAppContext } from '../../context/AppContext';

interface Issue {
  id: number;
  state: 'open' | 'closed';
  title: string;
  html_url: string;
}


function RepositoryDetail() {
  const location = useLocation();
  const { repositoryDetail, setRepositoryDetail, searchTerm } = useAppContext();

  const repo = location.state || repositoryDetail;

  const [issuesState, setIssuesState] = useState<'open' | 'closed'>('open');

  const { data: issuesData, isError: issuesError, isLoading: issuesLoading, refetch: refetchIssues } = useQuery(
    ['repositoryIssues', repo.full_name],
    () => fetchRepositoryIssues(repo.full_name || ''),
    {
      enabled: !!repo.full_name,
    }
  );

  useEffect(() => {
    if (repo.full_name) {
      refetchIssues();
    }
  }, [repo.full_name, refetchIssues]);

  useEffect(() => {
    setRepositoryDetail(repo);
  }, [repo, setRepositoryDetail]);

  const handleStateChange = (state: 'open' | 'closed') => {
    setIssuesState(state);
  };

  return (
    <div className="text-white min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-green-900 flex flex-col">
      <div className="overflow-hidden max-h-full flex-grow flex flex-col p-4">
        <Link
          to={`/?search=${searchTerm}`}
          className="text-gray-400 hover:text-gray-200 py-2 rounded-md mb-4 px-2 absolute top-4 left-4 border border-gray-600 hover:border-gray-400"
        >
          Back to Search
        </Link>
        <div className="text-center w-full p-6 rounded-lg shadow-lg bg-transparent border border-gray-600 mt-12 mb-4">
          {repo.html_url ? (
            <>
              <h1 className="text-4xl font-bold mb-2">{repo.name} </h1>
              <p className="text-white mt-2 text-sm">{repo.isPrivate ? "(Private Repository)" : "(Public Repository)"}</p>
              <p className="text-gray-300">
                URL: <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:underline">{repo.html_url}</a>
              </p>
              <p className="text-gray-300">Forks: {repo.forks_count}</p>
              <p className="text-gray-300">Stars: {repo.stargazers_count}</p>
              <p className="text-gray-300">Open Issues: {repo.open_issues_count}</p>
            </>
          ) : (
            <p className="text-center text-gray-400">Repository details not found</p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-4 flex-grow overflow-hidden">
          <div className="flex-1 p-4 rounded-lg shadow-lg bg-transparent border border-gray-600 flex flex-col">
            <h2 className="text-3xl font-bold mb-4 text-center">Issues Breakdown</h2>
            {issuesLoading && (
              <div className="flex justify-center items-center mt-6">
                <Loader />
              </div>
            )}
            {issuesError && (
              <p className="text-center text-red-500 mt-4">Error fetching issues</p>
            )}
            {issuesData && issuesData.length > 0 ? (
              <div className="mt-4">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center mr-4">
                    <div className="w-4 h-4 bg-green-500 mr-2"></div>
                    <span className="text-sm text-white">Open</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 mr-2"></div>
                    <span className="text-sm text-white">Closed</span>
                  </div>
                </div>
                <VictoryPie
                  data={[
                    { x: 'Open', y: issuesData.filter((issue: Issue) => issue.state === 'open').length },
                    { x: 'Closed', y: issuesData.filter((issue: Issue) => issue.state === 'closed').length },
                  ]}
                  colorScale={['#4caf50', '#f44336']}
                  style={{ labels: { fontSize: 12, fill: 'white' } }}
                  padding={50}
                  height={200}
                />
              </div>
            ) : (
              <p className="mt-4 text-center text-gray-400">No issues found</p>
            )}
          </div>


          {issuesData && issuesData.length > 0 &&
            <div className="overflow-y-auto max-h-full flex-1 p-4 rounded-lg shadow-lg bg-transparent border border-gray-600 flex flex-col">
              <div className="flex justify-between mb-4">
                <button
                  onClick={() => handleStateChange('open')}
                  className={`px-4 py-2 rounded-md ${issuesState === 'open' ? 'bg-green-600' : 'bg-gray-700'}`}
                >
                  Open Issues
                </button>
                <button
                  onClick={() => handleStateChange('closed')}
                  className={`px-4 py-2 rounded-md ${issuesState === 'closed' ? 'bg-green-600' : 'bg-gray-700'}`}
                >
                  Closed Issues
                </button>
              </div>
              <div className="overflow-y-auto flex-grow">
                {issuesLoading && <Loader />}
                {issuesError && <p className="text-center text-red-500">Error fetching issues</p>}
                {issuesData && (
                  <ul className="space-y-4">
                    {issuesData.filter((issue: Issue) => issue.state === issuesState).map((issue: Issue) => (
                      <li key={issue.id} className="flex p-4 border border-gray-600 rounded-lg shadow-lg hover:border-green-600 cursor-pointer">
                        <a
                          href={issue.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-white"
                        >
                          <h3 className="text-xl font-bold">{issue.title}</h3>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>}
        </div>
      </div>
    </div>
  );
}

export default memo(RepositoryDetail);
