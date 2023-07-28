import { Categoria } from './categoria';
import { Laboratorio } from './laboratorio';

export class Producto {
  id: number;
  nombre: string = '';
  codigoBarras: string = '';
  descripcion: string = '';
  categoria: Categoria = undefined;
  laboratorio: Laboratorio = undefined;
  estado: boolean = true;
  rutaImagen: string = '';
}

export class CombosGestionProductos {
  categorias: Categoria[];
  laboratorios: Laboratorio[];
}
