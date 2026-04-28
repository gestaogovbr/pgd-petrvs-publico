import { __decorate } from "tslib";
import { Component } from "@angular/core";
import { PageBase } from "../../base/page-base";
import { PlanoTrabalhoConsolidacaoDaoService } from "src/app/dao/plano-trabalho-consolidacao-dao.service";
import { PlanoTrabalhoService } from "../../gestao/plano-trabalho/plano-trabalho.service";
import { ProgramaDaoService } from "src/app/dao/programa-dao.service";
let VisualizarAvaliacaoComponent = class VisualizarAvaliacaoComponent extends PageBase {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.joinConsolidacao = ['avaliacoes.tipo_avaliacao', 'avaliacoes.avaliador'];
        this.joinPrograma = ["tipo_avaliacao_plano_trabalho.notas.justificativas", "tipo_avaliacao_plano_entrega.notas.justificativas"];
        this.consolidacaoDao = injector.get(PlanoTrabalhoConsolidacaoDaoService);
        this.planoTrabalhoService = injector.get(PlanoTrabalhoService);
        this.programaDao = injector.get(ProgramaDaoService);
    }
    ngOnInit() {
        super.ngOnInit();
        this.buscaConsolidacao();
    }
    async buscaConsolidacao() {
        this.consolidacao = await this.consolidacaoDao.getById(this.urlParams.get("consolidacaoId"), this.joinConsolidacao);
    }
    async fazerRecurso(avaliacao) {
        console.log(avaliacao.nota);
        this.go.navigate({ route: ['gestao', 'plano-trabalho', 'avaliacao', avaliacao.id, 'recurso'] }, {
            modal: true,
            metadata: {
                avaliacao: avaliacao,
            },
            modalClose: (modalResult) => {
                if (modalResult) {
                    avaliacao = modalResult;
                }
            }
        });
    }
    podeFazerRecurso(avaliacao) {
        const nota = avaliacao.nota.replace(/["]/g, '');
        return ['Inadequado', 'Não executado'].includes(nota) && !avaliacao.recurso;
    }
};
VisualizarAvaliacaoComponent = __decorate([
    Component({
        selector: 'visualizar-avaliacao',
        templateUrl: './visualizar-avaliacao.component.html',
        styleUrls: ['./visualizar-avaliacao.component.scss'],
        standalone: false
    })
], VisualizarAvaliacaoComponent);
export { VisualizarAvaliacaoComponent };
//# sourceMappingURL=visualizar-avaliacao.component.js.map