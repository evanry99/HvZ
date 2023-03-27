import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpError } from '@microsoft/signalr';
import { finalize, Observable } from 'rxjs';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import keycloak from 'src/keycloak';
import { Kill } from '../models/kill.model';
import { User, UserDTO } from '../models/user.model';
import { storageRead, storageSave } from '../utils/storage.util';
import { userKey } from '../variables/storage-keys';

const { apiUrl } = environment;

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

  get users(): User[] {
    return this._users;
  }

  get user(): UserDTO {
    return this._user;
  }

  get userResponse(): User {
    this._userResponse = storageRead<User>(userKey);
    return this._userResponse;
  }
  get error() {
    return this.error;
  }
  get loading() {
    return this._loading;
  }


  getUser(id): void {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + keycloak.token)

    this.http
      .get<User>(`${apiUrl}/user/${id}`, { 'headers': headers })
      .pipe(
        finalize(() => {
          this._loading = false;
        })
      )
      .subscribe((user: User) => {
        this._user = user;
      })

  }

  public async getUsers(): Promise<User[]> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + keycloak.token)

    let userList = []
    await lastValueFrom(this.http
        .get<User[]>(`${apiUrl}/user`, { 'headers': headers })
        .pipe(
          finalize(() => {
            this._loading = false;
          })
        ))
        .then((users: User[]) => {
          this._users = users;
        userList = users
        
          })
      .catch((error: HttpErrorResponse) => {
        console.log(error.message);
        
      })
      return userList
  }

  async getUserById(id: number): Promise<User> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + keycloak.token)

    let user: User;
    await lastValueFrom(this.http.get<User>(`${apiUrl}/user/${id}`, { 'headers': headers }))
      .then((u: User) => {
        user = u;
      })
      .catch((error: HttpErrorResponse) => {
        console.log(error.message);
      })
    return user;
  }

  async getUserByUsername(username: string) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + keycloak.token)

    await lastValueFrom(this.http.get<User>(`${apiUrl}/user/username/${username}`, { 'headers': headers }))
      .then((user: User) => {
        this._userResponse = user;
        storageSave(userKey, user);
      })
      .catch((error: HttpErrorResponse) => {
        console.log(error.message);
      })
  }

  async addUser(user:UserDTO): Promise<void>{
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + keycloak.token)
    await lastValueFrom(this.http.post<User>(`${apiUrl}/user`, user, { 'headers' : headers}))
      .then((u: User) => {
        this._userResponse = u;
        storageSave(userKey, u);
        })
      .catch((error: HttpErrorResponse) => {
        console.log(error.message);
      })
  }

  editUser(user:User){
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + keycloak.token)

    this.http.put(`${apiUrl}/user/${user.id}`, user, { 'headers' : headers})
      .subscribe({
        next: ((user:User) =>{
          console.log(user)
        }),
        error: (error: HttpError) => {
          console.log(error.message)
        }
      })
  }

  public deleteUser(user:User){
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + keycloak.token)

    this.http.delete(`${apiUrl}/user/${user.id}`, { 'headers' : headers})
    .subscribe(() => {
      this._users = this._users.filter(u => u.id !== user.id)
    })
  }
}
