import { Component } from '@angular/core';
import { Aeropuerto } from '../tarea';

import { FirestoreService } from '../firestore.service';
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
  constructor(private firestoreService: FirestoreService) {
    // Crear una tarea vacia al empezar
    this.aeropuertoEditando = {} as Aeropuerto;

    this.obtenerListaAeropuertos();
  }

  clickBotonInsertar(){
    this.firestoreService.insertar("aeropuertos",this.aeropuertoEditando)
    .then(()=>{
      console.log("Tarea creada correctamente");
      this.aeropuertoEditando = {} as Aeropuerto;
    },(error) =>{
      console.error(error)
    });
  }

  obtenerListaAeropuertos(){
    this.firestoreService.consultar("aeropuertos").subscribe((resultadoConsultaAeropuertos) => {
      this.arrayColeccionAeropuertos = [];
      resultadoConsultaAeropuertos.forEach((datosAeropuertos: any) => {
        this.arrayColeccionAeropuertos.push({
          id: datosAeropuertos.payload.doc.id,
          data: datosAeropuertos.payload.doc.data()
        })
      })
    }
    )
  }
}
