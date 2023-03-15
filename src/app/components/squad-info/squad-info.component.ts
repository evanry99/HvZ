import { Component } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-squad-info',
  templateUrl: './squad-info.component.html',
  styleUrls: ['./squad-info.component.css']
})
export class SquadInfoComponent {

  _players: Player[] = [];

  constructor(private readonly playerService: PlayerService) { }

  ngOnInit(){
    //temp
    this.playerService.getPlayers();
    this._players = this.playerService.players;
  }

}
