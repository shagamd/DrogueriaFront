import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Factura } from 'src/app/classes/factura';
import { FacturaService } from 'src/app/services/factura.service';

@Component({
  selector: 'app-historial-ventas',
  templateUrl: './historial-ventas.component.html',
  styleUrls: ['./historial-ventas.component.scss']
})
export class HistorialVentasComponent implements OnInit {

  fechaFactura: string;
  arFacturas: Factura[] = [];
  valorTotalFacturas: number = 0;
  fechaTotalFactura: Date = new Date();

  currentPage = 1;
  totalPages = 0;

  constructor(private facturaService: FacturaService) {
  }

  ngOnInit(): void {
    this.fechaFactura = this.getFechaActualString();
    this.listarFacturas();
  }

  listarFacturas(pagina: number = 0): void {
    this.facturaService.listarFacturasPorFecha(this.fechaFactura, pagina).subscribe(el => {
      this.arFacturas = el.arDatos;
      this.valorTotalFacturas = el.data.total;
      this.fechaTotalFactura = el.data.fechaConsulta;
      this.totalPages = el.totalPaginas;
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.listarFacturas(page);
  }

  getFechaActualString(): string {
    let fecha = new Date();
    let fechaFormateada = fecha.getFullYear() + '-' + this.pad(fecha.getMonth() + 1, 2) + '-' + this.pad(fecha.getDate(), 2);
    return fechaFormateada;

  }

  pad(num: number, size: number): string {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }
}
