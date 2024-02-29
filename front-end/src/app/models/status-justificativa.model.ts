import { Atividade, AtividadeStatus } from './atividade.model';
import { Base } from './base.model';
import { PlanoEntrega, PlanoEntregaStatus } from './plano-entrega.model';
import { PlanoTrabalhoConsolidacao, PlanoTrabalhoConsolidacaoStatus } from './plano-trabalho-consolidacao.model';
import { PlanoTrabalho, PlanoTrabalhoStatus } from './plano-trabalho.model';
import { Usuario } from './usuario.model';

export interface HasStatus {
    id: string;
    status: AtividadeStatus | PlanoTrabalhoStatus | PlanoTrabalhoConsolidacaoStatus | PlanoEntregaStatus | null;
    status_historico: StatusJustificativa[];
}

export class StatusJustificativa extends Base {
    public usuario?: Usuario; /* Usuário que promoveu a mudança de status */
    public plano_entrega?: PlanoEntrega; /* Plano de Entregas que sofreu a mudança de status */
    public plano_trabalho?: PlanoTrabalho; /* Plano de Trabalho que sofreu a mudança de status */
    public plano_trabalho_consolidacao?: PlanoTrabalhoConsolidacao; /* Consolidação de Plano de Trabalho que sofreu a mudança de status */
    public atividade?: Atividade; /* Atividade que sofreu a mudança de status */

    public codigo: string = ""; /* Código do status */
    public justificativa: string = ""; /* Justificativa da mudança para o status atual */

    public constructor(data?: any) { super(); this.initialization(data); }
}