import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ChangeDaoService } from 'src/app/dao/change-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { EntityService } from 'src/app/services/entity.service';
import { Change } from 'src/app/models/change.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
let ChangeListComponent = class ChangeListComponent extends PageListBase {
    constructor(injector, dao, xlsx) {
        super(injector, Change, ChangeDaoService);
        this.injector = injector;
        this.xlsx = xlsx;
        this.toolbarButtons = [];
        this.responsaveis = [];
        this.relacoes = [];
        this.changes = [];
        this.models = [];
        this.consultaFinalizada = false;
        this.filterWhere = (filter) => {
            let result = [];
            let form = filter.value;
            if (form.usuario_id?.length) {
                result.push(["user_id", "==", form.usuario_id == "null" ? null : form.usuario_id]);
            }
            ;
            if (form.data_inicio) {
                result.push(["date_time", ">=", form.data_inicio]);
            }
            ;
            if (form.data_fim) {
                result.push(["date_time", "<=", form.data_fim]);
            }
            ;
            if (form.tabela) {
                result.push(["table_name", "==", form.tabela]);
            }
            ;
            if (form.row_id_text) {
                result.push(["row_id", "==", form.row_id_text]);
            }
            ;
            if (form.row_id_search && !form.row_id_text) {
                result.push(["row_id", "==", form.row_id_search]);
            }
            ;
            if (form.tipo?.length) {
                result.push(["type", "==", form.tipo]);
            }
            ;
            if (form.modelo?.length) {
                result.push(["auditable_type", "==", form.modelo]);
            }
            ;
            if (form.search?.length) {
                result.push(["search", "==", form.search]);
            }
            ;
            return result;
        };
        this.usuarioDao = injector.get(UsuarioDaoService);
        this.entityService = injector.get(EntityService);
        /* Inicializações */
        this.title = this.lex.translate("Logs das Alterações");
        this.filter = this.fh.FormBuilder({
            relacoes: { default: [] },
            usuario_id: { default: "" },
            data_inicio: { default: "" },
            data_fim: { default: "" },
            tabela: { default: "" },
            search: { default: "" },
            modelo: { default: "" },
            model: { default: "" },
            tipo: { default: "" },
            row_id: { default: "" },
            row_id_text: { default: "" },
            row_id_search: { default: "" }
        });
        this.join = ["usuario"];
        this.orderBy = [['id', 'desc']];
    }
    ngOnInit() {
        super.ngOnInit();
        this.filter?.controls.row_id_text.setValue(this.urlParams?.get('id'));
    }
    async ngAfterViewInit() {
        super.ngAfterViewInit();
        this.models = await this.dao?.listModels() || [];
        //this.selectResponsaveis!.loading = true;
        this.dao?.showResponsaveis().then(responsaveis => {
            this.responsaveis = responsaveis || [];
            this.cdRef.detectChanges();
        });
        //.finally(() => this.selectResponsaveis!.loading = false);
    }
    async loadChanges(changes) {
        this.changes = changes;
        this.consultaFinalizada = true;
    }
    filterClear(filter) {
        filter.controls.usuario_id.setValue("");
        filter.controls.data_inicio.setValue("");
        filter.controls.data_fim.setValue("");
        filter.controls.tabela.setValue("");
        filter.controls.f.setValue("");
        filter.controls.search.setValue("");
        filter.controls.modelo.setValue("");
        filter.controls.opcao_filtro.setValue("ID do registro");
        super.filterClear(filter);
    }
    async onUsuarioSelect(selected) {
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], ChangeListComponent.prototype, "grid", void 0);
__decorate([
    ViewChild('selectResponsaveis', { static: false })
], ChangeListComponent.prototype, "selectResponsaveis", void 0);
__decorate([
    ViewChild('relacao', { static: false })
], ChangeListComponent.prototype, "relacao", void 0);
__decorate([
    ViewChild('usuario', { static: false })
], ChangeListComponent.prototype, "usuario", void 0);
ChangeListComponent = __decorate([
    Component({
        selector: 'app-change-list',
        templateUrl: './change-list.component.html',
        styleUrls: ['./change-list.component.scss'],
        standalone: false
    })
], ChangeListComponent);
export { ChangeListComponent };
//# sourceMappingURL=change-list.component.js.map