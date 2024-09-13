import axios from 'axios';

const API_BASE_URL = 'https://api.github.com';

interface Data {
  
}

interface SearchRepositoriesResponse {
  items: any[];
  total_count: number;
  incomplete_results: boolean;
}


export const searchRepositoriess = async (searchTerm: string) => {
  const response = await axios.get(`https://api.github.com/search/repositories?q=${searchTerm}`);
  const data = response;
  return response;
};

export const searchRepositories = async (searchTerm: string): Promise<any[]> => {
  try {
    const response = await axios.get<SearchRepositoriesResponse>(`https://api.github.com/search/repositories?q=${searchTerm}`);
    return response.data.items;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw error;
  }
};

export const fetchRepository = async (repoName: string) => {
  const response = await axios.get(`<span class="math-inline">\{API\_BASE\_URL\}/repos/</span>{repoName}`);
  return response.data;
};

export const fetchIssues = async (repoName: string) => {
  const response = await axios.get(`<span class="math-inline">\{API\_BASE\_URL\}/repos/</span>{repoName}/issues?state=all`);
  return response.data;
};