export interface UserModel {
    id: number;
    email: string;
    name: string;
    team_id: number | string;
    role: 'player' | 'leader';
    auth_id: string;
  }