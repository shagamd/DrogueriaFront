export class Cliente {
    static DOCUMENTO_GENERICO = '2222222222';

    id: number;
    documento: string;
    nombre: string;
    telefono: string;
    email: string;
    observaciones: string;
}

export class ClienteResumen {
    id: number;
    nombre: string;
}