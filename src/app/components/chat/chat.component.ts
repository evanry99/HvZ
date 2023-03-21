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

const {apiUrlR} = environment
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent{
  public chatState = "Global"
  private hubConnection: signalR.HubConnection;

  get chats(): Chat[]{
    document.getElementById("chatBody").scrollIntoView(false);
    return this.chatService.chats.filter(c=> c.squadId === null && c.isHumanGlobal === true && c.isZombieGlobal === true)
  }
  get squadChats():Chat[]{
    return this.chatService.chats.filter(c => c.squadId === 1)
  }
  get factionChats(): Chat[]{
    return this.chatService.chats.filter(c=>  c.squadId === null && (c.isHumanGlobal == false || c.isZombieGlobal == false))
  }


  constructor(private chatService:ChatService, private gameService:GameService, private playerService:PlayerService, private userService:UserService){}
  
  ngOnInit(): void {
    this.chatService.getChat(this.gameService.game.id);
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(`${apiUrlR}/hub`, {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets
          }).withAutomaticReconnect()
        .build()
    this.hubConnection
        .start()
        .then(() => console.log("Connection started"))
        .catch((err) => console.log(err.message))
        this.hubConnection.on("chat", (data) =>{
        this.chatService.getChat(this.gameService.game.id)
        console.log(data)

    })
  }
   
    
    
  
  
  onSubmit(form:NgForm){
    //let playerId =  this.playerService.playersInGame.filter((player:Player) => player.userId === this.userService.user.id).pop().id
    if(this.chatState === "Global"){
      let chat: ChatDTO = {
      message: form.value.chat,
      isHumanGlobal: true,
      isZombieGlobal: true,
      chatTime: new Date,
      playerId: this.playerService.player.id
      }
      
      this.chatService.sendChat(chat, this.gameService.game.id)
      form.reset();
    }
    else if(this.chatState === "Squad"){
      let chat: ChatDTO = {
        message: form.value.chat,
        isHumanGlobal: false,
        isZombieGlobal: false,
        chatTime: new Date,
        playerId: this.playerService.player.id,
        squadId: 1
      }
      
      this.chatService.sendChat(chat, this.gameService.game.id)
      form.reset();
    }
    else{
      if(this.playerService.player.isHuman === true){
        let chat: ChatDTO = {
        message: form.value.chat,
        isHumanGlobal: true,
        isZombieGlobal: false,
        chatTime: new Date,
        playerId: this.playerService.player.id,
        squadId: null
  
      }
      this.chatService.sendChat(chat, this.gameService.game.id)
      form.reset();
      }
      else if(this.playerService.player.isHuman === false){
        let chat: ChatDTO = {
          message: form.value.chat,
          isHumanGlobal: true,
          isZombieGlobal: false,
          chatTime: new Date,
          playerId: this.playerService.player.id,
          squadId : null
      }
      this.chatService.sendChat(chat, this.gameService.game.id)
      form.reset();
      
    }
  }
}
  

  changeChatState(value:string){
    this.chatState = value
    console.log(this.chatState)

  }
}

