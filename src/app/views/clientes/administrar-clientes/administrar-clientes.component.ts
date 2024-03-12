import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/classes/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import { GestionarClienteComponent } from './gestionar-cliente/gestionar-cliente.component';

@Component({
  selector: 'app-administrar-clientes',
  templateUrl: './administrar-clientes.component.html',
  styleUrls: ['./administrar-clientes.component.scss']
})
export class AdministrarClientesComponent implements OnInit {

  @ViewChild('gestionCliente') gestionClienteChild: GestionarClienteComponent;

  palabraBusqueda: string = '';

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

  listarClientes(pagina: number = 0): void {
    this.clienteService.listarClientes(this.palabraBusqueda, pagina).subscribe((response) => {
      this.arClientes = response.arDatos;
      this.totalPages = response.totalPaginas;
    });
  }

  administrarCliente(cliente: Cliente = new Cliente()): void {
    this.gestionClienteChild.gestionarCliente(cliente);
  }

  eliminarCliente(cliente: Cliente): void {
    //TODO Revisar logica de si cliente tiene creditos pendientes
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.listarClientes(page);
  }
}
