import { Component, OnInit } from '@angular/core';
import { Factura } from 'src/app/classes/factura';
import { FacturaService } from 'src/app/services/factura.service';

@Component({
  selector: 'app-historial-ventas',
  templateUrl: './historial-ventas.component.html',
  styleUrls: ['./historial-ventas.component.scss']
})
export class HistorialVentasComponent implements OnInit {

  fechaFactura: Date = new Date();
  arFacturas: Factura[] = [];
  valorTotalFacturas: number = 0;
  fechaTotalFactura: Date = new Date();

  currentPage = 1;
  totalPages = 0;

  constructor(private facturaService: FacturaService) { }

  ngOnInit(): void {
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
}
