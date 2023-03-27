import { Component } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.css']
})
export class GameInfoComponent {
  //Variables
  _description?: string;
  
  
  //Constructor with dependency injection
  constructor(
    private readonly gameService: GameService)
    {}

  //Runs on the initialization of the component. Sets the private variable to the current games description.
  ngOnInit(){
    this._description = this.gameService.game.description;
  }

}
