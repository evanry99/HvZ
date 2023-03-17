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