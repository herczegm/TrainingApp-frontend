/*
import { collection, addDoc, query, where, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from './supabaseConfig';

import { AppEvent } from '../models/Event';

export const addEvent = async (event: Omit<AppEvent, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, 'events'), event);
    console.log('Document written with ID: ', docRef.id);
    return docRef.id; // A generált Firestore azonosító visszaadása
  } catch (e) {
    console.error('Error adding document: ', e);
    throw new Error('Failed to save event to Firestore');
  }
};

export const getEventsByTeam = async (teamId: string): Promise<AppEvent[]> => {
  try {
    const q = query(collection(db, 'events'), where('teamId', '==', teamId));
    const querySnapshot = await getDocs(q);
    const events: AppEvent[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as AppEvent[]; // Kényszerített típuskonverzió
    return events;
  } catch (e) {
    console.error('Error fetching events: ', e);
    throw new Error('Failed to fetch events from Firestore');
  }
};

export const deleteEvent = async (eventId: string) => {
  try {
    const docRef = doc(db, 'events', eventId);
    await deleteDoc(docRef);
    console.log('Event deleted with ID: ', eventId);
  } catch (e) {
    console.error('Error deleting document: ', e);
    throw new Error('Failed to delete event');
  }
};

export const updateEvent = async (eventId: string, updatedData: Partial<Omit<AppEvent, 'id'>>) => {
  try {
    const docRef = doc(db, 'events', eventId);
    await updateDoc(docRef, updatedData);
    console.log('Event updated with ID: ', eventId);
  } catch (e) {
    console.error('Error updating document: ', e);
    throw new Error('Failed to update event');
  }
};
*/