import { Component, Input } from '@angular/core';
import { Chat } from 'src/app/models/chat.model';
import { Game } from 'src/app/models/game.model';
import { Player, PlayerWithName } from 'src/app/models/player.model';
import { User } from 'src/app/models/user.model';
import { PlayerService } from 'src/app/services/player.service';
import { UserService } from 'src/app/services/user.service';
import { storageRead } from 'src/app/utils/storage.util';
import { playerKey } from 'src/app/variables/storage-keys';


@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent {
  @Input() chats: Chat[] = [];

  private _playersWithName: PlayerWithName[];
  public _username = {}


  constructor(
    private readonly playerService: PlayerService){}

  timeToReadable(date: Date): string {
    const d = new Date(date);
    return d.toLocaleString("en-GB");
  }

  ngOnInit(){
    this._playersWithName = this.playerService.playersInGameWithName;
    for(let p of this._playersWithName){
      this._username[p.player.id] = p.username;
    }
  }
}
