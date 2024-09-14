import React from 'react';
import { FaGithub } from 'react-icons/fa';

interface RepositoryItemProps {
  repo: {
    id: number;
    name: string;
    description: string;
    forks_count: number;
    stargazers_count: number;
    open_issues_count: number;
    html_url: string;
  };
  onClick: () => void;
}

const RepositoryItem: React.FC<RepositoryItemProps> = ({ repo, onClick }) => {
  return (
    <div
      className="flex p-4 border border-gray-600 rounded-lg shadow-lg hover:border-green-600 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex-shrink-0 mr-4">
        <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-full">
          <FaGithub className="text-white text-2xl" />
        </div>
      </div>

      {/* Content */}
      <div>
        <h2 className="text-lg font-semibold">{repo.name}</h2>
        <p className="text-sm text-gray-400 mb-2 line-clamp-2">{repo.description || 'No description available'}</p>
        <div className="flex space-x-4 text-sm text-gray-300 mb-2">
          <span>Forks: {repo.forks_count}</span>
          <span>Stars: {repo.stargazers_count}</span>
          <span>Issues: {repo.open_issues_count}</span>
        </div>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className=" text-sm text-blue-500 hover:underline"
        >
          View on GitHub
        </a>
      </div>
    </div>
  );
};

export default RepositoryItem;