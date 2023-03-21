import { Component, Input } from '@angular/core';
import { Chat } from 'src/app/models/chat.model';


@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent {
  @Input() chats: Chat[] = [];

  timeToReadable(date: Date): string {
    const d = new Date(date);
    return d.toLocaleString("en-GB");
  }
}
