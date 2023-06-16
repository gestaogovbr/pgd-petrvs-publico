import { Base } from './base.model';
import { Entrega } from './entrega.model';
import { PlanoEntregaEntrega } from './plano-entrega-entrega.model';
import { Plano } from './plano.model';

export class PlanoTrabalhoEntrega extends Base {
    public plano?: Plano;
    public entrega?: Entrega;
    public entregaPlanoEntrega?: PlanoEntregaEntrega;

    public nome: string = "";
    public descricao: string = "";
    public forca_trabalho: string = "0.00";
    public plano_id: string = "";
    public entrega_id: string = "";
    public plano_entrega_entrega_id: string = "";

    public constructor(data?: any) { super(); this.initialization(data); }
}