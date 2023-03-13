import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Game } from '../models/game.model';

const { mockApiUrl, mockApiUrl2 } = environment

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _games: Game[] = [];
  private _game?:Game
  private _error = ""


  set game(g: Game){
    this._game = g;
  }
  get games(){
    return this._games
  }

  constructor(private readonly http: HttpClient) { }

  public getGames(){
    return this.http.get<Game[]>(mockApiUrl2+"/games")
      .subscribe({
        next: (games: Game[]) => {
          this._games = games;
          console.log(games);
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      })
  }

  public getGameById(id:number){
    return this._games.filter((game:Game) => game.id === id)
  }
}
