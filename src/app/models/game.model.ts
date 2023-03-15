export interface Game {
    id: number;
    name: string;
    gameState: string;
    description: string;
    nw_Lat: number;
    nw_Lng: number;
    se_Lat: number;
    se_Lng: number;
    numberOfPlayers?: number;
}