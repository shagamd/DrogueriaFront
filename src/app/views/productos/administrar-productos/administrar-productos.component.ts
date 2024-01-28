import { Component, OnInit, ViewChild } from '@angular/core';
import { Producto } from 'src/app/classes/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { GestionarProductoComponent } from './gestionar-producto/gestionar-producto.component';
import Swal from 'sweetalert2';
import { AdministrarObservacionesComponent } from './administrar-observaciones/administrar-observaciones.component';
import { AdministrarPreciosComponent } from './administrar-precios/administrar-precios.component';

@Component({
  selector: 'app-administrar-productos',
  templateUrl: './administrar-productos.component.html',
  styleUrls: ['./administrar-productos.component.scss'],
})
export class AdministrarProductosComponent implements OnInit {
  @ViewChild('gestionarProducto') gestionarProductoChild: GestionarProductoComponent;
  @ViewChild('gestionObservaciones') gestionObservacionesChild: AdministrarObservacionesComponent;
  @ViewChild('gestionarPrecios') gestionarPreciosChild: AdministrarPreciosComponent;

  arProductos: Producto[] = [];

  constructor(public productoService: ProductoService) {}

  ngOnInit(): void {
    this.listarProductos();
  }

  listarProductos(): void {
    this.productoService.listarProductos().subscribe((products) => (this.arProductos = products));
  }

  crearProducto(producto: Producto = new Producto()): void {
    this.gestionarProductoChild.gestionarProducto(producto);
  }

  editarProducto(producto: Producto): void {
    this.gestionarProductoChild.gestionarProducto(producto);
  }

  eliminarProducto(producto: Producto): void {
    Swal.fire({ html: 'Seguro de eliminar el producto: <b>' + producto.nombre + '</b>?', showCancelButton: true, icon: 'warning' }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.eliminarProducto(producto).subscribe((res) => Swal.fire('', res.mensaje).then((x) => this.listarProductos()));
      }
    });
  }

  administrarObservaciones(producto: Producto): void {
    this.gestionObservacionesChild.administrarObservacionesProducto(producto);
  }

  administrarPrecios(producto: Producto): void {
    this.gestionarPreciosChild.administrarPreciosProducto(producto);
  }

  verObservaciones(producto: Producto): void {
    console.log(producto);
  }
}
