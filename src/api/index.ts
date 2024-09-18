import axios from 'axios';

const API_BASE_URL = 'https://api.github.com';

interface SearchRepositoriesResponse {
  items: any[];
  total_count: number;
  incomplete_results: boolean;
}

export const searchRepositories = async (searchTerm: string): Promise<any[]> => {
  try {
    const response = await axios.get<SearchRepositoriesResponse>(`${API_BASE_URL}/search/repositories?q=${searchTerm}`);
    return response.data.items;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw error;
  }
};
export const fetchRepositoryIssues = async (repoName: string): Promise<any> => {
  try {
    const response = await axios.get<any>(`${API_BASE_URL}/search/issues?q=repo:${repoName}`);
    return response.data.items;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw error;
  }
};