import { ProductoResumen } from './producto';
import { PuntoVentaResumen } from './puntoVenta';
import { UnidadMedida } from './unidadMedida';
export class Inventario {
    id: number;
    cantidad: number = 0;
    fechaFabricacion: Date = new Date();
    fechaVencimiento: Date;
    lote: string = "";
    observaciones: string = "";
    puntoVenta: PuntoVentaResumen;
    producto: ProductoResumen = undefined;
    unidadMedida: UnidadMedida = undefined;
}

export class InventarioResumen {
    id: number;
    cantidad: number;
    unidadMedida: UnidadMedida;
}
