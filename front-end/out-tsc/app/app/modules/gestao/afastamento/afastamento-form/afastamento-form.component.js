import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { AfastamentoDaoService } from 'src/app/dao/afastamento-dao.service';
import { Afastamento } from 'src/app/models/afastamento.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { TipoMotivoAfastamentoDaoService } from 'src/app/dao/tipo-motivo-afastamento-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
let AfastamentoFormComponent = class AfastamentoFormComponent extends PageFormBase {
    constructor(injector) {
        super(injector, Afastamento, AfastamentoDaoService);
        this.injector = injector;
        this.validate = (control, controlName) => {
            let result = null;
            if (['usuario_id', 'tipo_motivo_afastamento_id'].indexOf(controlName) >= 0 && !control.value?.length) {
                result = "Obrigatório";
            }
            else if (['data_inicio', 'data_fim'].indexOf(controlName) >= 0 && !this.dao?.validDateTime(control.value)) {
                result = "Inválido";
            }
            else if (['horas'].indexOf(controlName) >= 0 && (control.value < 0 || control.value > 9999)) {
                result = "Inválido";
            }
            return result;
        };
        this.titleEdit = (entity) => {
            return "Editando " + this.lex.translate("afastamento") + ': ' + (entity?.usuario?.nome || "") + ' - ' + (entity?.tipo_motivo_afastamento?.nome || "");
        };
        this.tipoMotivoAfastamentoDao = injector.get(TipoMotivoAfastamentoDaoService);
        this.usuarioDao = injector.get(UsuarioDaoService);
        this.title = this.lex.translate('Ocorrências');
        this.form = this.fh.FormBuilder({
            observacoes: { default: "" },
            data_inicio: { default: new Date() },
            data_fim: { default: new Date() },
            horas: { default: "" },
            usuario_id: { default: "" },
            tipo_motivo_afastamento_id: { default: "" }
        }, this.cdRef, this.validate);
        this.join = ["usuario", "tipo_motivo_afastamento"];
    }
    isHoras() {
        if (this.form.controls.tipo_motivo_afastamento_id.value?.length && this.tipoMotivoAfastamento?.selectedEntity?.horas) { //Então é em Horas
            return true;
        }
        else
            return false;
    }
    async loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        /* Caso venha pela chamada da consolidação do plano de trabalho */
        if (this.metadata?.consolidacao) {
            this.consolidacao = this.metadata?.consolidacao;
            entity.usuario_id = this.consolidacao.plano_trabalho.usuario_id;
            entity.usuario = this.consolidacao.plano_trabalho?.usuario;
        }
        await Promise.all([
            this.usuario.loadSearch(entity.usuario || formValue.usuario_id),
            this.tipoMotivoAfastamento.loadSearch(entity.tipo_motivo_afastamento || formValue.tipo_motivo_afastamento_id)
        ]);
        form.patchValue(this.util.fillForm(formValue, entity));
    }
    initializeData(form) {
        this.entity = new Afastamento();
        this.loadData(this.entity, form);
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            let afastamento = this.util.fill(new Afastamento(), this.entity);
            afastamento = this.util.fillForm(afastamento, this.form.value);
            if (!this.isHoras()) {
                afastamento.data_inicio.setHours(0, 0, 0);
                afastamento.data_fim.setHours(23, 59, 0);
                afastamento.data_fim.setDate(afastamento.data_fim.getDate());
            }
            resolve(afastamento);
        });
    }
    get warning() {
        let result = undefined;
        let inicio = this.util.asDate(this.form.controls.data_inicio.value);
        let fim = this.util.asDate(this.form.controls.data_fim.value);
        if (this.consolidacao && inicio && fim && (this.util.daystamp(inicio) < this.util.daystamp(this.consolidacao.data_inicio) ||
            this.util.daystamp(fim) > this.util.daystamp(this.consolidacao.data_fim))) {
            //result = "Atenção: Data da consolidação do plano é de " + this.util.getDateFormatted(this.consolidacao.data_inicio) + " a " + this.util.getDateFormatted(this.consolidacao.data_fim);
        }
        return result;
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], AfastamentoFormComponent.prototype, "editableForm", void 0);
__decorate([
    ViewChild('tipoMotivoAfastamento', { static: false })
], AfastamentoFormComponent.prototype, "tipoMotivoAfastamento", void 0);
__decorate([
    ViewChild('usuario', { static: false })
], AfastamentoFormComponent.prototype, "usuario", void 0);
AfastamentoFormComponent = __decorate([
    Component({
        selector: 'app-afastamento-form',
        templateUrl: './afastamento-form.component.html',
        styleUrls: ['./afastamento-form.component.scss'],
        standalone: false
    })
], AfastamentoFormComponent);
export { AfastamentoFormComponent };
//# sourceMappingURL=afastamento-form.component.js.map