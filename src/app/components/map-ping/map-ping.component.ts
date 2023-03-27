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

  //Variables
  private _game: Game;
  private _map: Map;
  _lat: number;
  _lng: number;
  clicked: boolean = false;
  hasMarker: boolean = false;
  ready: boolean = false;
  options = {};
  layers: any= [];
  marker: Marker;

  //Declare icons
  faLocationDot = faLocationDot;
  pingIcon = {
    icon: icon({
      iconSize:     [38, 38],
      iconAnchor:  [19, 38],
      popupAnchor:  [0, -39],
      iconUrl: '../../assets/images/location.png',
   })
  };


  //Constructor with dependency injection
  constructor(
    private readonly gameService: GameService,
    private readonly squadService: SquadService
    ){}

  //Function that runs on the initialization of the component. Sets the private game variable to the current game and checks if the game has coordinates. If it has, the map initialization function is called.
  ngOnInit(){
    this._game = this.gameService.game;
    if(this.hasCoordinates()){
      this._lat = (this._game.nw_Lat + this._game.se_Lat)/2;
      this._lng = (this._game.nw_Lng + this._game.se_Lng)/2;
      this.mapInit();
    }
  }

  /**
   * Function to remove a marker from the map.
   */
  removeMarker(){
    if(this.hasMarker){
      this._map.removeLayer(this.marker);
    }
    this.hasMarker = false;
  }

  /**
   * Function that runs after the initialization is done. Calls the onMapClick function to handle user events on the map.
   * @param map
   */
  onMapReady(map: Map) {
    setTimeout(() => {
      map.invalidateSize();
    }, 1000);
    this.onMapClick(map);
    this._map = map;
  }

  /**
   * Function to change the state of the map when it is clicked.
   */
  isClicked(){
    this.clicked = true;
  }

  /**
   * Function to handle the user events on the map when a user clicks and drags on the map.
   * @param map 
   */
  onMapClick(map: Map) {
    map.on('click', e => {
      if(this.hasMarker){
        this.removeMarker();
      }
      let m = marker(e.latlng, {
        icon: this.pingIcon.icon
      })
      m.addTo(map);
      this.marker = m;
      this.hasMarker = true;
      this._lat = e.latlng.lat;
      this._lng = e.latlng.lng;
    })
  }

  /**
   * Function too check if the current game has coordinates.
   * @returns {boolean}
   */
  hasCoordinates(): boolean{
    if(!this._game || !this._game.nw_Lat || !this._game.nw_Lng || !this._game.se_Lat || !this._game.se_Lng ){
          return false;
        }
    return true;
  }

  /**
   * Function to handle the initialization of the map. Sets the map area to the current games coordinates and makes the area outside the game area red.
   */
  mapInit(){
    let m = marker([this._lat, this._lng], {
      icon: this.pingIcon.icon
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

  /**
   *   Function to handle the check in form submit. Creates a new SquadCheckIn object and sends it to the squadService where the API POST request is handled.
   */
  checkIn(form: NgForm){
    let value = form.value;
    let checkIn: SquadCheckIn = {
      lat: this._lat,
      lng: this._lng,
      startTime: value.startTime,
      endTime: value.endTime,
      squadId: this.squadService.squadMember.squadId,
      gameId: this.gameService.game.id,
      squadMemberId: this.squadService.squadMember.id
    }
    this.squadService.createSquadCheckIn(checkIn);
  }

  /**
   * Function to get the users position on button click. Then sets a marker on the map with the coordinates of the users position.
   */
  getPosition(){
    console.log(2)
    navigator.geolocation.getCurrentPosition(result=> {
      this._lat = result.coords.latitude
      this._lng = result.coords.longitude
      if(this.hasMarker){
        this.removeMarker();
      }
      let m = marker([this._lat, this._lng], {
        icon: this.pingIcon.icon
      })
      m.addTo(this._map);
      this.marker = m;
      this.hasMarker = true;
    })
  }
}
