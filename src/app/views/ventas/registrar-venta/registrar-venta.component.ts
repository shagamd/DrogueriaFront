import { FacturaService } from './../../../services/factura.service';
import { ClientesService } from './../../../services/clientes.service';
import { TipoPagoService } from './../../../services/tipo-pago.service';
import { Factura } from './../../../classes/factura';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject, catchError, concat, debounceTime, distinctUntilChanged, filter, max, of, switchMap, tap } from 'rxjs';
import { FacturaDetalle } from 'src/app/classes/factura_detalle';
import { ProductoResumen } from 'src/app/classes/producto';
import { UnidadMedida } from 'src/app/classes/unidadMedida';
import { ProductoService } from 'src/app/services/producto.service';
import { TipoPago } from 'src/app/classes/tipoPago';
import { AuthService } from 'src/app/services/auth.service';
import { MedioPago } from 'src/app/classes/medioPago';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-venta',
  templateUrl: './registrar-venta.component.html',
  styleUrls: ['./registrar-venta.component.scss']
})
export class RegistrarVentaComponent implements OnInit {

  // productoRegistro: ProductoResumen = undefined;
  factura: Factura = new Factura();
  arTiposPago: TipoPago[] = [];
  totalRecibido: number = 0;

  tipoPagoSeleccionado: TipoPago = undefined;

  constructor(private tipoPagoService: TipoPagoService, private clienteService: ClientesService, public authService: AuthService, private facturaService: FacturaService) { }

  ngOnInit(): void {
    this.tipoPagoService.listarTiposPago().subscribe(el => {
      this.arTiposPago = el;
      this.asignarDatosBasicosFactura();
    });
  }

  asignarDatosBasicosFactura():void {
    this.tipoPagoSeleccionado = this.arTiposPago.find(tipoPago => tipoPago.id == TipoPago.CONTADO);
    this.factura.medioPago = this.tipoPagoSeleccionado.arMedioPago.find(medioPago => medioPago.id == MedioPago.EFECTIVO);
    this.clienteService.obtenerClienteGenerico().subscribe(el => this.factura.cliente = el);
  }

  recibirProducto(productoResumen: ProductoResumen): void {
    let itemFactura = this.factura.detalleFactura.find(el => el.producto.id === productoResumen.id);
    if (itemFactura) {
      itemFactura.cantidad++;
    } else {
      itemFactura = new FacturaDetalle();
      itemFactura.cantidad = 1;
      itemFactura.producto = productoResumen;

      let inventario = productoResumen.arInventario[0];
      itemFactura.unidadMedida = inventario.unidadMedida;

      itemFactura.precioUnitario = productoResumen.arPrecios.find(el => el.unidadMedida.id == inventario.unidadMedida.id).valorVenta;
      this.factura.detalleFactura.push(itemFactura);
    }

    this.recalcularTotales();
  }

  eliminarItem(itemFactura: FacturaDetalle) {
    this.factura.detalleFactura = this.factura.detalleFactura.filter(el => el.producto.id != itemFactura.producto.id);
    this.recalcularTotales();
  }

  getInventarioProducto(producto: ProductoResumen, unidadMedida: UnidadMedida) {
    return producto.arInventario.find(el => el.unidadMedida.id == unidadMedida.id)
  }

  getPrecioProducto(producto: ProductoResumen, unidadMedida: UnidadMedida) {
    return producto.arPrecios.find(el => el.unidadMedida.id == unidadMedida.id)
  }

  getUnidadesMedida(producto: ProductoResumen): UnidadMedida[] {
    return producto.arInventario.map(el => el.unidadMedida);
  }

  compareUnidadMedidaVenta(unidadMedidaVenta1: UnidadMedida, unidadMedidaVenta2: UnidadMedida) {
    return unidadMedidaVenta1 && unidadMedidaVenta2 ? unidadMedidaVenta1.id === unidadMedidaVenta2.id : unidadMedidaVenta1 == unidadMedidaVenta2;
  }

  compareTipoPago(tipoPago1: TipoPago, tipoPago2: TipoPago) {
    return tipoPago1 && tipoPago2 ? tipoPago1.id === tipoPago2.id : tipoPago1 == tipoPago2;
  }

  compareMedioPago(medioPago1: MedioPago, medioPago2: MedioPago) {
    return medioPago1 && medioPago2 ? medioPago1.id === medioPago2.id : medioPago1 == medioPago2;
  }

  aplicaSoportePago(): boolean {
    return this.factura.medioPago?.id == MedioPago.NEQUI || this.factura.medioPago?.id == MedioPago.TRANSFERENCIA;
  }

  maxCantidadProducto(itemFactura: FacturaDetalle): number {
    return itemFactura.producto.arInventario.find(el => el.unidadMedida.id == itemFactura.unidadMedida.id).cantidad
  }

  recalcularTotales(): void {
    this.factura.detalleFactura.forEach((el) => {
      let maxCantidadProducto = this.maxCantidadProducto(el);
      console.log("maxima cantidad", maxCantidadProducto);
      if(el.cantidad > maxCantidadProducto){
        console.log("Total cantidad ",el.cantidad);
        el.cantidad = maxCantidadProducto;
        console.log("Total cantidad Final",el.cantidad);
      }

      if (el.esOferta) {
        el.valorTotal = 0;
      } else {
        //Logica si existen descuentos
        //
        //Logica si Aplica Impuesto
        //
        let totalItem = el.cantidad * el.precioUnitario;
        el.valorTotal = totalItem;
      }
    });
    this.factura.totalBruto = this.factura.detalleFactura.reduce((acum, curr) => acum + curr.valorBruto, 0);
    this.factura.totalImpuesto = this.factura.detalleFactura.reduce((acum, curr) => acum + curr.valorImpuesto, 0);
    this.factura.totalDescuento = this.factura.detalleFactura.reduce((acum, curr) => acum + curr.valorDescuento, 0);
    this.factura.total = this.factura.detalleFactura.reduce((acum, curr) => acum + curr.valorTotal, 0);
  }

  modificarUnidadMedida(itemFacutura: FacturaDetalle, unidadMedida: UnidadMedida) {
    itemFacutura.unidadMedida = unidadMedida;
    itemFacutura.precioUnitario = itemFacutura.producto.arPrecios.find(el => el.unidadMedida.id == unidadMedida.id).valorVenta;
  }

  registrarVenta(): void {
    if (this.validarRegistroFactura()) {
      this.facturaService.registrarFactura(this.factura).subscribe(el => {
        Swal.fire("","Factura <b>"+el.id+"</b> registrada correctamente.","success");
        this.limpiarDatos();
      })
    }
  }

  limpiarDatos():void {
    this.factura = new Factura();
    this.asignarDatosBasicosFactura();
    this.totalRecibido = 0;
    this.recalcularTotales();
  }

  validarRegistroFactura(): boolean {
    let arErrores: string[] = [];
    if (this.factura.detalleFactura.length == 0) {
      arErrores.push("No se han vinculado productos");
    }
    if (this.totalRecibido < this.factura.total) {
      arErrores.push("El valor recibido, no puede ser menor al total de la factura");
    }
    this.factura.detalleFactura.forEach(el => {
      if (el.cantidad <= 0) {
        arErrores.push("No se ha registrado cantidad para el producto <b>" + el.producto.nombre + "</b>");
      }
    })

    if (arErrores.length > 0) {
      Swal.fire("Error", "<div class='text-start fs-9'>Se encontraron los siguiente errores.<br><ul><li>" + arErrores.join("<li>") + "</ul></div>")
      return false;
    }
    return true;
  }
}
