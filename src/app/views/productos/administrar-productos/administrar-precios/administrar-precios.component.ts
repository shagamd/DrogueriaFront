import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Precio } from 'src/app/classes/precio';
import { Producto } from 'src/app/classes/producto';
import { UnidadMedida } from 'src/app/classes/unidadMedida';
import { ProductoService } from 'src/app/services/producto.service';
import { UnidadMedidaService } from 'src/app/services/unidad-medida.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrar-precios',
  templateUrl: './administrar-precios.component.html',
  styleUrls: ['./administrar-precios.component.scss'],
})
export class AdministrarPreciosComponent implements OnInit {
  @Output('recargarDatos') recargarDatosEvent = new EventEmitter();
  modalVisible: boolean = false;

  productoGestion: Producto = new Producto();
  precioGestion: Precio = new Precio();

  arUnidadesMedida: UnidadMedida[] = [];

  constructor(private productoService: ProductoService, private unidadMedidaService: UnidadMedidaService) {}

  ngOnInit(): void {
    this.unidadMedidaService.listarUnidadesMedida().subscribe((res) => (this.arUnidadesMedida = res));
  }

  administrarPreciosProducto(producto: Producto): void {
    this.precioGestion = new Precio();
    this.productoGestion = producto;
    this.modalVisible = true;
  }

  unidadMedidaYaVinculada(unidadMedida: UnidadMedida): boolean {
    return this.productoGestion.arPrecios.some((el) => el.unidadMedida.id == unidadMedida.id);
  }

  agregarPrecio(): void {
    this.productoGestion.arPrecios.push(this.precioGestion);
    this.precioGestion = new Precio();
  }

  eliminarPrecio(precio: Precio): void {
    this.productoGestion.arPrecios = this.productoGestion.arPrecios.filter((el) => el.unidadMedida.id != precio.unidadMedida.id);
  }

  guardarDatos(): void {
    this.productoService.administrarProducto(this.productoGestion).subscribe((res) => {
      if (res.estado) {
        Swal.fire('', 'Precios registrados correctamente', 'success').then((btnRes) => {
          if (btnRes.isConfirmed) {
            this.cerrarModal();
          }
        });
      } else {
        Swal.fire('Error', res.mensaje, 'warning');
      }
    });
  }

  cerrarModal(): void {
    this.precioGestion = new Precio();
    this.recargarDatosEvent.emit();
    this.modalVisible = false;
  }
}
