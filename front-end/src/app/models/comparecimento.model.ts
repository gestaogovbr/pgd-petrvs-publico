import { Base } from './base.model';
import { Unidade } from './unidade.model';
import { PlanoTrabalhoConsolidacao } from './plano-trabalho-consolidacao.model';

export class Comparecimento extends Base {
    public unidade?: Unidade;
    public plano_trabalho_consolidacao?: PlanoTrabalhoConsolidacao;

    public data_comparecimento: Date = new Date();
    public detalhamento: string = "";

    public plano_trabalho_consolidacao_id: string = "";
    public unidade_id: string = "";

    public constructor(data?: any) { super(); this.initialization(data); }
}