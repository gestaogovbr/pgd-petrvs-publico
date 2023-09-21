import { Base } from './base.model';
import { Unidade } from './unidade.model';
import { PlanoTrabalhoConsolidacao } from './plano-trabalho-consolidacao.model';

export class Comparecimento extends Base {
    public unidade?: Unidade;
    public data_comparecimento: Date = new Date();
    public plano_trabalho_consolidacao?: PlanoTrabalhoConsolidacao;

    public constructor(data?: any) { super(); this.initialization(data); }
}

 