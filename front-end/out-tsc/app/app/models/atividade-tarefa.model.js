import { Base } from './base.model';
export class AtividadeTarefa extends Base {
    constructor(data) {
        super();
        this.documento = null; /* Documento de entrga */
        this.comentarios = []; /* Comentarios da tarefa */
        this.descricao = null; /* Descrição da tarefa */
        this.data_lancamento = new Date(); /* Data hora do lançamento da tarefa */
        this.tempo_estimado = 0; /* Tempo estimado para a execução da tarefa (Horas decimais) */
        this.data_conclusao = null; /* Data de conclusao */
        this.documento_id = null; /* Documento de entrga */
        this.atividade_id = ""; /* Atividade */
        this.usuario_id = ""; /* Usuário */
        this.tipo_tarefa_id = null; /* Tarefa */
        this.initialization(data);
    }
}
//# sourceMappingURL=atividade-tarefa.model.js.map