import { Avaliacao, HasAvaliacao } from './avaliacao.model';
import { Base } from './base.model';
import { PlanoTrabalho } from './plano-trabalho.model';
import { HasStatus, StatusJustificativa } from './status-justificativa.model';

export type PlanoTrabalhoConsolidacaoStatus = 'CONCLUIDO' | 'AVALIADO' | 'INCLUIDO' | 'AGUARDANDO_REGISTRO';

export class PlanoTrabalhoConsolidacao extends Base implements HasAvaliacao, HasStatus {
    public plano_trabalho?: PlanoTrabalho;
    public avaliacao?: Avaliacao;

    public data_inicio: Date = new Date();
    public data_fim: Date = new Date();
    public status: PlanoTrabalhoConsolidacaoStatus = "INCLUIDO"; // Status atual da consolidação
    public avaliacoes: Avaliacao[] = [];
    public status_historico: StatusJustificativa[] = [];

    public plano_trabalho_id: string = "";
    public avaliacao_id: string | null = null;
    public justificativa_conclusao: string | null = null;

    public constructor(data?: any) { super(); this.initialization(data); }
}