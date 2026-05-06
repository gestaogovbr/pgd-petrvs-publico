import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
let PlanoTrabalhoConsolidacaoComponent = class PlanoTrabalhoConsolidacaoComponent extends PageFrameBase {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.usuarios = [];
        this.loadingUnidade = false;
        this.filterWhere = (filter) => {
            let form = filter.value;
            this.loadUsuarios(form.unidade_id);
        };
        this.unidadeDao = injector.get(UnidadeDaoService);
        this.form = this.fh.FormBuilder({
            arquivados: { default: false }
        });
        this.filter = this.fh.FormBuilder({
            unidade_id: { default: false }
        });
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.tabs.active = this.queryParams?.tab || "USUARIO";
        this.tabs.title = this.lex.translate('Consolidações');
        (async () => {
            await this.loadData(this.entity, this.form);
        })();
    }
    async loadData(entity, form) {
        this.unidade = this.auth.unidadeGestor();
        this.filter.controls.unidade_id.setValue(this.unidade?.id || this.auth.lotacao || null);
        if (this.unidade) {
            await this.loadUsuarios(this.unidade.id);
        }
    }
    async loadUsuarios(unidade) {
        this.usuarios = [];
        this.loadingUnidade = true;
        this.loading = true;
        this.cdRef.detectChanges();
        try {
            this.usuarios = await this.unidadeDao.lotados(unidade);
        }
        finally {
            this.loading = false;
            this.loadingUnidade = false;
            this.cdRef.detectChanges();
        }
    }
};
__decorate([
    ViewChild(TabsComponent, { static: false })
], PlanoTrabalhoConsolidacaoComponent.prototype, "tabs", void 0);
__decorate([
    ViewChild(InputSearchComponent, { static: false })
], PlanoTrabalhoConsolidacaoComponent.prototype, "unidadeSelecionada", void 0);
PlanoTrabalhoConsolidacaoComponent = __decorate([
    Component({
        selector: 'app-plano-trabalho-consolidacao',
        templateUrl: './plano-trabalho-consolidacao.component.html',
        styleUrls: ['./plano-trabalho-consolidacao.component.scss'],
        standalone: false
    })
], PlanoTrabalhoConsolidacaoComponent);
export { PlanoTrabalhoConsolidacaoComponent };
//# sourceMappingURL=plano-trabalho-consolidacao.component.js.map