import { Base } from "./base.model";
import { Produto } from "./produto.model";

export type ProdutoTipos = "produto" | "servico";

export class ProdutoProduto extends Base {
  public produto_base?: Produto; /* Produto base */
  public produto?: Produto; /* Produto relacionado */

  public produto_base_id: string = ''; /* ID do produto base */
  public produto_id: string = ''; /* ID do produto relacionado */
  
  public constructor(data?: any) { super(); this.initialization(data); }
}