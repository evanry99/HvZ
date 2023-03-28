import { Component } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { Squad } from 'src/app/models/squad.model';
import { PlayerService } from 'src/app/services/player.service';
import { SquadService } from 'src/app/services/squad.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { SquadMember } from 'src/app/models/squad-member.model';
import { GameService } from 'src/app/services/game.service';
@Component({
  selector: 'app-squad-select',
  templateUrl: './squad-select.component.html',
  styleUrls: ['./squad-select.component.css']
})
export class SquadSelectComponent {
  
  //Variables
  _user: User;
  _player: Player;
  _squads: Squad[] = [];
  _squadMember : SquadMember

  //Declare icons
  faTrash = faTrash;
  
  //Constructor with dependency injection
  constructor(
    private readonly squadService: SquadService,
    private readonly userService: UserService,
    private readonly gameService: GameService,
    private readonly playerService: PlayerService
    ) { }
  
  //Getters and setters
  get squadMember():SquadMember{
    return this.squadService.squadMember;
  
  }

  //Function that runs on initialization of the component. Sets the private variables to the current user, player and squad member.
  ngOnInit() {
    this._user = this.userService.userResponse;
    this.refresh();
    this._player = this.playerService.player;
    this.squadService.getSquadMember(this.gameService.game,this._player);
    this._squadMember = this.squadService.squadMember;        
  }
  
  /**
   * Function to refresh the component. Updates the private array of squads.
   */
  refresh() {
    this.squadService.getSquads();
    this._squads = this.squadService.squads;
  }

  /**
   * Function to handle the join button click. Calls the joinSquad function in the squadService that handles the API POST request
   * @param squad
   */
  joinSquad(squad:Squad){
    if(squad.isHuman === this.playerService.player.isHuman){
      this.squadService.joinSquad(squad.id);
    }
    else {
      alert("You can only join a squad with the same faction as you!")
    }
  }
  
  /**
   * Function to handle the delete button click. Calls the deleteSquad function in the squadService that handles the API DELETE request
   * @param squad 
   */
  deleteSquad(squad:Squad){
    this.squadService.deleteSquad(squad);
  }
}
