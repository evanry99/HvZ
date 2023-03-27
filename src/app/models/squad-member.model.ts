export interface SquadMember{
    id: number,
    rank: string,
    squadId: number,
    playerId: number,
    gameId: number
}

export interface SquadMemberWithName{
    squadMember: SquadMember,
    username: string
}