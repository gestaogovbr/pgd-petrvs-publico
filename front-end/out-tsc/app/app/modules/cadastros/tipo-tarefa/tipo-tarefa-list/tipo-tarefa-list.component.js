import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { TipoTarefaDaoService } from 'src/app/dao/tipo-tarefa-dao.service';
import { TipoTarefa } from 'src/app/models/tipo-tarefa.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
let TipoTarefaListComponent = class TipoTarefaListComponent extends PageListBase {
    constructor(injector) {
        super(injector, TipoTarefa, TipoTarefaDaoService);
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
        this.title = this.lex.translate("Tipos de Tarefa");
        this.code = "MOD_TRF";
        this.filter = this.fh.FormBuilder({
            nome: { default: "" }
        });
        // Testa se o usuário possui permissão para exibir dados da tarefa
        if (this.auth.hasPermissionTo("MOD_TRF")) {
            this.options.push({
                icon: "bi bi-info-circle",
                label: "Informações",
                onClick: this.consult.bind(this)
            });
        }
        // Testa se o usuário possui permissão para excluir a tarefa
        if (this.auth.hasPermissionTo("MOD_TRF_EXCL")) {
            this.options.push({
                icon: "bi bi-trash",
                label: "Excluir",
                onClick: this.delete.bind(this)
            });
        }
        this.addOption(this.OPTION_LOGS, "MOD_AUDIT_LOG");
    }
    filterClear(filter) {
        filter.controls.nome.setValue("");
        super.filterClear(filter);
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], TipoTarefaListComponent.prototype, "grid", void 0);
TipoTarefaListComponent = __decorate([
    Component({
        selector: 'app-tarefa-list',
        templateUrl: './tipo-tarefa-list.component.html',
        styleUrls: ['./tipo-tarefa-list.component.scss'],
        standalone: false
    })
], TipoTarefaListComponent);
export { TipoTarefaListComponent };
//# sourceMappingURL=tipo-tarefa-list.component.js.map