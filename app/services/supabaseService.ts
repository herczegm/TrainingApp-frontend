/*
import { supabase } from './supabaseConfig';

export const getEventsByTeam = async (teamId: string) => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('team_id', teamId);

  if (error) {
    console.error('Error fetching events:', error);
    throw error;
  }

  return data || [];
};

export const addEvent = async (event) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .insert([event]);
  
      if (error) throw error;
  
      return data;
    } catch (error) {
      console.error('Error adding event:', error);
      throw error;
    }
  };

  export const subscribeToEvents = (teamId, callback) => {
    const subscription = supabase
      .from(`events:team_id=eq.${teamId}`)
      .on('*', (payload) => {
        console.log('Realtime event:', payload);
        callback(payload.new);
      })
      .subscribe();
  
    return () => {
      supabase.removeSubscription(subscription);
    };
  };
  */