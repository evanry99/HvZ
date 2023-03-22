import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from 'src/app/models/chat.model';
import { Game } from 'src/app/models/game.model';
import { Player } from 'src/app/models/player.model';
import { ChatService } from 'src/app/services/chat.service';
import { GameService } from 'src/app/services/game.service';
import { PlayerService } from 'src/app/services/player.service';
import { SquadService } from 'src/app/services/squad.service';
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
  _inSquad: boolean;
  _state: string;
  _isAdmin: boolean;

  constructor(
    private readonly gameService: GameService,
    private readonly userService: UserService,
    private readonly playerService: PlayerService,
    private readonly squadService: SquadService,
    private readonly router: Router,
    private readonly chatService: ChatService
    ){}

  async ngOnInit(){
    this.setGame();
    if(!this._game){
      this.router.navigateByUrl("/landing");
    }
    this.playerService.getPlayersWithName();
    this.squadService.getSquads();
    await this.checkPlayer();
    this._isAdmin = true; //this.userService.user.isAdmin;
    this._inSquad = false; //temp
    
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

  async checkPlayer() {
    this._player = await this.playerService.getPlayerFromUser(this.userService.userResponse.id);
    if(this._player){
      this.humanOrZombie();
      this.squadService.getSquadMember();
    }
  }

  async register() {
    await this.playerService.registerPlayer();
    this.playerService.getPlayersWithName();
    this._player = this.playerService.player;
    this.humanOrZombie();
    this.squadService.getSquadMember();
  }

  humanOrZombie(): void {
    if(this._player.isHuman){
      this._state = "Human";
    }
    else {
      this._state = "Zombie";
    }
  }
}



