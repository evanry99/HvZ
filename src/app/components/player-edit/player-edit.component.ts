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
  
  //Variables
  _players: PlayerWithName[] = [];

  //Declare icons
  faTrash = faTrash

  //Constructor with dependency injection
  constructor(
    private readonly playerService: PlayerService,
    private readonly squadService: SquadService) { }

  //Function that runs on the initialization of the component. Updates the private variable with the players in the game with the current games players with username.
  async ngOnInit(){
    this._players = await this.playerService.getPlayersWithName();
  }

  /**
   * Function to change patient zero. Calls the updatePlayer function in the playerService to handle the API PUT request.
   * @param player 
   */
  async changePatientZero(player: Player){
    player.isPatientZero = !player.isPatientZero;
    player.isHuman = !player.isHuman;
    await this.playerService.updatePlayer(player);
  }

  /**
   * Function to change the faction of a player. Calls the updatePlayer function in the playerService that handles the API PUT request.
   * @param player 
   */
  async changeHuman(player: Player){
    player.isHuman = !player.isHuman;
    await this.playerService.updatePlayer(player);
  }

  /**
   * Function to handle the delete player button click. Calls the deletePlayer function in the playerService that handles the API DELETE request.
   * @param player 
   */
  async deletePlayer(player:Player){
    await this.squadService.deleteSquadMember(player);
    this.playerService.deletePlayer(player);
    this._players = await this.playerService.getPlayersWithName();
  }

  async refresh() {
    this._players = await this.playerService.getPlayersWithName();

  }
}
