import { Base } from './base.model';

export type IntegranteAtribuicao = "AVALIADOR_PLANO_ENTREGA" | "AVALIADOR_PLANO_TRABALHO" | "HOMOLOGADOR_PLANO_ENTREGA" | "LOTADO" | "COLABORADOR" | "GESTOR" | "GESTOR_SUBSTITUTO";

export class UnidadeIntegranteAtribuicao extends Base {
    public atribuicao: IntegranteAtribuicao = "COLABORADOR";
    public unidade_integrante_id: string = ""; /* ID da Unidade x Usuário */

    public constructor(data?: any) { super(); this.initialization(data); }
}