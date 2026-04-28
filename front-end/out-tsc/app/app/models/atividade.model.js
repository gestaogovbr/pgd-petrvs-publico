import { Base } from './base.model';
export class Atividade extends Base {
    constructor(data) {
        super();
        this.status_historico = []; // Mudanças de status sofridas pela atividade (histórico)
        this.numero = 0; /* Numero da atividade */
        this.descricao = ""; /* Assunto da atividade */
        this.data_distribuicao = new Date(); /* Data de cadastro da atividade */
        this.tempo_planejado = 0.0; /* Diferença entre data_distribuicao e data_estipulada_entrega em horas (úteis ou corridas, configurada na unidade) */
        this.carga_horaria = 0.0; /* Carga horária diária (vinda do plano de trabalho) */
        this.data_estipulada_entrega = new Date(); /* Data estipulada para entrega da atividade */
        this.data_inicio = null; /* Data em que o usuário iniciou a atividade */
        this.data_entrega = null; /* Data da entrega */
        this.esforco = 0.0; /* Tempo calculado a partir da atividade e utilizando o fator_complexidade */
        this.tempo_despendido = null; /* Calculado no fim da atividade, sendo o tempo líquido (considerando pausas) */
        this.data_arquivamento = null; /* Data de arquivamento da atividade */
        this.status = null; /* Status atual da atividade */
        this.etiquetas = []; /* Etiquetas */
        this.checklist = []; /* Checklist */
        this.prioridade = null; /* Nível de prioridade */
        this.progresso = 0; /* Progresso a execução da atividade */
        this.metadados = undefined; /* Campo virtual contendo informações calculadas pelo servidor */
        this.comentarios = []; /* Comentarios da atividade */
        this.pausas = []; /* Pausas da atividade */
        this.tarefas = []; /* Tarefas da atividade */
        this.plano_trabalho_id = null;
        this.plano_trabalho_entrega_id = null;
        this.plano_trabalho_consolidacao_id = null;
        this.tipo_atividade_id = null;
        this.demandante_id = "";
        this.usuario_id = null;
        this.unidade_id = "";
        this.documento_requisicao_id = null;
        this.documento_entrega_id = null;
        this.reacoes = []; /* Reações da atividade */
        this.initialization(data);
    }
}
//# sourceMappingURL=atividade.model.js.map