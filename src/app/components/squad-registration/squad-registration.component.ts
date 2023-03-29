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
    let exists = false
    this.squadService.squads.forEach(s => {
      if(s.name === form.value.SquadName){
        window.alert("There is already a squad with that name");
        exists = true;
      }
    })
    if(exists === false){
      await this.squadService.createSquad(form.value.SquadName);
    }
    
  }
}
