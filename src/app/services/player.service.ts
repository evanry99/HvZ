import { Injectable } from '@angular/core';
import { Player } from '../models/player.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { environment } from 'src/environments/environment.development';
import { User, UserDTO } from '../models/user.model';
import { userKey, playerKey } from '../variables/storage-keys';
import { storageRead, storageSave } from '../utils/storage.util';
import { GameService } from './game.service';
import { finalize, lastValueFrom } from 'rxjs';

const {apiUrl} = environment;

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(
    private readonly http:HttpClient,
    private readonly gameService: GameService){}

  private _players: Player[] = [];
  private _player: Player;
  private _error: string = "";
  private _loading = false;

  get players(): Player[]{
    return this._players!;
  }

  get error(): string{
    return this._error;
  }

  get player(): Player {
    this._player = storageRead(playerKey);
    return this._player;
  }

  set player(p: Player) {
    storageSave<Player>(playerKey, p);
    this._player = p;
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

  public async registerPlayer() {
    let user: User = storageRead(userKey);
    let game = this.gameService.game;
    //todo userId: user.id
    let player = {
      biteCode: "2",
      isPatientZero: false,
      isHuman: true,
      userId: 1,
      gameId: game.id
    }
    await lastValueFrom(this.http.post<Player>(`${apiUrl}/player`, player))
      .then((p: Player) => {
          console.log(p)
          this._player = p;
          this.getPlayers();
        })
      .catch((error: HttpErrorResponse) => {
        this._error = error.message;
      })
  }

  public getPlayerFromUser(userId: number, gameId: number): Player{
    this.getPlayers();
    let player = this._players.filter((p: Player) => p.gameId === gameId && p.userId === userId)[0];
    return player;
  }

  public async updatePlayer(player: Player) {
    await lastValueFrom(this.http.put<Player>(`${apiUrl}/player/${player.id}`, player))
      .then(() => {
          this.getPlayers();
        })
      .catch((error: HttpErrorResponse) => {
        this._error = error.message;
      })
  }
}

