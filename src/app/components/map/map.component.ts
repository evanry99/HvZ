import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { latLng, tileLayer, LatLngBounds, latLngBounds, map, marker, polygon, Icon, icon } from 'leaflet';
import { Game } from 'src/app/models/game.model';
import { Kill } from 'src/app/models/kill.model';
import { Mission } from 'src/app/models/mission.model';
import { Player } from 'src/app/models/player.model';
import { User } from 'src/app/models/user.model';
import { GameService } from 'src/app/services/game.service';
import { KillService } from 'src/app/services/kill.service';
import { MissionService } from 'src/app/services/mission.service';
import { PlayerService } from 'src/app/services/player.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  private _game: Game;
  private _kills: Kill[] = [];
  private _missions: Mission[] = [];
  mapReady: boolean = false;
  options = {};
  layers: any= []

  gravestoneIcon = {
    icon: icon({
      iconSize:     [38, 38],
      iconAnchor:  [19, 38],
      popupAnchor:  [0, -39],
      iconUrl: '../../assets/images/gravestone.png',
   })
  };

  flagIcon = {
    icon: icon({
      iconSize:     [38, 38],
      iconAnchor:  [19, 38],
      popupAnchor:  [0, -39],
      iconUrl: '../../assets/images/flag.png',
   })
  };

  constructor(
    private readonly killService: KillService,
    private readonly gameService: GameService,
    private readonly userService: UserService,
    private readonly missionService: MissionService,
    private readonly playerService: PlayerService){
  }

  async ngOnInit(){
    this.playerService.getPlayersFromGame();
    await this.killService.getKills();
    await this.missionService.getMissions();
    this._game = this.gameService.game;
    this._kills = this.killService.kills;
    this._missions = this.missionService.missions;
    if(this.hasCoordinates()){
      await this.mapInit();
    }
  }

  async updateKills(){
    await this.killService.getKills();
    const kills: Kill[] = this.killService.kills;
    const newKills: Kill[] = kills.filter((kill: Kill) => !this._kills.includes(kill));
    console.log(newKills)
    for(let kill of newKills){
      let player = this.playerService.playerById(kill.victimId);
      let user: User = await this.userService.getUserById(player.userId);
      this.layers.push(
        marker([kill.lat, kill.lng], this.gravestoneIcon)
        .bindPopup(`${user.firstName} ${user.lastName}:\n${kill.story},\n${new Date(kill.timeOfDeath).toLocaleString("en-GB")}`)
        .openPopup()
      );
    }
    this._kills = kills;
  }

  hasCoordinates(): boolean{
    if(!this._game || !this._game.nw_Lat || !this._game.nw_Lng || !this._game.se_Lat || !this._game.se_Lng ){
          return false;
        }
    return true;
  }

  async mapInit(){
    this.options = {
      layers: [
          tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
            maxZoom: 19, 
            minZoom: 3, 
            attribution: '...' 
          })
      ],
      zoom: 5,
      center: latLng(
        (this._game.nw_Lat + this._game.se_Lat)/2,
        (this._game.nw_Lng + this._game.se_Lng)/2),
    };

    this.layers.push(
      polygon([
        [[90, -180], [90, 180], [-90, 180], [-90, -180]],
        [[ this._game.nw_Lat, this._game.nw_Lng ], [ this._game.nw_Lat, this._game.se_Lng ], [ this._game.se_Lat, this._game.se_Lng ], [ this._game.se_Lat, this._game.nw_Lng ]]
      ]).setStyle({color: '#FF0000'}),
    );

    for(let kill of this._kills){
      let player = this.playerService.playerById(kill.victimId);
      console.log(player);
      let user: User = await this.userService.getUserById(player.userId);
      this.layers.push(
        marker([kill.lat, kill.lng], this.gravestoneIcon)
        .bindPopup(`
        <b>${user.userName}:</b><br>
        ${kill.story}<br>
        ${new Date(kill.timeOfDeath).toLocaleString("en-GB")}`)
        .openPopup()
      );
    }
    for(let mission of this._missions){
      this.layers.push(
        marker([mission.lat, mission.lng], this.flagIcon)
        .bindPopup(`
        <b>${mission.name}:</b><br>
        ${mission.description}<br>
        Start time: ${new Date(mission.startTime).toLocaleString("en-GB")}<br>
        End time: ${new Date(mission.endTime).toLocaleString("en-GB")}
        `)
        .openPopup()
      );
    }
    this.mapReady = true;
  }
}
