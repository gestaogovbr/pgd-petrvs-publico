import { Base } from './base.model';
export class RelatorioPlanoTrabalho extends Base {
    constructor(data) {
        super();
        this.id = "";
        this.numero = "";
        this.status = ""; // Status atual do plano de trabalho
        this.dataInicio = ""; // Data de início do plano de trabalho formatada
        this.dataFim = ""; // Data de fim do plano de trabalho formatada
        this.participanteNome = ""; // Nome do participante do plano de trabalho
        this.unidadeHierarquia = "";
        this.unidadeSigla = ""; // Nome da unidade do participante
        this.tipoModalidadeNome = ""; // Nome da modalidade do plano de trabalho
        this.chd = 0; // Carga horária diária do usuário formatada
        this.qtdePeriodosAvaliativos = 0; // Quantidade de períodos avaliativos do plano de trabalho
        this.initialization(data);
    }
}
//# sourceMappingURL=relatorio-plano-trabalho.model.js.map