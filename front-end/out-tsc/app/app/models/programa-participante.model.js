import { Base } from './base.model';
export class ProgramaParticipante extends Base {
    constructor(data) {
        super();
        this.habilitado = 1; /* Se o participante está habilitado */
        this.programa_id = ""; /* Programa */
        this.usuario_id = ""; /* Usuario */
        this.initialization(data);
    }
}
//# sourceMappingURL=programa-participante.model.js.map