import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Chat } from 'src/app/models/chat.model';
import { ChatService } from 'src/app/services/chat.service';
import { GameService } from 'src/app/services/game.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  get chats(): Chat[] {
    return this.chatService.chats
  }
  constructor(private chatService: ChatService, private gameService: GameService) { }

  ngOnInit(): void {
    this.chatService.getChat(this.gameService.game.id)
  }
  onSubmit(form: NgForm) {
    console.log(form.value.chat)
  }

}
