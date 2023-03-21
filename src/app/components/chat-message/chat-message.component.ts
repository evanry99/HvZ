import { Component, Input } from '@angular/core';
import { Chat } from 'src/app/models/chat.model';


@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent {
  @Input() chats: Chat[] = [];

  htmlEscape(str) {
    return str
      .replace(/&/g, '&amp')
      .replace(/'/g, '&apos')
      .replace(/"/g, '&quot')
      .replace(/>/g, '&gt')
      .replace(/</g, '&lt');
  }

  htmlUnescape(str) {
    return str
      .replace(/&amp/g, '&')
      .replace(/&apos/g, "'")
      .replace(/&quot/g, '"')
      .replace(/&gt/g, '>')
      .replace(/&lt/g, '<');
  }
}
