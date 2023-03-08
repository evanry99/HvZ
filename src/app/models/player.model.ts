export interface Players{
    players: Player[]
}

export interface Player{
    id:number,
    is_human:boolean,
    is_patient_zero:boolean,
    bite_code:string,
    user_id:number,
    game_id:number
}