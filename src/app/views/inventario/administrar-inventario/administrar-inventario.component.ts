import { InventarioService } from './../../../services/inventario.service';
import { Inventario } from './../../../classes/inventario';
import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { GestionarInventarioComponent } from './gestionar-inventario/gestionar-inventario.component';

@Component({
  selector: 'app-administrar-inventario',
  templateUrl: './administrar-inventario.component.html',
  styleUrls: ['./administrar-inventario.component.scss']
})
export class AdministrarInventarioComponent implements OnInit {

  @ViewChild('gestionInventario') gestionInventarioChild: GestionarInventarioComponent;

  palabraBusqueda: string = '';
  vigentes: boolean = undefined;

  currentPage = 1;
  totalPages = 0;

  arInventario: Inventario[] = [];

  constructor(public inventarioService: InventarioService) { }

  ngOnInit(): void {
    this.listarInventario();
  }

  pressEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onPageChange(1)
    }
  }

  listarInventario(pagina: number = 0): void {
    this.inventarioService.listarInventario(this.palabraBusqueda, this.vigentes, pagina).subscribe((response) => {
      this.arInventario = response.arDatos;
      this.totalPages = response.totalPaginas;
    });
  }

  administrarInventario(inventario: Inventario = new Inventario()): void {
    this.gestionInventarioChild.gestionarInventario(inventario);
  }

  eliminarInventario(inventario: Inventario): void {
    Swal.fire({ html: 'Seguro de eliminar el registro de inventario para el producto ' + inventario.producto.nombre + '?, Este proceso es irreversible: <b>', showCancelButton: true, icon: 'warning' }).then((result) => {
      if (result.isConfirmed) {
        this.inventarioService.eliminarInventario(inventario).subscribe((res) => Swal.fire('', res.mensaje).then((x) => this.onPageChange(this.currentPage)));
      }
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.listarInventario(page);
  }
}
