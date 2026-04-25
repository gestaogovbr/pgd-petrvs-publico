import { Base } from './base.model';
export class TipoAtividade extends Base {
    constructor(data) {
        super();
        this.nome = ""; //Nome da classe de atividade
        this.esforco = 8; //Tempo previsto para a execução da atividade (Horas decimais)
        this.dias_planejado = 0; //Sugestão de dias para conclusão da atividade independente de quando iniciado (influência no prazo da atividade)
        this.etiquetas = []; //Nome das etiquetas predefinidas para a atividade
        this.checklist = []; //Nome dos checklist predefinidas para a atividade
        this.comentario = ""; //Comentário predefinido para a atividade
        this.initialization(data);
    }
}
//# sourceMappingURL=tipo-atividade.model.js.map