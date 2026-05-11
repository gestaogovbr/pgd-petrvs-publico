import { Base } from './base.model';
export class Planejamento extends Base {
    constructor(data) {
        super();
        this.data_arquivamento = null; /* Data de arquivamento */
        this.data_inicio = new Date(); /* Data de início do planejamento */
        this.data_fim = null; /* Data final do planejamento */
        this.nome = ""; /* Nome do planejamento institucional */
        this.missao = ""; /* Missão da Instituição/Unidade */
        this.visao = ""; /* Visão da Instituição/Unidade */
        this.valores = []; /* Valores da Instituição/Unidade */
        this.resultados_institucionais = []; /* Resultados da Instituição/Unidade */
        this.unidade_id = null; /* Unidade à qual está vinculado o planejamento institucional */
        this.entidade_id = null; /* Entidade à qual está vinculado o planejamento institucional */
        this.planejamento_superior_id = null; /* Planejamento hierarquicamente superior ao qual o atual planejamento está vinculado */
        this.initialization(data);
    }
}
//# sourceMappingURL=planejamento.model.js.map