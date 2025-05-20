import { Base } from "./base.model";
import { ProdutoCliente } from "./produto-cliente.model";
import { TipoCliente } from "./tipo-cliente.model";

export class Cliente extends Base {
  tipo_cliente?: TipoCliente;
  cliente_produto?: ProdutoCliente[];
  nome: string = '';
  tipo_cliente_id: string = '';
  unidade_id: string | null = null;
  data_desativado: Date | null = null;
}