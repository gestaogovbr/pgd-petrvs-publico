import { Base } from './base.model';
import { Atividade } from './atividade.model';
import { Plano } from './plano.model';

export class PlanoAtividade extends Base {
    public plano?: Plano;
    public atividade?: Atividade;

    public plano_id: string = "";
    public atividade_id: string = "";

    public constructor(data?: any) { super(); this.initialization(data); }
}
