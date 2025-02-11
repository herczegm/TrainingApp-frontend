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

export const getUserProfile = async (userId: number) => {
  const response = await fetch(`${API_BASE_URL}/users/profile/${userId}`);
  return response.json();
}

export const updatedUserProfile = async (userId: number, name: string, email: string) => {
  const response = await fetch(`${API_BASE_URL}/users/profile/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email }),
  });
  return response.json();
}
