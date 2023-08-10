import { Base } from './base.model';
import { PlanoTrabalhoConsolidacao } from './plano-trabalho-consolidacao.model';

export class PlanoTrabalhoConsolidacaoOcorrencia extends Base {
    public plano_trabalho_consolidacao?: PlanoTrabalhoConsolidacao;

    public data_inicio: Date = new Date();
    public data_fim: Date = new Date();
    public descricao: string = "";

    public plano_trabalho_consolidacao_id: string = "";

    public constructor(data?: any) { super(); this.initialization(data); }
}