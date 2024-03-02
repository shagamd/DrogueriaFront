import { Component, OnInit, ViewChild } from '@angular/core';
import { CombosGestionProductos, Producto } from 'src/app/classes/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { GestionarProductoComponent } from './gestionar-producto/gestionar-producto.component';
import Swal from 'sweetalert2';
import { AdministrarObservacionesComponent } from './administrar-observaciones/administrar-observaciones.component';
import { AdministrarPreciosComponent } from './administrar-precios/administrar-precios.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { Categoria } from 'src/app/classes/categoria';
import { Laboratorio } from 'src/app/classes/laboratorio';

@Component({
  selector: 'app-administrar-productos',
  templateUrl: './administrar-productos.component.html',
  styleUrls: ['./administrar-productos.component.scss'],
})
export class AdministrarProductosComponent implements OnInit {
  @ViewChild('gestionarProducto') gestionarProductoChild: GestionarProductoComponent;
  @ViewChild('gestionObservaciones') gestionObservacionesChild: AdministrarObservacionesComponent;
  @ViewChild('gestionarPrecios') gestionarPreciosChild: AdministrarPreciosComponent;
  @ViewChild('detalleProducto') detalleProductoChild: DetalleProductoComponent;

  arCategorias: Categoria[] = [];
  arLaboratorios: Laboratorio[] = [];

  //Filtros Busqueda
  categoriaFiltro: Categoria = undefined;
  laboratorioFiltro: Laboratorio = undefined;
  palabraBusqueda: string = '';

  arProductos: Producto[] = [];
  productoDetalle: Producto = new Producto();

  currentPage = 1;
  totalPages = 0;

  constructor(public productoService: ProductoService) { }

  ngOnInit(): void {
    this.productoService.cargarCombos().subscribe((res) => {
      let arrays: CombosGestionProductos = res.data as CombosGestionProductos;
      this.arCategorias = arrays.categorias;
      this.arLaboratorios = arrays.laboratorios;

      this.listarProductos();
    })
    // this.listarProductos();
  }

  pressEnter(event: KeyboardEvent): void{
    if(event.key ==='Enter'){
      this.onPageChange(1)
    }
  }

  listarProductos(pagina: number = 0): void {
    this.productoService.listarProductos(this.categoriaFiltro, this.laboratorioFiltro, this.palabraBusqueda, pagina).subscribe((response) => {
      this.arProductos = response.arDatos;
      this.totalPages = response.totalPaginas;
    });
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
        this.productoService.eliminarProducto(producto).subscribe((res) => Swal.fire('', res.mensaje).then((x) => this.onPageChange(this.currentPage)));
      }
    });
  }

  administrarObservaciones(producto: Producto): void {
    this.gestionObservacionesChild.administrarObservacionesProducto(producto);
  }

  administrarPrecios(producto: Producto): void {
    this.gestionarPreciosChild.administrarPreciosProducto(producto);
  }

  verDetalleProducto(producto: Producto): void {
    this.productoDetalle = producto;
    this.detalleProductoChild.mostrarDetalle();
  }

  limpiarProductoDetalle() :void {
    this.productoDetalle = new Producto();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.listarProductos(page);
  }
}
