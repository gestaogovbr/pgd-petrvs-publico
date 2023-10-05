import { Avaliacao } from './avaliacao.model';
import { Base } from './base.model';
import { TipoJustificativa } from './tipo-justificativa.model';

export class AvaliacaoJustificativa extends Base {
    public avaliacao?: Avaliacao;
    public tipo_justificativa?: TipoJustificativa;

    public avaliacao_id: string = ""; /* ID da avaliação */
    public tipo_justificativa_id: string = ""; /* ID do tipo de justificativa */

    public constructor(data?: any) { super(); this.initialization(data); }
}