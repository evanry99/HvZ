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
  
  //Private variables
  private _playersInGame: Player[] = [];
  private _playersInGameWithName: PlayerWithName[] = [];
  private _player: Player;
  private _error: string = "";
  private _loading = false;

  //Getters and setters
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
    this._player = storageRead<Player>(playerKey);
    return this._player;
  }

  set player(p: Player) {
    storageSave<Player>(playerKey, p);
    this._player = p;
  }

  //Contructor with dependency injection
  constructor(
    private readonly http: HttpClient,
    private readonly gameService: GameService,
    private readonly userService: UserService) { }
  
  
  

  /**
  * Gets all players from a game with an API GET request. Updates the playersInGame private variable with the response. 
  */
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

  /**
   * Gets a player by ID.
   * @param id 
   * @returns {Player}
   */
  public playerById(id: Number): Player | undefined {
    return this._playersInGame?.find((player: Player) => player.id === id);
  }

  /**
   * Adds a new player to the database with an API POST request. Adds the new player to the private playersInGame array.
   */
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

  /**
   * Gets a player from a user and updates the private player variable.
   * @param userId 
   */
  public async getPlayerFromUser(userId: number){
    await this.getPlayersFromGame();
    let player = this._playersInGame.filter((p: Player) => p.userId === userId).pop();
    this._player = player;
  }

  /**
   * Updates a player in the database with an API PUT request. Updates the players array and the private player variable so they contain the new user.
   * @param player 
   */
  public async updatePlayer(player: Player) {
    this._player = player;
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + keycloak.token)

    await lastValueFrom(this.http.put<Player>(`${apiUrl}/game/${this.gameService.game.id}/player/${player.id}`, player, { 'headers': headers }))
      .then((p:Player) => { 
        this.getPlayersFromGame();
        this._player = p
      })
      .catch((error: HttpErrorResponse) => {
        this._error = error.message;
      })    
  }

  /**
   * Gets a list of players with their names. Updates the private playersInGameWithName variable with the response
   * @returns {Promise<PlayerWithName[]>}
   */
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

  /**
   * Deletes a player from the database with an API DELETE request. Removes the player from the private playersInGame variable.
   * @param player 
   */
  public deletePlayer(player:Player){
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + keycloak.token)
    this.http.delete(`${apiUrl}/game/${player.gameId}/player/${player.id}`, { 'headers' : headers})
    .subscribe(() => {
      this._playersInGame = this._playersInGame.filter(p => p.id !== player.id)
    })
  }
}

