import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Categoria } from 'src/app/classes/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestionar-categoria',
  templateUrl: './gestionar-categoria.component.html',
  styleUrls: ['./gestionar-categoria.component.scss'],
})
export class GestionarCategoriaComponent implements OnInit {
  @Output("recargarDatos") recargarDatosEvent = new EventEmitter();
  modalVisible: boolean = false;

  categoriaGestion: Categoria = new Categoria();

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {}

  gestionarCategoria(categoria: Categoria) {
    this.categoriaGestion = categoria;
    this.modalVisible = true;
  }

  guardarDatos(): void {
    this.categoriaService.administrarCategoria(this.categoriaGestion).subscribe(res => {
      Swal.fire("",res.mensaje);
      this.cerrarModal();
    })
  }

  cerrarModal(): void {
    this.categoriaGestion = new Categoria();
    this.modalVisible = false;
    this.recargarDatosEvent.emit();
  }

}
