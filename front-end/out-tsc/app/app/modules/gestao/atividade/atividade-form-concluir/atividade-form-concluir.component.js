import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
import { Atividade } from 'src/app/models/atividade.model';
import { CalendarService } from 'src/app/services/calendar.service';
import { TipoDocumentoDaoService } from 'src/app/dao/tipo-documento-dao.service';
import { TipoAtividadeDaoService } from 'src/app/dao/tipo-atividade-dao.service';
import { Documento } from 'src/app/models/documento.model';
import { ModalidadePgdService } from 'src/app/services/modalidade-pgd.service';
let AtividadeFormConcluirComponent = class AtividadeFormConcluirComponent extends PageFormBase {
    constructor(injector) {
        super(injector, Atividade, AtividadeDaoService);
        this.injector = injector;
        this.modalWidth = 800;
        this.entregas = [];
        this.validate = (control, controlName) => {
            let result = null;
            if ((controlName == "plano_trabalho_entrega_id" && !control.value?.length) ||
                (controlName == "data_entrega" && !this.util.isDataValid(control.value))) {
                result = "Obrigatório";
            }
            return result;
        };
        this.tipoAtividadeDao = injector.get(TipoAtividadeDaoService);
        this.tipoDocumentoDao = injector.get(TipoDocumentoDaoService);
        this.calendar = injector.get(CalendarService);
        this.modalidadePgd = injector.get(ModalidadePgdService);
        this.title = 'Conclusão de ' + this.lex.translate('atividade');
        this.form = this.fh.FormBuilder({
            tipo_atividade_id: { default: null },
            data_distribuicao: { default: null },
            esforco: { default: 0 },
            progresso: { default: 0 },
            data_estipulada_entrega: { default: null },
            data_inicio: { default: null },
            tempo_despendido: { default: 0 },
            data_entrega: { default: null },
            arquivar: { default: false },
            descricao_tecnica: { default: "" },
            documento_entrega: { default: new Documento() },
            documento_entrega_id: { default: null },
            plano_trabalho_entrega_id: { default: null }
        }, this.cdRef, this.validate);
        this.join = ["unidade", "plano_trabalho.entregas.plano_entrega_entrega:id,descricao"];
    }
    async loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        formValue = this.util.fillForm(formValue, entity);
        formValue.data_entrega = this.auth.hora;
        formValue.progresso = 100;
        await this.tipoAtividade.loadSearch(entity.tipo_atividade || formValue.tipo_atividade_id);
        if (entity.unidade_id != this.auth.unidade.id) {
            await this.auth.selecionaUnidade(entity.unidade_id, undefined);
        }
        this.entregas = entity.plano_trabalho?.entregas?.map(x => Object.assign({}, {
            key: x.id,
            value: x.descricao + (x.plano_entrega_entrega ? " (" + x.plano_entrega_entrega?.descricao + ")" : ""),
            data: x
        })) || [];
        formValue.arquivar = false;
        form.patchValue(formValue);
        this.onDataEntregaChange();
    }
    async initializeData(form) {
        this.entity = (await this.dao.getAtividade(this.urlParams.get("id")));
        await this.loadData(this.entity, form);
    }
    onDataEntregaChange(event) {
        const entrega = this.form.controls.data_entrega.value;
        const inicio = this.entity.data_inicio;
        const cargaHoraria = this.entity.carga_horaria;
        const unidade = this.entity.unidade;
        const pausas = this.entity.pausas || [];
        const afastamentos = this.entity.usuario?.afastamentos || [];
        this.efemerides = this.util.isDataValid(entrega) ? this.calendar.calculaDataTempoUnidade(inicio, entrega, cargaHoraria, unidade, "ENTREGA", pausas, afastamentos) : undefined;
        if (this.efemerides) {
            this.form.controls.tempo_despendido.setValue(this.efemerides.tempoUtil);
            this.cdRef.detectChanges();
        }
    }
    onTipoAtividadeSelect(item) {
        const tipoAtividade = item.entity;
        this.form.controls.esforco.setValue(tipoAtividade?.esforco || 0);
        this.cdRef.detectChanges();
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            let atividade = this.util.fill(new Atividade(), this.entity);
            atividade = this.util.fillForm(atividade, this.form.value);
            atividade.id = this.entity.id;
            atividade.descricao_tecnica = this.form.controls.descricao_tecnica.value;
            atividade.data_arquivamento = this.form.controls.arquivar.value ? new Date() : null;
            atividade.progresso = this.form.controls.progresso.value;
            atividade.produtividade = this.modalidadePgd.atividadeTempoDespendido(this.entity?.plano_trabalho?.modalidade_pgd) ? this.calendar.produtividade(atividade.esforco, atividade.tempo_despendido) : null;
            this.dao.concluir(atividade).then(saved => resolve(saved)).catch(reject);
        });
    }
};
__decorate([
    ViewChild('tipoAtividade', { static: false })
], AtividadeFormConcluirComponent.prototype, "tipoAtividade", void 0);
__decorate([
    ViewChild('docEntregue', { static: false })
], AtividadeFormConcluirComponent.prototype, "docEntregue", void 0);
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], AtividadeFormConcluirComponent.prototype, "editableForm", void 0);
AtividadeFormConcluirComponent = __decorate([
    Component({
        selector: 'app-atividade-form-concluir',
        templateUrl: './atividade-form-concluir.component.html',
        styleUrls: ['./atividade-form-concluir.component.scss'],
        standalone: false
    })
], AtividadeFormConcluirComponent);
export { AtividadeFormConcluirComponent };
//# sourceMappingURL=atividade-form-concluir.component.js.map