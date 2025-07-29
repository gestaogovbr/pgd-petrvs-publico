import { Base } from './base.model';

export class RelatorioAgente extends Base {
    public id: string = "";
    public numero: string = "";
    public status: string = ""; // Status atual do plano de entrega
    public dataInicio: string = ""; // Data de início do plano de entrega formatada
    public dataFim: string = ""; // Data de fim do plano de entrega formatada
    public entregaNome: string = ""; // Nome da entrega
    public unidadeHierarquia: string = "";
    public unidadeSigla: string = ""; // Nome da unidade do participante

    public constructor(data?: any) { super(); this.initialization(data); }
}