export interface SquadCheckIn{
    id?: number;
    lat: number,
    lng: number,
    startTime: string,
    endTime: string,
    squadId: number,
    gameId: number,
    squadMemberId: number
}