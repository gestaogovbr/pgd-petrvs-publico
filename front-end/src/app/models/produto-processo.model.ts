import { Base } from "./base.model";
import { CadeiaValorProcesso } from "./cadeia-valor-processo.model";
import { Produto } from "./produto.model";

export type ProdutoTipos = "produto" | "servico";

export class ProdutoProcesso extends Base {
  public cadeia_valor_processo?: CadeiaValorProcesso; /* Processo da cadeia de valor */
  public produto?: Produto; /* Produto */

  public cadeia_valor_processo_id: string = ''; /* ID do processo da cadeia de valor */
  public produto_id: string = ''; /* ID do produto */
  
  public constructor(data?: any) { super(); this.initialization(data); }
}