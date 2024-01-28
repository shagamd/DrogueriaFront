import { Component, EventEmitter, Output } from '@angular/core';
import { Impuesto } from 'src/app/classes/impuesto';
import { ImpuestosService } from 'src/app/services/impuestos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestionar-impuestos',
  templateUrl: './gestionar-impuestos.component.html',
  styleUrls: ['./gestionar-impuestos.component.scss']
})
export class GestionarImpuestosComponent {
  @Output("recargarDatos") recargarDatosEvent = new EventEmitter();
  modalVisible: boolean = false;

  impuestoGestion: Impuesto = new Impuesto();

  constructor(private impuestoService: ImpuestosService) {}

  ngOnInit(): void {}

  gestionarImpuesto(impuesto: Impuesto) {
    this.impuestoGestion = impuesto;
    this.modalVisible = true;
  }

  guardarDatos(): void {
    this.impuestoService.administrarImpuesto(this.impuestoGestion).subscribe(res => {
      Swal.fire("",res.mensaje);
      this.cerrarModal();
    })
  }

  cerrarModal(): void {
    this.impuestoGestion = new Impuesto();
    this.modalVisible = false;
    this.recargarDatosEvent.emit();
  }
}
