import { Base } from "./base.model";
import { Cliente } from "./cliente.model";
import { Produto } from "./produto.model";
import { Unidade } from "./unidade.model";

export type ProdutoOrigem = "interno" | "externo" | null;

export class ProdutoInsumo extends Base {
  static readonly ORIGEM_INTERNA: string = 'interno';
  static readonly ORIGEM_EXTERNA: string = 'externo';

  public produto?: Produto; /* Produto base */
  public origem: ProdutoOrigem = null;
  public produto_relacionado?: Produto; /* Produto relacionado */
  public unidade?: Unidade;
  public cliente?: Cliente;

  public produto_id: string = ''; /* ID do produto base */
  public unidade_id: string = '';
  public produto_insumo_id: string = ''; /* ID do produto relacionado */
  public cliente_id: string = '';
  public descricao: string = '';

  public constructor(data?: any) { super(); this.initialization(data); }
}