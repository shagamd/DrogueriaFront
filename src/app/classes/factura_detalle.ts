import { ProductoResumen } from './producto';
import { UnidadMedida } from './unidadMedida';
export class FacturaDetalle {
    esOferta: boolean = false;
    producto: ProductoResumen = undefined;
    unidadMedida: UnidadMedida = undefined;
    cantidad: number = 0;
    precioUnitario: number = 0;
    valorBruto: number = 0;
    valorDescuento: number = 0;
    valorImpuesto: number = 0;
    valorTotal: number = 0;
}
