import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Game } from 'src/app/models/game.model';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent {
  
  constructor(
    private readonly gameService: GameService
  ){}

  async onSubmit(form:NgForm){
    let value = form.value;
    let game = {
      name: value.gameName,
      gameState: "Registration",
      description: value.description,
      nw_Lat: value.nwLatitude,
      nw_Lng: value.nwLongitude,
      se_Lat: value.seLatitude,
      se_Lng: value.seLongitude,
      startTime: value.startTime,
      endTime: value.endTime,
    } 
    await this.gameService.addGame(game);
  }
}
