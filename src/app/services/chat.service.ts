import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Chat, ChatDTO } from '../models/chat.model';

const { apiUrl } = environment


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private _loading = false;
  private _chats:Chat[] = []

  constructor(private readonly http: HttpClient) { }
  get chats(){
    return this._chats;
  }
  get loading(){
    return this._loading;
  }

  public getChat(gameId:number){
    return this.http.get<Chat[]>(`${apiUrl}/game/${gameId}/chat`)
    .pipe(
      finalize(() => {
        this._loading = false;
      })
    )
    .subscribe((chats: Chat[]) => {
      this._chats = chats;
    })
  } 

  public getSquadchat(squadId:number){
    this._chats = this._chats.filter(c => c.squadId == squadId && c.isHumanGlobal === false && c.isZombieGlobal=== false)
  }

  public getFactionChat(faction:string){
    if(faction === "human"){
      this._chats = this._chats.filter(c => c.isHumanGlobal == true && c.isZombieGlobal === false)
    }
    else{
      this._chats = this._chats.filter(c => c.isZombieGlobal == true && c.isHumanGlobal === false)
    }
  }

  public sendChat(chat:ChatDTO, gameId:number){
    return this.http.post<Chat>(`${apiUrl}/game/${gameId}/chat`, chat)
    .pipe(
      finalize(() => {
        this._loading = false;
      })
    )
    .subscribe((chat:Chat) => {
      this._chats.push(chat);
    })
  }
}