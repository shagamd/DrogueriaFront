import { Factura } from './factura';
import { Cliente } from './cliente';
import { AbonoCuentaCobro } from './abonoCuentaCobro';
export class CuentaCobro {
    id: number;
    cliente: Cliente;
    factura: Factura;
    fechaUltimoPago: Date;
    valorTotal: number;
    saldoActual: number;
    estado: boolean;
    abonosCuentaCobro: AbonoCuentaCobro[] = [];
}