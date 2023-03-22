import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import keycloak from 'src/keycloak';
import { Chat, ChatDTO } from '../models/chat.model';

const { apiUrl } = environment


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private _loading = false;
  private _chats: Chat[] = []

  constructor(private readonly http: HttpClient) { }
  get chats() {
    return this._chats;
  }
  get loading() {
    return this._loading;
  }
/*
  public htmlEscape(str) {
    return str
      .replace(/&/g, '&amp')
      .replace(/'/g, '&apos')
      .replace(/"/g, '&quot')
      .replace(/>/g, '&gt')
      .replace(/</g, '&lt');
  }

  public htmlUnescape(str) {
    return str
      .replace(/&amp/g, '&')
      .replace(/&apos/g, "'")
      .replace(/&quot/g, '"')
      .replace(/&gt/g, '>')
      .replace(/&lt/g, '<');
  }
*/
  public getChat(gameId: number) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + keycloak.token)

    return this.http.get<Chat[]>(`${apiUrl}/game/${gameId}/chat`, { 'headers': headers })
      .pipe(
        finalize(() => {
          this._loading = false;
        })
      )
      .subscribe((chats: Chat[]) => {
        /*
        chats.map((chat: Chat) => {
          chat.message = this.htmlUnescape(chat.message)
        })
        */
        this._chats = chats;
      })
  }

  public sendChat(chat: ChatDTO, gameId: number) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + keycloak.token)
    return this.http.post<Chat>(`${apiUrl}/game/${gameId}/chat`, chat, { 'headers': headers })
      .pipe(
        finalize(() => {
          this._loading = false;
        })
      )
      .subscribe((chat: Chat) => {
        //chat.message = this.htmlEscape(chat.message)
        this._chats.push(chat);
        //chat.message = this.htmlUnescape(chat.message)
      })
  }

}
