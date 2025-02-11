import axios from 'axios';
import API_BASE_URL from './apiConfig';

export const registerUser = async (
  email: string,
  password: string,
  name: string,
  teamId?: number | null
) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, {
      email,
      password,
      name,
      teamId,
    });
    return response.data;
  } catch (error: any) {
    console.error('Error registering user:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error: any) {
    console.error('Error logging in:', error.response?.data || error.message);
    throw error.respones?.data || error;
  }
};


/* import { supabase } from './supabaseConfig';

export const registerUser = async (email: string, password: string, name: string, teamId?: number | string) => {
  try {
    // Felhasználó regisztrációja
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    // Ellenőrizzük, hogy a regisztráció sikeres volt-e
    const user = data?.user;
    if (!user) throw new Error('User registration failed');

    const { data: users, error: fetchError } =  await supabase.from('users').select('id');

    if (fetchError) throw fetchError;

    const roles = users?.length === 0 ? 'admin' : 'user';

    // Felhasználói adatok mentése az adatbázisba
    const { error: insertError } = await supabase
      .from('users')
      .insert([{ auth_id: user.id, email, name, team_id: teamId || null }]);

    if (insertError) throw insertError;

    return user;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return data?.user;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};


 export const assignLeaderRole = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('roles')
    .eq('auth_id', userId)
    .single();

  if (error) throw error;

  const updatedRoles = data.roles.includes('leader')
    ? data.roles
    : `${data.roles},leader`;

  const { error: updateError } = await supabase
    .from('users')
    .update({ roles: updatedRoles })
    .eq('auth_id', userId);

  if (updateError) throw updateError;

  console.log('Leader role assigned successfully');
};
*/