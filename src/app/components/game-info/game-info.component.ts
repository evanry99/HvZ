import { Component } from '@angular/core';
import { Game } from 'src/app/models/game.model';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.css']
})
export class GameInfoComponent {

  _game?: Game;

  constructor(private readonly gameService: GameService){}

  ngOnInit(){
    this._game = this.gameService.game;
  }

}
