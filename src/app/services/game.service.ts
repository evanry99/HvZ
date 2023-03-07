import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  _game?: Game;

  constructor(private readonly http: HttpClient) { }

  public getGame(id: number): void{
    this.http.get<Game>(`url/${id}`)
    .subscribe({
      next: (game: Game) => {
        this._game = game;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    })
  }
}
