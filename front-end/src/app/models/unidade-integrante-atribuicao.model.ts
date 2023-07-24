import { Base } from './base.model';

export type Atribuicao = "AVALIADOR_PLANO_ENTREGA" | "AVALIADOR_PLANO_TRABALHO" | "HOMOLOGADOR_PLANO_ENTREGA" | "LOTADO" | "COLABORADOR" | "GESTOR" | "GESTOR_SUBSTITUTO";

export class UnidadeIntegranteAtribuicao extends Base {
    public atribuicao: Atribuicao = "COLABORADOR";

    public unidade_usuario_id: string = ""; /* ID da Unidade x Usuário */

    public constructor(data?: any) { super(); this.initialization(data); }
}