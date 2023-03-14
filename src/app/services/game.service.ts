import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Game } from '../models/game.model';
import { Gravestone } from '../models/gravestone.model';
import { storageRead, storageSave } from '../utils/storage.util';
import { gameKey } from '../variables/storage-keys';

const { apiUrl } = environment

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
    storageSave<Game>(gameKey, g);
  }

  get game(){
    this._game = storageRead(gameKey);
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

    return this.http.get<Game[]>(apiUrl+"/game")
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
