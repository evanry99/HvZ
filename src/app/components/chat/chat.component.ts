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
import { SquadMember } from 'src/app/models/squad-member.model';
import { SquadService } from 'src/app/services/squad.service';

const {apiUrlR} = environment
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent{
  
  //Variables
  public chatState = "Global";
  private hubConnection: signalR.HubConnection;
  _squadMember: SquadMember;
  _player: Player;
  
  //Constructor with dependency injection
  constructor(
    private chatService:ChatService, 
    private gameService:GameService,
    private playerService:PlayerService,
    private readonly squadService:SquadService)
    {}

  /**
   * Getter to return the chats. It uses conditionals to filter the chats to fit the Global chat, faction chat and zombie chat.
   */
  get chats(): Chat[]{
    document.getElementById("chatBody").scrollIntoView(false);
    if(this.chatState === "Global"){
      return this.chatService.chats.filter(c=> c.squadId === null && c.isHumanGlobal === true && c.isZombieGlobal === true);
    }
    else if(this.chatState === "Faction"){
      if(this._player.isHuman === true){
        return this.chatService.chats.filter(c => c.isHumanGlobal === true && c.isZombieGlobal === false && c.squadId === null);
        }
        else{
          return this.chatService.chats.filter(c => c.isHumanGlobal === false && c.squadId === null && c.isZombieGlobal === true);
        }
    }
    else{
      return this.chatService.chats.filter(c => c.squadId === this.squadService.squadMember.squadId);
    }
    
  }  
  
  //Loads on the initialization of the component. Updates the private variables to the current squadmember and player. Then it creates a web socket to create realtime chat functionality.
  async ngOnInit(): Promise<void> {
    await this.squadService.getSquadMember(this.gameService.game,this.playerService.player)
    this._squadMember = this.squadService.squadMember
    this._player = this.playerService.player
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
        this.chatService.getChat(this.gameService.game.id);
    })
  }
   
    
    
  
  /**
   * Function to handle the chat message form. Creates a suitable chat object depending on which of the three different chats the user is typing in.
   * @param form 
   */
  onSubmit(form:NgForm){
    
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
        squadId: this._squadMember.squadId
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
          isHumanGlobal: false,
          isZombieGlobal: true,
          chatTime: new Date,
          playerId: this.playerService.player.id,
          squadId : null
      }
      
      this.chatService.sendChat(chat, this.gameService.game.id);
      form.reset();
      
    }
  }

}
  
  /**
   * Function to update the chat state(Global, Squad or Faction)
   * @param value 
   */
  changeChatState(value:string){
    this.chatState = value;
  }

  
}

