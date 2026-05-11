import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { LookupService } from 'src/app/services/lookup.service';
let SolucaoFiltroComponent = class SolucaoFiltroComponent extends PageFrameBase {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.lookup = injector.get(LookupService);
        this.usuarioDao = injector.get(UsuarioDaoService);
        this.modalWidth = 500;
        this.form = this.fh.FormBuilder({
            id: { default: '' },
            nome: { default: '' },
            status: { default: '' }
        }, this.cdRef);
    }
    ngOnInit() {
        super.ngOnInit();
        this.snapshot = this.snapshot || this.modalRoute || this.route.snapshot;
        this.urlParams = this.snapshot.paramMap;
        this.queryParams = this.go.decodeParam(this.snapshot.queryParams);
        this.metadata = this.go.getMetadata(this.snapshot.queryParams.idroute);
        this.form?.controls.nome.setValue(this.metadata.nome);
        this.form?.controls.id.setValue(this.metadata.id);
        this.form?.controls.status.setValue(this.metadata.status);
    }
    async onSubmitClick() {
        this.loading = true;
        try {
            let response = {
                nome: this.form?.controls.nome.value,
                id: this.form?.controls.id.value,
                status: this.form?.controls.status.value
            };
            this.go.setModalResult(this.modalRoute?.queryParams?.idroute, response);
            this.close();
        }
        catch (error) {
            this.error(error?.message || error?.error || error || "Erro desconhecido");
        }
        finally {
            this.loading = false;
        }
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], SolucaoFiltroComponent.prototype, "editableForm", void 0);
SolucaoFiltroComponent = __decorate([
    Component({
        selector: 'solucao-filtro',
        templateUrl: './solucao-filtro.component.html',
        styleUrls: ['./solucao-filtro.component.scss'],
        standalone: false
    })
], SolucaoFiltroComponent);
export { SolucaoFiltroComponent };
//# sourceMappingURL=solucao-filtro.component.js.map