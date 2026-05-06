import { Base } from './base.model';
export class Entrega extends Base {
    constructor(data) {
        super();
        this.nome = ""; //Nome da entrega;
        this.descricao = ""; //Descrição da entrega;
        this.tipo_indicador = "PORCENTAGEM"; //Tipo_indicador: "QUANTIDADE", "VALOR", "PORCENTAGEM", "QUALITATIVO");
        this.lista_qualitativos = [];
        this.etiquetas = []; /* Etiquetas */
        this.checklist = []; /* Checklist */
        this.unidade_id = null;
        this.initialization(data);
    }
}
//# sourceMappingURL=entrega.model.js.map