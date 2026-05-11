import { Base } from './base.model';
export class Reacao extends Base {
    constructor(data) {
        super();
        this.tipo = "like"; /* Tipo reação */
        this.usuario_id = ""; /* ID do usuário que fez a reação */
        this.atividade_id = null; /* ID da atividade que gerou a reação */
        this.plano_entrega_entrega_id = null; /* ID da etrega do plano de entrega que gerou a reação*/
        this.plano_trabalho_entrega_id = null; /* ID da etrega do plano de trabalho que gerou a reação*/
        this.initialization(data);
    }
}
//# sourceMappingURL=reacao.js.map