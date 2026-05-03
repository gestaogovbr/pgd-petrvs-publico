import { Base } from './base.model';
;
export class Documento extends Base {
    static { this.STATUS_GERADO = "GERADO"; }
    static { this.STATUS_AGUARDANDO_SEI = "GERADO"; }
    constructor(data) {
        super();
        this.assinaturas = [];
        this.numero = 0; /* Numero do documento (gerado pelo sistema) */
        this.titulo = ""; /* Título do documento */
        this.tipo = "HTML"; /* Especificação da espécie do documento (interno do sistema) */
        this.especie = "OUTRO"; /* Especificação da espécie do documento (interno do sistema) */
        this.conteudo = null; /* "Conteúdo do arquivo */
        this.metadados = null; /* Metadados */
        this.link = null;
        this.status = "GERADO";
        this.template = null; /* Campo de Template */
        this.dataset = null; /* DataSet do template (Define as variáveis disponíveis) */
        this.datasource = null; /* DataSource do template (Dados disponíveis para interpolação) */
        this.entidade_id = null; /* Entidade */
        this.tipo_documento_id = null; /* Tipo documento */
        this.tipo_processo_id = null; /* Tipo processo */
        this.template_id = null; /* Template */
        this.plano_trabalho_id = null; /* Plano de trabalho */
        this.atividade_id = null; /* Atividade */
        this.atividade_tarefa_id = null; /* Tarefa da Atividade */
        this.initialization(data);
    }
}
//# sourceMappingURL=documento.model.js.map