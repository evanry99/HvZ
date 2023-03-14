import { Injectable } from '@angular/core';
import { Game } from '../models/game.model';
import { MapModel } from '../models/map.model';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private _map?: MapModel;

  get map(): MapModel{
    if(!this._map){
      throw new Error("No map")
    }
    return this._map;
  }

  constructor(private readonly gameService: GameService) { }

  setMap(): void {
    const game: Game = this.gameService.game
    this._map = {
      nw_lat : game.nw_lat,
      nw_lng : game.nw_lng,
      se_lat : game.se_lat,
      se_lng : game.se_lng
    }
  }

}
