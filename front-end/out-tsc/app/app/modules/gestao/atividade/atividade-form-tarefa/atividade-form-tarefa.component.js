import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { TipoDocumentoDaoService } from 'src/app/dao/tipo-documento-dao.service';
import { TipoTarefaDaoService } from 'src/app/dao/tipo-tarefa-dao.service';
import { AtividadeTarefaDaoService } from 'src/app/dao/atividade-tarefa-dao.service';
import { AtividadeTarefa } from 'src/app/models/atividade-tarefa.model';
import { TipoProcessoDaoService } from 'src/app/dao/tipo-processo-dao.service';
import { NavigateResult } from 'src/app/services/navigate.service';
import { ComentarioService } from 'src/app/services/comentario.service';
let AtividadeFormTarefaComponent = class AtividadeFormTarefaComponent extends PageFormBase {
    constructor(injector) {
        super(injector, AtividadeTarefa, AtividadeTarefaDaoService);
        this.injector = injector;
        this.modalWidth = 800;
        this.validate = (control, controlName) => {
            let result = null;
            if (["descricao"].includes(controlName) && !control.value?.length) {
                result = "Obrigatório";
            }
            return result;
        };
        this.formValidation = (form) => {
            const values = form.value;
            if (values.tipo_tarefa_id?.length && !this.tipoTarefa?.selectedEntity) {
                return "Aguarde o carregamento " + this.lex.translate("tipo de tarefa") + ". Caso demore, selecione novamente!";
            }
            return undefined;
        };
        this.tipoTarefaDao = injector.get(TipoTarefaDaoService);
        this.tipoDocumentoDao = injector.get(TipoDocumentoDaoService);
        this.tipoProcessoDao = injector.get(TipoProcessoDaoService);
        this.comentario = injector.get(ComentarioService);
        this.title = this.lex.translate("Tarefa da atividade");
        this.form = this.fh.FormBuilder({
            descricao: { default: "" },
            tipo_tarefa_id: { default: null },
            tempo_estimado: { default: 0 },
            concluido: { default: true },
            id_processo: { default: 0 },
            numero_processo: { default: "" },
            documento: { default: null },
            comentarios: { default: [] }
        }, this.cdRef, this.validate);
    }
    ngOnInit() {
        super.ngOnInit();
        const segment = (this.url ? this.url[this.url.length - 1]?.path : "") || "";
        this.action = segment == "comentar" ? segment : this.action;
    }
    async loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        formValue = this.util.fillForm(formValue, entity);
        await this.tipoTarefa?.loadSearch(entity.tipo_tarefa || formValue.tipo_tarefa_id);
        //formValue.concluido = !!entity.data_conclusao;
        formValue.comentarios = this.comentario.orderComentarios(formValue.comentarios || []);
        form.patchValue(formValue);
    }
    async initializeData(form) {
        this.entity = this.metadata.tarefa;
        this.atividade = this.metadata.atividade;
        await this.loadData(this.entity, form);
    }
    async saveData(form) {
        this.comentarios?.confirm();
        this.util.fillForm(this.entity, this.form.value);
        this.entity.tipo_tarefa = this.tipoTarefa?.selectedEntity;
        this.entity.data_conclusao = this.form.controls.concluido.value && !this.entity.data_conclusao ? this.auth.hora : this.entity.data_conclusao;
        return new NavigateResult(this.entity);
    }
    onTipoTarefaSelect(item) {
        const tipoTarefa = item.entity;
        this.form.controls.tempo_estimado.setValue(tipoTarefa?.tempo_estimado || 0);
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], AtividadeFormTarefaComponent.prototype, "editableForm", void 0);
__decorate([
    ViewChild('comentarios', { static: false })
], AtividadeFormTarefaComponent.prototype, "comentarios", void 0);
__decorate([
    ViewChild('tipoTarefa', { static: false })
], AtividadeFormTarefaComponent.prototype, "tipoTarefa", void 0);
AtividadeFormTarefaComponent = __decorate([
    Component({
        selector: 'app-atividade-form-tarefa',
        templateUrl: './atividade-form-tarefa.component.html',
        styleUrls: ['./atividade-form-tarefa.component.scss'],
        standalone: false
    })
], AtividadeFormTarefaComponent);
export { AtividadeFormTarefaComponent };
//# sourceMappingURL=atividade-form-tarefa.component.js.map