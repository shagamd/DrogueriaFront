import { Categoria } from './categoria';
import { Laboratorio } from './laboratorio';
import { ObservacionProducto } from './observacionProducto';
import { UnidadMedida } from './unidadMedida';
import { UnidadPorEmpaque } from './unidadPorEmpaque';
import { Precio } from './precio';
import { GrupoImpuesto } from './grupoImpuestos';

export class Producto {
  id: number;
  nombre: string = '';
  codigoBarras: string = '';
  descripcion: string = '';
  categoria: Categoria = undefined;
  laboratorio: Laboratorio = undefined;
  estado: boolean = true;
  rutaImagen: string = '';
  arObservaciones: ObservacionProducto[] = [];
  arUnidadesPorEmpaque: UnidadPorEmpaque[] = [];
  arPrecios: Precio[] = [];
  grupoImpuestos: GrupoImpuesto = undefined;
  unidadMedidaVenta: UnidadMedida = undefined;
  fechaRegistro: Date = new Date();
}

export class CombosGestionProductos {
  categorias: Categoria[];
  laboratorios: Laboratorio[];
  unidadesMedida: UnidadMedida[];
  grupoImpuestos: GrupoImpuesto[];
}
