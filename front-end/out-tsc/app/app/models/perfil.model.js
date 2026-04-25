import { Base } from './base.model';
export class Perfil extends Base {
    static { this.NIVEL = {
        DESENVOLVEDOR: 0,
        ADM_MASTER: 1,
        ADM_NEGOCIAL: 2,
        UNIDADE: 3,
        PARTICIPANTE: 5,
        COLABORADOR: 6
    }; }
    constructor(data) {
        super();
        this.capacidades = []; /* Objecto com lista de capacidades */
        this.nivel = 0; /* Nível de permissões */
        this.nome = ""; /* Nome do perfil */
        this.descricao = ""; /* Descrição sobre o perfil */
        this.initialization(data);
    }
}
//# sourceMappingURL=perfil.model.js.map