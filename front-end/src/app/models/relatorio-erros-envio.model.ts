import { Base } from './base.model';

export class RelatorioErrosEnvio extends Base {
    public id: string = "";
    public categoria: string = "";
    public matricula: string = "";
    public dataEnvio: string = ""; 
    public motivo: string = ""; 
    public constructor(data?: any) {
        super();
        this.initialization(data);
    }
}