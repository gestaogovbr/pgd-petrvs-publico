import { Base } from './base.model';
import { Entrega } from './entrega.model';
import { PlanoEntregaEntrega } from './plano-entrega-entrega.model';
import { PlanoTrabalho } from './plano-trabalho.model';

export type PlanoTrabalhoEntregaTipo = 'PROPRIA_UNIDADE' | 'OUTRA_UNIDADE' | 'OUTRO_ORGAO' | 'SEM_ENTREGA';

export class PlanoTrabalhoEntrega extends Base {
    public plano_trabalho?: PlanoTrabalho;
    public plano_entrega_entrega?: PlanoEntregaEntrega;

    public descricao: string = "";
    public orgao: string | null = null;
    public forca_trabalho: number = 1;

    public plano_trabalho_id: string = "";
    public plano_entrega_entrega_id: string | null = null;

    public constructor(data?: any) { super(); this.initialization(data); }
}