import { Component, OnInit, ViewChild } from '@angular/core';
import { UnidadMedida } from 'src/app/classes/unidadMedida';
import { UnidadMedidaService } from 'src/app/services/unidad-medida.service';
import Swal from 'sweetalert2';
import { GestionarUnidadMedidaComponent } from './gestionar-unidad-medida/gestionar-unidad-medida.component';

@Component({
  selector: 'app-administrar-unidad-medida',
  templateUrl: './administrar-unidad-medida.component.html',
  styleUrls: ['./administrar-unidad-medida.component.scss'],
})
export class AdministrarUnidadMedidaComponent implements OnInit {
  @ViewChild('gestionUnidadMedida') gestionUnidadMedidaChild: GestionarUnidadMedidaComponent;
  arUnidadesMedida: UnidadMedida[] = [];

  constructor(private unidadMedidaService: UnidadMedidaService) {}

  ngOnInit(): void {
    this.listarUnidadesMedida();
  }

  listarUnidadesMedida(): void {
    this.unidadMedidaService.listarUnidadesMedida().subscribe((x) => (this.arUnidadesMedida = x));
  }

  gestionarUnidadMedida(unidadMedida: UnidadMedida = new UnidadMedida()): void {
    this.gestionUnidadMedidaChild.gestionarUnidadMedida(unidadMedida);
  }

  eliminarUnidadMedida(unidadMedida: UnidadMedida): void {
    Swal.fire({ html: 'Seguro de eliminar la unidad de medida: <b>' + unidadMedida.nombre + '</b>?', showCancelButton: true, icon: 'warning' }).then((result) => {
      if (result.isConfirmed) {
        this.unidadMedidaService.eliminarUnidadMedida(unidadMedida).subscribe((res) => Swal.fire('', res.mensaje).then((x) => this.listarUnidadesMedida()));
      }
    });
  }
}
