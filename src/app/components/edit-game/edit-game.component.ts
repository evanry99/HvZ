import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Game } from 'src/app/models/game.model';
import { SquadService } from 'src/app/services/squad.service';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent {

  @Input() game: Game;

  constructor(
    private readonly squadService: SquadService
  ){}

  async onSubmit(form:NgForm){
    await this.squadService.createSquad(form.value.SquadName);
  }

  toLocalTime(d: string): string{
    let date = new Date(d);
    date.setHours(date.getHours() + 1)
    return date.toISOString().slice(0, -1);
  }


}
