import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Kill } from 'src/app/models/kill.model';
import { GameService } from 'src/app/services/game.service';
import { KillService } from 'src/app/services/kill.service';
import {faSkullCrossbones} from "@fortawesome/free-solid-svg-icons"
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-bite-code-form',
  templateUrl: './bite-code-form.component.html',
  styleUrls: ['./bite-code-form.component.css']
})
export class BiteCodeFormComponent {
  latitude:number
  longitude:number 
  constructor(private gameService:GameService, private killService:KillService){

  }
  faSkull = faSkullCrossbones
  faLocationDot = faLocationDot
  onSubmit(form:NgForm){
    let kill:Kill = {
    gameId : this.gameService.game.id,
    story : form.value.description,
    victimId : form.value.biteCode,
    lat : form.value.latitude,
    lng : form.value.longitude,
    //TODO: This is hard coded. Need to be able to get active user to recieve victim
    killerId: 1,
    timeOfDeath: new Date()
    }
    
    this.killService.registerKill(kill);
    

  }

  getPosition(){
    navigator.geolocation.getCurrentPosition(result=> {
      this.latitude = result.coords.latitude
      this.longitude = result.coords.longitude
    }
      
  )
  }
}
