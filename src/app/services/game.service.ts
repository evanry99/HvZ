import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import keycloak from 'src/keycloak';
import { Game } from '../models/game.model';
import { Player } from '../models/player.model';
import { storageRead, storageSave } from '../utils/storage.util';
import { gameKey } from '../variables/storage-keys';

const { apiUrl } = environment

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _games: Game[] = [];
  private _game: Game;
  private _error = ""
  private _loading = false;


  set game(g: Game) {
    this._game = g;
    storageSave<Game>(gameKey, g);
  }

  get game() {
    this._game = storageRead(gameKey);
    if (!this._game) {
      throw new Error("No game")
    }
    return this._game;
  }
  get loading() {
    return this._loading;
  }
  get error() {
    return this._error;
  }

  get games() {
    return this._games;
  }

  constructor(private readonly http: HttpClient) { }

  public getGames() {
    return this.http.get<Game[]>(apiUrl + "/game")
      .pipe(
        finalize(() => {
          this._loading = false;
        })
      )
      .subscribe({
        next: (games: Game[]) => {
          this._games = games;
          games.forEach(game => {
            this.getNumberOfPlayersInGame(game.id);
          })
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      })
  }

  public getGameById(id: number) {
    return this._games.filter((game: Game) => game.id === id).pop();
  }

  public getNumberOfPlayersInGame(id: number) {
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + keycloak.token)

    return this.http.get<Player[]>(`${apiUrl}/game/${id}/player`, { 'headers' : headers })
      .subscribe({
        next: (players: Player[]) => {
          this._game = this.getGameById(id);
          this._game.numberOfPlayers = players.length;
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      })
  }

  async addGame(game): Promise<void>{
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + keycloak.token)
    await lastValueFrom(this.http.post<Game>(`${apiUrl}/game`, game, {'headers': headers}))
      .then((game: Game) => {
        console.log(game)
        game.numberOfPlayers = 0;
        this._games.push(game);
        })
      .catch((error: HttpErrorResponse) => {
        console.log(error.message);
      })
  }

  async updateGame(game, id: number): Promise<void>{
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + keycloak.token)
    await lastValueFrom(this.http.put<Game>(`${apiUrl}/game/${id}`, game, { 'headers' : headers }))
      .then(() => {
        this.getGames();
      })
      .catch((error: HttpErrorResponse) => {
        console.log(error.message);
      })
  }


  public deleteGame(game:Game){
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + keycloak.token)
    this.http.delete(`${apiUrl}/game/${game.id}`, {'headers': headers})
    .subscribe(() => {
      this._games = this._games.filter(g => g.id !== game.id)
    })
  }

}

