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
  
  constructor(private readonly userService:UserService){}
  _users:User[] = []
  faCrown= faCrown
  async ngOnInit(){
    
    this._users = await this.userService.getUsers()
  }

  makeAdmin(user:User){
    user.isAdmin = true
    console.log(user)
    this.userService.editUser(user)
  }
}
