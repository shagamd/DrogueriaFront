import { Component, OnInit, ViewChild } from '@angular/core';
import { Producto } from 'src/app/classes/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { GestionarProductoComponent } from './gestionar-producto/gestionar-producto.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrar-productos',
  templateUrl: './administrar-productos.component.html',
  styleUrls: ['./administrar-productos.component.scss'],
})
export class AdministrarProductosComponent implements OnInit {
  @ViewChild('gestionarProducto') gestionarProductoChild: GestionarProductoComponent;

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

  // saveProduct() {
  //   let producto = new Producto();
  //   producto.nombre = 'Producto 1';
  //   producto.descripcion = 'Descripcion 1';
  //   producto.estado = true;
  //   producto.codigoBarras = '12313';

  //   this.productoService.administrarProducto(producto, this.selectedFile).subscribe((x) => {
  //     console.log(x);
  //   });
  // }
}
