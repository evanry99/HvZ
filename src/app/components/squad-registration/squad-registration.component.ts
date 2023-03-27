import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SquadService } from 'src/app/services/squad.service';

@Component({
  selector: 'app-squad-registration',
  templateUrl: './squad-registration.component.html',
  styleUrls: ['./squad-registration.component.css']
})
export class SquadRegistrationComponent {

  //Constructor with dependency injection
  constructor(
    private readonly squadService: SquadService
  ){}
  

  /**
   * Function that handles the form submit. Calls the createSquad function in the squadService that handles the API POST request.
   * @param form 
   */
  async onSubmit(form:NgForm){
    await this.squadService.createSquad(form.value.SquadName);
  }
}
