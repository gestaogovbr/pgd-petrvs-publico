import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { TipoDocumentoDaoService } from 'src/app/dao/tipo-documento-dao.service';
import { TipoDocumento } from 'src/app/models/tipo-documento.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
let TipoDocumentoListComponent = class TipoDocumentoListComponent extends PageListBase {
    constructor(injector) {
        super(injector, TipoDocumento, TipoDocumentoDaoService);
        this.injector = injector;
        this.filterWhere = (filter) => {
            let result = [];
            let form = filter.value;
            if (form.nome?.length) {
                result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
            }
            return result;
        };
        /* Inicializações */
        this.title = this.lex.translate("Tipos de Documento");
        this.code = "MOD_TIPO_DOC";
        this.filter = this.fh.FormBuilder({
            nome: { default: "" }
        });
        this.addOption(this.OPTION_INFORMACOES);
        this.addOption(this.OPTION_EXCLUIR, "MOD_TIPO_DOC_EXCL");
        this.addOption(this.OPTION_LOGS, "MOD_AUDIT_LOG");
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], TipoDocumentoListComponent.prototype, "grid", void 0);
TipoDocumentoListComponent = __decorate([
    Component({
        selector: 'app-tipo-documento-list',
        templateUrl: './tipo-documento-list.component.html',
        styleUrls: ['./tipo-documento-list.component.scss'],
        standalone: false
    })
], TipoDocumentoListComponent);
export { TipoDocumentoListComponent };
//# sourceMappingURL=tipo-documento-list.component.js.map