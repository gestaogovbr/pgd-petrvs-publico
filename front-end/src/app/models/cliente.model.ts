import { Base } from "./base.model";
import { TipoCliente } from "./tipo-cliente.model";

export class Cliente extends Base {
  tipo_cliente?: TipoCliente;
  nome: string = '';
  tipo_cliente_id: string = '';
  unidade_id: string = '';
}