import { __decorate } from "tslib";
import { Component, ViewChild } from "@angular/core";
import { UsersPanelDaoService } from "src/app/dao/users-panel-dao.service";
import { UserPanel } from "src/app/models/user-panel.model";
import { PageFormBase } from "../../base/page-form-base";
import { EditableFormComponent } from "src/app/components/editable-form/editable-form.component";
import { TenantDaoService } from "src/app/dao/tenant-dao.service";
let PanelAdminsFormComponent = class PanelAdminsFormComponent extends PageFormBase {
    constructor(injector) {
        super(injector, UserPanel, UsersPanelDaoService);
        this.injector = injector;
        this.items = [];
        this.itemsSelecionados = [];
        this.tenants = [];
        this.validate = (control, controlName) => {
            let result = null;
            return result;
        };
        this.usersPanelDao = injector.get(UsersPanelDaoService);
        this.tenantsDao = injector.get(TenantDaoService);
        this.join = ['tenants'];
        this.form = this.fh.FormBuilder({
            nome: { default: "" },
            email: { default: '' },
            password: { default: '' },
            nivel: { default: '' },
            tenants: { default: [] },
        }, this.cdRef, this.validate);
    }
    initializeData(form) {
        this.entity = new UserPanel();
        this.loadData(this.entity, form);
    }
    async loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        form.patchValue(this.util.fillForm(formValue, entity));
        if (entity.tenants) {
            this.itemsSelecionados = entity.tenants.map((t) => (t.id));
        }
        this.loading = true;
        try {
            this.tenants = await this.tenantsDao.query().asPromise();
            this.tenants.forEach(t => {
                this.items.push({ key: t.id, value: t.nome_entidade });
            });
        }
        finally {
            this.loading = false;
        }
    }
    async saveData(form) {
        return new Promise((resolve, reject) => {
            let userPanel = this.util.fill(new UserPanel(), this.entity);
            userPanel = this.util.fillForm(userPanel, this.form.value);
            userPanel.tenants = this.tenants.filter(t => this.itemsSelecionados.map((i) => i).includes(t.id));
            resolve(userPanel);
        });
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], PanelAdminsFormComponent.prototype, "editableForm", void 0);
__decorate([
    ViewChild('tenant', { static: false })
], PanelAdminsFormComponent.prototype, "tenant", void 0);
PanelAdminsFormComponent = __decorate([
    Component({
        selector: 'panel-admins-form',
        templateUrl: './panel-admins-form.component.html',
        styleUrls: ['./panel-admins-form.component.scss'],
        standalone: false
    })
], PanelAdminsFormComponent);
export { PanelAdminsFormComponent };
//# sourceMappingURL=panel-admins-form.component.js.map