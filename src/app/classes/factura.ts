import { FacturaDetalle } from './factura_detalle';
import { UsuarioResumen } from './usuario';
import { Cliente } from './cliente';
import { EstadoFactura } from './estadoFactura';
import { MedioPago } from './medioPago';
export class Factura {
    id: number;
    fechaFactura: Date = new Date();
    totalBruto: number = 0;
    totalImpuesto: number = 0;
    totalDescuento: number = 0;
    total: number = 0;
    estadoFactura: EstadoFactura;
    cliente: Cliente;
    usuarioFactura: UsuarioResumen;
    detalleFactura: FacturaDetalle[] = [];
    medioPago: MedioPago;
    soportePago: string = "";
    itemVisible: boolean = false;
}

export class TotalFacturaModel {
    fechaFactura: string;
    total: number = 0;
    totalMoneda: string;
}