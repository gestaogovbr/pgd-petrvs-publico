import { Base } from './base.model';
export class JobAgendado extends Base {
    constructor(data) {
        super();
        this.nome = "";
        this.classe = "";
        this.tenant_id = null;
        this.expressao_cron = "* * * * *";
        this.ativo = true;
        this.periodicidade = "";
        this.intervalo_tipo = null;
        this.intervalo_qtde = 0;
        this.dia = null;
        this.horario = null;
        this.initialization(data);
    }
}
//# sourceMappingURL=job-agendado.model.js.map