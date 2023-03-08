import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Game } from '../models/game.model';

const { apiUrl2 } = environment

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _games: Game[] = [];
  private _game?:Game;
  private _error = ""
  private _loading = false;


  set game(g: Game){
    this._game = g;
  }

  get game(){
    if(!this._game){
      throw new Error("No game")
    }
    return this._game;
  }

  get games(){
    return this._games
  }

  constructor(private readonly http: HttpClient) { }

  public getGames(){
    return this.http.get<Game[]>(apiUrl2+"/games")
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
    //Todo, fix when real Api works
    //return this._games.filter((game:Game) => game.id === id)
    return this._games[id-1];
  }
}
