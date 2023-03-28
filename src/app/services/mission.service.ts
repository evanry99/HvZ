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

  //Private variables
  private _missions: Mission[] = [];

  //Getters and setters.
  get missions() {
    return this._missions;
  }

  //Constructor with dependency injection
  constructor(
    private readonly gameService: GameService,
     private readonly http: HttpClient
   ) { }

   /**
    * Get all missions from the database with an API GET request. Updates the missions private array with the response.
    */
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

  /**
   * Adds a new mission to the database with an API POST request. Adds the new mission to the private missions array.
   * @param mission 
   */
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
