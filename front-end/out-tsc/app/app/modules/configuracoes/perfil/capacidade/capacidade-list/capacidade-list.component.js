import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { CapacidadeDaoService } from 'src/app/dao/capacidade-dao.service';
import { Capacidade } from 'src/app/models/capacidade.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { TipoCapacidadeDaoService } from 'src/app/dao/tipo-capacidade-dao.service';
import { PerfilDaoService } from 'src/app/dao/perfil-dao.service';
let CapacidadeListComponent = class CapacidadeListComponent extends PageListBase {
    constructor(injector) {
        super(injector, Capacidade, CapacidadeDaoService);
        this.injector = injector;
        this.filterWhere = (filter) => {
            let result = [];
            let form = filter.value;
            if (form.descricao?.length) {
                result.push(["perfil_id", "=", this.urlParams?.get("perfil_id")]);
            }
            return result;
        };
        this.join = ["tipo_capacidade", "perfil"];
        this.tipoCapacidadeDao = injector.get(TipoCapacidadeDaoService);
        this.perfilDao = injector.get(PerfilDaoService);
        /* Inicializações */
        this.title = this.lex.translate("Capacidades");
        this.code = "MOD_TIPO_CAP";
        this.filter = this.fh.FormBuilder({
            descricao: { default: "" }
        });
        // Testa se o usuário possui permissão para exibir dados do tipo de capacidade
        if (this.auth.hasPermissionTo("MOD_TIPO_CAP")) {
            this.options.push({
                icon: "bi bi-info-circle",
                label: "Informações",
                onClick: this.consult.bind(this)
            });
        }
        // Testa se o usuário possui permissão para excluir o tipo de capacidade
        if (this.auth.hasPermissionTo("MOD_TIPO_CAP_EXCL")) {
            this.options.push({
                icon: "bi bi-trash",
                label: "Excluir",
                onClick: this.delete.bind(this)
            });
        }
    }
    ngOnInit() {
        super.ngOnInit();
        this.perfilDao.getById(this.urlParams.get("perfil_id")).then(perfil => {
            this.title = this.lex.translate("Capacidades") + " do perfil " + perfil?.nome;
            this.cdRef.detectChanges();
        });
    }
    filterClear(filter) {
        filter.controls.descricao.setValue("");
        super.filterClear(filter);
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], CapacidadeListComponent.prototype, "grid", void 0);
CapacidadeListComponent = __decorate([
    Component({
        selector: 'app-capacidade-list',
        templateUrl: './capacidade-list.component.html',
        styleUrls: ['./capacidade-list.component.scss'],
        standalone: false
    })
], CapacidadeListComponent);
export { CapacidadeListComponent };
//# sourceMappingURL=capacidade-list.component.js.map