import { Base } from './base.model';
import { Atividade } from './atividade.model';
import { PlanoTrabalho } from './plano-trabalho.model';

export class PlanoTrabalhoAtividade extends Base {
    public plano_trabalho?: PlanoTrabalho;
    public atividade?: Atividade;

    public plano_trabalho_id: string = "";
    public atividade_id: string = "";

    public constructor(data?: any) { super(); this.initialization(data); }
}
