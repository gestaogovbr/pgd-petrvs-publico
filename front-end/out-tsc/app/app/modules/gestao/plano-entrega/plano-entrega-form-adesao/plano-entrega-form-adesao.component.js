import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { CadeiaValorDaoService } from 'src/app/dao/cadeia-valor-dao.service';
import { PlanejamentoDaoService } from 'src/app/dao/planejamento-dao.service';
import { PlanoEntregaDaoService } from 'src/app/dao/plano-entrega-dao.service';
import { ProgramaDaoService } from 'src/app/dao/programa-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { PlanoEntrega } from 'src/app/models/plano-entrega.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
let PlanoEntregaFormAdesaoComponent = class PlanoEntregaFormAdesaoComponent extends PageFormBase {
    constructor(injector) {
        super(injector, PlanoEntrega, PlanoEntregaDaoService);
        this.injector = injector;
        this.validate = (control, controlName) => {
            let result = null;
            if (['nome', 'plano_entrega_id'].indexOf(controlName) >= 0 && !control.value?.length) {
                result = "Obrigatório";
            }
            return result;
        };
        this.titleEdit = (entity) => {
            return "Editando " + this.lex.translate("Plano de Entregas") + ': ' + (entity?.nome || "");
        };
        this.unidadeDao = injector.get(UnidadeDaoService);
        this.programaDao = injector.get(ProgramaDaoService);
        this.planoEntregaDao = injector.get(PlanoEntregaDaoService);
        this.cadeiaValorDao = injector.get(CadeiaValorDaoService);
        this.planejamentoInstitucionalDao = injector.get(PlanejamentoDaoService);
        this.join = [];
        this.modalWidth = 1000;
        this.form = this.fh.FormBuilder({
            nome: { default: "" },
            data_inicio: { default: "" },
            data_fim: { default: "" },
            planejamento_id: { default: null },
            cadeia_valor_id: { default: null },
            unidade_id: { default: this.auth.unidade?.id },
            plano_entrega_id: { default: null },
            programa_id: { default: null },
            status: { default: "HOMOLOGANDO" }
        }, this.cdRef, this.validate);
    }
    ngOnInit() {
        super.ngOnInit();
        let planoEntrega = this.metadata?.planoEntrega ? this.metadata?.planoEntrega : null;
        if (planoEntrega) {
            this.form.controls.plano_entrega_id.setValue(planoEntrega.id);
            this.form.controls.nome.setValue(planoEntrega.nome);
            this.form.controls.data_inicio.setValue(planoEntrega.data_inicio);
            this.form.controls.data_fim.setValue(planoEntrega.data_fim);
            this.form.controls.planejamento_id.setValue(planoEntrega.planejamento_id);
            this.form.controls.cadeia_valor_id.setValue(planoEntrega.cadeia_valor_id);
        }
    }
    async loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        form.patchValue(this.util.fillForm(formValue, entity));
        this.cdRef.detectChanges();
    }
    async initializeData(form) {
        this.loadData(this.entity, this.form);
    }
    async saveData(form) {
        return new Promise((resolve, reject) => {
            let planoEntrega = this.util.fill(new PlanoEntrega(), this.entity);
            planoEntrega = this.util.fillForm(planoEntrega, this.form.value);
            resolve(planoEntrega);
        });
    }
    onPlanoEntregaChange(event) {
        if (this.form.controls.plano_entrega_id.value) {
            this.form.controls.nome.setValue(this.planoEntrega?.selectedEntity.nome);
            this.form.controls.data_inicio.setValue(this.planoEntrega?.selectedEntity.data_inicio);
            this.form.controls.data_fim.setValue(this.planoEntrega?.selectedEntity.data_fim);
            this.form.controls.planejamento_id.setValue(this.planoEntrega?.selectedEntity.planejamento_id);
            this.form.controls.cadeia_valor_id.setValue(this.planoEntrega?.selectedEntity.cadeia_valor_id);
            this.form.controls.programa_id.setValue(this.planoEntrega?.selectedEntity.programa_id);
        }
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], PlanoEntregaFormAdesaoComponent.prototype, "editableForm", void 0);
__decorate([
    ViewChild(GridComponent, { static: true })
], PlanoEntregaFormAdesaoComponent.prototype, "grid", void 0);
__decorate([
    ViewChild(InputSearchComponent, { static: true })
], PlanoEntregaFormAdesaoComponent.prototype, "planoEntrega", void 0);
PlanoEntregaFormAdesaoComponent = __decorate([
    Component({
        selector: 'plano-entrega-adesao',
        templateUrl: './plano-entrega-form-adesao.component.html',
        styleUrls: ['./plano-entrega-form-adesao.component.scss'],
        standalone: false
    })
], PlanoEntregaFormAdesaoComponent);
export { PlanoEntregaFormAdesaoComponent };
//# sourceMappingURL=plano-entrega-form-adesao.component.js.map