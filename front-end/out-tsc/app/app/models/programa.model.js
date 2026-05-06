import { Base } from './base.model';
export class Programa extends Base {
    constructor(data) {
        super();
        this.nome = ""; /* Nome do programa */
        this.normativa = ""; /* Normativa que regula o programa */
        this.link_normativa = ""; /* Link da Normativa que regula o programa */ //
        this.link_autorizacao = ""; /* Link da Normativa que autoriza o programa */ //
        this.config = null; /* Configuração extra de programa */
        this.data_inicio = new Date(); /* Data de início vigência */
        this.data_fim = new Date(); /* Data de fim vigência */
        this.termo_obrigatorio = true; /* tinyint; NOT NULL; */
        this.prazo_max_plano_entrega = 365; /*Limite máximo de dias corridos para o plano de entregas (Zero para não limitar) */
        this.periodicidade_consolidacao = 'MENSAL'; /* Período para avaliação do plano de trabalho */
        this.periodicidade_valor = 1; /* Representa quantidade de dias para DIAS; dia da semana para SEMANAL e QUINZENAL; e dia do mês para o restante */
        this.dias_tolerancia_consolidacao = 10; /* Dias de tolerância para o lançamento do registro das atividades na consolidação, após esses dias será liberado automaticamente para avaliação */
        this.dias_tolerancia_avaliacao = 20; /* Dias de tolerância para realizar a avaliação, considerando a tolerância da consolidação. Caso seja zero não fará nada, caso contrário após esse prazo a consolidação será automaticamente avaliada com a nota padrão */
        this.dias_tolerancia_recurso_avaliacao = 10; /* Dias de tolerância para realizar a avaliação, considerando a tolerância da consolidação. Caso seja zero não fará nada, caso contrário após esse prazo a consolidação será automaticamente avaliada com a nota padrão */
        this.nota_padrao_avaliacao = null; /* Nota padrão de avaliação, para quando o gestor não realizar a avaliação dentro do prazo */
        this.checklist_avaliacao_entregas_plano_entrega = []; //Checklist para avaliação das entregas do plano de entrega
        this.checklist_avaliacao_entregas_plano_trabalho = []; //Checklist para avaliação das entregas do plano de trabalho
        this.registra_comparecimento = 1; /* Se registra comparecimento na consolidação do plano de trabalho */
        this.plano_trabalho_assinatura_participante = 1; /* Exigir assinatura do usuário no plano de trabalho */
        this.plano_trabalho_assinatura_gestor_lotacao = 1; /* Exigir assinatura do gestor da unidade de lotação do servidor */
        this.plano_trabalho_assinatura_gestor_unidade = 1; /* Exigir assinatura do gestor da unidade */
        this.plano_trabalho_assinatura_gestor_entidade = 0; /* Exigir assinatura do gestor da entidade */
        this.plano_trabalho_criterios_avaliacao = []; /* Critérios de avaliação do plano de trabalho */
        this.tipo_avaliacao_plano_trabalho_id = ""; /* Tipo de avaliação do plano de trabalho */
        this.tipo_avaliacao_plano_entrega_id = ""; /* Tipo de avaliação do plano de entrega */
        this.tipo_justificativa_id = null; /* Tipo de justificativa, para quando o gestor não realizar a avaliação dentro do prazo */
        this.unidade_id = ""; /* Unidade vinculada ao programa */
        this.unidade_autorizadora_id = ""; /* Unidade que autoriza o programa */
        this.template_tcr_id = null; /* Template do TCR */
        this.tipo_documento_tcr_id = null; /* Tipo de documento do TCR */
        this.initialization(data);
    }
}
//# sourceMappingURL=programa.model.js.map