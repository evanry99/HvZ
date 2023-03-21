import { Component } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-squad-select',
  templateUrl: './squad-select.component.html',
  styleUrls: ['./squad-select.component.css']
})
export class SquadSelectComponent {

  _players: Player[] = [];

  constructor(private readonly playerService: PlayerService) { }

  ngOnInit(){
    //temp
    this.playerService.getPlayers();
    this._players = this.playerService.players;
  }

}
