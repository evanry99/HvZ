import { Injectable } from '@angular/core';
import { Player } from '../models/player.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { environment } from 'src/environments/environment.development';
import { User, UserDTO } from '../models/user.model';
import { userKey, playerKey } from '../variables/storage-keys';
import { storageRead, storageSave } from '../utils/storage.util';
import { GameService } from './game.service';
import { finalize, lastValueFrom } from 'rxjs';
import { UserService } from './user.service';

const {apiUrl} = environment;

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(
    private readonly http:HttpClient,
    private readonly gameService: GameService,
    private readonly userService: UserService){}
  
  private _players: Player[] = [];
  private _playersInGame: Player[] = [];
  private _player: Player;
  private _error: string = "";
  private _loading = false;

  get players(): Player[]{
    return this._players!;
  }

  get playersInGame(): Player[]{
    return this._playersInGame;
  }

  get error(): string{
    return this._error;
  }

  get loading(){
    return this._loading;
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
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      })
  }

  public async getPlayersFromGame(){
    const game = this.gameService.game;
    await lastValueFrom(this.http.get<Player[]>(`${apiUrl}/game/${game.id}/player`))
      .then((players: Player[]) => {
        this._playersInGame = players;
        })
      .catch((error: HttpErrorResponse) => {
        this._error = error.message;
      })
  }
  

  public getPlayersInGame(gameId:number){
    return this.http.get<Player[]>(`${apiUrl}/game/${gameId}/player`)
      .subscribe({
        next: (players: Player[]) => {
          this._playersInGame = players;
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
    let player = {
      biteCode: "2",
      isPatientZero: false,
      isHuman: true,
      userId: this.userService.userResponse.id,
      gameId: this.gameService.game.id
    }
    await lastValueFrom(this.http.post<Player>(`${apiUrl}/player`, player))
      .then((p: Player) => {
          storageSave<Player>(playerKey, p);
          this.getPlayersFromGame();
        })
      .catch((error: HttpErrorResponse) => {
        this._error = error.message;
      })
  }

  public async getPlayerFromUser(userId: number): Promise<Player>{
    await this.getPlayersFromGame();
    let player = this._playersInGame.filter((p: Player) => p.userId === userId)[0];
    return player;
  }

  public async updatePlayer(player: Player) {
    await lastValueFrom(this.http.put<Player>(`${apiUrl}/player/${player.id}`, player))
      .then(() => {
          this.getPlayersFromGame();
        })
      .catch((error: HttpErrorResponse) => {
        this._error = error.message;
      })
  }
}

