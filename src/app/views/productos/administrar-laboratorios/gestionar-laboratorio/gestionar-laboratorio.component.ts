import { Component, EventEmitter, Output } from '@angular/core';
import { Laboratorio } from 'src/app/classes/laboratorio';
import { LaboratorioService } from 'src/app/services/laboratorio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestionar-laboratorio',
  templateUrl: './gestionar-laboratorio.component.html',
  styleUrls: ['./gestionar-laboratorio.component.scss']
})
export class GestionarLaboratorioComponent {
  @Output("recargarDatos") recargarDatosEvent = new EventEmitter();
  modalVisible: boolean = false;

  laboratorioGestion: Laboratorio = new Laboratorio();

  constructor(private laboratorioService: LaboratorioService) {}

  ngOnInit(): void {}

  gestionarLaboratorio(laboratorio: Laboratorio) {
    this.laboratorioGestion = laboratorio;
    this.modalVisible = true;
  }

  guardarDatos(): void {
    this.laboratorioService.administrarLaboratorio(this.laboratorioGestion).subscribe(res => {
      Swal.fire("",res.mensaje);
      this.cerrarModal();
    })
  }

  cerrarModal(): void {
    this.laboratorioGestion = new Laboratorio();
    this.modalVisible = false;
    this.recargarDatosEvent.emit();
  }
}
