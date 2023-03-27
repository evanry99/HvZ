import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { marker, tileLayer, latLng, polygon, Map, Marker, icon } from 'leaflet';
import { Game } from 'src/app/models/game.model';
import { Mission } from 'src/app/models/mission.model';
import { GameService } from 'src/app/services/game.service';
import { MissionService } from 'src/app/services/mission.service';

@Component({
  selector: 'app-create-mission',
  templateUrl: './create-mission.component.html',
  styleUrls: ['./create-mission.component.css']
})
export class CreateMissionComponent {

  private _game: Game;
  private _map: Map;
  _lat: number;
  _lng: number;


  clicked: boolean = false;
  hasMarker: boolean = false;
  options = {};
  layers: any= [];
  marker: Marker;

  missionIcon = {
    icon: icon({
      iconSize:     [38, 38],
      iconAnchor:  [19, 38],
      popupAnchor:  [0, -39],
      iconUrl: '../../assets/images/mission.png',
   })
  };

  constructor(
    private readonly missionService: MissionService,
    private readonly gameService: GameService,
  ){}

  ngOnInit(){
    this._game = this.gameService.game;
    this.mapInit();
  }

  removeMarker(){
    this._map.removeLayer(this.marker);
    this.hasMarker = false;
  }

  onMapReady(map: Map) {
    setTimeout(() => {
      map.invalidateSize();
    }, 1000);
    this.onMapClick(map);
    this._map = map;
  }

  isClicked(){
    this.clicked = true;
  }

  onMapClick(map: Map) {
    map.on('click', e => {
      if(this.hasMarker){
        this.removeMarker();
      }
      let m = marker(e.latlng, {
        autoPan: true,
        icon: this.missionIcon.icon
      })
      m.addTo(map);
      this.marker = m;
      this.hasMarker = true;
      this._lat = e.latlng.lat;
      this._lng = e.latlng.lng;
    })
  }

  mapInit(){
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
        (this._game.nw_Lng + this._game.se_Lng)/2)
    };
    this.layers.push(
      polygon([
        [[90, -180], [90, 180], [-90, 180], [-90, -180]],
        [[ this._game.nw_Lat, this._game.nw_Lng ], [ this._game.nw_Lat, this._game.se_Lng ], [ this._game.se_Lat, this._game.se_Lng ], [ this._game.se_Lat, this._game.nw_Lng ]]
      ]).setStyle({color: '#FF0000'}),
    );
  }

  async onSubmit(form:NgForm){
    let value = form.value;
    let mission: Mission = {
      name: value.missionName,
      description: value.description,
      isHumanVisible: false,
      isZombieVisible: false,
      lat: this._lat,
      lng: this._lng,
      startTime: value.startTime,
      endTime: value.endTime,
    } 
    await this.missionService.registerMission(mission);
    form.resetForm();
    this.removeMarker();
  }

}
