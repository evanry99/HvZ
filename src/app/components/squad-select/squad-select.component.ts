import { Component } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { Squad } from 'src/app/models/squad.model';
import { PlayerService } from 'src/app/services/player.service';
import { SquadService } from 'src/app/services/squad.service';

@Component({
  selector: 'app-squad-select',
  templateUrl: './squad-select.component.html',
  styleUrls: ['./squad-select.component.css']
})
export class SquadSelectComponent {

  _squads: Squad[] = [];

  constructor(private readonly squadService: SquadService) { }

  ngOnInit() {
    this.refresh();
  }
  
  refresh() {
    this.squadService.getSquads();
    this._squads = this.squadService.squads;
  }

  joinSquad(squadId:number){
    this.squadService.joinSquad(squadId)
  }
}
