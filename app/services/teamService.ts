import axios from 'axios';
import API_BASE_URL from './apiConfig';

export const fetchTeams = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/teams`);
    return response.data;
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
};

export const createTeam = async (name: string, code: string, createdBy: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/teams`, { name, code, createdBy });
    return response.data;
  } catch (error) {
    console.error('Error creating team:', error);
    throw error;
  }
};

export const updateTeam = async (id: number, name: string, code: string) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/teams/${id}`, { name, code });
    return response.data;
  } catch (error) {
    console.error('Error updating team:', error);
    throw error;
  }
};

export const deleteTeam = async (id: number) => {
  try {
    await axios.delete(`${API_BASE_URL}/teams/${id}`);
  } catch (error) {
    console.error('Error deleting team:', error);
    throw error;
  }
};
