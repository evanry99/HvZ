import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Game } from '../models/game.model';

const { apiUrl } = environment

@Injectable({
  providedIn: 'root'
})
export class GameService {

  _game?: Game;

  constructor(private readonly http: HttpClient) { }

  public getGame(id: number): void{
    this.http.get<Game>(`${apiUrl}/game`)
    .subscribe({
      next: (game: Game) => {
        this._game = game;
        console.log(game)
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    })
  }
}
