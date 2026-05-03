import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { EntregaDaoService } from 'src/app/dao/entrega-dao.service';
import { Entrega } from 'src/app/models/entrega.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
let EntregaFormComponent = class EntregaFormComponent extends PageFormBase {
    constructor(injector) {
        super(injector, Entrega, EntregaDaoService);
        this.injector = injector;
        this.listaQualitativos = [];
        this.etiquetas = [];
        this.checklist = [];
        this.validate = (control, controlName) => {
            let result = null;
            if (['nome', 'tipo_indicador', 'descricao'].indexOf(controlName) >= 0 && !control.value?.length) {
                result = "Obrigatório";
            }
            return result;
        };
        this.formValidation = (form) => {
            let result = null;
            if (this.form?.controls.tipo_indicador.value == 'QUALITATIVO' && !this.form?.controls.lista_qualitativos.value.length) {
                result = "Quando o tipo da entrega for Qualitativo, é necessária a inclusão de ao menos um item de qualitativo!";
            }
            return result;
        };
        this.titleEdit = (entity) => {
            return "Editando " + this.lex.translate("Entrega") + ': ' + (entity?.nome || "");
        };
        this.unidadeDao = injector.get(UnidadeDaoService);
        this.modalWidth = 900;
        this.title = "Inclusão de " + this.lex.translate('Entregas');
        this.join = ["unidade"];
        this.form = this.fh.FormBuilder({
            nome: { default: "" },
            descricao: { default: "" },
            tipo_indicador: { default: "" },
            qualitativo: { default: "" },
            lista_qualitativos: { default: [] },
            item_qualitativo: { default: "" },
            unidade_id: { default: null },
            etiquetas: { default: [] },
            checklist: { default: [] },
            etiqueta_texto: { default: "" },
            etiqueta_icone: { default: null },
            etiqueta_cor: { default: null },
        }, this.cdRef, this.validate);
        this.formChecklist = this.fh.FormBuilder({
            id: { default: "" },
            texto: { default: "" },
            checked: { default: false }
        }, this.cdRef);
    }
    loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        form.patchValue(this.util.fillForm(formValue, entity));
        this.loadListaQualitativos();
    }
    initializeData(form) {
        form.patchValue(new Entrega());
    }
    async saveData(form) {
        return new Promise((resolve, reject) => {
            const entrega = this.util.fill(new Entrega(), this.entity);
            resolve(this.util.fillForm(entrega, this.form.value));
        });
    }
    incluirQualitativo(qualitativo) {
        let item = qualitativo.trim().replace(" ", "%");
        let listaQualitativos = this.form.controls.lista_qualitativos.value;
        if (!listaQualitativos.find(x => x == item) && item.length) {
            this.clearErros();
            listaQualitativos.push(item);
            this.form.controls.lista_qualitativos.setValue(listaQualitativos);
            this.form?.controls.qualitativo.setValue('');
            this.loadListaQualitativos();
        }
    }
    excluirQualitativo(qualitativo) {
        let listaQualitativos = this.form.controls.lista_qualitativos.value;
        if (listaQualitativos.find(x => x == qualitativo)) {
            this.form.controls.lista_qualitativos.setValue(listaQualitativos.filter(x => x != qualitativo));
            this.loadListaQualitativos();
        }
    }
    loadListaQualitativos() {
        this.listaQualitativos = this.form.controls.lista_qualitativos.value || [];
    }
    addItemHandleItemQualitativo() {
        let result = undefined;
        const value = this.form.controls.item_qualitativo.value;
        const key = this.util.onlyAlphanumeric(value).toUpperCase();
        if (value?.length && this.util.validateLookupItem(this.form.controls.lista_qualitativos.value, key)) {
            result = {
                key: key,
                value: this.form.controls.item_qualitativo.value
            };
            this.form.controls.item_qualitativo.setValue("");
        }
        return result;
    }
    ;
    addItemHandleEtiquetas() {
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
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], EntregaFormComponent.prototype, "editableForm", void 0);
__decorate([
    ViewChild('itemQualitativo', { static: false })
], EntregaFormComponent.prototype, "itemQualitativo", void 0);
EntregaFormComponent = __decorate([
    Component({
        selector: 'app-entrega-form',
        templateUrl: './entrega-form.component.html',
        styleUrls: ['./entrega-form.component.scss'],
        standalone: false
    })
], EntregaFormComponent);
export { EntregaFormComponent };
//# sourceMappingURL=entrega-form.component.js.map