import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { PageListBase } from "../../../base/page-list-base";
import { GridComponent } from "../../../../components/grid/grid.component";
import { CadeiaValor } from "../../../../models/cadeia-valor.model";
import { CadeiaValorDaoService } from "../../../../dao/cadeia-valor-dao.service";
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
let CadeiaValorListComponent = class CadeiaValorListComponent extends PageListBase {
    constructor(injector) {
        super(injector, CadeiaValor, CadeiaValorDaoService);
        this.injector = injector;
        this.filterWhere = (filter) => {
            let result = [];
            let form = filter.value;
            return result;
        };
        /* Inicializações */
        this.code = "MOD_CADV";
        this.title = this.lex.translate('Cadeias de Valores');
        this.filter = this.fh.FormBuilder({});
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.tabs.active = ["TABELA", "MAPA"].includes(this.usuarioConfig.active_tab) ? this.usuarioConfig.active_tab : "TABELA";
    }
    async onSelectTab(tab) {
        if (this.viewInit)
            this.saveUsuarioConfig({ active_tab: tab.key });
    }
    filterClear(filter) {
        filter.controls.nome.setValue("");
        super.filterClear(filter);
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], CadeiaValorListComponent.prototype, "grid", void 0);
__decorate([
    ViewChild(TabsComponent, { static: false })
], CadeiaValorListComponent.prototype, "tabs", void 0);
CadeiaValorListComponent = __decorate([
    Component({
        selector: 'app-cadeia-valor-list',
        templateUrl: './cadeia-valor-list.component.html',
        styleUrls: ['./cadeia-valor-list.component.scss'],
        standalone: false
    })
], CadeiaValorListComponent);
export { CadeiaValorListComponent };
//# sourceMappingURL=cadeia-valor-list.component.js.map