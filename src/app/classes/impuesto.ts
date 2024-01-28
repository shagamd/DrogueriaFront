export class Impuesto {
    id: number;
    abreviatura: string;
    nombre: string;
    descripcion: string;
    porcentajeImpuesto: number;
    fechaInicialVigencia: Date = new Date();
    fechaFinalVigencia: Date = new Date();
}
