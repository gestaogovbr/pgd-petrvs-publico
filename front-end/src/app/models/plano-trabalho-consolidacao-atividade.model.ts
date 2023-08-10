import { Base } from './base.model';
import { PlanoTrabalhoConsolidacao } from './plano-trabalho-consolidacao.model';
import { PlanoTrabalhoEntrega } from './plano-trabalho-entrega.model';
import { TipoAtividade } from './tipo-atividade.model';

export class PlanoTrabalhoConsolidacaoAtividade extends Base {
    public plano_trabalho_consolidacao?: PlanoTrabalhoConsolidacao;
    public plano_trabalho_entrega?: PlanoTrabalhoEntrega;
    public tipo_atividade?: TipoAtividade;

    public esforco: number | null = null;
    public realizado: any = null;
    public descricao: string = "";

    public plano_trabalho_consolidacao_id: string = "";
    public plano_trabalho_entrega_id: string = "";
    public tipo_atividade_id: string | null = null;

    public constructor(data?: any) { super(); this.initialization(data); }
}