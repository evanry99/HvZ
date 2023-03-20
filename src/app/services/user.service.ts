import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Kill } from '../models/kill.model';
import { User, UserDTO } from '../models/user.model';
import { storageRead, storageSave } from '../utils/storage.util';
import { userKey } from '../variables/storage-keys';

const {apiUrl} = environment;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _users: User[] = [];
  private _error: string = "";
  private _loading: boolean = false;
  private _user: UserDTO;
  private _userResponse: User;

  constructor(
    private readonly http: HttpClient
  ) { }

  get users(): User[]{
    return this._users;
  }

  get user(): User{
    return this._user;
  }

  get userResponse(): User{
    this._userResponse = storageRead<User>(userKey);
    return this._userResponse;
  }
  get error(){
    return this.error;
  }
  get loading(){
    return this._loading;
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
      this._users = users;
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

  async getUserByUsername(username: string) {
    await lastValueFrom(this.http.get<User>(`${apiUrl}/user/username/${username}`))
      .then((user: User) => {
        this._userResponse = user;
        storageSave(userKey, user);
        })
      .catch((error: HttpErrorResponse) => {
        console.log(error.message);
      })
  }

  addUser(user:UserDTO): void{
    this.http.post<User>(`${apiUrl}/user`,user)
    .pipe(
      finalize(()=> {
        this._loading = false;
      })
    )
    .subscribe((user: User) => {
      this._userResponse = user;
      storageSave(userKey, user);
    })
  }
}
