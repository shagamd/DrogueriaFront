import { Component, EventEmitter, Output } from '@angular/core';
import { PuntoVenta } from 'src/app/classes/puntoVenta';
import { PuntoVentaService } from 'src/app/services/punto-venta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestionar-puntoventa',
  templateUrl: './gestionar-puntoventa.component.html',
  styleUrls: ['./gestionar-puntoventa.component.scss']
})
export class GestionarPuntoventaComponent {
  @Output("recargarDatos") recargarDatosEvent = new EventEmitter();
  modalVisible: boolean = false;

  puntoVentaGestion: PuntoVenta = new PuntoVenta();

  constructor(private puntoVentaService: PuntoVentaService) { }

  ngOnInit(): void { }

  gestionarPuntoVenta(puntoVenta: PuntoVenta) {
    this.puntoVentaGestion = puntoVenta;
    this.modalVisible = true;
  }

  guardarDatos(): void {
    this.puntoVentaService.administrarPuntoVenta(this.puntoVentaGestion).subscribe(res => {
      Swal.fire("", res.mensaje);
      this.cerrarModal();
    })
  }

  cerrarModal(): void {
    this.puntoVentaGestion = new PuntoVenta();
    this.modalVisible = false;
    this.recargarDatosEvent.emit();
  }
}
