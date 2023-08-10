import { Base } from './base.model';
import { Template } from './template.model';
import { TipoAvaliacao } from './tipo-avaliacao.model';
import { TipoDocumento } from './tipo-documento.model';
import { Unidade } from './unidade.model';

export type ProgramaPeriodicidadeConsolidacao = 'DIAS' | 'SEMANAL' | 'QUINZENAL' | 'MENSAL' | 'BIMESTRAL' | 'TRIMESTRAL' | 'SEMESTRAL';

export class Programa extends Base {
    public unidade?: Unidade;
    public template_tcr?: Template;
    public tipo_avaliacao?: TipoAvaliacao;
    public tipo_documento_tcr?: TipoDocumento;

    public nome: string = ""; /* Nome do programa */
    public normativa: string = ""; /* Normativa que regula o programa */
    public config: string | null = null; /* Configuração extra de programa */
    public data_inicio_vigencia: Date = new Date(); /* Data de início vigencia */
    public data_fim_vigencia: Date = new Date(); /* Data de fim vigencia */
    public termo_obrigatorio: boolean = false; /* tinyint; NOT NULL; */
    public prazo_max_plano_entrega: number = 365; /*Limite máximo de dias corridos para o plano de entregas (Zero para não limitar) */
    public periodicidade_consolidacao: ProgramaPeriodicidadeConsolidacao = 'MENSAL'; /* Período para avaliação do plano de trabalho */
    public periodicidade_valor: number = 1; /* Representa quantidade de dias para DIAS; dia da semana para SEMANAL e QUINZENAL; e dia do mês para o restante */
    public dias_tolerancia_consolidacao: number = 10; /* Dias de tolerância para o lançamento do registro das atividades na consolidação, após esses dias será liberado automaticamente para avaliação */

    public tipo_avaliacao_id: string = ""; /* Tipo de avaliação */
    public unidade_id: string = ""; /* Unidade vinculada ao programa */
    public template_tcr_id: string | null = null; /* Template do TCR */
    public tipo_documento_tcr_id: string | null = null; /* Tipo de documento do TCR */

    public constructor(data?: any) { super(); this.initialization(data); }
}
