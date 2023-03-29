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
  
  //Constructor with dependency injection
  constructor(
    private readonly gameService: GameService
  ){}

  /**
   * Function that handles the submit of the create game form. Creates a new game object with the form values and sends it to the add game function in the game service that handles the API POST request.
   * @param form 
   */
  async onSubmit(form:NgForm){
    let exists = false;
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
    this.gameService.games.forEach(g => {
      if(g.name === value.gameName){
        exists = true;
        window.alert("A game with that name already exists")
      }
    })
    if(exists === false){
      await this.gameService.addGame(game);
    }
    
  }
}
