export interface Chat{
    id: number;
    message: string;
    isHumanGlobal: boolean;
    isZombieGlobal: boolean;
    chatTime: Date;
    gameId: number;
    playerId: number;
    squadId: number;
}

export interface ChatDTO{
    message: string;
    isHumanGlobal: boolean;
    isZombieGlobal: boolean;
    chatTime: Date;
    playerId: number;
    squadId: number;
}