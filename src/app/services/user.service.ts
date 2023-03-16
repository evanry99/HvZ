import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Kill } from '../models/kill.model';
import { User } from '../models/user.model';

const {apiUrl} = environment;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _users: User[] = [];
  private _error: string = "";
  private _loading: boolean = false;
  private _user: User

  constructor(
    private readonly http: HttpClient
  ) { }

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

  async getUserById(id: number): Promise<User> {
    let user: User;
    await lastValueFrom(this.http.get<User>(`${apiUrl}/user/${id}`))
      .then((u: User) => {
          user = u;
        })
      .catch((error: HttpErrorResponse) => {
        console.log(error.message);
      })
      
    return user;
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
