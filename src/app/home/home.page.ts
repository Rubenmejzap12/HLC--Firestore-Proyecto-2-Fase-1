import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Aeropuerto } from '../aeropuerto';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  idAeropuertoSelec: string;
  aeropuertoEditando: Aeropuerto;
  arrayColeccionAeropuertos: any = [{
    id: "",
    data: {} as Aeropuerto
  }];

  constructor(private firestoreService: FirestoreService, private router: Router) {
    // Crear un aeropuerto vacio al empezar
    this.aeropuertoEditando = {} as Aeropuerto;

    this.obtenerListaAeropuertos();
  }

  clickBotonInsertar() {
    this.router.navigate(['/detalle', "nuevo"]);
  }

  obtenerListaAeropuertos() {
    this.firestoreService
      .consultar('aeropuertos')
      .subscribe((resultadoConsultaAeropuertos) => {
        this.arrayColeccionAeropuertos = [];
        resultadoConsultaAeropuertos.forEach((datosAeropuerto: any) => {
          this.arrayColeccionAeropuertos.push({
            id: datosAeropuerto.payload.doc.id,
            data: datosAeropuerto.payload.doc.data()
          });
        });
      });
  }


  selecAeropuerto(AeropuertoSelec) {
    console.log("Aeropuerto seleccionado: ");
    console.log(AeropuertoSelec);
    this.idAeropuertoSelec = AeropuertoSelec.id;
    this.aeropuertoEditando.nombre = AeropuertoSelec.data.nombre;
    this.aeropuertoEditando.continente = AeropuertoSelec.data.continente;
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