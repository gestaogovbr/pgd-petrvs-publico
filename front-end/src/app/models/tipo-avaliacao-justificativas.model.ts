import { Base } from './base.model';
import { TipoAvaliacaoNota } from './tipo-avaliacao.model';
import { TipoJustificativa } from './tipo-justificativa.model';

export class TipoAvaliacaoJustificativa extends Base {
    public tipo_justificativa?: TipoJustificativa;

    public nota: TipoAvaliacaoNota = {nota: null};
    public tipo_avaliacao_id: string = "";
    public tipo_justificativa_id: string = "";

    public constructor(data?: any) { super(); this.initialization(data); }
}