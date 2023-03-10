import { Component } from '@angular/core';
import { latLng, tileLayer, LatLngBounds, latLngBounds, map, marker, polygon, Icon, icon } from 'leaflet';
import { Gravestone } from 'src/app/models/gravestone.model';
import { Map } from 'src/app/models/map.model';
import { GameService } from 'src/app/services/game.service';
import { KillService } from 'src/app/services/kill.service';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  private _map: Map = {
    nw_lat: 0,
    nw_lng: 0,
    se_lat: 0,
    se_lng: 0
  };

  constructor(private readonly mapService: MapService, private readonly killService: KillService){
  }

  options = {};

  layers: any= []

  gravestoneIcon = {
    icon: icon({
      iconSize:     [38, 38],
      iconUrl: '../../assets/images/gravestone.png',
   })
  };

  ngOnInit(){
    //this._map = this.mapService.map;
    //temp
    this._map = {
      nw_lat : -43.11,//game.nw_lat,
      nw_lng : 5.25,//game.nw_lng,
      se_lat : 45,
      se_lng : 50
    }
    this.mapInit();
  }

  mapInit(){
    const gravestones: Gravestone[] = this.killService.getGravestones();
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
        (this._map.nw_lat + this._map.se_lat)/2,
        (this._map.nw_lng + this._map.se_lng)/2),
      maxBounds: latLngBounds(latLng(this._map.nw_lat, this._map.nw_lng), latLng(this._map.se_lat, this._map.se_lng))
    };

    this.layers.push(
      polygon([
        [[90, -180], [90, 180], [-90, 180], [-90, -180]],
        [[ this._map.nw_lat, this._map.nw_lng ], [ this._map.nw_lat, this._map.se_lng ], [ this._map.se_lat, this._map.se_lng ], [ this._map.se_lat, this._map.nw_lng ]]
      ]),
    );

    console.log(gravestones)
    for(let gravestone of gravestones){
      console.log(gravestone)
      this.layers.push(
        marker([gravestone.lat, gravestone.lng], this.gravestoneIcon)
      );
    }


  }

}
