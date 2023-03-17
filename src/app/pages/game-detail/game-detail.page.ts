import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/models/game.model';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.page.html',
  styleUrls: ['./game-detail.page.css']
})
export class GameDetailPage {

  _title?: string;
  _game? : Game

  constructor(
    private readonly gameService: GameService,
    private readonly router: Router
    ){}

  ngOnInit(){
    this.setGame();
    if(!this._game){
      this.router.navigateByUrl("/landing");
    }
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

}



