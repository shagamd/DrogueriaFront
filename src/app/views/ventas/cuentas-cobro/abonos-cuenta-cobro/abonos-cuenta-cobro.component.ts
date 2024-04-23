import { Component, EventEmitter, Output } from '@angular/core';
import { AbonoCuentaCobro } from 'src/app/classes/abonoCuentaCobro';
import { CuentaCobro } from 'src/app/classes/cuentaCobro';
import { CuentaCobroService } from 'src/app/services/cuenta-cobro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abonos-cuenta-cobro',
  templateUrl: './abonos-cuenta-cobro.component.html',
  styleUrls: ['./abonos-cuenta-cobro.component.scss']
})
export class AbonosCuentaCobroComponent {

  @Output() emitUpdateTable: EventEmitter<void> = new EventEmitter();

  cuentaCobroActual: CuentaCobro = new CuentaCobro();
  modalVisible: boolean = false;

  constructor(private cuentaCobroService: CuentaCobroService) {
  }

  administrarAbonosCuentaCobro(cuentaCobro: CuentaCobro) {
    this.cuentaCobroActual = cuentaCobro;
    this.modalVisible = true;
  }

  protected cerrarModal() {
    this.cuentaCobroActual = new CuentaCobro();
    this.emitUpdateTable.emit();
    this.modalVisible = false;
  }

  anadirAbono(): void {
    let abono = new AbonoCuentaCobro();
    abono.fechaAbono = new Date();
    abono.estado = true;
    this.cuentaCobroActual.abonosCuentaCobro.push(abono);
  }

  actualizarCuentasCobro(): void {
    let arSinAbono = this.cuentaCobroActual.abonosCuentaCobro.filter(el => el.valorAbono == undefined || el.valorAbono == 0);
    if (arSinAbono.length > 0) {
      Swal.fire("", "No se ha ingresado valor de abono.", "warning");
      return;
    }
    if (this.getTotalAbonos() > this.cuentaCobroActual.valorTotal) {
      Swal.fire("", "El valor de abonos no puede superar el Valor Total.", "warning");
      return;
    }
    this.cuentaCobroActual.fechaUltimoPago = new Date();
    this.cuentaCobroService.actualizarCuentaCobro(this.cuentaCobroActual).subscribe(el => {
      Swal.fire("", "Cuenta de Cobro Factura <b>" + el.factura.id + "</b> actualizada correctamente.", "success");
      this.cerrarModal();
    });
  }

  eliminarAbono(abonoEliminar: AbonoCuentaCobro): void {
    if (abonoEliminar.id != undefined) {
      Swal.fire({ html: 'Seguro de eliminar el abono por valor de <b>$ ' + abonoEliminar.valorAbono + '</b>, este proceso es irreversible?', showCancelButton: true, icon: 'warning' }).then((result) => {
        if (result.isConfirmed) {
          this.cuentaCobroActual.abonosCuentaCobro = this.cuentaCobroActual.abonosCuentaCobro.filter(el => el != abonoEliminar);
        }
      });
    } else {
      this.cuentaCobroActual.abonosCuentaCobro = this.cuentaCobroActual.abonosCuentaCobro.filter(el => el != abonoEliminar);
    }
  }

  getTotalAbonos(): number {
    return this.cuentaCobroActual.abonosCuentaCobro.reduce((acc, curr) => {
      return acc += curr.valorAbono ?? 0;
    }, 0);
  }
}
