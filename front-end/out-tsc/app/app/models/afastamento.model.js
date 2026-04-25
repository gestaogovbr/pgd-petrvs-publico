import { Base } from './base.model';
export class Afastamento extends Base {
    constructor(data) {
        super();
        this.observacoes = null; /* Observação sobre o afastamento */
        this.data_inicio = new Date(); /* Início do afastamento  */
        this.data_fim = new Date(); /* Fim do afastamento */
        this.horas = null; /*  */
        this.usuario_id = ""; /*  */
        this.tipo_motivo_afastamento_id = ""; /*  */
        this.initialization(data);
    }
}
//# sourceMappingURL=afastamento.model.js.map