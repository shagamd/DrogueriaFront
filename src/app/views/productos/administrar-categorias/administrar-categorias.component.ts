import { Component, OnInit, ViewChild } from '@angular/core';
import { Categoria } from 'src/app/classes/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { GestionarCategoriaComponent } from './gestionar-categoria/gestionar-categoria.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrar-categorias',
  templateUrl: './administrar-categorias.component.html',
  styleUrls: ['./administrar-categorias.component.scss'],
})
export class AdministrarCategoriasComponent implements OnInit {
  @ViewChild('gestionCategoria') gestionCategoriaChild: GestionarCategoriaComponent;
  arCategorias: Categoria[] = [];

  currentPage = 1;
  totalPages = 0;
  palabraBusqueda: string = '';

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.listarCategorias();
  }

  listarCategorias(pagina: number = 0): void {
    this.categoriaService.listarCategorias(this.palabraBusqueda, pagina).subscribe((response) => {
      this.arCategorias = response.arDatos;
      this.totalPages = response.totalPaginas;
    });
  }

  crearCategoria(categoria: Categoria = new Categoria()) {
    this.gestionCategoriaChild.gestionarCategoria(categoria);
  }

  editarCategoria(categoria: Categoria): void {
    this.gestionCategoriaChild.gestionarCategoria(categoria);
  }
  eliminarCategoria(categoria: Categoria): void {
    Swal.fire({ html: 'Seguro de eliminar la categoria: <b>' + categoria.nombre + '</b>?', showCancelButton: true, icon: 'warning' }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.eliminarCategoria(categoria).subscribe((res) => Swal.fire('', res.mensaje).then((x) => this.listarCategorias()));
      }
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.listarCategorias(page);
  }
}
