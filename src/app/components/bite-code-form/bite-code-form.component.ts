import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-bite-code-form',
  templateUrl: './bite-code-form.component.html',
  styleUrls: ['./bite-code-form.component.css']
})
export class BiteCodeFormComponent {
  onSubmit(form:NgForm){
    console.log(form.value)
  }
}
