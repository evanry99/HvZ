export interface Kill {
    timeOfDeath: Date,
    story?: string,
    lat: number,
    lng: number,
    gameId: number,
    killerId: number,
    victimId: number,
}