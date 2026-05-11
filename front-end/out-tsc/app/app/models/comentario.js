import { Base } from './base.model';
export class Comentario extends Base {
    constructor(data) {
        super();
        this.texto = ""; /* Texto do comentário */
        this.path = ""; /* Path dos ids dos comentários; */
        this.data_comentario = new Date(); /* Data e horário que foi feito o comentário */
        this.tipo = "COMENTARIO"; /* Tipo comentario */
        this.privacidade = "PUBLICO"; /* Tipo comentario */
        this.usuario_id = ""; /* ID do usuário que fez o comentário */
        this.comentario_id = null; /* ID do comentário pai, quando existir */
        this.atividade_id = null; /* ID da atividade que gerou o comentário */
        this.atividade_tarefa_id = null; /* ID da tarefa que gerou o comentário */
        this.projeto_id = null; /* ID do projeto que gerou o comentário */
        this.projeto_tarefa_id = null; /* ID da tarefa que gerou o comentário */
        this.plano_entrega_entrega_id = null; /* ID da etrega do plano de entrega */
        this.initialization(data);
    }
}
//# sourceMappingURL=comentario.js.map