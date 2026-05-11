import { __decorate } from "tslib";
import { Component, Input } from "@angular/core";
import { PlanejamentoDaoService } from "src/app/dao/planejamento-dao.service";
import { PageFrameBase } from "src/app/modules/base/page-frame-base";
let PlanejamentoShowComponent = class PlanejamentoShowComponent extends PageFrameBase {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.planejamento = {};
        this.planejamentoSuperior = null;
        this.colunas = [];
        this.planejamentoDao = injector.get(PlanejamentoDaoService);
    }
    ngOnInit() {
        super.ngOnInit();
        this.colunas.push({ titulo: 'Missão', texto: this.planejamento.missao }, { titulo: 'Visão', texto: this.planejamento.visao }, { titulo: 'Valores', texto: this.planejamento.valores.map(item => item.value).join('<br>') }, { titulo: 'Resultados institucionais', texto: this.planejamento.resultados_institucionais?.map(item => item.value).join('<br>') });
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.planejamento.planejamento_superior_id)
            this.buscaPlanejamentoSuperior(this.planejamento.planejamento_superior_id);
    }
    async buscaPlanejamentoSuperior(planejamento_superior_id) {
        this.planejamentoSuperior = await this.planejamentoDao.getById(planejamento_superior_id);
    }
};
__decorate([
    Input()
], PlanejamentoShowComponent.prototype, "planejamento", void 0);
PlanejamentoShowComponent = __decorate([
    Component({
        selector: 'planejamento-show',
        templateUrl: './planejamento-show.component.html',
        styleUrls: ['./planejamento-show.component.scss'],
        standalone: false
    })
], PlanejamentoShowComponent);
export { PlanejamentoShowComponent };
//# sourceMappingURL=planejamento-show.component.js.map