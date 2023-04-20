import { Base } from './base.model';
import { PlanoEntregaEntrega } from './plano-entrega-entrega.model';
import { Plano } from './plano.model';

export class PlanoTrabalhoEntrega extends Base {
    public plano?: Plano;
    public entrega?: PlanoEntregaEntrega;

    public nome: string = "";
    public data_inicio: Date = new Date(); /* Data de início */
    public data_fim: Date | null = null; /* Data do fim */
    public plano_id: string = "";
    public entrega_id: string = "";

    public constructor(data?: any) { super(); this.initialization(data); }
}