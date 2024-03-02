import { Inventario } from 'src/app/classes/inventario';
import { Component, EventEmitter, Output } from '@angular/core';
import { ProductoResumen } from 'src/app/classes/producto';
import { UnidadMedida } from 'src/app/classes/unidadMedida';
import { ProductoService } from 'src/app/services/producto.service';
import { UnidadMedidaService } from 'src/app/services/unidad-medida.service';
import { InventarioService } from 'src/app/services/inventario.service';
import Swal from 'sweetalert2';
import { PuntoVenta } from 'src/app/classes/puntoVenta';
import { PuntoVentaService } from 'src/app/services/punto-venta.service';

@Component({
  selector: 'app-gestionar-inventario',
  templateUrl: './gestionar-inventario.component.html',
  styleUrls: ['./gestionar-inventario.component.scss']
})
export class GestionarInventarioComponent {
  @Output('recargarDatos') recargarDatosEvent = new EventEmitter();
  modalVisible: boolean = false;

  inventarioGestion: Inventario = new Inventario();

  arProductos: ProductoResumen[] = [];
  arUnidadMedida: UnidadMedida[] = [];
  arPuntosVenta: PuntoVenta[] = [];

  constructor(private productoService: ProductoService, private inventarioService: InventarioService, private unidadaMedidaService: UnidadMedidaService, private puntoVentaService: PuntoVentaService) { }

  ngOnInit(): void {
    this.productoService.productsForSelect().subscribe(res => this.arProductos = res);
    this.unidadaMedidaService.listarUnidadesMedida().subscribe(res => this.arUnidadMedida = res);
    this.puntoVentaService.listarPuntosVenta().subscribe(res => this.arPuntosVenta = res);
  }

  gestionarInventario(inventario: Inventario): void {
    this.inventarioGestion = inventario;
    this.modalVisible = true;
  }

  esEdicion(): boolean {
    return this.inventarioGestion?.id != undefined;
  }

  cerrarModal(): void {
    this.recargarDatosEvent.emit();
    this.inventarioGestion = new Inventario();
    this.modalVisible = false;
  }

  validarDatos(): boolean {
    let arErrores: string[] = [];
    if (this.inventarioGestion.producto == undefined) {
      arErrores.push('El producto es obligatorio');
    }
    if (this.inventarioGestion.puntoVenta == undefined) {
      arErrores.push('El punto de venta es obligatorio');
    }
    if (this.inventarioGestion.unidadMedida == undefined) {
      arErrores.push('La Unidad de Medida es obligatorio');
    }
    // if (this.inventarioGestion.fechaVencimiento == undefined || this.inventarioGestion.fechaVencimiento == null) {
    //   arErrores.push("La fecha de vencimiento es obligatoria");
    // }
    if (arErrores.length > 0) {
      Swal.fire('Error', 'Se encontraron los siguientes errores.<br><li>' + arErrores.join('<li>'), 'warning');
      return false;
    }
    return true;
  }

  guardarDatos(): void {
    if (this.validarDatos()) {
      this.inventarioService.administrarInventario(this.inventarioGestion).subscribe((x) => {
        Swal.fire('', 'Inventario registrado correctamente', 'success');
        this.cerrarModal();
      });
    }
  }

  compareProducto(producto1: ProductoResumen, producto2: ProductoResumen) {
    return producto1 && producto2 ? producto1.id === producto2.id : producto1 === producto2;
  }

  compareUnidadMedida(unidaddMedida1: UnidadMedida, unidaddMedida12: UnidadMedida) {
    return unidaddMedida1 && unidaddMedida12 ? unidaddMedida1.id === unidaddMedida12.id : unidaddMedida1 === unidaddMedida12;
  }

  comparePuntoVenta(puntoVenta1: PuntoVenta, puntoVenta2: PuntoVenta) {
    return puntoVenta1 && puntoVenta2 ? puntoVenta1.id === puntoVenta2.id : puntoVenta1 === puntoVenta2;
  }

}
