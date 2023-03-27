import { Component, Input } from '@angular/core';
import { Chat } from 'src/app/models/chat.model';
import { Game } from 'src/app/models/game.model';
import { Player, PlayerWithName } from 'src/app/models/player.model';
import { User } from 'src/app/models/user.model';
import { PlayerService } from 'src/app/services/player.service';
import { UserService } from 'src/app/services/user.service';
import { storageRead } from 'src/app/utils/storage.util';
import { playerKey } from 'src/app/variables/storage-keys';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ChatService } from 'src/app/services/chat.service';
import { faUser } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent {
  //Input
  @Input() chats: Chat[] = [];
  
  //variables
  _user: User;
  private _playersWithName: PlayerWithName[];
  public _username = {}

  //Define icons
  faTrash = faTrash
  faUser = faUser

  //Constructor with dependency injection
  constructor(
    private readonly playerService: PlayerService,
    private readonly userService: UserService,
    private readonly chatService: ChatService
    ){}

   


  //Function that runs on the initialization of the component. Updates the private variables to the players in the game with all the usernames and sets the user variable to the current user.
  ngOnInit(){
    this._playersWithName = this.playerService.playersInGameWithName;
    for(let p of this._playersWithName){
      this._username[p.player.id] = p.username;
    }
    this._user = this.userService.userResponse
  }

  /**
   * Function to handle the delete button click. Calls the chat service where the API DELETE call is handled.
   * @param chat 
   */
  deleteChat(chat:Chat){
    this.chatService.deleteChat(chat)
  }

  /**
   * Function to format the date and time to make it more readable for the end user.
   * @param date 
   * @returns {string}
   */
  timeToReadable(date: Date): string {
    const d = new Date(date);
    return d.toLocaleString("en-GB");
  }
}
