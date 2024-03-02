import { MedioPago } from './medioPago';
export class TipoPago {
    static CONTADO = 1;
    static CREDITO = 2;

    id: number;
    nombre: string;
    arMedioPago: MedioPago[] = [];
}