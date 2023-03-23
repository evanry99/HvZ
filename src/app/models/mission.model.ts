export interface Mission {
    id: number,
    name: string,
    isHumanVisible: boolean,
    isZombieVisible: boolean,
    description?: string,
    lat: number,
    lng: number,
    startTime: Date,
    endTime: Date,
    gameId: number,
}