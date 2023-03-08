import { Component } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-description',
  templateUrl: './game-description.component.html',
  styleUrls: ['./game-description.component.css']
})
export class GameDescriptionComponent {

  _description?: string;

  constructor(private readonly gameService: GameService){}

  ngOnInit(){
    this._description = "Temp" //game.description
  }
}
