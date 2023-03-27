import { Component } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { Squad } from 'src/app/models/squad.model';
import { GameService } from 'src/app/services/game.service';
import { PlayerService } from 'src/app/services/player.service';
import { SquadService } from 'src/app/services/squad.service';

@Component({
  selector: 'app-squad-info',
  templateUrl: './squad-info.component.html',
  styleUrls: ['./squad-info.component.css']
})
export class SquadInfoComponent {
  
  //Getters and setters
  get squadMembers(){
    return this.squadService.squadMembersWithName;
  }

  get squad(){
    return this.squadService.squads.filter(s => s.id === this.squadService.squadMember.squadId).pop();
  }

  //Constructor with dependency injection
  constructor(
    private readonly playerService: PlayerService,
    private readonly squadService:SquadService,
    private readonly gameService:GameService)
    { }

  //Function that runs on initialization of the component. Updates the squad members and players to the current game.
  ngOnInit(){
    this.squadService.getSquadMembers(this.gameService.game.id,this.squadService.squadMember.squadId)
    this.playerService.getPlayersWithName();
    if(this.squad.isHuman !== this.playerService.player.isHuman){
      this.squadService.deleteSquadMember();
    }
  }

  /**
   *   Function to handle leave squad button click. Calls the deleteSquadMember in the squadService that handles the API DELETE request.
   */
  leaveSquad(){
    this.squadService.deleteSquadMember();
  }

  
}
