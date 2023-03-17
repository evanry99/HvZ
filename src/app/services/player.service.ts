import { Injectable } from '@angular/core';
import { Player } from '../models/player.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { environment } from 'src/environments/environment.development';
import { User } from '../models/user.model';
import { userKey } from '../variables/storage-keys';
import { storageRead } from '../utils/storage.util';
import { GameService } from './game.service';

const {apiUrl} = environment;

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(
    private readonly http:HttpClient,
    private readonly gameService: GameService){}

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

  public registerPlayer() {
    let user: User = storageRead(userKey);
    let game = this.gameService.game;
    let player = {
      isPatientZero: false,
      isHuman: true,
      userId: user.id,
      gameId: game.id
    }
    this.http.post<Player>(`${apiUrl}/player`, player)
    .subscribe({
      next: (p: Player) => {
        console.log(p)
      },
      error: (error:HttpErrorResponse) => {
        this._error = error.message;
      }
    })
  }
}

