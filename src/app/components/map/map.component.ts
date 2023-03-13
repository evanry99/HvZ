import { Component } from '@angular/core';
import { latLng, tileLayer, LatLngBounds, latLngBounds, map, marker, polygon } from 'leaflet';
import { Map } from 'src/app/models/map.model';
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

  constructor(private readonly mapService: MapService){
  }

  options = {};

  layers: any= []

  ngOnInit(){
    this._map = this.mapService.map;
    this.mapInit();
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
  }

}
