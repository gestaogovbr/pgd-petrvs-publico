import { Base } from "./base.model";
import { Solucao } from "./solucao.model";
import { Produto } from "./produto.model";


export class ProdutoSolucao extends Base {
  public produto?: Produto; /* Produto */
  public solucao?: Solucao; /* Solucao */

  public produto_id: string = ''; /* ID do produto */
  public solucao_id: string = ''; /* ID da solucao */
  
  public constructor(data?: any) { super(); this.initialization(data); }
}