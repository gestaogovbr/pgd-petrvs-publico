import { Base } from './base.model';
import { ProdutoSolucao } from './produto-solucao.model';
import { SolucaoUnidade } from './solucao-unidade.model';

export class Solucao extends Base {
  public identificador: number = 0;
  public nome: string = ""; 
  public sigla: string = ""; 
  public descricao?: string = ""; 
  public url?: string = ""; 
  public solucoes_unidades?: SolucaoUnidade[] = [];
  public produtos_solucoes?: ProdutoSolucao[] = [];
  public constructor(data?: any) { super(); this.initialization(data); }
}

