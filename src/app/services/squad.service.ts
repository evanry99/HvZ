import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Squad } from '../models/squad.model';
import { GameService } from './game.service';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment.development';
import { Player } from '../models/player.model';
import { PlayerService } from './player.service';
import { lastValueFrom } from 'rxjs';
import { SquadMember } from '../models/squad-member.model';
import keycloak from 'src/keycloak';
import { Game } from '../models/game.model';
import { SquadCheckIn } from '../models/squad-check-in.model';
import { HttpError } from '@microsoft/signalr';


const {apiUrl} = environment;

@Injectable({
  providedIn: 'root'
})
export class SquadService {
  private _squadMember: SquadMember
  private _squads: Squad[] = [];
  private _squadMembers: SquadMember[] = [];

  get squads(): Squad[] {
    return this._squads;
  }

  get squadMember(){
    return this._squadMember
  }
  get squadMembers(){
    return this._squadMembers;
  }

  constructor(
    private readonly http:HttpClient,
    private readonly gameService: GameService,
    private readonly playerService: PlayerService){}
    
  public getSquads(){
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + keycloak.token)
    
    const gameId: number = this.gameService.game.id;
    this.http.get<Squad[]>(`${apiUrl}/game/${gameId}/squad`, { 'headers' : headers})
      .subscribe({
        next: (squads: Squad[]) => {
          this._squads = squads;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      })
  }

  public async createSquad(name: string){
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + keycloak.token)

    const gameId: number = this.gameService.game.id;
    const player: Player = this.playerService.player;
    const squad = {
      name,
      isHuman: player.isHuman,
      squadMember: {
        playerId: player.id
      }
    }
    await lastValueFrom(this.http.post<Squad>(`${apiUrl}/game/${gameId}/squad`, squad, { 'headers' : headers}))
      .then((s: Squad) => {
        this._squads.push(s);
        this.getSquadMember(this.gameService.game,this.playerService.player)
        })
      .catch((error: HttpErrorResponse) => {
        console.log(error.message);
        alert("You can only be leader of one squad at a time.")
      })
  }

public joinSquad(squadId:number) {
  const headers = new HttpHeaders()
  .set('Authorization', 'Bearer ' + keycloak.token)

    this.http.post<SquadMember>(`${apiUrl}/game/${this.gameService.game.id}/squad/${squadId}/join`,{"playerId" : this.playerService.player.id}, {'headers' : headers})
      .subscribe({
        next: (squadMember:SquadMember) =>{
            this._squadMember = squadMember;

        },
        error: (error:HttpErrorResponse) => {
          console.log(error.message);
          this._squadMember = null;
        }
        
    })
  }

public getSquadMember(game:Game,player:Player){
  const headers = new HttpHeaders()
  .set('Authorization', 'Bearer ' + keycloak.token)
  
  this.http.get<SquadMember>(`${apiUrl}/game/${game.id}/squadMember/${player.id}`, { 'headers' : headers})
  .subscribe({
    next: (squadMember: SquadMember) => {
      this._squadMember = squadMember;
    },
    error: (error: HttpErrorResponse) => {
      console.log(error);
      this._squadMember = null;
    }
  })
  console.log(this._squadMember)
}

public createSquadCheckIn(checkIn: SquadCheckIn){
  const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + keycloak.token)

  this.http.post(`${apiUrl}/game/${checkIn.gameId}/squad/${checkIn.squadId}(checkIn)`, checkIn , { 'headers' : headers})
    .subscribe({
      next: ((check: SquadCheckIn) =>{
        console.log(check)
      }),
      error: (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    })
}

public deleteSquad(squad:Squad){
  const headers = new HttpHeaders()
  .set('Authorization', 'Bearer ' + keycloak.token)
  
  this.http.delete(`${apiUrl}/game/${squad.gameId}/squad/${squad.id}`, { 'headers' : headers})
  .subscribe(() => {
    this._squads = this._squads.filter(s => s.id !== squad.id)
  })
}

public getSquadMembers(gameId:number,squadId:number){
  const headers = new HttpHeaders()
  .set('Authorization', 'Bearer ' + keycloak.token)
  
  this.http.get<SquadMember[]>(`${apiUrl}/game/${gameId}/squadMembers/${squadId}`, {'headers' : headers})
  .subscribe({
    next: (squadMembers: SquadMember[]) => {
      this._squadMembers = squadMembers;
    },
    error: (error: HttpErrorResponse) => {
      console.log(error);
      this._squadMembers = [];
    }
  })
  console.log(this._squadMember)
}

}
