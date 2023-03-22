import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SquadService } from 'src/app/services/squad.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent {
  
  constructor(
    private readonly squadService: SquadService
  ){}

  async onSubmit(form:NgForm){
    await this.squadService.createSquad(form.value.SquadName);
  }
}
