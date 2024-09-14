import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
// import { fetchRepoDetails, fetchRepoIssues } from '../../api';
// import { Pie } from 'react-chartjs-2';
//import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

//ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  forks_count: number;
  stargazers_count: number;
  open_issues_count: number;
  html_url: string;
}

interface Issue {
  id: number;
  title: string;
  state: string;
}

function RepositoryDetails() {
  const { state } = useLocation();
  const repo = state?.repo as Repository;

  const [issueState, setIssueState] = useState<'open' | 'closed'>('open');

//   const { data: repoDetails, isLoading: isRepoLoading, isError: isRepoError } = useQuery(
//     ['repoDetails', repo.id],
//     () => fetchRepoDetails(repo.id),
//     { enabled: !!repo }
//   );

//   const { data: issues, isLoading: isIssuesLoading, isError: isIssuesError } = useQuery(
//     ['repoIssues', repo.id, issueState],
//     () => fetchRepoIssues(repo.id, issueState),
//     { enabled: !!repo }
//   );

//   useEffect(() => {
//     if (issues) {
//       // Logic to handle issues data
//     }
//   }, [issues]);

//   const issueCounts = {
//     open: issues?.filter((issue) => issue.state === 'open').length || 0,
//     closed: issues?.filter((issue) => issue.state === 'closed').length || 0,
//   };

//   const pieData = {
//     labels: ['Open Issues', 'Closed Issues'],
//     datasets: [{
//       data: [issueCounts.open, issueCounts.closed],
//       backgroundColor: ['#FF6384', '#36A2EB'],
//     }],
//   };

//   if (isRepoLoading) return <p>Loading repository details...</p>;
//   if (isRepoError) return <p>Error loading repository details.</p>;
//   if (isIssuesLoading) return <p>Loading issues...</p>;
//   if (isIssuesError) return <p>Error loading issues.</p>;

  return (
    <div className="text-white min-h-screen p-6">
      <button
        onClick={() => window.history.back()}
        className="text-blue-500 hover:underline mb-4"
      >
        &larr; Back to search
      </button>
      <h1 className="text-3xl font-bold mb-4">{repo?.name}</h1>
      <p className="text-gray-400 mb-4">{repo?.description || 'No description available'}</p>
      <p className="mb-4">Forks: {repo?.forks_count}</p>
      <p className="mb-4">Stars: {repo?.stargazers_count}</p>
      <p className="mb-4">Open Issues: {repo?.open_issues_count}</p>
      <a
        href={repo?.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        View on GitHub
      </a>
      <div className="mt-6">
        <select
          value={issueState}
          onChange={(e) => setIssueState(e.target.value as 'open' | 'closed')}
          className="p-2 rounded-lg text-gray-300"
        >
          <option value="open">Open Issues</option>
          <option value="closed">Closed Issues</option>
        </select>
        {/* <div className="mt-6">
          <Pie data={pieData} />
        </div> */}
        {/* <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Issues</h2>
          <ul className="space-y-4">
            {issues?.map((issue) => (
              <li key={issue.id} className="p-4 bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold">{issue.title}</h3>
                <p className="text-gray-400">State: {issue.state}</p>
              </li>
            ))}
            {issues?.length === 0 && <p className="text-gray-400">No issues found</p>}
          </ul>
        </div> */}
      </div>
    </div>
  );
}

export default RepositoryDetails;
