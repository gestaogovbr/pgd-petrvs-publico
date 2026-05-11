import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { PlanejamentoDaoService } from 'src/app/dao/planejamento-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { Planejamento } from 'src/app/models/planejamento.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { UtilService } from "src/app/services/util.service";
let PlanejamentoFormComponent = class PlanejamentoFormComponent extends PageFormBase {
    constructor(injector) {
        super(injector, Planejamento, PlanejamentoDaoService);
        this.injector = injector;
        this.planejamentosSuperiores = [];
        this.hasPermissionToUNEX = false;
        this.joinPlanejamentoSuperior = [];
        this.validate = (control, controlName) => {
            let result = null;
            /*  (RN_PLAN_INST_A)
                Para a criação de um planejamento institucional são informações obrigatórias: nome, missão, visão, data de início, unidade responsável e ao menos um dos valores institucionais.
            */
            if (['nome', 'unidade_id', 'missao', 'visao'].indexOf(controlName) >= 0 && !control.value?.length) {
                result = "Obrigatório";
            }
            if (controlName == 'data_inicio' && !this.dao?.validDateTime(control.value)) {
                result = "Inválido";
            }
            if (controlName == 'data_fim' && control.value && !this.dao?.validDateTime(control.value)) {
                result = "Inválido";
            }
            return result;
        };
        this.formValidation = async (form) => {
            /* (RN_PLAN_INST_A) Para a criação de um planejamento institucional são informações obrigatórias: nome, missão, visão, data de início, unidade responsável e ao menos um dos valores institucionais. */
            let result = undefined;
            if (this.form.controls.data_fim.value && this.form.controls.data_inicio.value > this.form.controls.data_fim.value)
                return "A data do início não pode ser maior que a data do fim! [RN_PLAN_INST_A]";
            if (this.form.controls.valores.value.length == 0)
                return "É obrigatória a inclusão de ao menos um valor institucional! [RN_PLAN_INST_A]";
            /* (RN_PLAN_INST_B) Não pode existir mais de um planejamento institucional para uma mesma unidade em um mesmo período de tempo. */
            let unidades = await this.dao?.query({ where: [['unidade_id', '==', this.form.controls.unidade_id.value]] }).asPromise();
            (unidades || []).forEach(un => {
                if (un.id != this.entity.id && this.util.intersection([{ start: this.util.asDate(un.data_inicio), end: this.util.asDate(un.data_fim) },
                    { start: this.util.asDate(this.form.controls.data_inicio.value), end: this.util.asDate(this.form.controls.data_fim.value) }])) {
                    result = "Sobreposição de planejamento para o período de datas selecionadas [RN_PLAN_INST_B]";
                }
            });
            return result;
        };
        this.titleEdit = (entity) => {
            return "Editando " + this.lex.translate("Planejamento Institucional") + ': ' + (entity?.nome || "");
        };
        this.unidadeDao = injector.get(UnidadeDaoService);
        this.hasPermissionToUNEX = this.auth.hasPermissionTo('MOD_PLAN_INST_INCL_UNEX_LOTPRI') || this.auth.hasPermissionTo('MOD_PLAN_INST_INCL_UNEX_QQLOT') || this.auth.hasPermissionTo('MOD_PLAN_INST_INCL_UNEX_SUBORD') || this.auth.hasPermissionTo('MOD_PLAN_INST_INCL_UNEX_QUALQUER');
        this.join = [
            'objetivos',
            'objetivos.objetivo_pai:id,nome',
            'objetivos.objetivo_superior:id,planejamento_id',
            'objetivos.eixo_tematico:id,nome',
            'planejamento_superior:id,nome',
            'planejamento_superior.objetivos'
        ];
        this.joinPlanejamentoSuperior = [
            "objetivos"
        ];
        this.form = this.fh.FormBuilder({
            nome: { default: "" },
            unidade_id: { default: null },
            entidade_id: { default: null },
            planejamento_superior_id: { default: null },
            data_inicio: { default: new Date() },
            data_fim: { default: null },
            missao: { default: "" },
            visao: { default: "" },
            valores: { default: [] },
            valor_texto: { default: "" },
            resultados_institucionais: { default: [] },
            resultados_texto: { default: "" },
            utilizar_superior: { default: false }
        }, this.cdRef, this.validate);
        this.util = injector.get(UtilService);
    }
    async loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        await this.carregaPlanejamentosSuperiores(entity.unidade_id);
        form.patchValue(this.util.fillForm(formValue, entity));
        this.form.controls.planejamento_superior_id.setValue(entity.planejamento_superior_id);
    }
    initializeData(form) {
        this.entity = new Planejamento();
        this.loadData(this.entity, form);
    }
    async saveData(form) {
        return new Promise((resolve, reject) => {
            //this.objetivos!.grid!.confirm();
            let planejamento = this.util.fill(new Planejamento(), this.entity);
            planejamento = this.util.fillForm(planejamento, this.form.value);
            planejamento.objetivos = this.objetivos.items;
            resolve(planejamento);
        });
    }
    addValorHandle() {
        let result = undefined;
        const value = this.form.controls.valor_texto.value;
        const key = this.util.textHash(value);
        if (value?.length && this.util.validateLookupItem(this.form.controls.valores.value, key)) {
            result = {
                key: key,
                value: this.form.controls.valor_texto.value
            };
            this.form.controls.valor_texto.setValue("");
        }
        return result;
    }
    ;
    addResultadoHandle() {
        let result = undefined;
        const value = this.form.controls.resultados_texto.value;
        const key = this.util.textHash(value);
        if (value?.length && this.util.validateLookupItem(this.form.controls.resultados_institucionais.value, key)) {
            result = {
                key: key,
                value: this.form.controls.resultados_texto.value
            };
            this.form.controls.resultados_texto.setValue("");
        }
        return result;
    }
    ;
    async onUnidadeChange(event) {
        if (this.entity.unidade_id != this.form.controls.unidade_id.value)
            await this.carregaPlanejamentosSuperiores(this.form.controls.unidade_id.value);
    }
    async carregaPlanejamentosSuperiores(unidadeId) {
        if (unidadeId?.length) {
            let pls = await this.dao?.query({ where: [['unidade_id', '==', unidadeId], ['manut_planej_unidades_executoras', '==', true]], join: this.joinPlanejamentoSuperior }).asPromise();
            this.planejamentosSuperiores = (pls || []).map(x => Object.assign({}, { key: x.id, value: x.nome, data: x }));
            this.planejamentosSuperiores.sort((a, b) => (a.value > b.value ? 1 : -1));
            this.planejamentosSuperiores.unshift({ key: null, value: 'Escolha um Planejamento superior...' });
            this.objetivos.loadData(this.entity, this.form);
            this.cdRef.detectChanges();
        }
    }
    async onUtilizarSuperiorChange(event) {
        let unidade_superior_id = this.form.controls.planejamento_superior_id.value;
        if (this.form.controls.utilizar_superior.value && unidade_superior_id?.length) {
            let pls = await this.dao?.query({ where: [['id', '==', unidade_superior_id]] }).asPromise();
            this.form.controls.missao.setValue(pls[0].missao);
            this.form.controls.visao.setValue(pls[0].visao);
            this.form.controls.valores.setValue(pls[0].valores);
            this.form.controls.resultados_institucionais.setValue(pls[0].resultados_institucionais);
        }
    }
    /**
     * @param event
     * Se o planejamento superior for alterado, e já houver objetivos na lista vinculados a objetivos dele, avisar que eles perderão esses vínculos.
     */
    async onPlanejamentoChange(event) {
        if (this.form.controls.planejamento_superior_id.value != this.entity?.planejamento_superior_id && this.entity?.objetivos?.length && this.entity?.objetivos.filter(x => x.objetivo_superior && x.objetivo_superior.planejamento_id == this.entity?.planejamento_superior_id).length) {
            let confirm = await this.dialog.confirm("Alteração de Planejamento Superior", "Como já existe(m) objetivo(s) neste Planejamento, vinculado(s) a objetivo(s) do Planejamento Superior anterior, seus vínculos serão perdidos! Deseja continuar?");
            if (confirm) {
                this.entity?.objetivos?.forEach(obj => obj.objetivo_superior_id = null);
                //atualizar a lista de objetivos superiores
            }
            else {
                this.form.controls.planejamento_superior_id.setValue(this.entity?.planejamento_superior_id);
            }
            ;
        }
        ;
        this.entity.planejamento_superior_id = this.form.controls.planejamento_superior_id.value;
        this.entity.planejamento_superior = this.planejamentoSuperior.selectedItem?.data;
        this.objetivos.planejamento_superior_id = this.form.controls.planejamento_superior_id.value;
        //this.objetivos?.grid?.loadColumns();
        this.cdRef.detectChanges();
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], PlanejamentoFormComponent.prototype, "editableForm", void 0);
__decorate([
    ViewChild(GridComponent, { static: true })
], PlanejamentoFormComponent.prototype, "grid", void 0);
__decorate([
    ViewChild('planejamentoSuperior', { static: false })
], PlanejamentoFormComponent.prototype, "planejamentoSuperior", void 0);
__decorate([
    ViewChild('objetivos', { static: false })
], PlanejamentoFormComponent.prototype, "objetivos", void 0);
PlanejamentoFormComponent = __decorate([
    Component({
        selector: 'app-planejamento-form',
        templateUrl: './planejamento-form.component.html',
        styleUrls: ['./planejamento-form.component.scss'],
        standalone: false
    })
], PlanejamentoFormComponent);
export { PlanejamentoFormComponent };
//# sourceMappingURL=planejamento-form.component.js.map