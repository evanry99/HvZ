import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { GameService } from "src/app/services/game.service";

@Component({
  selector: 'app-landing-page-list',
  templateUrl: './landing-page-list.component.html',
  styleUrls: ['./landing-page-list.component.css']
})
export class LandingPageListComponent {

  constructor(
    private readonly gameService: GameService,
    private readonly router: Router){}

  async goToGame(){
    this.router.navigateByUrl("/game-detail")
  }
}
