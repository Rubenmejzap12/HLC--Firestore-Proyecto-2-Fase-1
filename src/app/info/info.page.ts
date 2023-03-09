import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage {

  map: L.Map;
  ewMarker:any;
  address:string[];


  constructor() { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.loadMap();
  }

  loadMap() {
    let marker;
    let latitud = 40.4736600;
    let longitud = -3.5777700;
    let zoom = 10;
    this.map = L.map("mapId").setView([latitud, longitud], zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
        .addTo(this.map);

    marker = L.marker([latitud, longitud]).addTo(this.map);
    L.marker([40.4736600, -3.5777700]).addTo(this.map).bindPopup('Aeropuerto Madrid Barajas').openPopup();
  }
}
