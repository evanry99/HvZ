import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-squad-registration',
  templateUrl: './squad-registration.component.html',
  styleUrls: ['./squad-registration.component.css']
})
export class SquadRegistrationComponent {
  onSubmit(form:NgForm){
    console.log(form.value.SquadName)
  }
}
