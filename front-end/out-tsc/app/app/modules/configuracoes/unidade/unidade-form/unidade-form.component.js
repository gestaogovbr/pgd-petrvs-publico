import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { CidadeDaoService } from 'src/app/dao/cidade-dao.service';
import { EntidadeDaoService } from 'src/app/dao/entidade-dao.service';
import { PlanoTrabalhoDaoService } from 'src/app/dao/plano-trabalho-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { Expediente } from 'src/app/models/expediente.model';
import { Unidade } from 'src/app/models/unidade.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { NotificacaoService } from 'src/app/modules/uteis/notificacoes/notificacao.service';
let UnidadeFormComponent = class UnidadeFormComponent extends PageFormBase {
    get informalIsDisabled() {
        //return this.action != 'new' ? 'true' : undefined;
        return 'true';
    }
    get instituidoraIsDisabled() {
        return !this.auth.hasPermissionTo('MOD_UND_INST') ? 'true' : undefined;
    }
    get executoraIsDisabled() {
        return !this.auth.hasPermissionTo('MOD_UND_INST') ? 'true' : undefined;
    }
    get codigoIsDisabled() {
        return !this.informal && this.action == 'new' ? undefined : 'true';
    }
    get unidadePaiIsDisabled() {
        return this.unidadeRaiz || (!this.informal && this.action == 'edit') ? 'true' : undefined;
    }
    get isDisabled() {
        return !this.informal && this.action == 'edit' ? 'true' : undefined;
    }
    constructor(injector) {
        super(injector, Unidade, UnidadeDaoService);
        this.injector = injector;
        this.unidadeRaiz = false;
        this.informal = true;
        this.validate = (control, controlName) => {
            let result = null;
            if (controlName == 'unidade_pai_id' && !control.value?.length && !this.unidadeRaiz) {
                result = "Obrigatório";
            }
            if (controlName == 'codigo' && !this.form?.controls.informal.value && !parseInt(control.value)) {
                result = "Obrigatório";
            }
            return result;
        };
        this.titleEdit = (entity) => {
            return "Editando " + this.lex.translate("Unidade") + ': ' + (entity?.sigla || "");
        };
        this.entidadeDao = injector.get(EntidadeDaoService);
        this.cidadeDao = injector.get(CidadeDaoService);
        this.usuarioDao = injector.get(UsuarioDaoService);
        this.planoTrabalhoDao = injector.get(PlanoTrabalhoDaoService);
        this.notificacao = injector.get(NotificacaoService);
        this.modalWidth = 1200;
        this.planoDataset = this.planoTrabalhoDao.dataset();
        this.form = this.fh.FormBuilder({
            codigo: { default: "" },
            sigla: { default: "" },
            nome: { default: "" },
            path: { default: "" },
            cidade_id: { default: "" },
            uf: { default: "" },
            instituidora: { default: false },
            executora: { default: true },
            informal: { default: true },
            atividades_arquivamento_automatico: { default: 0 },
            distribuicao_forma_contagem_prazos: { default: "DIAS_UTEIS" },
            entrega_forma_contagem_prazos: { default: "HORAS_UTEIS" },
            notificacoes: { default: {} },
            etiquetas: { default: [] },
            unidade_pai_id: { default: "" },
            entidade_id: { default: this.auth.unidade?.entidade_id },
            etiqueta_texto: { default: "" },
            etiqueta_icone: { default: null },
            etiqueta_cor: { default: null },
            expediente24: { default: true },
            expediente: { default: null },
            usar_expediente_unidade: { default: false },
            texto_complementar_plano: { default: "" },
        }, this.cdRef, this.validate);
        this.join = ["cidade", "entidade", "unidade_pai", "gestor.usuario:id,nome", "gestores_substitutos.usuario:id,nome", "gestores_delegados.usuario:id,nome", "notificacoes_templates", "gestor.gestor:id", "gestores_substitutos.gestor_substituto:id", "gestores_delegados.gestor_delegado:id"];
    }
    async loadData(entity, form) {
        this.informal = !!entity.informal;
        this.cdRef.detectChanges();
        let formValue = Object.assign({}, form.value);
        entity.etiquetas = entity.etiquetas || [];
        this.form.patchValue(this.util.fillForm(formValue, entity));
        await Promise.all([
            this.unidadePai.loadSearch(entity.unidade_pai || entity.unidade_pai_id),
            this.cidade.loadSearch(entity.cidade || entity.cidade_id),
            this.entidade.loadSearch(entity.entidade || entity.entidade_id)
        ]);
        this.form.controls.informal.setValue(entity.informal);
        this.unidadeRaiz = this.action == 'edit' && !entity.unidade_pai_id;
        this.form.controls.usar_expediente_unidade.setValue(entity.expediente ? true : false);
        this.fh.revalidate(this.form);
    }
    initializeData(form) {
        this.entity = new Unidade({
            entidade_id: this.auth.unidade?.entidade_id,
            entidade: this.auth.unidade?.entidade,
            informal: 1
        });
        this.loadData(this.entity, form);
    }
    addItemHandle() {
        let result = undefined;
        const value = this.form.controls.etiqueta_texto.value;
        const key = this.util.textHash(value);
        if (value?.length && this.util.validateLookupItem(this.form.controls.etiquetas.value, key)) {
            result = {
                key: key,
                value: this.form.controls.etiqueta_texto.value,
                color: this.form.controls.etiqueta_cor.value,
                icon: this.form.controls.etiqueta_icone.value
            };
            this.form.controls.etiqueta_texto.setValue("");
            this.form.controls.etiqueta_icone.setValue(null);
            this.form.controls.etiqueta_cor.setValue(null);
        }
        return result;
    }
    ;
    saveData(form) {
        return new Promise(async (resolve, reject) => {
            // this.notificacoes!.saveData();
            let unidade = this.util.fill(new Unidade(), this.entity);
            unidade = this.util.fillForm(unidade, this.form.value);
            // unidade.notificacoes = this.entity!.notificacoes;
            // unidade.notificacoes_templates = this.entity!.notificacoes_templates;
            if (!this.form.controls.usar_expediente_unidade)
                unidade.expediente = null;
            resolve(unidade);
        });
    }
    onInformalChange(event) {
        this.informal = this.form.controls.informal.value;
        this.form.controls.codigo.setValue("");
        this.form.controls.instituidora.setValue(false);
        this.form.controls.codigo.updateValueAndValidity();
    }
    onUsarExpedienteEntidadeChange() {
        this.form.controls.expediente.setValue(this.form.controls.usar_expediente_unidade.value ? this.form.controls.expediente.value || new Expediente() : null);
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], UnidadeFormComponent.prototype, "editableForm", void 0);
__decorate([
    ViewChild('unidade_pai', { static: false })
], UnidadeFormComponent.prototype, "unidadePai", void 0);
__decorate([
    ViewChild('cidade', { static: false })
], UnidadeFormComponent.prototype, "cidade", void 0);
__decorate([
    ViewChild('gestor', { static: false })
], UnidadeFormComponent.prototype, "gestor", void 0);
__decorate([
    ViewChild('gestorSubstituto', { static: false })
], UnidadeFormComponent.prototype, "gestorSubstituto", void 0);
__decorate([
    ViewChild('gestorDelegado', { static: false })
], UnidadeFormComponent.prototype, "gestorDelegado", void 0);
__decorate([
    ViewChild('entidade', { static: false })
], UnidadeFormComponent.prototype, "entidade", void 0);
__decorate([
    ViewChild('notificacoes', { static: false })
], UnidadeFormComponent.prototype, "notificacoes", void 0);
UnidadeFormComponent = __decorate([
    Component({
        selector: 'app-unidade-form',
        templateUrl: './unidade-form.component.html',
        styleUrls: ['./unidade-form.component.scss'],
        standalone: false
    })
], UnidadeFormComponent);
export { UnidadeFormComponent };
//# sourceMappingURL=unidade-form.component.js.map