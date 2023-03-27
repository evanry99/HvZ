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
  //Private variables
  private _users: User[] = [];
  private _error: string = "";
  private _loading: boolean = false;
  private _user: UserDTO;
  private _userResponse: User;

  //Constructor
  constructor(
    private readonly http: HttpClient
  ) { }

  //Getters and setters
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



  /**
   * Gets all users from the database with an API GET request. Updates the private users variable with the response.
   * @returns {Promise<User[]>}
   */
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
        userList = users;
        
          })
      .catch((error: HttpErrorResponse) => {
        this._error = error.message;
        
      })
      return userList
  }

  /**
   * Gets a user from the database by id with an API GET request. Sets the private user variable to the response.
   * @param id 
   * @returns {Promise<User>}
   */
  async getUserById(id: number): Promise<User> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + keycloak.token)

    let user: User;
    await lastValueFrom(this.http.get<User>(`${apiUrl}/user/${id}`, { 'headers': headers }))
      .then((u: User) => {
        user = u;
      })
      .catch((error: HttpErrorResponse) => {
        this._error = error.message;
      })
    return user;
  }
  /**
   * Gets a user by username from the database with an API GET request. Sets the private userResponse variable to the response and saves the user in session storage.
   * @param username 
   */
  async getUserByUsername(username: string) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + keycloak.token)

    await lastValueFrom(this.http.get<User>(`${apiUrl}/user/username/${username}`, { 'headers': headers }))
      .then((user: User) => {
        this._userResponse = user;
        storageSave(userKey, user);
      })
      .catch((error: HttpErrorResponse) => {
        this._error = error.message;
      })
  }

  /**
   * Adds a new user to the database with an API POST request. Updates the private userResponse variable to the response and saves the response in the session storage.
   * @param user 
   */
  async addUser(user:UserDTO): Promise<void>{
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + keycloak.token)
    await lastValueFrom(this.http.post<User>(`${apiUrl}/user`,user, { 'headers': headers }))
      .then((u: User) => {
        this._userResponse = u;
        console.log(user)
        storageSave(userKey, u);
        })
      .catch((error: HttpErrorResponse) => {
        this._error = error.message;
      })
  }

  /**
   * Edits a user in the database with an API PUT request. Updates the private user variable to the response.
   * @param user 
   */
  editUser(user:User){
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + keycloak.token)

    this.http.put(`${apiUrl}/user/${user.id}`, user, { 'headers' : headers})
      .subscribe({
        next: ((user:User) =>{
          this._user = user;
        }),
        error: (error: HttpError) => {
          this._error = error.message;
        }
      })
  }

  /**
   * Deletes a user from the database with an API DELETE request. Removes the deleted user from the private users array.
   * @param user 
   */
  public deleteUser(user:User){
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + keycloak.token)

    this.http.delete(`${apiUrl}/user/${user.id}`, { 'headers' : headers})
    .subscribe(() => {
      this._users = this._users.filter(u => u.id !== user.id)
    })
  }
}
