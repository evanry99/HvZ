import { Injectable } from '@angular/core';
import { Player, PlayerWithName } from '../models/player.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment.development';
import { User, UserDTO } from '../models/user.model';
import { userKey, playerKey } from '../variables/storage-keys';
import { storageRead, storageSave } from '../utils/storage.util';
import { GameService } from './game.service';
import { finalize, lastValueFrom } from 'rxjs';
import { UserService } from './user.service';
import keycloak from 'src/keycloak';

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(
    private readonly http: HttpClient,
    private readonly gameService: GameService,
    private readonly userService: UserService) { }

  private _players: Player[] = [];
  private _playersInGame: Player[] = [];
  private _playersInGameWithName: PlayerWithName[] = [];
  private _player: Player;
  private _error: string = "";
  private _loading = false;

  get players(): Player[] {
    return this._players!;
  }

  get playersInGame(): Player[] {
    return this._playersInGame;
  }

  get playersInGameWithName(): PlayerWithName[] {
    return this._playersInGameWithName;
  }

  get error(): string {
    return this._error;
  }

  get loading() {
    return this._loading;
  }
  get player(): Player {
    return this._player;
  }

  set player(p: Player) {
    this._player = p;
  }

  public getPlayers() {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + keycloak.token)
    const gameId: number = this.gameService.game.id;

    return this.http.get<Player[]>(apiUrl + "/game/" + gameId + "/player", { 'headers': headers })
      .subscribe({
        next: (players: Player[]) => {
          this._players = players;
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      })
  }

  public async getPlayersFromGame() {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + keycloak.token)
      .set('Content-Type: ', 'application/x-www-form-urlencoded; charset=UTF-8')
      .set('Access-Control-Allow-Origin:', ' *')

    const game = this.gameService.game;
    await lastValueFrom(this.http.get<Player[]>(`${apiUrl}/game/${game.id}/player`))
      .then((players: Player[]) => {
        this._playersInGame = players;
      })
      .catch((error: HttpErrorResponse) => {
        this._error = error.message;
      })
  }

  public getPlayersInGame(gameId: number) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + keycloak.token)
      .set('Content-Type: ', 'application/x-www-form-urlencoded; charset=UTF-8')


    return this.http.get<Player[]>(`${apiUrl}/game/${gameId}/player`, { 'headers': headers })
      .subscribe({
        next: (players: Player[]) => {
          this._playersInGame = players;
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      })
  }

  public playerById(id: Number): Player | undefined {
    return this._playersInGame?.find((player: Player) => player.id === id);
  }

  public async registerPlayer() {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + keycloak.token)

    let gameId = this.gameService.game.id;

    let player = {
      isPatientZero: false,
      isHuman: true,
      userId: this.userService.userResponse.id,
    }
    await lastValueFrom(this.http.post<Player>(`${apiUrl}/game/${gameId}/player`, player, { 'headers': headers }))
      .then((p: Player) => {
        storageSave<Player>(playerKey, p);
        this._player = p
        this.getPlayersFromGame();
      })
      .catch((error: HttpErrorResponse) => {
        this._error = error.message;
      })
  }

  public async getPlayerFromUser(userId: number){
    await this.getPlayersFromGame();
    let player = this._playersInGame.filter((p: Player) => p.userId === userId).pop();
    this._player = player;
  }

  public async updatePlayer(player: Player) {
    this._player = player;
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + keycloak.token)

    await lastValueFrom(this.http.put<Player>(`${apiUrl}/game/${this.gameService.game.id}/player/${player.id}`, player, { 'headers': headers }))
      .then(() => {
        this.getPlayersFromGame();
      })
      .catch((error: HttpErrorResponse) => {
        this._error = error.message;
      })    
  }

  public async getPlayersWithName(): Promise<PlayerWithName[]> {
    await this.userService.getUsers();
    await this.getPlayersFromGame();

    const users: User[] = this.userService.users;
    const playersWithName: PlayerWithName[] = this._playersInGame.map((player: Player) => {
      let user: User = users.filter((u: User) => u.id === player.userId)[0];
      return { player, username: user.userName };
    })
    this._playersInGameWithName = playersWithName;
    return playersWithName;
  }

  public deletePlayer(player:Player){
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + keycloak.token)
    this.http.delete(`${apiUrl}/game/${player.gameId}/player/${player.id}`, { 'headers' : headers})
    .subscribe(() => {
      this._players = this._players.filter(p => p.id !== player.id)
    })
  }
}

