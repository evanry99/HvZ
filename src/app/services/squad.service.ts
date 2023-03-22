import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Squad } from '../models/squad.model';
import { GameService } from './game.service';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment.development';
import { Player } from '../models/player.model';
import { PlayerService } from './player.service';
import { lastValueFrom } from 'rxjs';


const {apiUrl} = environment;

@Injectable({
  providedIn: 'root'
})
export class SquadService {

  private _squads: Squad[] = [];

  get squads(): Squad[] {
    return this._squads;
  }

  constructor(
    private readonly http:HttpClient,
    private readonly gameService: GameService,
    private readonly playerService: PlayerService){}

  public getSquads(){
    const gameId: number = this.gameService.game.id;
    let url: string = "https://hvz20230314095915.azurewebsites.net";
    this.http.get<Squad[]>(`${url}/game/${gameId}/squad`)
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
    let url: string = "https://hvz20230314095915.azurewebsites.net";
    const squad = {
      name,
      isHuman: player.isHuman,
      squadMember: {
        playerId: player.id
      }
    }
    await lastValueFrom(this.http.post<Squad>(`${url}/game/${gameId}/squad`, squad))
      .then((s: Squad) => {
        this._squads.push(s);
        })
      .catch((error: HttpErrorResponse) => {
        console.log(error.message);
        alert("You can only be leader of one squad at a time.")
      })
  }



}