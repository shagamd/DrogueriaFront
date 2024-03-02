import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Inventario, InventarioResumen } from 'src/app/classes/inventario';
import { Producto } from 'src/app/classes/producto';
import { UnidadMedida } from 'src/app/classes/unidadMedida';
import { InventarioService } from 'src/app/services/inventario.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss']
})
export class DetalleProductoComponent {

  @Input() productoGestion: Producto = new Producto();
  @Output('limpiarProducto') limpiarProducto = new EventEmitter();

  previewUrl: string | ArrayBuffer | null = null;
  arInventarioProducto: InventarioResumen[] = [];

  modalVisible: boolean = false;

  constructor(private productoService: ProductoService, private inventarioService: InventarioService) { }

  ngOnInit(): void {
  }

  mostrarDetalle(): void {
    setTimeout(() => {
      if (this.productoGestion.rutaImagen != undefined && this.productoGestion.rutaImagen != '') {
        this.previewUrl = this.productoService._urlEndPoint + '/images/' + this.productoGestion.id;
      }else{
        this.previewUrl = this.productoService._urlEndPoint + '/images/0';
      }
      this.inventarioService.obtenerInventarioResumen(this.productoGestion.id).subscribe(res => this.arInventarioProducto = res);
    }, 500);
    
    this.modalVisible = true;
  }

  obtenerInventarioPorUMV(unidadMedida: UnidadMedida): InventarioResumen | null {
    return this.arInventarioProducto.find(el => el.unidadMedida.id == unidadMedida.id);
  }

  cerrarModal(): void {
    this.arInventarioProducto = [];
    this.limpiarProducto.emit();
    this.previewUrl = null;
    this.modalVisible = false;
  }

}
