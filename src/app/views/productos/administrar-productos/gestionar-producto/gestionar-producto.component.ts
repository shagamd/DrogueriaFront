import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Categoria } from 'src/app/classes/categoria';
import { Laboratorio } from 'src/app/classes/laboratorio';
import { CombosGestionProductos, Producto } from 'src/app/classes/producto';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestionar-producto',
  templateUrl: './gestionar-producto.component.html',
  styleUrls: ['./gestionar-producto.component.scss'],
})
export class GestionarProductoComponent implements OnInit {
  @Output('recargarDatos') recargarDatosEvent = new EventEmitter();
  modalVisible: boolean = false;

  productoGestion: Producto = new Producto();
  selectedFile: File | undefined = undefined;
  previewUrl: string | ArrayBuffer | null = null;

  arCategorias: Categoria[] = [];
  arLaboratorios: Laboratorio[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarCombos();
  }

  cargarCombos() {
    this.productoService.cargarCombos().subscribe((x) => {
      let arrays: CombosGestionProductos = x.data as CombosGestionProductos;
      this.arCategorias = arrays.categorias;
      this.arLaboratorios = arrays.laboratorios;
    });
  }

  gestionarProducto(producto: Producto) {
    this.productoGestion = producto;
    if (this.productoGestion.rutaImagen != undefined && this.productoGestion.rutaImagen != '') {
      this.previewUrl = this.productoService._urlEndPoint + '/images/' + producto.id;
    }
    this.modalVisible = true;
  }

  cargarArchivo(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewUrl = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  guardarDatos(): void {
    if (this.validarDatos()) {
      console.log(this.productoGestion);
      this.productoService.administrarProducto(this.productoGestion, this.selectedFile).subscribe((x) => {
        Swal.fire('', 'Producto registrado correctamente', 'success');
        this.cerrarModal();
      });
    }
  }

  validarDatos(): boolean {
    let arErrores: string[] = [];
    if (this.productoGestion.nombre.trim() == '') {
      arErrores.push('El nombre es obligatorio');
    }
    if (this.productoGestion.descripcion.trim() == '') {
      arErrores.push('La descripción es obligatoria');
    }
    if (this.productoGestion.categoria == undefined || this.productoGestion.laboratorio == undefined) {
      arErrores.push('La categoria y laboratorio son obligatorios');
    }
    if (arErrores.length > 0) {
      Swal.fire('Error', 'Se encontraron los siguientes errores.<br><li>' + arErrores.join('<li>'), 'warning');
      return false;
    }
    return true;
  }

  cerrarModal(): void {
    this.recargarDatosEvent.emit();
    this.productoGestion = new Producto();
    this.selectedFile = undefined;
    this.previewUrl = null;
    this.modalVisible = false;
  }

  compareCategoria(categoria1: Categoria, categoria2: Categoria) {
    return categoria1 && categoria2 ? categoria1.id === categoria2.id : categoria1 === categoria2;
  }

  compareLaboratorio(laboratorio1: Laboratorio, laboratorio2: Laboratorio) {
    return laboratorio1 && laboratorio2 ? laboratorio1.id === laboratorio2.id : laboratorio1 === laboratorio2;
  }
}
