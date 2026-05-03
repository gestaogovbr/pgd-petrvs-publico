import { Base } from './base.model';
;
export class PlanoEntregaEntrega extends Base {
    constructor(data) {
        super();
        this.objetivos = [];
        this.processos = [];
        this.produtos = [];
        this.data_inicio = new Date();
        this.data_fim = null;
        this.descricao = "";
        this.descricao_meta = "";
        this.descricao_entrega = "";
        this.homologado = false;
        this.meta = {};
        this.realizado = {};
        this.progresso_esperado = 100;
        this.progresso_realizado = 0;
        this.destinatario = '';
        this.avaliacoes = [];
        this.comentarios = []; /* Comentarios da etrega */
        this.reacoes = []; /* Reações da entrega */
        this.etiquetas = []; /* Etiquetas */
        this.checklist = []; /* Checklist */
        this.entrega_id = '';
        this.unidade_id = '';
        this.entrega_pai_id = null;
        this.avaliacao_id = null;
        this.plano_entrega_id = null;
        this.initialization(data);
    }
}
//# sourceMappingURL=plano-entrega-entrega.model.js.map