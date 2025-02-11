import axios from 'axios';
import API_BASE_URL from './apiConfig';

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const createUser = async (email: string, name: string, teamId?: number) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, { email, name, teamId });
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
