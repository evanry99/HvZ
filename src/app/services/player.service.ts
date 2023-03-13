import { Injectable } from '@angular/core';
import { Player } from '../models/player.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'


const {apiUrl} = environment;

import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(private http:HttpClient){
    
  }

  private _players: Player[] = [];
  private _error: string = "";

  get players(): Player[]{
    return this._players!;
  }

  get error(): string{
    return this._error;
  }

  public getPlayers(){
    return this.http.get<Player[]>(apiUrl+"/player")
      .subscribe({
        next: (players: Player[]) => {
          this._players = players;
          console.log(players);
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      })
  }
  public playerById(id: Number): Player| undefined{
      return this._players?.find((player:Player) => player.id === id);
  }
  
 
}

