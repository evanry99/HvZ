import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Squad } from '../models/squad.model';
import { GameService } from './game.service';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment.development';
import { Player, PlayerWithName } from '../models/player.model';
import { PlayerService } from './player.service';
import { lastValueFrom } from 'rxjs';
import { SquadMember, SquadMemberWithName } from '../models/squad-member.model';
import keycloak from 'src/keycloak';
import { Game } from '../models/game.model';
import { SquadCheckIn } from '../models/squad-check-in.model';
import { HttpError } from '@microsoft/signalr';
import { storageRead, storageSave } from '../utils/storage.util';
import { squadMemberKey } from '../variables/storage-keys';


const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class SquadService {
  private _squadMember: SquadMember
  private _squads: Squad[] = [];
  private _squadCheckIns: SquadCheckIn[] = [];
  private _squadMembers: SquadMember[] = [];
  private _squadMembersWithName: SquadMemberWithName[] = [];

  get squads(): Squad[] {
    return this._squads;
  }

  get squadMember(){
    this._squadMember = storageRead(squadMemberKey);
    return this._squadMember
  }

  set squadMember(member: SquadMember){
    storageSave(squadMemberKey, member);
    this._squadMember = member;
  }

  get squadMembers(){
    return this._squadMembers;
  }

  get squadMembersWithName(){
    return this._squadMembersWithName;
  }

  get squadCheckIns(): SquadCheckIn[] {
    return this._squadCheckIns;
  }

  constructor(
    private readonly http: HttpClient,
    private readonly gameService: GameService,
    private readonly playerService: PlayerService) { }

  public getSquads() {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + keycloak.token)

    const gameId: number = this.gameService.game.id;
    this.http.get<Squad[]>(`${apiUrl}/game/${gameId}/squad`, { 'headers': headers })
      .subscribe({
        next: (squads: Squad[]) => {
          this._squads = squads;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      })
  }

  public async createSquad(name: string) {
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
    await lastValueFrom(this.http.post<Squad>(`${apiUrl}/game/${gameId}/squad`, squad, { 'headers': headers }))
      .then((s: Squad) => {
        this._squads.push(s);
        this.getSquadMember(this.gameService.game,this.playerService.player)
        })
      .catch((error: HttpErrorResponse) => {
        console.log(error.message);
        alert("You can only be leader of one squad at a time.")
      })
  }

  public joinSquad(squadId: number) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + keycloak.token)

    this.http.post<SquadMember>(`${apiUrl}/game/${this.gameService.game.id}/squad/${squadId}/join`, { "playerId": this.playerService.player.id }, { 'headers': headers })
      .subscribe({
        next: (squadMember:SquadMember) =>{
            this.squadMember = squadMember;

        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
          this.squadMember = null;
        }
      })
  }

public getSquadMember(game:Game, player:Player){
  const headers = new HttpHeaders()
  .set('Authorization', 'Bearer ' + keycloak.token)
  
  this.http.get<SquadMember>(`${apiUrl}/game/${game.id}/squadMember/${player.id}`, { 'headers' : headers})
  .subscribe({
    next: (squadMember: SquadMember) => {
      this.squadMember = squadMember;
    },
    error: (error: HttpErrorResponse) => {
      if(error.status === 404){
        console.log("Player not in squad");
      }
      this.squadMember = null;
    }
  })
}

async getSquadCheckIns(): Promise<void> {
  const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + keycloak.token)

  let gameId: number = this.gameService.game.id;
  let squadId: number = this._squadMember.squadId;
  
  await lastValueFrom(this.http.get<SquadCheckIn[]>(`${apiUrl}/game/${gameId}/squad/${squadId}/check-in`, { 'headers' : headers}))
    .then((checkIns: SquadCheckIn[]) => {
      this._squadCheckIns = checkIns;
    })
    .catch((error: HttpErrorResponse) => {
      console.log(error.message);
    })
}

public createSquadCheckIn(checkIn: SquadCheckIn){
  const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + keycloak.token)

  this.http.post(`${apiUrl}/game/${checkIn.gameId}/squad/${checkIn.squadId}/check-in`, checkIn , { 'headers' : headers})
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

  let players = this.playerService.playersInGameWithName;
  
  this.http.get<SquadMember[]>(`${apiUrl}/game/${gameId}/squadMembers/${squadId}`, {'headers' : headers})
  .subscribe({
    next: (squadMembers: SquadMember[]) => {
      this._squadMembers = squadMembers;
      this._squadMembersWithName = squadMembers.map((squadMember: SquadMember) => {
        let name = players.filter((player: PlayerWithName) => {
          return player.player.id === squadMember.playerId})[0];
        return {squadMember, 
                username: name.username}
        })
    },
    error: (error: HttpErrorResponse) => {
      console.log(error);
      this._squadMembers = [];
    }
  })
}

public deleteSquadMember(){
  let squadMember = this._squadMember;
  const headers = new HttpHeaders()
  .set('Authorization', 'Bearer ' + keycloak.token)
  this.http.delete(`${apiUrl}/game/${squadMember.gameId}/squadMember/${squadMember.id}`, { 'headers' : headers})
  .subscribe(() => {
    this.squadMember = null;
  })
}

}
