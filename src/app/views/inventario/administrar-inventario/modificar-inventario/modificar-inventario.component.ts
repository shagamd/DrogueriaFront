import { Component, EventEmitter, Output } from '@angular/core';
import { Inventario } from 'src/app/classes/inventario';
import { InventarioService } from 'src/app/services/inventario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-inventario',
  templateUrl: './modificar-inventario.component.html',
  styleUrls: ['./modificar-inventario.component.scss']
})
export class ModificarInventarioComponent {
  @Output('recargarDatos') recargarDatosEvent = new EventEmitter();
  modalVisible: boolean = false;

  inventarioGestion: Inventario = new Inventario();
  ajusteInventario: number = 0;

  constructor(private inventarioService: InventarioService) { }

  modificarInventario(inventario: Inventario): void {
    this.inventarioGestion = inventario;
    this.modalVisible = true;
  }

  validarMinimoInventario(): void {
    console.log(this.inventarioGestion.cantidad + this.ajusteInventario);
    if ((this.inventarioGestion.cantidad + this.ajusteInventario) < 0) {
      Swal.fire("", "El inventario no puede ser negativo;", "warning").then(() => {
        this.ajusteInventario = -this.inventarioGestion.cantidad;
      });
    }
  }

  guardarDatos(): void {
    this.inventarioGestion.cantidad += this.ajusteInventario;
    this.inventarioService.modificarInventario(this.inventarioGestion).subscribe((x) => {
      Swal.fire('', 'Inventario registrado correctamente', 'success');
      this.cerrarModal();
    });
  }

  cerrarModal(): void {
    this.recargarDatosEvent.emit();
    this.inventarioGestion = new Inventario();
    this.ajusteInventario = 0;
    this.modalVisible = false;
  }

}
