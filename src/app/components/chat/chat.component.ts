import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Chat, ChatDTO } from 'src/app/models/chat.model';
import { Player } from 'src/app/models/player.model';
import { ChatService } from 'src/app/services/chat.service';
import { GameService } from 'src/app/services/game.service';
import { PlayerService } from 'src/app/services/player.service';
import { UserService } from 'src/app/services/user.service';
import * as signalR from "@microsoft/signalr"
import { environment } from 'src/environments/environment';

const {apiUrl} = environment
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent{
  private hubConnection: signalR.HubConnection;
  get chats(): Chat[]{
    return this.chatService.chats
  }
  constructor(private chatService:ChatService, private gameService:GameService, private playerService:PlayerService, private userService:UserService){}
  
  ngOnInit(): void {
    this.chatService.getChat(this.gameService.game.id);
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${apiUrl}/notify`)
      .build()

    this.hubConnection
      .start()
      .then(() => console.log("Connection started"))
      .catch((err) => console.log(err.message))
    this.hubConnection.on("BroadcastMessage", () =>{
      this.chatService.getChat(this.gameService.game.id)
    })
    this.playerService.getPlayersInGame(this.gameService.game.id)
  }
  onSubmit(form:NgForm){
    //let playerId =  this.playerService.playersInGame.filter((player:Player) => player.userId === this.userService.user.id).pop().id
    let chat: ChatDTO = {
      message: form.value.chat,
      isHumanGlobal: false,
      isZombieGlobal: false,
      chatTime: new Date,
      playerId: 1,
      squadId: 1

    }
    //console.log(this.playerService.getPlayerFromUser(this.userService.user.id,this.gameService.game.id).id)
    this.chatService.sendChat(chat, this.gameService.game.id)
  }
}
