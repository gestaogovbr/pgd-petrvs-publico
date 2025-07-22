import { Base } from './base.model';

export class RelatorioPlanoTrabalho extends Base {
    public id: string = "";
    public numero: string = "";
    public status: string = ""; // Status atual do plano de trabalho
    public dataInicio: string = ""; // Data de início do plano de trabalho formatada
    public dataFim: string = ""; // Data de fim do plano de trabalho formatada
    public participanteNome: string = ""; // Nome do participante do plano de trabalho
    public unidadeHierarquia: string = "";
    public unidadeSigla: string = ""; // Nome da unidade do participante
    public tipoModalidadeNome: string = ""; // Nome da modalidade do plano de trabalho
    public chd: number = 0; // Carga horária diária do usuário formatada
    public qtdePeriodosAvaliativos: number = 0; // Quantidade de períodos avaliativos do plano de trabalho

    public constructor(data?: any) { super(); this.initialization(data); }
}