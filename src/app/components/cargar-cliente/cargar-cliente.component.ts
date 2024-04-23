import { Component, EventEmitter, Output } from '@angular/core';
import { Cliente } from 'src/app/classes/cliente';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-cargar-cliente',
  templateUrl: './cargar-cliente.component.html',
  styleUrls: ['./cargar-cliente.component.scss']
})
export class CargarClienteComponent {

  @Output() emitirCliente: EventEmitter<Cliente> = new EventEmitter<Cliente>();

  palabraBusqueda: string = '';
  modalVisible: boolean = false;

  currentPage = 1;
  totalPages = 0;

  arClientes: Cliente[] = [];

  constructor(public clienteService: ClientesService) { }

  ngOnInit(): void {
    this.listarClientes();
  }

  pressEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onPageChange(1)
    }
  }

  consultarCliente():void {
    this.modalVisible = true;
    this.listarClientes();
  }

  listarClientes(pagina: number = 0): void {
    this.clienteService.listarClientes(this.palabraBusqueda, pagina).subscribe((response) => {
      this.arClientes = response.arDatos;
      this.totalPages = response.totalPaginas;
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.listarClientes(page);
  }

  seleccionarCliente(cliente: Cliente) {
    this.emitirCliente.emit(cliente);
    this.arClientes = [];
    this.totalPages = 0;
    this.modalVisible = false;
  }
}
