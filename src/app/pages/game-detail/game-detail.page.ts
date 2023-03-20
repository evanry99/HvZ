import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from 'src/app/models/chat.model';
import { Game } from 'src/app/models/game.model';
import { Player } from 'src/app/models/player.model';
import { ChatService } from 'src/app/services/chat.service';
import { GameService } from 'src/app/services/game.service';
import { PlayerService } from 'src/app/services/player.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.page.html',
  styleUrls: ['./game-detail.page.css']
})
export class GameDetailPage {

  _title?: string;
  _game? : Game
  _player: Player;
  _state: string;
  _isAdmin: boolean;

  constructor(
    private readonly gameService: GameService,
    private readonly userService: UserService,
    private readonly playerService: PlayerService,
    private readonly router: Router,
    private readonly chatService: ChatService
    ){}

  ngOnInit(){
    this.setGame();
    if(!this._game){
      this.router.navigateByUrl("/landing");
    }
    this._isAdmin = this.userService.user.isAdmin;
  }

  get chats(): Chat[]{
    return this.chatService.chats
  }

  setGame(){
    try {
      this._game = this.gameService.game;
      this._title = this._game.name;
    } 
    catch (error) {
      console.log("Error: " + error.message) 
    }
  }

  checkPlayer() {
    const user = this.userService.user;
    const player = this.playerService.getPlayerFromUser(1, 1);
    this._player = player;
    console.log(player);
    console.log(2)
    this.humanOrZombie();
  }

  humanOrZombie(): void {
    if(this._player.isHuman){
      this._state = "Human";
    }
    this._state = "Zombie";
  }
}



