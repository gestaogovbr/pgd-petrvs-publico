import { Base } from './base.model';
import { TipoJustificativa } from './tipo-justificativa.model';

export class TipoAvaliacaoJustificativa extends Base {
    public tipo_justificativa?: TipoJustificativa;

    public tipo_avaliacao_id: string = "";
    public tipo_justificativa_id: string = "";

    constructor(){
        super();
    }
}