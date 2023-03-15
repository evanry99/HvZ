import { Component } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.css']
})
export class GameInfoComponent {

  _description?: string;

  constructor(private readonly gameService: GameService){}

  ngOnInit(){
    this._description = this.gameService.game.description;
  }

}
