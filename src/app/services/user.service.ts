import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Kill } from '../models/kill.model';
import { User } from '../models/user.model';

const {apiUrl} = environment;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly http: HttpClient
  ) { }

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
}
