import { Base } from './base.model';

export class JobAgendado extends Base {
    public nome: string = "";
    public classe: string = "";
    public tenant_id: number|null = null;
    public expressao_cron: string = "* * * * *";
    public ativo: boolean = true;
    public parameters: any;
    public periodicidade: string = "";
    public intervalo_tipo: string|null = null;
    public intervalo_qtde: number|null = 0;
    public dia: number|null = null;
    public horario: string|null = null;
    public constructor(data?: any) { 
        super();
        this.initialization(data);
    }

    [key: string]: any;
}