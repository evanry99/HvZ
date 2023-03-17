import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kill } from '../models/kill.model';
import { GameService } from './game.service';
import { environment } from 'src/environments/environment.development';
import { lastValueFrom } from 'rxjs';


const {apiUrl} = environment;

@Injectable({
  providedIn: 'root'
})
export class KillService {

  private _kills: Kill[] = [];
  private _error: string = "";

  get kills() {
    return this._kills;
  }

  constructor(
    private readonly gameService: GameService,
    private readonly http: HttpClient) { }

  async getKills(): Promise<void>{
    const gameId: number = this.gameService.game.id;
    await lastValueFrom(this.http.get<Kill[]>(`${apiUrl}/game/${gameId}/kills`))
      .then((kills: Kill[]) => {
          this._kills = kills;
        })
      .catch((error: HttpErrorResponse) => {
        this._error = error.message;
      })
  }

  registerKill(kill:Kill){
    this.http.post<Kill>(`${apiUrl}/kill`, kill)
    .subscribe({
      next: (kill:Kill) => {
        this._kills.push(kill);
        console.log(kill)
      },
      error: (error:HttpErrorResponse) => {
        this._error = error.message;
      }
    })
  }
}
