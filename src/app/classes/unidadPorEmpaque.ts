import { UnidadMedida } from './unidadMedida';

export class UnidadPorEmpaque {
  id: number;
  unidadPrincipal: UnidadMedida;
  unidadReferencia: UnidadMedida;
  cantidad: number;
}
