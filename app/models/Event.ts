export interface AppEvent {
    id: number;
    title: string;
    type: string; // 'training' vagy 'match'
    date: string; // YYYY-MM-DD
    time: string; // HH:mm
    location: string;
    notes: string;
    team_id: string; // A csapathoz tartozó azonosító
  }