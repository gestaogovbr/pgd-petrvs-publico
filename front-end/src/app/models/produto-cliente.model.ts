import { Base } from "./base.model";
import { Cliente } from "./cliente.model";
import { Produto } from "./produto.model";


export class ProdutoCliente extends Base {
  public produto?: Produto; /* Produto */
  public cliente?: Cliente; /* Produto */

  public produto_id: string = ''; /* ID do produto */
  public cliente_id: string = ''; /* ID do cliente */
  
  public constructor(data?: any) { super(); this.initialization(data); }
}