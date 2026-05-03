import { Base } from './base.model';
export class TipoTarefa extends Base {
    constructor(data) {
        super();
        this.nome = ""; /* Nome da tarefa */
        this.tempo_estimado = 0; /* Tempo estimado para a execução da tarefa (Horas decimais) */
        this.documental = false; /* Se a entrega requer obrigatoriamente um documento */
        this.comentario = null; /* Comentário predefinida para a tarefa */
        this.initialization(data);
    }
}
//# sourceMappingURL=tipo-tarefa.model.js.map