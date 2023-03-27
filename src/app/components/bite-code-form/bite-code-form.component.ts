import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Kill } from 'src/app/models/kill.model';
import { Player } from 'src/app/models/player.model';
import { GameService } from 'src/app/services/game.service';
import { KillService } from 'src/app/services/kill.service';
import {faSkullCrossbones} from "@fortawesome/free-solid-svg-icons"
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { PlayerService } from 'src/app/services/player.service';
import { SquadService } from 'src/app/services/squad.service';



@Component({
  selector: 'app-bite-code-form',
  templateUrl: './bite-code-form.component.html',
  styleUrls: ['./bite-code-form.component.css']
})
export class BiteCodeFormComponent {
  //Variables
  latitude:number;
  longitude:number;
  
  //Constructor with dependency injection
  constructor(
    private gameService:GameService, 
    private killService:KillService,
    private squadService:SquadService,
    private readonly playerService:PlayerService){}
  
  // Declaring fontawsome icons
  faSkull = faSkullCrossbones;
  faLocationDot = faLocationDot;

  /**
   * Function to handle the form submit. Calls a function in the kill service that handles the API POST request.
   * @param form 
   */
  onSubmit(form:NgForm){
    let players = this.playerService.playersInGame;
    let victim: Player = players.filter((player: Player) => form.value.biteCode === player.biteCode)[0];
    if(victim && victim.isHuman){
      let kill:Kill = {
        gameId : this.gameService.game.id,
        story : form.value.description,
        victimId : victim.id,
        lat : form.value.latitude,
        lng : form.value.longitude,
        killerId: this.playerService.player.id,
        timeOfDeath: new Date()
        }
        this.killService.registerKill(kill);
    }
    else{
      alert("Invalid bite code");
    }
  }

  /**
   * Function that updates the private variables to the users current location.
   */
  getPosition(){
    navigator.geolocation.getCurrentPosition(result=> {
      this.latitude = result.coords.latitude;
      this.longitude = result.coords.longitude;
    }
      
  )
  }
}
