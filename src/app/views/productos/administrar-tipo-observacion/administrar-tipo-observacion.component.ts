import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoObservacion } from 'src/app/classes/tipoObservacion';
import { TipoObservacionService } from 'src/app/services/tipo-observacion.service';
import Swal from 'sweetalert2';
import { GestionarTipoObservacionComponent } from './gestionar-tipo-observacion/gestionar-tipo-observacion.component';

@Component({
  selector: 'app-administrar-tipo-observacion',
  templateUrl: './administrar-tipo-observacion.component.html',
  styleUrls: ['./administrar-tipo-observacion.component.scss'],
})
export class AdministrarTipoObservacionComponent implements OnInit {
  @ViewChild('gestionTipoObservacion') gestionTipoObservacionChild: GestionarTipoObservacionComponent;
  arTiposObservacion: TipoObservacion[] = [];

  constructor(private tipoObservacionService: TipoObservacionService) {}

  ngOnInit(): void {
    this.listarTipoObservaciones();
  }

  listarTipoObservaciones(): void {
    this.tipoObservacionService.listarTipoObservacion().subscribe((x) => (this.arTiposObservacion = x));
  }

  crearTipoObservacion(tipoObservacion: TipoObservacion = new TipoObservacion()) {
    this.gestionTipoObservacionChild.gestionarTipoObservacion(tipoObservacion);
  }

  editarTipoObservacion(tipoObservacion: TipoObservacion): void {
    this.gestionTipoObservacionChild.gestionarTipoObservacion(tipoObservacion);
  }

  eliminarTipoObservacion(tipoObservacion: TipoObservacion): void {
    Swal.fire({ html: 'Seguro de eliminar el Tipo Observación: <b>' + tipoObservacion.nombre + '</b>?', showCancelButton: true, icon: 'warning' }).then((result) => {
      if (result.isConfirmed) {
        this.tipoObservacionService.eliminarTipoObservacion(tipoObservacion).subscribe((res) => Swal.fire('', res.mensaje).then((x) => this.listarTipoObservaciones()));
      }
    });
  }
}
