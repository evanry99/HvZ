import { Component } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { Squad } from 'src/app/models/squad.model';
import { PlayerService } from 'src/app/services/player.service';
import { SquadService } from 'src/app/services/squad.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-squad-select',
  templateUrl: './squad-select.component.html',
  styleUrls: ['./squad-select.component.css']
})
export class SquadSelectComponent {
  _user: User
  _squads: Squad[] = [];
  faTrash = faTrash
  constructor(
    private readonly squadService: SquadService,
    private readonly userService: UserService
    ) { }

  ngOnInit() {
    this._user = this.userService.userResponse
    this.refresh();
    
  }
  
  refresh() {
    this.squadService.getSquads();
    this._squads = this.squadService.squads;
  }

  joinSquad(squadId:number){
    this.squadService.joinSquad(squadId)
  }
  
  deleteSquad(squad:Squad){
    this.squadService.deleteSquad(squad)
  }
}
