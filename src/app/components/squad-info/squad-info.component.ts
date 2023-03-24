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

  _players: Player[] = [];
  
  get squadMembers(){
    return this.squadService.squadMembers;
  }

  get squad(){
    return this.squadService.squads.filter(s => s.id === this.squadService.squadMember.squadId).pop()
  }
  constructor(private readonly playerService: PlayerService, private readonly squadService:SquadService, private readonly gameService:GameService) { }

  ngOnInit(){
    //temp
    this.squadService.getSquadMembers(this.gameService.game.id,this.squadService.squadMember.squadId)
    
    this.playerService.getPlayersFromGame();
    this._players = this.playerService.players; //Todo filter for SquadMembers
  }
}
