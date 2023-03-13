import { Injectable } from '@angular/core';
import { Gravestone } from '../models/gravestone.model';

@Injectable({
  providedIn: 'root'
})
export class KillService {

  constructor() { }

  getGravestones(): Gravestone[] {
    //temp
    const gravestones: Gravestone[] = [];
    gravestones.push({
      lat: 40,
      lng: 40
    })
    gravestones.push({
      lat: 30,
      lng: 41
    })
    return gravestones;
  }

}
