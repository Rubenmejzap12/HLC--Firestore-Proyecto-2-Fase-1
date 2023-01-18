import { Component } from '@angular/core';
import { Aeropuerto } from '../tarea';

import { FirestoreService } from '../firestore.service';
import {Router} from '@angular/router';


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
  constructor(private firestoreService: FirestoreService, private router: Router) {
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
  idAeropuertoSelec: string;

  selecAeropuerto(aeropuertoSelec) {
    console.log("Aeropuerto seleccionada: ");
    console.log(aeropuertoSelec);
    this.idAeropuertoSelec = aeropuertoSelec.id;
    this.aeropuertoEditando.nombre = aeropuertoSelec.data.nombre;
    this.aeropuertoEditando.continente = aeropuertoSelec.data.continente;
    this.router.navigate(['/detalle', this.idAeropuertoSelec]);
  }

  clicBotonBorrar() {
    this.firestoreService.borrar("aeropuertos", this.idAeropuertoSelec).then(() => {
      // Actualizar la lista completa
      this.obtenerListaAeropuertos();
      // Limpiar datos de pantalla
      this.aeropuertoEditando = {} as Aeropuerto;
    })
  }

  clicBotonModificar() {
    this.firestoreService.actualizar("aeropuertos", this.idAeropuertoSelec, this.aeropuertoEditando).then(() => {
      // Actualizar la lista completa
      this.obtenerListaAeropuertos();
      // Limpiar datos de pantalla
      this.aeropuertoEditando = {} as Aeropuerto;
    })
  }
}
