import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Game } from 'src/app/models/game.model';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.page.html',
  styleUrls: ['./game-detail.page.css']
})
export class GameDetailPage {

  _title?: string;

  constructor(private readonly gameService: GameService){}

  ngOnInit(){
    this.setGame(2)
  }

  setGame(id: number){
    this.gameService.getGame(id)
    .subscribe({
      next: (game: Game) => {
        this._title = game.name;
        this.gameService.game = game;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    })
  }

  showDescription(){
    
  }

}
