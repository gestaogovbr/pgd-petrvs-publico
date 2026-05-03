import { __decorate } from "tslib";
import { Component, ViewChild } from "@angular/core";
import { GridComponent } from "src/app/components/grid/grid.component";
import { UnidadeDaoService } from "src/app/dao/unidade-dao.service";
import { UsuarioDaoService } from "src/app/dao/usuario-dao.service";
import { PageListBase } from "src/app/modules/base/page-list-base";
let RelatorioBaseComponent = class RelatorioBaseComponent extends PageListBase {
    constructor(injector, mType, dType) {
        super(injector, mType, dType);
        this.injector = injector;
        this.unidadeId = '';
        this.loaded = false;
        this.permissao = '';
        this.onButtonFilterClick = (filter) => { };
        this.usuarioDao = injector.get(UsuarioDaoService);
        this.unidadeDao = injector.get(UnidadeDaoService);
    }
    lotacaoValidator(control) {
        return !this.auth.unidade ? { errorMessage: "Usuário sem unidade de lotação" } : null;
    }
    requiredValidator(control) {
        return this.util.empty(control.value) ? { errorMessage: "Obrigatório" } : null;
    }
    async ngOnInit() {
        super.ngOnInit();
        this.unidades = [];
        if (!this.auth.hasPermissionTo(this.permissao + '_TODAS_UNIDADES') && this.auth.unidade) {
            // carrega todas as vinculacoes do usuario e subordinadas
            this.unidades = [];
            let unidades = [this.auth.unidade];
            if (this.auth.hasPermissionTo(this.permissao + '_UNIDADES_VINCULADAS')) {
                if (this.auth.unidades) {
                    unidades = this.auth.unidades;
                }
            }
            for (let unidade of unidades) {
                this.unidades.push(unidade.id);
                const subordinadas = (await this.unidadeDao.subordinadas(unidade?.id)).map((item) => item.id);
                this.unidades = this.unidades.concat(subordinadas);
            }
        }
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.loaded = true;
    }
    onFilterClear() {
        this.filter?.reset();
        this.grid.reloadFilter();
        this.cdRef.markForCheck();
    }
    onValueChange(event) {
        if (this.loaded) {
            this.onButtonFilterClick(this.filter);
        }
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], RelatorioBaseComponent.prototype, "grid", void 0);
RelatorioBaseComponent = __decorate([
    Component({
        selector: 'relatorio-base',
        templateUrl: './relatorio-base.component.html',
        styleUrls: ['./relatorio-base.component.scss'],
        standalone: false
    })
], RelatorioBaseComponent);
export { RelatorioBaseComponent };
//# sourceMappingURL=relatorio-base.component.js.map