import { Component } from '@angular/core';
import { latLng, tileLayer, LatLngBounds, latLngBounds } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  options = {
    layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '...' })
    ],
    zoom: 5,
    center: latLng(10, 10),
    maxBounds: latLngBounds(latLng(0, 0), latLng(20, 20))
};

  ngAfterViewInit(): void{
    this.initMap();
  }

  private initMap(): void {

  }

}
