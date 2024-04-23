import { CuentaCobroService } from './../../../services/cuenta-cobro.service';
import { CuentaCobro } from './../../../classes/cuentaCobro';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente, ClienteResumen } from 'src/app/classes/cliente';
import { AbonosCuentaCobroComponent } from './abonos-cuenta-cobro/abonos-cuenta-cobro.component';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-cuentas-cobro',
  templateUrl: './cuentas-cobro.component.html',
  styleUrls: ['./cuentas-cobro.component.scss']
})
export class CuentasCobroComponent implements OnInit {

  @ViewChild('abonoCuentaCobro') abonoCuentaCobroChild: AbonosCuentaCobroComponent;

  clienteBusqueda: ClienteResumen;
  estadoBusqueda: boolean = true;
  arClientes: ClienteResumen[] = [];

  arCuentasCobro: CuentaCobro[] = [];

  currentPage = 1;
  totalPages = 0;

  constructor(private cuentaCobroService: CuentaCobroService, private clientesService: ClientesService) {
  }

  ngOnInit(): void {
    this.listarCuentasCobro();
    this.listarClientesSelect();
  }

  listarCuentasCobro(pagina: number = 0): void {
    this.cuentaCobroService.listarCuentasCobro(this.clienteBusqueda, this.estadoBusqueda, pagina).subscribe(el => {
      this.arCuentasCobro = el.arDatos;
      this.totalPages = el.totalPaginas;
    });
  }

  listarClientesSelect(): void {
    this.clientesService.obtenerClientesSelect().subscribe(res => {
      this.arClientes = res;
    })
  }

  registarAbono(cuentaCobro: CuentaCobro): void {
    this.abonoCuentaCobroChild.administrarAbonosCuentaCobro(cuentaCobro);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.listarCuentasCobro(page);
  }
}
