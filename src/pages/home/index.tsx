import React, { useState } from 'react';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  

  const handleSearch = () => {
   
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="text-white min-h-screen bg-gray-800 flex flex-col items-center justify-center">
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
          className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-500"
          disabled={!searchTerm}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default Home;