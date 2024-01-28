import { GrupoImpuesto } from './../../../classes/grupoImpuestos';
import { ImpuestosService } from './../../../services/impuestos.service';
import { Impuesto } from './../../../classes/impuesto';
import { Component, ViewChild } from '@angular/core';
import { GestionarImpuestosComponent } from './gestionar-impuestos/gestionar-impuestos.component';
import Swal from 'sweetalert2';
import { GestionarGrupoImpuestosComponent } from './gestionar-grupo-impuestos/gestionar-grupo-impuestos.component';

@Component({
  selector: 'app-administrar-impuestos',
  templateUrl: './administrar-impuestos.component.html',
  styleUrls: ['./administrar-impuestos.component.scss']
})
export class AdministrarImpuestosComponent {
  @ViewChild('gestionImpuestos') gestionImpuestoChild: GestionarImpuestosComponent;
  @ViewChild('gesionGrupoImpuestos') gesionGrupoImpuestosChild: GestionarGrupoImpuestosComponent;
  arImpuestos: Impuesto[] = [];
  arGrupoImpuestos: GrupoImpuesto[] = [];

  constructor(private impuestosService: ImpuestosService) {}

  ngOnInit(): void {
    this.listarImpuestos();
    this.listarGrupoImpuestos();
  }

  //Impuestos
  listarImpuestos(): void {
    this.impuestosService.listarImpuestos().subscribe((x) => (this.arImpuestos = x));
  }

  crearImpuesto(impuesto: Impuesto = new Impuesto()) {
    this.gestionImpuestoChild.gestionarImpuesto(impuesto);
  }

  editarImpuesto(impuesto: Impuesto): void {
    this.gestionImpuestoChild.gestionarImpuesto(impuesto);
  }

  eliminarImpuesto(impuesto: Impuesto): void {
    Swal.fire({ html: 'Seguro de eliminar el impuesto: <b>' + impuesto.nombre + '</b>?', showCancelButton: true, icon: 'warning' }).then((result) => {
      if (result.isConfirmed) {
        this.impuestosService.eliminarImpuesto(impuesto).subscribe((res) => Swal.fire('', res.mensaje).then((x) => this.listarImpuestos()));
      }
    });
  }
  //Fin Impuestos

  //Grupo Impuestos
  listarGrupoImpuestos(): void {
    this.impuestosService.listarGrupoImpuestos().subscribe((x) => (this.arGrupoImpuestos = x));
  }

  crearGrupoImpuesto(grupoImpuesto: GrupoImpuesto = new GrupoImpuesto()) {
    this.gesionGrupoImpuestosChild.gestionarGrupoImpuesto(grupoImpuesto);
  }

  editarGrupoImpuesto(grupoImpuesto: GrupoImpuesto): void {
    this.gesionGrupoImpuestosChild.gestionarGrupoImpuesto(grupoImpuesto);
  }

  eliminarGrupoImpuesto(grupoImpuesto: GrupoImpuesto): void {
    Swal.fire({ html: 'Seguro de eliminar el grupo de impuestos: <b>' + grupoImpuesto.nombre + '</b>?', showCancelButton: true, icon: 'warning' }).then((result) => {
      if (result.isConfirmed) {
        this.impuestosService.eliminarGrupoImpuesto(grupoImpuesto).subscribe((res) => Swal.fire('', res.mensaje).then((x) => this.listarGrupoImpuestos()));
      }
    });
  }
  //Fin Grupo Impuestos
}
