import { Component } from '@angular/core';
import { latLng, latLngBounds, marker, polygon, tileLayer, Map, icon, Marker } from 'leaflet';
import { Game } from 'src/app/models/game.model';
import { GameService } from 'src/app/services/game.service';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { SquadCheckIn } from 'src/app/models/squad-check-in.model';
import { SquadService } from 'src/app/services/squad.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-map-ping',
  templateUrl: './map-ping.component.html',
  styleUrls: ['./map-ping.component.css']
})
export class MapPingComponent {

  private _game: Game;
  private _map: Map;
  faLocationDot = faLocationDot
  _lat: number;
  _lng: number;

  clicked: boolean = false;
  hasMarker: boolean = false;
  ready: boolean = false;
  options = {};
  layers: any= [];
  marker: Marker;

  flagIcon = {
    icon: icon({
      iconSize:     [38, 38],
      iconAnchor:  [19, 38],
      popupAnchor:  [0, -39],
      iconUrl: '../../assets/images/location.png',
   })
  };

  constructor(
    private readonly gameService: GameService,
    private readonly squadService: SquadService
    ){}

  ngOnInit(){
    this._game = this.gameService.game;
    if(this.hasCoordinates()){
      this._lat = (this._game.nw_Lat + this._game.se_Lat)/2;
      this._lng = (this._game.nw_Lng + this._game.se_Lng)/2;
      this.mapInit();
    }
  }

  removeMarker(){
    if(this.hasMarker){
      this._map.removeLayer(this.marker);
    }
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
        icon: this.flagIcon.icon
      })
      m.addTo(map);
      this.marker = m;
      this.hasMarker = true;
      this._lat = e.latlng.lat;
      this._lng = e.latlng.lng;
    })
  }

  hasCoordinates(): boolean{
    if(!this._game || !this._game.nw_Lat || !this._game.nw_Lng || !this._game.se_Lat || !this._game.se_Lng ){
          return false;
        }
    return true;
  }

  mapInit(){
    let m = marker([this._lat, this._lng], {
      icon: this.flagIcon.icon
    })
    this.marker = m;
    this.hasMarker = true;
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
      m
    );
  }

  checkIn(form: NgForm){
    let checkIn: SquadCheckIn = {
      lat: this._lat,
      lng: this._lng,
      startTime: '',
      endTime: '',
      squadId: this.squadService.squadMember.squadId,
      gameId: this.gameService.game.id,
      squadMemberId: this.squadService.squadMember.id
    }
  }

  getPosition(){
    console.log(2)
    navigator.geolocation.getCurrentPosition(result=> {
      this._lat = result.coords.latitude
      this._lng = result.coords.longitude
      if(this.hasMarker){
        this.removeMarker();
      }
      let m = marker([this._lat, this._lng], {
        icon: this.flagIcon.icon
      })
      m.addTo(this._map);
      this.marker = m;
      this.hasMarker = true;
    })
  }
}
