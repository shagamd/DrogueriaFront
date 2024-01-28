import { Component, EventEmitter, Output } from '@angular/core';
import { GrupoImpuesto } from 'src/app/classes/grupoImpuestos';
import { Impuesto } from 'src/app/classes/impuesto';
import { ImpuestosService } from 'src/app/services/impuestos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestionar-grupo-impuestos',
  templateUrl: './gestionar-grupo-impuestos.component.html',
  styleUrls: ['./gestionar-grupo-impuestos.component.scss']
})
export class GestionarGrupoImpuestosComponent {
  @Output("recargarDatos") recargarDatosEvent = new EventEmitter();
  modalVisible: boolean = false;

  grupoImpuestoGestion: GrupoImpuesto = new GrupoImpuesto();
  impuestoSeleccionado: Impuesto = undefined;

  arImpuestos: Impuesto[] = [];

  constructor(private impuestoService: ImpuestosService) { }

  ngOnInit(): void { }

  obtenerImpuestos() {
    this.impuestoService.listarImpuestos().subscribe(el => this.arImpuestos = el);
  }

  vincularImpuesto() {
    if (this.impuestoSeleccionado) {
      this.grupoImpuestoGestion.arImpuestos.push(this.impuestoSeleccionado);
    } else {
      Swal.fire("Error", "No has seleccionado ningun impuesto", "warning");
    }
  }

  impuestoEnGrupoImpuestos(impuesto: Impuesto): boolean {
    if (this.grupoImpuestoGestion?.arImpuestos) {
      return this.grupoImpuestoGestion.arImpuestos.some(el => el.id == impuesto.id);
    } else {
      return true;
    }
  }

  gestionarGrupoImpuesto(grupoImpuesto: GrupoImpuesto) {
    console.log("aca cae")
    this.obtenerImpuestos();
    this.grupoImpuestoGestion = grupoImpuesto;
    this.modalVisible = true;
  }

  guardarDatos(): void {
    this.impuestoService.administrarGrupoImpuesto(this.grupoImpuestoGestion).subscribe(res => {
      Swal.fire("", res.mensaje);
      this.cerrarModal();
    })
  }

  cerrarModal(): void {
    this.grupoImpuestoGestion = new GrupoImpuesto();
    this.modalVisible = false;
    this.recargarDatosEvent.emit();
  }
}
