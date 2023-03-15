import { Component } from '@angular/core';
import { latLng, latLngBounds, marker, polygon, tileLayer, Map, icon, Marker } from 'leaflet';
import { Game } from 'src/app/models/game.model';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-map-ping',
  templateUrl: './map-ping.component.html',
  styleUrls: ['./map-ping.component.css']
})
export class MapPingComponent {

  private _game: Game;
  private _map: Map;

  clicked: boolean = false;
  hasMarker: boolean = false;
  options = {};
  layers: any= [];
  marker: Marker;

  flagIcon = {
    icon: icon({
      iconSize:     [38, 38],
      iconAnchor:  [19, 38],
      popupAnchor:  [0, -39],
      iconUrl: '../../assets/images/flag.png',
   })
  };

  constructor(private readonly gameService: GameService){
  }

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
      if(!this.hasMarker){
        let m = marker(e.latlng, {
          draggable: true,
          autoPan: true,
          icon: this.flagIcon.icon
        })
        m.addTo(map);
        this.marker = m;
        this.hasMarker = true;
      }
    })
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
      maxBounds: latLngBounds(latLng(this._game.nw_Lat, this._game.nw_Lng), latLng(this._game.se_Lat, this._game.se_Lng)),
    };
  }
}
