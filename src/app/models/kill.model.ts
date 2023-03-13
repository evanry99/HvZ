export interface Kill {
    id: number,
    time_of_death: Date,
    story?: string,
    lat: number,
    lng: number,
    game_id: number,
    killer_id: number,
    victim_id: number,
}