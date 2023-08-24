import { Base, IntegranteAtribuicao } from './base.model';

export class UnidadeIntegranteAtribuicao extends Base {
    public atribuicao?: IntegranteAtribuicao;// = "COLABORADOR";
    public unidade_integrante_id: string = ""; /* ID da Unidade x Usuário */

    public constructor(data?: any) { super(); this.initialization(data); }
}