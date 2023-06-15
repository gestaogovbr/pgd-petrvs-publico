import { Base } from './base.model';
import { PlanoEntregaEntrega } from './plano-entrega-entrega.model';
import { Plano } from './plano.model';

export class PlanoTrabalhoEntrega extends Base {
    public plano?: Plano;
    public entrega?: PlanoEntregaEntrega;

    public nome: string = "";
    public plano_id: string = "";
    public entrega_id: string = "";

    public constructor(data?: any) { super(); this.initialization(data); }
}