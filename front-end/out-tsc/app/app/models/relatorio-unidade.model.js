import { Base } from './base.model';
export class RelatorioUnidade extends Base {
    constructor(data) {
        super();
        this.id = "";
        this.unidadeHierarquia = "";
        this.nome = "";
        this.codigo = "";
        this.tipo = 'Executora';
        this.chefiaId = null;
        this.chefiaNome = null;
        this.totalVinculados = 0;
        this.totalSubstitutos = 0;
        this.totalDelegados = 0;
        this.initialization(data);
    }
}
//# sourceMappingURL=relatorio-unidade.model.js.map