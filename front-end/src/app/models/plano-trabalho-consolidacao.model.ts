import { Avaliacao, HasAvaliacao } from './avaliacao.model';
import { Base } from './base.model';
import { PlanoTrabalho } from './plano-trabalho.model';
import { HasStatus, Status } from './status.model';

export class PlanoTrabalhoConsolidacao extends Base implements HasAvaliacao, HasStatus {
    public plano_trabalho?: PlanoTrabalho;
    public avaliacao?: Avaliacao;
    public status?: Status;

    public data_inicio: Date = new Date();
    public data_fim: Date = new Date();
    public avaliacoes: Avaliacao[] = [];
    public status_historico: Status[] = [];

    public plano_trabalho_id: string = "";
    public avaliacao_id: string | null = null;
    public status_id: string = "";

    public constructor(data?: any) { super(); this.initialization(data); }
}