import { Component } from '@angular/core';
import { Player } from 'src/app/models/player.model';

@Component({
  selector: 'app-squad-info',
  templateUrl: './squad-info.component.html',
  styleUrls: ['./squad-info.component.css']
})
export class SquadInfoComponent {

  private players: Player[] = [];

  games: string[] = ["a", "b", "c"] 

}
