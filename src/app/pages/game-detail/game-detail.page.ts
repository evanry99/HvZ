import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Game } from 'src/app/models/game.model';
import { GameService } from 'src/app/services/game.service';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.page.html',
  styleUrls: ['./game-detail.page.css']
})
export class GameDetailPage {

  _title?: string;
  _game? : Game

  constructor(
    private readonly gameService: GameService,
    private readonly mapService: MapService,
    ){}

  ngOnInit(){
    this.setGame(2)
    this.mapService.setMap();
  }

  setGame(id: number){
    this._game = this.gameService.game;
    this._title = this._game.name;
    }
  }



