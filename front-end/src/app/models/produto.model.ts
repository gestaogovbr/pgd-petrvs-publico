import { Base } from "./base.model";
import { ProdutoCliente } from "./produto-cliente.model";
import { ProdutoProcesso } from "./produto-processo.model";
import { ProdutoProduto } from "./produto-produto.model";
import { ProdutoSolucao } from "./produto-solucao.model";
import { Unidade } from "./unidade.model";
import { Usuario } from "./usuario.model";

export type ProdutoTipos = "produto" | "servico";

export class Produto extends Base {
  public identificador: number = 0;
  public nome: string = ""; /* Nome do produto */
  public responsavel_id: string = "";
  public responsavel?: Usuario;
  public data_ativado: null|Date = null; /* Data de ativação do produto */
  public data_desativado: null|Date = null; /* Data de desativação do produto */
  public nome_fantasia: string = ""; /* Nome fantasia/sigla do produto */
  public tipo: ProdutoTipos = "produto"; /* Tipo do produto (Produto ou Serviço) */
  public descricao: string = ""; /* Descrição do produto */
  public url: string = ""; /* URL do produto */
  public produto_processo_cadeia_valor: ProdutoProcesso[] = []; /* Processos da cadeia de valor do produto */
  public produto_produto: ProdutoProduto[] = []; /* Produtos do produto */
  public produto_cliente: ProdutoCliente[] = []; /* Clientes do produto */
  public produto_solucoes: ProdutoSolucao[] = []; /* Soluções do produto */
  public unidade?: Unidade;
  public unidade_id: string = ""; /* ID da unidade executora do produto */
  public constructor(data?: any) { super(); this.initialization(data); }
}