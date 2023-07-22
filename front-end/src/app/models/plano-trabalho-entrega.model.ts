import { Base } from './base.model';
import { Entrega } from './entrega.model';
import { PlanoEntregaEntrega } from './plano-entrega-entrega.model';
import { PlanoTrabalho } from './plano-trabalho.model';

export class PlanoTrabalhoEntrega extends Base {
    public plano_trabalho?: PlanoTrabalho;
    public entrega?: Entrega;
    public plano_entrega_entrega?: PlanoEntregaEntrega;

    public descricao: string = "";
    public forca_trabalho: string = "1";

    public plano_trabalho_id: string = "";
    public entrega_id: string | null = null;
    public plano_entrega_entrega_id: string | null = null;

    public constructor(data?: any) { super(); this.initialization(data); }
}