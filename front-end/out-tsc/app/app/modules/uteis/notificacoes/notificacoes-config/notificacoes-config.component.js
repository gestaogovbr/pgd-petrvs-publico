import { __decorate } from "tslib";
import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { TemplateService } from '../../templates/template.service';
import { NotificacoesConfig } from 'src/app/models/notificacao.model';
export class Notificar {
    constructor(data) {
        this.codigo = "";
        this.notifica = true;
        this.descricao = "";
        Object.assign(this, data || {});
    }
}
let NotificacoesConfigComponent = class NotificacoesConfigComponent extends PageFrameBase {
    //@Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
    set entity(value) { super.entity = value; }
    get entity() { return super.entity; }
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.disabled = false;
        this.notificar = [];
        this.source = [];
        this.loadingNotificacoes = false;
        this.cdRef = injector.get(ChangeDetectorRef);
        //this.dao = injector.get<TemplateDaoService>(TemplateDaoService);
        this.templateService = injector.get(TemplateService);
        this.code = "MOD_NOTF_CONF";
        this.title = "Notificações";
        this.form = this.fh.FormBuilder({
            enviar_petrvs: { default: true },
            enviar_email: { default: true },
            enviar_whatsapp: { default: true }
        });
    }
    ngOnInit() {
        super.ngOnInit();
        this.entidadeId = this.entidadeId || this.queryParams?.entidadeId;
        this.unidadeId = this.unidadeId || this.queryParams?.unidadeId;
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.loadNotificacoes(this.entity);
    }
    loadNotificacoes(entity) {
        (async () => {
            this.loadingNotificacoes = true;
            this.cdRef.detectChanges();
            try {
                this.source = await this.templateService.loadNotificacoes(this.entidadeId, this.unidadeId);
                this.notificar = this.templateService.buildNotificar(this.entity?.notificacoes || new NotificacoesConfig());
                let formValue = Object.assign({}, this.form.value);
                this.form.patchValue(this.util.fillForm(formValue, entity.notificacoes));
            }
            finally {
                this.loadingNotificacoes = false;
                this.cdRef.detectChanges();
            }
        })();
    }
    async saveData(form) {
        this.entity.notificacoes_templates = this.entity.notificacoes_templates?.filter(x => !!x._status);
        this.util.fillForm(this.entity.notificacoes, this.form.value);
        return this.entity;
    }
    updateNotificacoes() {
        this.entity.notificacoes.enviar_petrvs = this.form.controls.enviar_email.value;
        this.entity.notificacoes.enviar_email = this.form.controls.enviar_email.value;
        this.entity.notificacoes.enviar_whatsapp = this.form.controls.enviar_whatsapp.value;
        this.entity.notificacoes.nao_notificar = this.notificar.filter(x => !x.notifica).map(x => x.codigo);
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], NotificacoesConfigComponent.prototype, "grid", void 0);
__decorate([
    Input()
], NotificacoesConfigComponent.prototype, "cdRef", void 0);
__decorate([
    Input()
], NotificacoesConfigComponent.prototype, "entity", null);
__decorate([
    Input()
], NotificacoesConfigComponent.prototype, "entidadeId", void 0);
__decorate([
    Input()
], NotificacoesConfigComponent.prototype, "unidadeId", void 0);
__decorate([
    Input()
], NotificacoesConfigComponent.prototype, "disabled", void 0);
NotificacoesConfigComponent = __decorate([
    Component({
        selector: 'notificacoes-config',
        templateUrl: './notificacoes-config.component.html',
        styleUrls: ['./notificacoes-config.component.scss'],
        standalone: false
    })
], NotificacoesConfigComponent);
export { NotificacoesConfigComponent };
//# sourceMappingURL=notificacoes-config.component.js.map