import { Base } from './base.model';
import { Template } from './template.model';
import { TipoDocumento } from './tipo-documento.model';
import { Unidade } from './unidade.model';

export type ProgramaPeriodoAvaliacao = 'SEMANAL' | 'QUINZENAL' | 'MENSAL' | 'BIMESTRAL' | 'TRIMESTRAL' | 'SEMESTRAL';

export class Programa extends Base {
    public unidade?: Unidade;
    public template_tcr?: Template;
    public tipo_documento_tcr?: TipoDocumento;

    public nome: string = ""; /* Nome do programa */
    public normativa: string = ""; /* Normativa que regula o programa */
    public config: string | null = null; /* Configuração extra de programa */
    public unidade_id: string = ""; /* Unidade vinculada ao programa */
    public data_inicio_vigencia: Date = new Date(); /* Data de início vigencia */
    public data_fim_vigencia: Date = new Date(); /* Data de fim vigencia */
    public data_inicio: Date = new Date(); /* Data de início */
    public data_fim: Date | null = null; /* Data do fim */
    public periodo_avaliacao: ProgramaPeriodoAvaliacao = 'MENSAL'; /* Período para avaliação do plano */
    public template_tcr_id: string | null = null; /* Template do TCR */
    public termo_obrigatorio: boolean = false; /* tinyint; NOT NULL; */
    public tipo_documento_tcr_id: string | null = null; /* Tipo de documento do TCR */
    public prazo_execucao: number = 365; /*Limite máximo de dias corridos para o plano de entregas (Zero para não limitar) */

    public constructor(data?: any) { super(); this.initialization(data); }
}
