import { Component, OnInit, ViewChild } from '@angular/core';
import { Laboratorio } from 'src/app/classes/laboratorio';
import { LaboratorioService } from 'src/app/services/laboratorio.service';
import Swal from 'sweetalert2';
import { GestionarLaboratorioComponent } from './gestionar-laboratorio/gestionar-laboratorio.component';

@Component({
  selector: 'app-administrar-laboratorios',
  templateUrl: './administrar-laboratorios.component.html',
  styleUrls: ['./administrar-laboratorios.component.scss'],
})
export class AdministrarLaboratoriosComponent implements OnInit {
  @ViewChild('gestionLaboratorio') gestionLaboratorioChild: GestionarLaboratorioComponent;
  arLaboratorios: Laboratorio[] = [];

  currentPage = 1;
  totalPages = 0;
  palabraBusqueda: string = '';

  constructor(private laboratorioService: LaboratorioService) {}

  ngOnInit(): void {
    this.listarLaboratorios();
  }

  listarLaboratorios(pagina: number = 0): void {
    this.laboratorioService.listarLaboratorios(this.palabraBusqueda, pagina).subscribe((response) => {
      this.arLaboratorios = response.arDatos;
      this.totalPages = response.totalPaginas;
    });
  }

  crearLaboratorio(laboratorio: Laboratorio = new Laboratorio()) {
    this.gestionLaboratorioChild.gestionarLaboratorio(laboratorio);
  }

  editarLaboratorio(laboratorio: Laboratorio): void {
    this.gestionLaboratorioChild.gestionarLaboratorio(laboratorio);
  }

  eliminarLaboratorio(laboratorio: Laboratorio): void {
    Swal.fire({ html: 'Seguro de eliminar el laboratorio: <b>' + laboratorio.nombre + '</b>?', showCancelButton: true, icon: 'warning' }).then((result) => {
      if (result.isConfirmed) {
        this.laboratorioService.eliminarLaboratorio(laboratorio).subscribe((res) => Swal.fire('', res.mensaje).then((x) => this.listarLaboratorios()));
      }
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.listarLaboratorios(page);
  }
}
