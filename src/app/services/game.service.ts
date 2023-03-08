import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Game } from '../models/game.model';

const { apiUrl } = environment

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _game?: Game;

  get game(): Game{
    console.log(this._game)
    if(!this._game){
      throw new Error("No game")
    }
    return this._game;
  }

  set game(g: Game){
    this._game = g;
  }

  constructor(private readonly http: HttpClient) { }

  public getGame(id: number): Observable<Game>{
    return this.http.get<Game>(`${apiUrl}/game`)
  }
}
