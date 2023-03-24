import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Kill } from 'src/app/models/kill.model';
import { Player } from 'src/app/models/player.model';
import { GameService } from 'src/app/services/game.service';
import { KillService } from 'src/app/services/kill.service';
import {faSkullCrossbones} from "@fortawesome/free-solid-svg-icons"
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { PlayerService } from 'src/app/services/player.service';



@Component({
  selector: 'app-bite-code-form',
  templateUrl: './bite-code-form.component.html',
  styleUrls: ['./bite-code-form.component.css']
})
export class BiteCodeFormComponent {

  latitude:number
  longitude:number 
  constructor(
    private gameService:GameService, 
    private killService:KillService,
    private readonly playerService:PlayerService){}

  faSkull = faSkullCrossbones
  faLocationDot = faLocationDot
  onSubmit(form:NgForm){
    let players = this.playerService.playersInGame;
    let victim: Player = players.filter((player: Player) => form.value.biteCode === player.biteCode)[0];
    if(victim){
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
      alert("Invalid bitecode");
    }
  }

  getPosition(){
    navigator.geolocation.getCurrentPosition(result=> {
      this.latitude = result.coords.latitude
      this.longitude = result.coords.longitude
    }
      
  )
  }
}
