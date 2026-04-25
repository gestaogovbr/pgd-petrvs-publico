import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { TipoAvaliacaoDaoService } from 'src/app/dao/tipo-avaliacao-dao.service';
import { TipoAvaliacao } from 'src/app/models/tipo-avaliacao.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { TipoJustificativaDaoService } from 'src/app/dao/tipo-justificativa-dao.service';
import { TipoJustificativa } from 'src/app/models/tipo-justificativa.model';
import { TipoAvaliacaoNota } from 'src/app/models/tipo-avaliacao-nota';
import { TipoAvaliacaoJustificativa } from 'src/app/models/tipo-avaliacao-justificativas.model';
let TipoAvaliacaoFormComponent = class TipoAvaliacaoFormComponent extends PageFormBase {
    constructor(injector) {
        super(injector, TipoAvaliacao, TipoAvaliacaoDaoService);
        this.injector = injector;
        this.justificativasLista = [];
        this.tipoJustificativa = new TipoJustificativa();
        this.validate = (control, controlName) => {
            let result = null;
            if (['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
                result = "Obrigatório";
            }
            return result;
        };
        this.validateNota = (control, controlName) => {
            let result = null;
            if (['pergunta', 'descricao', 'icone'].indexOf(controlName) >= 0 && !control.value?.length) {
                result = "Obrigatório";
            }
            return result;
        };
        this.titleEdit = (entity) => {
            return "Editando " + this.lex.translate("Tipo de Avaliação") + ': ' + (entity?.nome || "");
        };
        this.tipoJustificativaDao = injector.get(TipoJustificativaDaoService);
        this.join = ["notas.justificativas.tipo_justificativa"];
        this.form = this.fh.FormBuilder({
            nome: { default: "" },
            tipo: { default: "QUANTITATIVO" },
            notas: { default: [] }
        }, this.cdRef, this.validate);
        this.formNota = this.fh.FormBuilder({
            descricao: { default: "" },
            nota: { default: 0 },
            codigo: { default: "" },
            aprova: { default: false },
            pergunta: { default: "" },
            justifica: { default: false },
            icone: { default: "" },
            cor: { default: "" },
            justificativas: { default: [] },
            tipo_justificativa_id: { default: null }
        }, this.cdRef, this.validateNota);
    }
    loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        form.patchValue(this.util.fillForm(formValue, entity));
    }
    initializeData(form) {
        this.entity = new TipoAvaliacao();
        this.loadData(this.entity, form);
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            let tipoAvaliacao = this.util.fill(new TipoAvaliacao(), this.entity);
            tipoAvaliacao = this.util.fillForm(tipoAvaliacao, this.form.value);
            resolve(tipoAvaliacao);
        });
    }
    async addNota() {
        return new TipoAvaliacaoNota({
            tipo_avaliacao_id: this.entity.id,
            sequencia: this.form.controls.notas.value.length + 1
        });
    }
    async loadNota(form, row) {
        form.patchValue(row);
        form.controls.tipo_justificativa_id.setValue(null);
        form.controls.justificativas.setValue(row.justificativas?.map((x) => Object.assign({}, {
            key: x.tipo_justificativa_id,
            value: x.tipo_justificativa.nome,
            data: x.tipo_justificativa
        })) || []);
    }
    async removeNota(row) {
        return await this.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
    }
    async saveNota(form, row) {
        let justificativas = form.controls.justificativas.value || [];
        this.util.fillForm(row, form.value);
        row.justificativas = justificativas.map(x => {
            let older = (row.justificativas || []).find((y) => y.tipo_justificativa_id == x.key);
            return older || new TipoAvaliacaoJustificativa({
                tipo_avaliacao_nota_id: this.entity.id,
                tipo_justificativa_id: x.key,
                tipo_justificativa: x.data
            });
        });
        return row;
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], TipoAvaliacaoFormComponent.prototype, "editableForm", void 0);
TipoAvaliacaoFormComponent = __decorate([
    Component({
        selector: 'app-tipo-avaliacao-form',
        templateUrl: './tipo-avaliacao-form.component.html',
        styleUrls: ['./tipo-avaliacao-form.component.scss'],
        standalone: false
    })
], TipoAvaliacaoFormComponent);
export { TipoAvaliacaoFormComponent };
//# sourceMappingURL=tipo-avaliacao-form.component.js.map