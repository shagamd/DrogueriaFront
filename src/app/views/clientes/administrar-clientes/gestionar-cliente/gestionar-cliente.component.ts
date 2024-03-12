import { Component, EventEmitter, Output } from '@angular/core';
import { Cliente } from 'src/app/classes/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestionar-cliente',
  templateUrl: './gestionar-cliente.component.html',
  styleUrls: ['./gestionar-cliente.component.scss']
})
export class GestionarClienteComponent {
  @Output('recargarDatos') recargarDatosEvent = new EventEmitter();
  modalVisible: boolean = false;

  clienteGestion: Cliente = new Cliente();


  constructor(private clienteService: ClientesService) { }

  ngOnInit(): void {
  }

  gestionarCliente(cliente: Cliente): void {
    this.clienteGestion = cliente;
    this.modalVisible = true;
  }

  esEdicion(): boolean {
    return this.clienteGestion?.id != undefined;
  }

  cerrarModal(): void {
    this.recargarDatosEvent.emit();
    this.clienteGestion = new Cliente();
    this.modalVisible = false;
  }

  validarDatos(): boolean {
    let arErrores: string[] = [];
    if (this.clienteGestion.nombre == undefined) {
      arErrores.push('El nombre es obligatorio');
    }
    if (this.clienteGestion.telefono == undefined) {
      arErrores.push('El telefono es obligatorio');
    }
    // if (this.inventarioGestion.fechaVencimiento == undefined || this.inventarioGestion.fechaVencimiento == null) {
    //   arErrores.push("La fecha de vencimiento es obligatoria");
    // }
    if (arErrores.length > 0) {
      Swal.fire('Error', 'Se encontraron los siguientes errores.<br><li>' + arErrores.join('<li>'), 'warning');
      return false;
    }
    return true;
  }

  guardarDatos(): void {
    if (this.validarDatos()) {
      this.clienteService.administrarCliente(this.clienteGestion).subscribe((x) => {
        Swal.fire('', 'Cliente registrado correctamente', 'success');
        this.cerrarModal();
      });
    }
  }

}
