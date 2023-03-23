import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Game } from 'src/app/models/game.model';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent {

  @Input() game: Game;

  constructor(
    private readonly gameService: GameService
  ){}

  async onSubmit(form:NgForm){
    let value = form.value;
    console.log(value)
    console.log(this.game)
    let g = {
      name: value.gameName,
      gameState: value.state,
      description: value.description,
      nw_Lat: value.nwLatitude,
      nw_Lng: value.nwLongitude,
      se_Lat: value.seLatitude,
      se_Lng: value.seLongitude,
      startTime: value.startTime,
      endTime: value.endTime,
    } 
    await this.gameService.updateGame(g, this.game.id);
  }

  toLocalTime(d: string): string{
    let date = new Date(d);
    date.setHours(date.getHours() + 1)
    return date.toISOString().slice(0, -1);
  }


}
