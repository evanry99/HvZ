import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

const {apiUrl} = environment;
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  private _users: User[] = [];
  private _error: string = "";
  private _loading: boolean = false;
  private _user: User

  get users(): User[]{
    return this._users;
  }

  get user(): User{
    return this._user;
  }


  getUser(id): void{
    this.http
    .get<User>(`${apiUrl}/user/${id}`)
    .pipe(
      finalize(()=> {
        this._loading = false;
      })
    )
    .subscribe((user: User) => {
      this._user = user;
    })
  }

  getUsers(): void{
    this.http
    .get<User[]>(`${apiUrl}/user`)
    .pipe(
      finalize(() => {
        this._loading = false;
      })
    )
    .subscribe((users: User[]) => {
      this._users = users
    })
  }

  addUser(user:User): void{
    this.http.post<User>(`${apiUrl}/user`,user)
    .pipe(
      finalize(()=> {
        this._loading = false;
      })
    )
    .subscribe((user: User) => {
      this._user = user;
      console.log(user)
    })
  }
}
