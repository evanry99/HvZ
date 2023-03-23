import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kill } from '../models/kill.model';
import { GameService } from './game.service';
import { environment } from 'src/environments/environment.development';
import { lastValueFrom } from 'rxjs';
import keycloak from 'src/keycloak';


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
  get error(){
    return this._error;
  }

  constructor(
    private readonly gameService: GameService,
    private readonly http: HttpClient) { }

  async getKills(): Promise<void>{
    const gameId: number = this.gameService.game.id;

    
    await lastValueFrom(this.http.get<Kill[]>(`${apiUrl}/game/${gameId}/kill`))
      .then((kills: Kill[]) => {
          this._kills = kills;
        })
      .catch((error: HttpErrorResponse) => {
        this._error = error.message;
      })
  }

  


  public deleteKill(kill:Kill){
    this.http.delete(`${apiUrl}/kill/${kill.id}`)
    .subscribe(() => {
      this._kills = this._kills.filter(k => k.id !== kill.id)
    })

  registerKill(kill: Kill) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + keycloak.token)

    this.http.post<Kill>(`${apiUrl}/kill`, kill)
      .subscribe({
        next: (kill: Kill) => {
          this._kills.push(kill);
          console.log(kill);
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      })

  }
}
