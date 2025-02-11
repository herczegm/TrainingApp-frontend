import axios from 'axios';
import API_BASE_URL from './apiConfig';

// Események lekérése egy adott csapathoz
export const getEventsByTeam = async (teamId: number | string) => {
  const response = await axios.get(`${API_BASE_URL}/events?teamId=${teamId}`);
  return response.data;
};

// Új esemény hozzáadása
export const addEvent = async (eventData: any) => {
  const response = await axios.post(`${API_BASE_URL}/events`, eventData);
  return response.data;
};

// Esemény szerkesztése
export const updateEvent = async (eventId: number, eventData: any) => {
  const response = await axios.put(`${API_BASE_URL}/events/${eventId}`, eventData);
  return response.data;
};

// Esemény törlése
export const deleteEvent = async (eventId: number) => {
  const response = await axios.delete(`${API_BASE_URL}/events/${eventId}`);
  return response.data;
};

// Felhasználó csatlakozik egy eseményhez
export const joinEvent = async (eventId: number, userId?: number, status: string = 'attending') => {
  return fetch(`${API_BASE_URL}/event-participants/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ eventId, userId, status }),
  }).then((res) => res.json());
};

// Felhasználó módosítja a státuszát
export const updateParticipantStatus = async (eventId: number, userId?: number, status?: string) => {
  return fetch(`${API_BASE_URL}/event-participants/update-status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application.json' },
    body: JSON.stringify({ eventId, userId, status }),
  }).then((res) => res.json());
};

// Lekérdezi az eseményhez tartozó résztvevőket
export const getEventParticipants = async (eventId: number) => {
  const response = await fetch(`${API_BASE_URL}/event-participants/${eventId}/participants`);
  return response.json();
};