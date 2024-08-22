import { Base } from "./base.model";

export type ProdutoTipos = "produto" | "servico";

export class Produto extends Base {
  public nome: string = ""; /* Nome do produto */
  public nome_fantasia: string = ""; /* Nome fantasia/sigla do produto */
  public tipo: ProdutoTipos = "produto"; /* Tipo do produto (Produto ou Serviço) */
  public descricao: string = ""; /* Descrição do produto */
  public url: string = ""; /* URL do produto */
  
  public constructor(data?: any) { super(); this.initialization(data); }
}