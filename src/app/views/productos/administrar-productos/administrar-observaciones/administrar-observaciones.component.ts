import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ObservacionProducto } from 'src/app/classes/observacionProducto';
import { Producto } from 'src/app/classes/producto';
import { TipoObservacion } from 'src/app/classes/tipoObservacion';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrar-observaciones',
  templateUrl: './administrar-observaciones.component.html',
  styleUrls: ['./administrar-observaciones.component.scss'],
})
export class AdministrarObservacionesComponent implements OnInit {
  @Output('recargarDatos') recargarDatosEvent = new EventEmitter();
  modalVisible: boolean = false;

  arTipoObservacion: TipoObservacion[] = [];
  observacionProducto: ObservacionProducto = new ObservacionProducto();

  productoGestion: Producto = new Producto();

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.cargarTiposObservacion().subscribe((ar) => (this.arTipoObservacion = ar));
  }

  administrarObservacionesProducto(producto: Producto): void {
    this.observacionProducto = new ObservacionProducto();
    this.productoGestion = producto;
    this.modalVisible = true;
  }

  agregarObservacion(): void {
    this.productoGestion.arObservaciones.push(this.observacionProducto);
    this.observacionProducto = new ObservacionProducto();
  }

  cerrarModal(): void {
    this.observacionProducto = new ObservacionProducto();
    this.recargarDatosEvent.emit();
    this.modalVisible = false;
  }

  guardarDatos(): void {
    this.productoService.administrarProducto(this.productoGestion).subscribe((res) => {
      if (res.estado) {
        Swal.fire('', 'Observaciones registradas correctamente', 'success').then((btnRes) => {
          if (btnRes.isConfirmed) {
            this.cerrarModal();
          }
        });
      } else {
        Swal.fire('Error', res.mensaje, 'warning');
      }
    });
  }

  tipoObservacionYaVinculada(tipoObservacion: TipoObservacion): boolean {
    return this.productoGestion.arObservaciones.some((el) => el.tipoObservacion.id == tipoObservacion.id);
  }

  eliminarObservacion(observacionProducto: ObservacionProducto): void {}
}
