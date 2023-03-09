import { Injectable } from '@angular/core';
import { Game } from '../models/game.model';
import { Map } from '../models/map.model';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private _map?: Map;

  get map(): Map{
    if(!this._map){
      throw new Error("No map")
    }
    return this._map;
  }

  constructor(private readonly gameService: GameService) { }

  setMap(): void {
    const game: Game = this.gameService.game
    this._map = {
      nw_lat : -43.11,//game.nw_lat,
      nw_lng : 5.25,//game.nw_lng,
      se_lat : game.se_lat,
      se_lng : game.se_lng
    }
  }

}
