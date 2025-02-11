export interface UserModel {
    id: number;
    email: string;
    name: string;
    team_id: number | null;
    role: 'player' | 'leader';
    auth_id: string;
  }