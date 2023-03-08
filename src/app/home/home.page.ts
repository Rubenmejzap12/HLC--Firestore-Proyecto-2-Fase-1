import { Component } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Aeropuerto } from '../aeropuerto';
import { Router } from '@angular/router';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  aeropuertoEditando: Aeropuerto;
  arrayColeccionAeropuertos: any = [{

    id: "",
    data: {} as Aeropuerto

  }];
  idAeropuertoSelec: string;

  map: L.Map;
  newMarker:any;
  address:string[];

  constructor(private firestoreService: FirestoreService, private router: Router, 
     private callNumber: CallNumber
    ) {

    this.aeropuertoEditando = {} as Aeropuerto;
    this.obtenerListaAeropuertos();

  }

  clickBotonInsertar(){
    this.firestoreService.insertar("aeropuertos", this.aeropuertoEditando).then(
      () => { 
        console.log("Aeropuerto creada correctamente");
        //Limpiamos el contenido de la aeropuerto que se estaba editando
        this.aeropuertoEditando = {} as Aeropuerto
      }, (error) => {
        console.log(error);
      }
    );
  }

  obtenerListaAeropuertos(){
    this.firestoreService.consultar("aeropuertos").subscribe((resultadoConsultaAeropuertos) => {
      this.arrayColeccionAeropuertos = [];
      resultadoConsultaAeropuertos.forEach((datosAeropuerto: any) =>
      {
        this.arrayColeccionAeropuertos.push({
          id: datosAeropuerto.payload.doc.id,
          data: datosAeropuerto.payload.doc.data()
        })
      })
    })
  }

  selecAeropuerto(aeropuertoSelec) {
    console.log("Aeropuerto seleccionada: ");
    
    if (aeropuertoSelec == false){
      console.log("nueva");
      this.router.navigate(['/detalle', "nueva"]);
    } else{
      console.log(aeropuertoSelec);
      this.idAeropuertoSelec = aeropuertoSelec.id;
      this.aeropuertoEditando.nombre = aeropuertoSelec.data.Nombre;
      this.aeropuertoEditando.continente = aeropuertoSelec.data.Continente;
      this.router.navigate(['/detalle', this.idAeropuertoSelec]);
    }
    
  }

  llamar(){

       this.callNumber.callNumber("658745236", true)
       .then(res => console.log('Llamada realizada', res))
       .catch(err => console.log('Error en realizar la llamada', err));

  }

  ionViewDidEnter(){
    this.loadMap();
  }

  loadMap() {
    let latitud = 40.4736600;
    let longitud = -3.5777700;
    let zoom = 17;
    this.map = L.map("mapId").setView([latitud, longitud], zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
        .addTo(this.map);
  }

}
