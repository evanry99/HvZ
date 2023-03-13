import { Component, OnInit } from "@angular/core";
import { Game } from "src/app/models/game.model";
import { GameService } from "src/app/services/game.service";
import keycloak from "src/keycloak";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.css']
})
export class LandingPage implements OnInit{
  theMessage: string = "Hello from the other side"
  
  constructor(
    readonly gameService:GameService
  ){}
  
  get games():Game[]{
    return this.gameService.games
  }
  logout() {
    console.log("logged out");
  }

  handleLogin() {
  }

  ngOnInit(): void {
    this.gameService.getGames()
  }
}
