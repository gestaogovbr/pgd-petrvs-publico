import { Base } from './base.model';
export class TipoAvaliacaoNota extends Base {
    constructor(data) {
        super();
        this.sequencia = 0;
        this.nota = 0;
        this.descricao = "";
        this.aprova = false;
        this.justifica = false;
        this.pergunta = "";
        this.icone = "";
        this.cor = "";
        this.codigo = "";
        this.justificativas = [];
        this.tipo_avaliacao_id = "";
        this.initialization(data);
    }
}
//# sourceMappingURL=tipo-avaliacao-nota.js.map