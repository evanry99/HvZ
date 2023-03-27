import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import keycloak from 'src/keycloak';
import { Mission } from '../models/mission.model';
import { GameService } from './game.service';
import { PlayerService } from './player.service';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

const { apiUrl } = environment

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  private _missions: Mission[] = [];

  get missions() {
    return this._missions;
  }

  constructor(
    private readonly gameService: GameService,
    private readonly playerService: PlayerService,
    private readonly http: HttpClient) { }

  async getMissions(): Promise<void> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + keycloak.token)

    const gameId: number = this.gameService.game.id;
    
    await lastValueFrom(this.http.get<Mission[]>(`${apiUrl}/game/${gameId}/mission`, { 'headers' : headers}))
      .then((missions: Mission[]) => {
        this._missions = missions;
      })
      .catch((error: HttpErrorResponse) => {
        console.log(error.message);
      })
  }

  registerMission(mission: Mission) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + keycloak.token)
    
    const game = this.gameService.game;

    this.http.post<Mission>(`${apiUrl}/game/${game.id}/mission`, mission, { 'headers' : headers})
      .subscribe({
        next: (mission: Mission) => {
          this._missions.push(mission);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      })
  }


}
