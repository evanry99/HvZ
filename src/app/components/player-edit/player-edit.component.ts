import { Component } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.css']
})
export class PlayerEditComponent {

  _players: Player[] = [];

  constructor(private readonly playerService: PlayerService) { }

  ngOnInit(){
    this.playerService.getPlayers();
    this._players = this.playerService.players;
  }

  async changePatientZero(player: Player){
    player.isPatientZero = !player.isPatientZero;
    await this.playerService.updatePlayer(player);
  }

  async changeHuman(player: Player){
    player.isHuman = !player.isHuman;
    await this.playerService.updatePlayer(player);
  }
}
