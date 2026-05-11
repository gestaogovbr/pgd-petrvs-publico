import { Base } from "./base.model";
export class Produto extends Base {
    constructor(data) {
        super();
        this.identificador = 0;
        this.nome = ""; /* Nome do produto */
        this.responsavel_id = "";
        this.data_ativado = null; /* Data de ativação do produto */
        this.data_desativado = null; /* Data de desativação do produto */
        this.nome_fantasia = ""; /* Nome fantasia/sigla do produto */
        this.tipo = "produto"; /* Tipo do produto (Produto ou Serviço) */
        this.descricao = ""; /* Descrição do produto */
        this.url = ""; /* URL do produto */
        this.produto_processo_cadeia_valor = []; /* Processos da cadeia de valor do produto */
        this.produto_insumos = []; /* Produtos do produto */
        this.produto_cliente = []; /* Clientes do produto */
        this.produto_solucoes = []; /* Soluções do produto */
        this.unidade_id = ""; /* ID da unidade executora do produto */
        this.initialization(data);
    }
}
//# sourceMappingURL=produto.model.js.map