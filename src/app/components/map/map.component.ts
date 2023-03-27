import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { latLng, tileLayer, LatLngBounds, latLngBounds, map, marker, polygon, Icon, icon } from 'leaflet';
import { Game } from 'src/app/models/game.model';
import { Kill } from 'src/app/models/kill.model';
import { Mission } from 'src/app/models/mission.model';
import { Player } from 'src/app/models/player.model';
import { SquadCheckIn } from 'src/app/models/squad-check-in.model';
import { SquadMemberWithName } from 'src/app/models/squad-member.model';
import { User } from 'src/app/models/user.model';
import { GameService } from 'src/app/services/game.service';
import { KillService } from 'src/app/services/kill.service';
import { MissionService } from 'src/app/services/mission.service';
import { PlayerService } from 'src/app/services/player.service';
import { SquadService } from 'src/app/services/squad.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  //Variables
  private _game: Game;
  private _kills: Kill[] = [];
  private _missions: Mission[] = [];
  private _squadCheckIns: SquadCheckIn[] = [];
  mapReady: boolean = false;
  options = {};
  layers: any= []

  // Define icons
  gravestoneIcon = {
    icon: icon({
      iconSize:     [38, 38],
      iconAnchor:  [19, 38],
      popupAnchor:  [0, -39],
      iconUrl: '../../assets/images/gravestone.png',
   })
  };

  missionIcon = {
    icon: icon({
      iconSize:     [38, 38],
      iconAnchor:  [19, 38],
      popupAnchor:  [0, -39],
      iconUrl: '../../assets/images/mission.png',
   })
  };

  pingIcon = {
    icon: icon({
      iconSize:     [38, 38],
      iconAnchor:  [19, 38],
      popupAnchor:  [0, -39],
      iconUrl: '../../assets/images/location.png',
   })
  };

  // Constructor with dependency injection
  constructor(
    private readonly killService: KillService,
    private readonly gameService: GameService,
    private readonly userService: UserService,
    private readonly missionService: MissionService,
    private readonly squadService: SquadService,
    private readonly playerService: PlayerService){
  }

  /**
   * Function that runs on the initialization of the map component. Updates the players in the game, sets the private game variable to the current game and initializes the map.
   */
  async ngOnInit(){
    this.playerService.getPlayersFromGame();
    this._game = this.gameService.game;
    if(this.hasCoordinates()){
      await this.mapInit();
    }
  }

  /**
   * Function to update the map. Gets the kills, missions and squad check ins by calling function in the services and sets markers for each event in the map.
   */
  async updateMap() {
    await this.killService.getKills();
    await this.missionService.getMissions();
    if(this.squadService.squadMember){
      this.squadService.getSquadMembers(this.gameService.game.id, this.squadService.squadMember.squadId)
      await this.squadService.getSquadCheckIns();
    }
    this._kills = this.killService.kills;
    this._squadCheckIns = this.squadService.squadCheckIns;
    this._missions = this.missionService.missions;
    this.layers = this.layers.splice(0, 1);
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
      if(this.playerService.player.isHuman === mission.isHumanVisible){
        this.layers.push(
          marker([mission.lat, mission.lng], this.missionIcon)
          .bindPopup(`
          <b>${mission.name}:</b><br>
          ${mission.description}<br>
          Start time: ${new Date(mission.startTime).toLocaleString("en-GB")}<br>
          End time: ${new Date(mission.endTime).toLocaleString("en-GB")}
          `)
          .openPopup()
        );
      }
    }
    for(let checkIn of this._squadCheckIns){
      let squadMemberName: string = this.squadService.squadMembersWithName.filter(
        (squadMember: SquadMemberWithName) => squadMember.squadMember.id === checkIn.squadMemberId).pop().username;
      this.layers.push(
        marker([checkIn.lat, checkIn.lng], this.pingIcon)
        .bindPopup(`
        <b>Check in: ${squadMemberName}:</b><br>
        Start time: ${new Date(checkIn.startTime).toLocaleString("en-GB")}<br>
        End time: ${new Date(checkIn.endTime).toLocaleString("en-GB")}
        `)
        .openPopup()
      );
    }
  }
  /**
   * Function to check if the current game has coordinates.
   * @returns {boolean}
   */
  hasCoordinates(): boolean{
    if(!this._game || !this._game.nw_Lat || !this._game.nw_Lng || !this._game.se_Lat || !this._game.se_Lng ){
          return false;
        }
    return true;
  }

  /**
   * Function to initialize the map. Sets the map area to the current games coordinates and makes the outside area red.
   */
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
    this.mapReady = true;
    this.updateMap();
  }
}
