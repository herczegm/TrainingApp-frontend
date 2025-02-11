export interface TeamModel {
    id: number;
    name: string;
    code: string;
    created_by: string;   // A csapatot létrehozó felhasználó azonosítója (auth_id)
}