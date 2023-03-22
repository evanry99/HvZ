export interface Player{
    id: number;
    biteCode: string;
    isPatientZero: boolean;
    isHuman: boolean;
    userId: number;
    gameId: number;
}

export interface PlayerWithName{
    player: Player,
    username: string
}