import { Checklist } from './atividade.model';
import { Avaliacao } from './avaliacao.model';
import { Base } from './base.model';
import { PlanoEntregaEntrega } from './plano-entrega-entrega.model';
import { PlanoTrabalhoEntrega } from './plano-trabalho-entrega.model';

export class AvaliacaoEntregaChecklist extends Base {
    public avaliacao?: Avaliacao;
    public plano_entrega_entrega?: PlanoEntregaEntrega;
    public plano_trabalho_centrega?: PlanoTrabalhoEntrega;

    public checklist: Checklist[] = [];

    public avaliacao_id: string = ""; /* ID do avaliador */
    public plano_trabalho_entrega_id: string | null = null; /* ID da entrega do plano de trabalho */
    public plano_entrega_entrega_id: string | null = null; /* ID da entrega do plano de entrega */

    public constructor(data?: any) { super(); this.initialization(data); }
}