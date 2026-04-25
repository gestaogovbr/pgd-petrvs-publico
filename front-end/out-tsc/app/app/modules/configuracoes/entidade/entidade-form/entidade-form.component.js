import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { CidadeDaoService } from 'src/app/dao/cidade-dao.service';
import { EntidadeDaoService } from 'src/app/dao/entidade-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { EntidadeEmail } from 'src/app/models/entidade-email';
import { Entidade } from 'src/app/models/entidade.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { ModalidadePgdService } from 'src/app/services/modalidade-pgd.service';
let EntidadeFormComponent = class EntidadeFormComponent extends PageFormBase {
    constructor(injector, util) {
        super(injector, Entidade, EntidadeDaoService);
        this.injector = injector;
        this.util = util;
        this.campos = [];
        this.validate = (control, controlName) => {
            let result = null;
            if (['nome', 'sigla'].indexOf(controlName) >= 0 && !control.value?.length) {
                result = "Obrigatório";
            }
            return result;
        };
        this.validateEmail = (control, controlName) => {
            let result = null;
            if (!control.value?.length) {
                result = "Obrigatório";
            }
            if (!this.util.validarEmail(control.value)) {
                result = "Inválido";
            }
            return result;
        };
        this.titleEdit = (entity) => {
            return "Editando " + this.lex.translate("Entidade") + ': ' + (entity?.sigla || "");
        };
        this.cidadeDao = injector.get(CidadeDaoService);
        this.usuarioDao = injector.get(UsuarioDaoService);
        this.modalidadePgd = injector.get(ModalidadePgdService);
        this.form = this.fh.FormBuilder({
            sigla: { default: "" },
            nome: { default: "" },
            abrangencia: { default: "" },
            codigo_ibge: { default: "" },
            gravar_historico_processo: { default: "" },
            layout_formulario_demanda: { default: "" },
            campos_ocultos_demanda: { default: "" },
            modalidade_pgd_padrao: { default: null },
            cidade_id: { default: null },
            gestor_id: { default: null },
            gestor_substituto_id: { default: null },
            expediente: { default: null },
            uf: { default: null },
            habilitar_relatos_siape: { default: false },
            email_responsavel_siape: { default: "" },
            email_remetente_siape: { default: "" },
            emails: { default: [] }
        }, this.cdRef, this.validate);
        this.join = ["cidade", "gestor", "gestor_substituto", "emails"];
        this.formEmail = this.fh.FormBuilder({
            email: { default: "" },
        }, this.cdRef, this.validateEmail);
    }
    async addEmail() {
        return new EntidadeEmail({
            entidade_id: this.entity.id
        });
    }
    async removeEmail(row) {
        return await this.dialog.confirm("Excluir?", "Deseja realmente excluir?");
    }
    async loadEmail(form, row) {
        form.patchValue(row);
    }
    async saveEmail(form, row) {
        this.util.fillForm(row, form.value);
        return row;
    }
    async loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        this.campos = entity.campos_ocultos_atividade || [];
        await Promise.all([
            this.cidade?.loadSearch(entity.cidade || entity.cidade_id),
            this.gestor.loadSearch(entity.gestor || entity.gestor_id),
            this.gestorSubstituto.loadSearch(entity.gestor_substituto || entity.gestor_substituto_id)
        ]);
        form.patchValue(this.util.fillForm(formValue, entity));
    }
    initializeData(form) {
        form.patchValue(new Entidade());
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            let entidade = this.util.fill(new Entidade(), this.entity);
            entidade = this.util.fillForm(entidade, this.form.value);
            if (entidade.abrangencia == "MUNICIPAL" && this.cidade?.selectedEntity) {
                entidade.codigo_ibge = (this.cidade?.selectedEntity).codigo_ibge;
            }
            else if (entidade.abrangencia == "ESTADUAL") {
                entidade.codigo_ibge = this.lookup.UF.find(x => x.key == entidade.uf)?.code;
            }
            else {
                entidade.codigo_ibge = null;
            }
            entidade.campos_ocultos_demanda = this.campos;
            resolve(entidade);
        });
    }
    onAfterSave(entity) {
        this.auth.entidade = entity;
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], EntidadeFormComponent.prototype, "editableForm", void 0);
__decorate([
    ViewChild('cidade', { static: false })
], EntidadeFormComponent.prototype, "cidade", void 0);
__decorate([
    ViewChild('gestor', { static: false })
], EntidadeFormComponent.prototype, "gestor", void 0);
__decorate([
    ViewChild('gestorSubstituto', { static: false })
], EntidadeFormComponent.prototype, "gestorSubstituto", void 0);
EntidadeFormComponent = __decorate([
    Component({
        selector: 'app-entidade-form',
        templateUrl: './entidade-form.component.html',
        styleUrls: ['./entidade-form.component.scss'],
        standalone: false
    })
], EntidadeFormComponent);
export { EntidadeFormComponent };
//# sourceMappingURL=entidade-form.component.js.map