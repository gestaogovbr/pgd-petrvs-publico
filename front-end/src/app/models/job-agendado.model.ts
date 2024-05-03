import { Base } from './base.model';

export class JobAgendado extends Base {
    public nome_do_job: string = "";
    public diario: boolean = false;
    public horario: string = "";
    public expressao_cron: string = "";
    public ativo: boolean = true;

    public constructor(data?: any) { super(); this.initialization(data); }

    [key: string]: any;
}