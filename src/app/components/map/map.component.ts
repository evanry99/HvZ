import { Component } from '@angular/core';
import { latLng, tileLayer, LatLngBounds, latLngBounds, map, marker, polygon, Icon, icon } from 'leaflet';
import { Game } from 'src/app/models/game.model';
import { Kill } from 'src/app/models/kill.model';
import { GameService } from 'src/app/services/game.service';
import { KillService } from 'src/app/services/kill.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  private _game: Game;

  private _kills: Kill[] = [];

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

  constructor(
    private readonly killService: KillService,
    private readonly gameService: GameService){
  }

  async ngOnInit(){
    await this.killService.getKills();
    this._game = this.gameService.game;
    this._kills = this.killService.kills;
    if(this.hasCoordinates()){
      this.mapInit();
    }
  }

  updateKills(){
    //temp
    this.layers.push(
      marker([20, 20], this.gravestoneIcon)
      .bindPopup("Ola Normann, 12.12.2012")
      .openPopup()
    );
  }

  hasCoordinates(): boolean{
    if(!this._game || !this._game.nw_Lat || !this._game.nw_Lng || !this._game.se_Lat || !this._game.se_Lng ){
          return false;
        }
    return true;
  }

  mapInit(){
    this.options = {
      layers: [
          tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
            maxZoom: 19, 
            minZoom: 6, 
            attribution: '...' 
          })
      ],
      zoom: 5,
      center: latLng(
        (this._game.nw_Lat + this._game.se_Lat)/2,
        (this._game.nw_Lng + this._game.se_Lng)/2),
      maxBounds: latLngBounds(latLng(this._game.nw_Lat, this._game.nw_Lng), latLng(this._game.se_Lat, this._game.se_Lng))
    };

    this.layers.push(
      polygon([
        [[90, -180], [90, 180], [-90, 180], [-90, -180]],
        [[ this._game.nw_Lat, this._game.nw_Lng ], [ this._game.nw_Lat, this._game.se_Lng ], [ this._game.se_Lat, this._game.se_Lng ], [ this._game.se_Lat, this._game.nw_Lng ]]
      ]).setStyle({color: '#FF0000'}),
    );

    for(let kill of this._kills){
      console.log(kill)
      this.layers.push(
        marker([kill.lat, kill.lng], this.gravestoneIcon)
        .bindPopup(`${kill.victimId}, ${kill.story}, ${kill.timeOfDeath}`)
        .openPopup()
      );
    }
    this.mapReady = true;
  }
}
