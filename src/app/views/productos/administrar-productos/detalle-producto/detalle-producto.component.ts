import { Component, Input, Output } from '@angular/core';
import { Producto } from 'src/app/classes/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss']
})
export class DetalleProductoComponent {

  @Input() productoGestion: Producto = new Producto();

  previewUrl: string | ArrayBuffer | null = null;

  modalVisible: boolean = false;

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
  }

  mostrarDetalle(): void {
    setTimeout(() => {
      if (this.productoGestion.rutaImagen != undefined && this.productoGestion.rutaImagen != '') {
        this.previewUrl = this.productoService._urlEndPoint + '/images/' + this.productoGestion.id;
      }else{
        this.previewUrl = this.productoService._urlEndPoint + '/images/0';
      }
    }, 500);

    this.modalVisible = true;
  }

  cerrarModal(): void {
    this.productoGestion = new Producto();
    this.previewUrl = null;
    this.modalVisible = false;
  }

}
