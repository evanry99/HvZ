import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SquadService } from 'src/app/services/squad.service';

@Component({
  selector: 'app-squad-registration',
  templateUrl: './squad-registration.component.html',
  styleUrls: ['./squad-registration.component.css']
})
export class SquadRegistrationComponent {

  constructor(
    private readonly squadService: SquadService
  ){}

  async onSubmit(form:NgForm){
    await this.squadService.createSquad(form.value.SquadName);
  }
}
