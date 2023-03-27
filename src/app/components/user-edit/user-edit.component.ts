import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { faCrown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit{
  //Constructor with dependency injection
  constructor(private readonly userService:UserService){}
  
  //Private variables
  _users:User[] = [];

  //Icon declaration
  faCrown= faCrown;
  
  //Function that runs on initialization of the component. Sets the private array of users to the current users.
  async ngOnInit(){  
    this._users = await this.userService.getUsers();
  }

  /**
   * Function to make a user admin. Updates the isAdmin entity in the user and calls the editUser in the userService that handles the API PUT request.
   * @param user 
   */
  makeAdmin(user:User){
    user.isAdmin = true;
    this.userService.editUser(user);
  }
}
