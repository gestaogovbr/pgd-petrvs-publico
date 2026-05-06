import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { EntidadeDaoService } from 'src/app/dao/entidade-dao.service';
import { TemplateDaoService } from 'src/app/dao/template-dao.service';
import { Entidade } from 'src/app/models/entidade.model';
import { Expediente } from 'src/app/models/expediente.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { NotificacaoService } from 'src/app/modules/uteis/notificacoes/notificacao.service';
import { ModalidadePgdService } from 'src/app/services/modalidade-pgd.service';
let EntidadeConfComponent = class EntidadeConfComponent extends PageFormBase {
    constructor(injector) {
        super(injector, Entidade, EntidadeDaoService);
        this.injector = injector;
        this.validateNomenclatura = (control, controlName) => {
            let result = null;
            if (["singular", "plural"].includes(controlName) && !control.value?.length) {
                result = "Obrigatório";
            }
            return result;
        };
        this.validate = (control, controlName) => {
            let result = null;
            if (['carga_horaria_padrao'].indexOf(controlName) >= 0 && !control.value) {
                result = "Valor não pode ser zero.";
            }
            return result;
        };
        this.titleEdit = (entity) => {
            return "Configurando " + this.lex.translate("Entidade") + ': ' + (entity?.sigla || "");
        };
        this.templateDao = injector.get(TemplateDaoService);
        this.notificacao = injector.get(NotificacaoService);
        this.modalidadePgd = injector.get(ModalidadePgdService);
        this.modalWidth = 1200;
        this.join = ["notificacoes_templates", "relatorios_templates"];
        this.form = this.fh.FormBuilder({
            url_sei: { default: "" },
            modalidade_pgd_padrao: { default: null },
            notificacoes: { default: [] },
            nomenclatura: { default: [] },
            expediente: { default: new Expediente() },
            carga_horaria_padrao: { default: 8 },
            forma_contagem_carga_horaria: { default: "DIA" },
            api_public_key: { default: "" }
        }, this.cdRef, this.validate);
        this.formNomenclatura = this.fh.FormBuilder({
            id: { default: "" },
            nome: { default: "" },
            singular: { default: "" },
            plural: { default: "" },
            feminino: { default: false }
        }, this.cdRef, this.validateNomenclatura);
        this.title = "Configurando " + this.lex.translate("Entidade");
    }
    onApiKeyClick(event) {
        this.dao?.generateApiKey(this.entity.id).then(api_public_key => {
            this.form.controls.api_public_key.setValue(api_public_key);
        }).catch(error => {
            this.error(error.message ? error.message : error);
        });
    }
    onSingularChange(row, form) {
        form.controls.singular.setValue(form.controls.singular.value.toLowerCase());
        this.cdRef.detectChanges();
    }
    onPluralChange(row, form) {
        form.controls.plural.setValue(form.controls.plural.value.toLowerCase());
        this.cdRef.detectChanges();
    }
    onFormaContagemCargaHorariaChange(unit) {
        this.form.controls.forma_contagem_carga_horaria.setValue(unit == "day" ? "DIA" : unit == "week" ? "SEMANA" : "MES");
    }
    get formaContagemCargaHoraria() {
        const forma = this.form?.controls.forma_contagem_carga_horaria?.value || "DIA";
        return forma == "DIA" ? "day" : forma == "SEMANA" ? "week" : "mouth";
    }
    async loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        let nomenclatura = entity.nomenclatura || [];
        Object.entries(this.lex.defaults).forEach(([key, value]) => {
            if (!nomenclatura.find(x => x.nome == key)) {
                nomenclatura.push({
                    id: key,
                    nome: key,
                    singular: value.single,
                    plural: value.plural,
                    feminino: value.female
                });
            }
        });
        entity.nomenclatura = nomenclatura;
        form.patchValue(this.util.fillForm(formValue, entity));
    }
    async initializeData(form) {
        this.entity = (await this.dao.getById(this.urlParams.get("id"), this.join));
        await this.loadData(this.entity, form);
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            this.notificacoes?.saveData();
            let entidade = this.util.fill(new Entidade({ notificacoes_templates: [] }), this.entity);
            entidade = this.util.fillForm(entidade, this.form.value);
            this.dao.update(entidade.id, {
                url_sei: entidade.url_sei,
                modalidade_pgd_padrao: entidade.modalidade_pgd_padrao,
                nomenclatura: entidade.nomenclatura,
                notificacoes: entidade.notificacoes,
                notificacoes_templates: entidade.notificacoes_templates,
                expediente: entidade.expediente,
                carga_horaria_padrao: entidade.carga_horaria_padrao,
                forma_contagem_carga_horaria: entidade.forma_contagem_carga_horaria
            }).then(saved => resolve(true)).catch(reject);
        });
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], EntidadeConfComponent.prototype, "editableForm", void 0);
__decorate([
    ViewChild('cargaHoraria', { static: false })
], EntidadeConfComponent.prototype, "cargaHoraria", void 0);
__decorate([
    ViewChild('notificacoes', { static: false })
], EntidadeConfComponent.prototype, "notificacoes", void 0);
EntidadeConfComponent = __decorate([
    Component({
        selector: 'app-entidade-conf',
        templateUrl: './entidade-conf.component.html',
        styleUrls: ['./entidade-conf.component.scss'],
        standalone: false
    })
], EntidadeConfComponent);
export { EntidadeConfComponent };
//# sourceMappingURL=entidade-conf.component.js.map