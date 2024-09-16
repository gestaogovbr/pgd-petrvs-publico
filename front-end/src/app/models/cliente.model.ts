import { Base } from "./base.model";
import { TipoCliente } from "./tipo-cliente.model";

export class Cliente extends Base {
  tipoCliente?: TipoCliente;
  nome: string = '';
  tipo_cliente_id: string = '';
}