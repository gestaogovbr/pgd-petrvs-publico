import { __decorate } from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { PageBase } from 'src/app/modules/base/page-base';
let UnidadeListComponent = class UnidadeListComponent extends PageBase {
    constructor(injector) {
        super(injector); //, Unidade, UnidadeDaoService);
        this.injector = injector;
        this.selectable = false;
        this.filterWhere = (filter) => {
            let result = [];
            let form = filter.value;
            return result;
        };
        //this.title = this.lex.translate("Unidades");
        //this.code = "MOD_CFG_UND";
        //this.filter = this.fh.FormBuilder({});
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        //this.tabs!.active = ["TABELA", "MAPA"].includes(this.usuarioConfig.active_tab) ? this.usuarioConfig.active_tab : "TABELA";
    }
    async onSelectTab(tab) {
        //if(this.viewInit) this.saveUsuarioConfig({active_tab: tab.key});
    }
    filterClear(filter) {
        filter.controls.nome.setValue("");
        //super.filterClear(filter);
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], UnidadeListComponent.prototype, "grid", void 0);
__decorate([
    ViewChild(TabsComponent, { static: false })
], UnidadeListComponent.prototype, "tabs", void 0);
__decorate([
    Input()
], UnidadeListComponent.prototype, "selectable", void 0);
UnidadeListComponent = __decorate([
    Component({
        selector: 'app-unidade-list',
        templateUrl: './unidade-list.component.html',
        styleUrls: ['./unidade-list.component.scss'],
        standalone: false
    })
], UnidadeListComponent);
export { UnidadeListComponent };
//# sourceMappingURL=unidade-list.component.js.map