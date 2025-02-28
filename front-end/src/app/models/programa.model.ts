import { LookupItem } from '../services/lookup.service';
import { Base } from './base.model';
import { Template } from './template.model';
import { TipoAvaliacao } from './tipo-avaliacao.model';
import { TipoDocumento } from './tipo-documento.model';
import { Unidade } from './unidade.model';

export type ProgramaPeriodicidadeConsolidacao = 'DIAS' | 'SEMANAL' | 'QUINZENAL' | 'MENSAL' | 'BIMESTRAL' | 'TRIMESTRAL' | 'SEMESTRAL';

export class Programa extends Base {
    public unidade?: Unidade;
    // public unidade_autorizadora?: Unidade;
    public template_tcr?: Template;
    public tipo_avaliacao_plano_trabalho?: TipoAvaliacao;
    public tipo_avaliacao_plano_entrega?: TipoAvaliacao;
    public tipo_documento_tcr?: TipoDocumento;

    public nome: string = ""; /* Nome do programa */
    public normativa: string = ""; /* Normativa que regula o programa */
    public link_normativa: string = ""; /* Link da Normativa que regula o programa *///
    public link_autorizacao: string = ""; /* Link da Normativa que autoriza o programa *///
    public config: string | null = null; /* Configuração extra de programa */
    public data_inicio: Date = new Date(); /* Data de início vigência */
    public data_fim: Date = new Date(); /* Data de fim vigência */
    public termo_obrigatorio: boolean = true; /* tinyint; NOT NULL; */
    public prazo_max_plano_entrega: number = 365; /*Limite máximo de dias corridos para o plano de entregas (Zero para não limitar) */
    public periodicidade_consolidacao: ProgramaPeriodicidadeConsolidacao = 'MENSAL'; /* Período para avaliação do plano de trabalho */
    public periodicidade_valor: number = 1; /* Representa quantidade de dias para DIAS; dia da semana para SEMANAL e QUINZENAL; e dia do mês para o restante */
    public dias_tolerancia_consolidacao: number = 10; /* Dias de tolerância para o lançamento do registro das atividades na consolidação, após esses dias será liberado automaticamente para avaliação */
    public dias_tolerancia_avaliacao: number = 20; /* Dias de tolerância para realizar a avaliação, considerando a tolerância da consolidação. Caso seja zero não fará nada, caso contrário após esse prazo a consolidação será automaticamente avaliada com a nota padrão */
    public dias_tolerancia_recurso_avaliacao: number = 10; /* Dias de tolerância para realizar a avaliação, considerando a tolerância da consolidação. Caso seja zero não fará nada, caso contrário após esse prazo a consolidação será automaticamente avaliada com a nota padrão */
    public nota_padrao_avaliacao: any | null = null; /* Nota padrão de avaliação, para quando o gestor não realizar a avaliação dentro do prazo */
    public checklist_avaliacao_entregas_plano_entrega: LookupItem[] = []; //Checklist para avaliação das entregas do plano de entrega
    public checklist_avaliacao_entregas_plano_trabalho: LookupItem[] = []; //Checklist para avaliação das entregas do plano de trabalho
    public registra_comparecimento: number = 1; /* Se registra comparecimento na consolidação do plano de trabalho */
    public plano_trabalho_assinatura_participante: number = 1; /* Exigir assinatura do usuário no plano de trabalho */
    public plano_trabalho_assinatura_gestor_lotacao: number = 1; /* Exigir assinatura do gestor da unidade de lotação do servidor */
    public plano_trabalho_assinatura_gestor_unidade: number = 1; /* Exigir assinatura do gestor da unidade */
    public plano_trabalho_assinatura_gestor_entidade: number = 0; /* Exigir assinatura do gestor da entidade */
    public plano_trabalho_criterios_avaliacao: LookupItem[] = []; /* Critérios de avaliação do plano de trabalho */

    public tipo_avaliacao_plano_trabalho_id: string = ""; /* Tipo de avaliação do plano de trabalho */
    public tipo_avaliacao_plano_entrega_id: string = ""; /* Tipo de avaliação do plano de entrega */
    public tipo_justificativa_id: string | null = null; /* Tipo de justificativa, para quando o gestor não realizar a avaliação dentro do prazo */
    public unidade_id: string = ""; /* Unidade vinculada ao programa */
    public unidade_autorizadora_id: string = ""; /* Unidade que autoriza o programa */
    public template_tcr_id: string | null = null; /* Template do TCR */
    public tipo_documento_tcr_id: string | null = null; /* Tipo de documento do TCR */

    public constructor(data?: any) { super(); this.initialization(data); }
}
