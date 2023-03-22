import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Squad } from '../models/squad.model';
import { GameService } from './game.service';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment.development';
import { Player } from '../models/player.model';
import { PlayerService } from './player.service';
import { lastValueFrom } from 'rxjs';
import { SquadMember } from '../models/squad-member.model';


const {apiUrl} = environment;

@Injectable({
  providedIn: 'root'
})
export class SquadService {
  private _squadMember: SquadMember
  private _squads: Squad[] = [];

  get squads(): Squad[] {
    return this._squads;
  }

  get squadMember(){
    return this._squadMember
  }

  constructor(
    private readonly http:HttpClient,
    private readonly gameService: GameService,
    private readonly playerService: PlayerService){}
    
  public getSquads(){
    const gameId: number = this.gameService.game.id;
    
    this.http.get<Squad[]>(`${apiUrl}/game/${gameId}/squad`)
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
    const gameId: number = this.gameService.game.id;
    const player: Player = this.playerService.player;
    const squad = {
      name,
      isHuman: player.isHuman,
      squadMember: {
        playerId: player.id
      }
    }
    await lastValueFrom(this.http.post<Squad>(`${apiUrl}/game/${gameId}/squad`, squad))
      .then((s: Squad) => {
        this._squads.push(s);
        })
      .catch((error: HttpErrorResponse) => {
        console.log(error.message);
        alert("You can only be leader of one squad at a time.")
      })
  }

public joinSquad(squadId:number) {
    this.http.post<SquadMember>(`${apiUrl}/game/${this.gameService.game.id}/squad/${squadId}/join`,{"playerId" : this.playerService.player.id})
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

public getSquadMember(){
  this.http.get<SquadMember>(`${apiUrl}/game/${this.gameService.game.id}/squadMember/${this.playerService.player.id}`)
  .subscribe({
    next: (squadMember: SquadMember) => {
      this._squadMember = squadMember;
    },
    error: (error: HttpErrorResponse) => {
      console.log(error);
      this._squadMember = null;
    }
  })
}

}
