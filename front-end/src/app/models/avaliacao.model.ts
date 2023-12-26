import { LookupItem } from '../services/lookup.service';
import { Checklist } from './atividade.model';
import { AvaliacaoEntregaChecklist } from './avaliacao-entrega-checklist.model';
import { Base } from './base.model';
import { PlanoEntrega } from './plano-entrega.model';
import { PlanoTrabalhoConsolidacao } from './plano-trabalho-consolidacao.model';
import { TipoAvaliacao } from './tipo-avaliacao.model';
import { Usuario } from './usuario.model';

export interface HasAvaliacao {
    avaliacoes: Avaliacao[];
    avaliacao?: Avaliacao;
    avaliacao_id: string | null;
    id: string;
};

export class Avaliacao extends Base {
    public avaliador?: Usuario;
    public tipo_avaliacao?: TipoAvaliacao;
    public plano_entrega?: PlanoEntrega;
    public plano_trabalho_consolidacao?: PlanoTrabalhoConsolidacao;

    public data_avaliacao: Date = new Date(); /* Data e hora da avaliação */
    public nota: any = 0; /* Nota atribuida */
    public justificativa: string | null = null; /* Justificativa da nota atribuida */
    public recurso: string | null = null; /* Recurso */
    public justificativas: LookupItem[] = []; /* Justificativas */
    public entregas_checklist: AvaliacaoEntregaChecklist[] = []; /* Checklist das entregas */

    public avaliador_id: string = ""; /* ID do avaliador */
    public plano_trabalho_consolidacao_id: string | null = null; /* ID do Usuario */
    public plano_entrega_id: string | null = null; /* ID do Plano de Entrega */
    public tipo_avaliacao_id: string = ""; /* ID do Tipo de Avaliacao */

    public constructor(data?: any) { super(); this.initialization(data); }
}