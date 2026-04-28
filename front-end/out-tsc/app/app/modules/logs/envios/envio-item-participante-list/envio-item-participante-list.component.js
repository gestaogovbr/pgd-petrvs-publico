import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { EnvioItemDaoService } from 'src/app/dao/envio-item-dao.service';
import { EnvioItem } from 'src/app/models/envio-item.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
let EnvioItemParticipanteListComponent = class EnvioItemParticipanteListComponent extends PageListBase {
    // public allPages: ListenerAllPagesService;
    constructor(injector, dao) {
        super(injector, EnvioItem, EnvioItemDaoService);
        this.injector = injector;
        this.envio_id = null;
        this.filterWhere = (filter) => {
            let result = [];
            let form = filter.value;
            result.push(["tipo", '=', 'participante']);
            result.push(["envio_id", '=', form.envio_id]);
            result.push(["sucesso", '=', form.sucesso]);
            if (form.uid) {
                result.push(["uid", '=', form.uid]);
            }
            if (form.cpf) {
                result.push(["usuario.cpf", '=', form.cpf]);
            }
            return result;
        };
        this.consult = async (doc) => {
            this.go.navigate({ route: ['logs', 'envio-items', doc.id, "consult"] });
        };
        /* Inicializações */
        this.envioItemDaoService = dao; // injector.get<EnvioItemDaoService>(EnvioItemDaoService);
        // this.allPages = injector.get<ListenerAllPagesService>(ListenerAllPagesService);
        this.title = this.lex.translate("Histórico de Participantes Enviados");
        this.filter = this.fh.FormBuilder({
            envio_id: { default: null },
            tipo: { default: null },
            uid: { default: null },
            cpf: { default: null },
            sucesso: { default: "" },
        });
        this.join = [
            "usuario:id,cpf,nome",
        ];
        this.orderBy = [['created_at', 'asc']];
    }
    /*async ngAfterViewInit() {
        super.ngAfterViewInit();
        this.cdRef.detectChanges();
    };*/
    filterClear(filter) {
        filter.controls.tipo.setValue("");
        filter.controls.uid.setValue("");
        filter.controls.sucesso.setValue("");
        filter.controls.cpf.setValue("");
    }
    dynamicButtons(row) {
        let result = [];
        if (this.auth.hasPermissionTo("MOD_PENT"))
            result.push({ icon: "bi bi-info-circle", label: "Informações", onClick: this.consult.bind(this) });
        return result;
    }
    ngOnInit() {
        super.ngOnInit();
        this.filter?.controls.envio_id.setValue(this.urlParams.get("id"));
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], EnvioItemParticipanteListComponent.prototype, "grid", void 0);
EnvioItemParticipanteListComponent = __decorate([
    Component({
        selector: 'envio-item-participante-list',
        templateUrl: './envio-item-participante-list.component.html',
        styleUrls: ['./envio-item-participante-list.component.scss'],
        standalone: false
    })
], EnvioItemParticipanteListComponent);
export { EnvioItemParticipanteListComponent };
//# sourceMappingURL=envio-item-participante-list.component.js.map