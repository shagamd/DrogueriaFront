import { Impuesto } from "./impuesto";

export class GrupoImpuesto {
    id: number;
    nombre: string;
    arImpuestos: Impuesto[] = [];
}
