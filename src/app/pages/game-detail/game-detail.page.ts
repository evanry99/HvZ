import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from 'src/app/models/chat.model';
import { Game } from 'src/app/models/game.model';
import { Player } from 'src/app/models/player.model';
import { SquadMember } from 'src/app/models/squad-member.model';
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
  _inSquad: SquadMember;
  _state: string;
  _isAdmin: boolean;

  get player(): Player{
    return this.playerService.player;
  }

  constructor(
    private readonly gameService: GameService,
    private readonly userService: UserService,
    private readonly playerService: PlayerService,
    private readonly squadService: SquadService,
    private readonly router: Router,
    private readonly chatService: ChatService
    ){}

  async ngOnInit(){
    /**
     * Setter for the private game variable
     */
    this.setGame();
    if(!this._game){
      this.router.navigateByUrl("/landing");
    }
    this.playerService.getPlayersWithName();
    this.squadService.getSquads();
    await this.checkPlayer();
    this._isAdmin = this.userService.userResponse.isAdmin;    
  }

  /**
   * Getter for a games chats
   * @returns {Chat[]}
   */
  get chats(): Chat[]{
    return this.chatService.chats
  }

  /**
   * Setter for the private variable for the game
   */
  setGame(){
    try {
      this._game = this.gameService.game;
      this._title = this._game.name;
    } 
    catch (error) {
      console.log("Error: " + error.message) 
    }
  }

  /**
   * Function to check if the user has a player in the game. Calls the getPlayerFromUser in the userService to handle the API GET request. Sets the current player to null if it doesn't exist.
   */
  async checkPlayer() {
    await this.playerService.getPlayerFromUser(this.userService.userResponse.id);
    if(this.player && this.player.gameId === this._game.id){
      this.squadService.getSquadMember(this._game,this.player);
    }
    else{
      this.playerService.player = null;
    }
  }
  /**
   * Function to register a new player. Calls the registerPlayer in the playerService and sets the private variables for player and SquadMember.
   */
  async register() {
    await this.playerService.registerPlayer();
    this.playerService.getPlayersWithName();
    this.squadService.getSquadMember(this._game, this.player);
  }
   /**
    * Function to get the faction of a player
    */
  humanOrZombie(): void {
    if(this._player.isHuman){
      this._state = "Human";
    }
    else {
      this._state = "Zombie";
    }
  }
}



