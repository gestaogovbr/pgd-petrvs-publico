import { Base } from './base.model';
export class Integracao extends Base {
    constructor() {
        super();
        this.data_execucao = "";
        this.atualizar_unidades = false;
        this.atualizar_servidores = false;
        this.atualizar_gestores = true;
        this.usar_arquivos_locais = false;
        this.gravar_arquivos_locais = false;
        this.usuario_id = "";
        this.entidade_id = "";
    }
}
//# sourceMappingURL=integracao.model.js.map