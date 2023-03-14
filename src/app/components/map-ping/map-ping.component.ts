import { Component } from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import { MapModel } from 'src/app/models/map.model';
import { latLng, latLngBounds, marker, polygon, tileLayer, Map } from 'leaflet';

@Component({
  selector: 'app-map-ping',
  templateUrl: './map-ping.component.html',
  styleUrls: ['./map-ping.component.css']
})
export class MapPingComponent {

    private _map: MapModel = {
      nw_lat: 0,
      nw_lng: 0,
      se_lat: 0,
      se_lng: 0
    };

    clicked: boolean = false;

    private _lMap: Map;
  
    constructor(private readonly mapService: MapService){
    }
  
    options = {};
  
    layers: any= []
  
    ngOnInit(){
      //this._map = this.mapService.map;
      //temp
      this._map = {
        nw_lat : -43.11,
        nw_lng : 5.25,
        se_lat : 45,
        se_lng : 50
      }
      this.mapInit();
    }

    onMapReady(map: Map) {
      setTimeout(() => {
        map.invalidateSize();
      }, 1000);
  }

  isClicked(){
    this.clicked = true;
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
        maxBounds: latLngBounds(latLng(this._map.nw_lat, this._map.nw_lng), latLng(this._map.se_lat, this._map.se_lng)),
      };
    }
}
