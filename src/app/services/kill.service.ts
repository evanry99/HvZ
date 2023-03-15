import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gravestone } from '../models/gravestone.model';
import { Kill } from '../models/kill.model';
import { GameService } from './game.service';
import { environment } from 'src/environments/environment.development';

const {apiUrl} = environment;

@Injectable({
  providedIn: 'root'
})
export class KillService {

  private _kills?: Kill[];
  private _error: string = "";

  constructor(
    private readonly gameService: GameService,
    private readonly http: HttpClient) { }

  getGravestones(): Gravestone[] {
    //temp
    const gravestones: Gravestone[] = [];
    gravestones.push({
      lat: 40,
      lng: 40
    })
    gravestones.push({
      lat: 30,
      lng: 41
    })
    return gravestones;
  }

  getKills() {
    const gameId: number = this.gameService.game.id;
    this.http.get<Kill[]>(`${apiUrl}/game/${gameId}/kill`)
      .subscribe({
        next: (kills: Kill[]) => {
          this._kills = kills;
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        }
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
