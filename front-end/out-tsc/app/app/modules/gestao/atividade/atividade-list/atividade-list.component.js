import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { PageBase } from 'src/app/modules/base/page-base';
let AtividadeListComponent = class AtividadeListComponent extends PageBase {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.activeTab = "TABELA";
        this.eGestor = this.auth.unidadeGestor();
        /* Inicializações */
        this.title = this.lex.translate("Atividades");
        this.code = "MOD_DMD";
    }
    ngOnInit() {
        super.ngOnInit();
        this.activeTab = this.usuarioConfig.active_tab || "TABELA";
    }
    async onSelectTab(tab) {
        this.activeTab = tab.key;
        if (this.viewInit)
            this.saveUsuarioConfig({ active_tab: this.activeTab });
    }
};
AtividadeListComponent = __decorate([
    Component({
        selector: 'app-atividade-list',
        templateUrl: './atividade-list.component.html',
        styleUrls: ['./atividade-list.component.scss'],
        standalone: false
    })
], AtividadeListComponent);
export { AtividadeListComponent };
//# sourceMappingURL=atividade-list.component.js.map