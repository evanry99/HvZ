import { Component } from '@angular/core';
import { Player, PlayerWithName } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/services/player.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { SquadService } from 'src/app/services/squad.service';
@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.css']
})
export class PlayerEditComponent {

  _players: PlayerWithName[] = [];
  faTrash = faTrash

  constructor(
    private readonly playerService: PlayerService,
    private readonly squadService: SquadService) { }

  async ngOnInit(){
    this._players = await this.playerService.getPlayersWithName();
  }

  async changePatientZero(player: Player){
    player.isPatientZero = !player.isPatientZero;
    player.isHuman = !player.isHuman;
    await this.playerService.updatePlayer(player);
  }

  async changeHuman(player: Player){
    player.isHuman = !player.isHuman;
    await this.playerService.updatePlayer(player);
  }

  async deletePlayer(player:Player){
    await this.squadService.deleteSquadMember(player);
    this.playerService.deletePlayer(player);
    this._players = await this.playerService.getPlayersWithName();
  }

  async refresh() {
    this._players = await this.playerService.getPlayersWithName();
  }
}
