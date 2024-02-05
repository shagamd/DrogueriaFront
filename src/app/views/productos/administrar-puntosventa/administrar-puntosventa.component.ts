import { PuntoVentaService } from './../../../services/punto-venta.service';
import { PuntoVenta } from './../../../classes/puntoVenta';
import { Component, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { GestionarPuntoventaComponent } from './gestionar-puntoventa/gestionar-puntoventa.component';

@Component({
  selector: 'app-administrar-puntosventa',
  templateUrl: './administrar-puntosventa.component.html',
  styleUrls: ['./administrar-puntosventa.component.scss']
})
export class AdministrarPuntosventaComponent {
  @ViewChild('gestionPuntoVenta') gestionPuntoVentaChild: GestionarPuntoventaComponent;
  arPuntosVenta: PuntoVenta[] = [];

  constructor(private puntoVentaService: PuntoVentaService) {}

  ngOnInit(): void {
    this.listarPuntosVenta();
  }

  listarPuntosVenta(): void {
    this.puntoVentaService.listarPuntosVenta().subscribe((x) => (this.arPuntosVenta = x));
  }

  crearPuntoVenta(puntoVenta: PuntoVenta = new PuntoVenta()) {
    this.gestionPuntoVentaChild.gestionarPuntoVenta(puntoVenta);
  }

  editaPuntoVenta(puntoVenta: PuntoVenta): void {
    this.gestionPuntoVentaChild.gestionarPuntoVenta(puntoVenta);
  }

  eliminarPuntoVenta(puntoVenta: PuntoVenta): void {
    Swal.fire({ html: 'Seguro de eliminar el laboratorio: <b>' + puntoVenta.nombre + '</b>?', showCancelButton: true, icon: 'warning' }).then((result) => {
      if (result.isConfirmed) {
        this.puntoVentaService.eliminarPuntoVenta(puntoVenta).subscribe((res) => Swal.fire('', res.mensaje).then((x) => this.listarPuntosVenta()));
      }
    });
  }
}
