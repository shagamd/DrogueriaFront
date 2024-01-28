import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TipoObservacion } from 'src/app/classes/tipoObservacion';
import { TipoObservacionService } from 'src/app/services/tipo-observacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestionar-tipo-observacion',
  templateUrl: './gestionar-tipo-observacion.component.html',
  styleUrls: ['./gestionar-tipo-observacion.component.scss']
})
export class GestionarTipoObservacionComponent implements OnInit {
  @Output("recargarDatos") recargarDatosEvent = new EventEmitter();
  modalVisible: boolean = false;

  tipoObservacionGestion: TipoObservacion = new TipoObservacion();

  constructor(private tipoObservacionService: TipoObservacionService) {}

  ngOnInit(): void {}

  gestionarTipoObservacion(tipoObservacion: TipoObservacion) {
    this.tipoObservacionGestion = tipoObservacion;
    this.modalVisible = true;
  }

  guardarDatos(): void {
    this.tipoObservacionService.administrarTipoObservacion(this.tipoObservacionGestion).subscribe(res => {
      Swal.fire("",res.mensaje);
      this.cerrarModal();
    })
  }

  cerrarModal(): void {
    this.tipoObservacionGestion = new TipoObservacion();
    this.modalVisible = false;
    this.recargarDatosEvent.emit();
  }
}
