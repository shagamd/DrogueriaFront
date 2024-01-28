import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UnidadMedida } from 'src/app/classes/unidadMedida';
import { UnidadMedidaService } from 'src/app/services/unidad-medida.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestionar-unidad-medida',
  templateUrl: './gestionar-unidad-medida.component.html',
  styleUrls: ['./gestionar-unidad-medida.component.scss'],
})
export class GestionarUnidadMedidaComponent implements OnInit {
  @Output('recargarDatos') recargarDatosEvent = new EventEmitter();
  modalVisible: boolean = false;

  unidadMedidaGestion: UnidadMedida = new UnidadMedida();

  constructor(private unidadMedidaService: UnidadMedidaService) {}

  ngOnInit(): void {}

  gestionarUnidadMedida(unidadMedida: UnidadMedida) {
    this.unidadMedidaGestion = unidadMedida;
    this.modalVisible = true;
  }

  guardarDatos(): void {
    this.unidadMedidaService.administrarUnidadMedida(this.unidadMedidaGestion).subscribe(res => {
      Swal.fire("",res.mensaje);
      this.cerrarModal();
    })
  }

  cerrarModal(): void {
    this.unidadMedidaGestion = new UnidadMedida();
    this.modalVisible = false;
    this.recargarDatosEvent.emit();
  } 
}
