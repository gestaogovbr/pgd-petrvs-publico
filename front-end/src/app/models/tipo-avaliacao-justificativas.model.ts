import { Base } from './base.model';
import { TipoAvaliacaoNota } from './tipo-avaliacao-nota';
import { TipoJustificativa } from './tipo-justificativa.model';

export class TipoAvaliacaoJustificativa extends Base {
    public tipo_justificativa?: TipoJustificativa;
    public tipo_avaliacao_nota?: TipoAvaliacaoNota;

    public tipo_avaliacao_nota_id: string = "";
    public tipo_justificativa_id: string = "";

    public constructor(data?: any) { super(); this.initialization(data); }
}