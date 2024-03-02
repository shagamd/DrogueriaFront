import { PuntoVenta } from "./puntoVenta";

export class Usuario {
    id: number;
    documento: string;
    password: string;
    nombre: string;
    email: string;
    estado: boolean;
    roles: string[];
    telefono: string;
    puntoVenta: PuntoVenta;
}

export class UsuarioResumen {
    id: number;
    nombre: string;
}
