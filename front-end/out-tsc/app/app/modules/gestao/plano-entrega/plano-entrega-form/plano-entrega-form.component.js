import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { CadeiaValorDaoService } from 'src/app/dao/cadeia-valor-dao.service';
import { PlanejamentoDaoService } from 'src/app/dao/planejamento-dao.service';
import { PlanoEntregaDaoService } from 'src/app/dao/plano-entrega-dao.service';
import { ProgramaDaoService } from 'src/app/dao/programa-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { PlanoEntrega } from 'src/app/models/plano-entrega.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import moment from 'moment';
import { PlanoEntregaEntregaDaoService } from 'src/app/dao/plano-entrega-entrega-dao.service';
import { ProgramaService } from 'src/app/services/programa.service';
let PlanoEntregaFormComponent = class PlanoEntregaFormComponent extends PageFormBase {
    constructor(injector) {
        super(injector, PlanoEntrega, PlanoEntregaDaoService);
        this.injector = injector;
        this.validate = (control, controlName) => {
            let result = null;
            if (['nome', 'unidade_id', 'programa_id'].indexOf(controlName) >= 0 && !control.value?.length) {
                result = "Obrigatório";
            }
            if (['data_inicio'].indexOf(controlName) >= 0 && !this.dao?.validDateTime(control.value)) {
                result = "Inválido";
            }
            if (['data_fim'].indexOf(controlName) >= 0 && !this.dao?.validDateTime(control.value)) {
                result = "Inválido";
            }
            return result;
        };
        this.formValidation = (form) => {
            const inicio = this.form?.controls.data_inicio.value;
            const fim = this.form?.controls.data_fim.value;
            const programa = this.programa?.selectedItem?.data;
            if (!programa) {
                return "Obrigatório selecionar o programa";
            }
            else if (!this.dao?.validDateTime(inicio)) {
                return "Data de início inválida";
            }
            else if (!this.dao?.validDateTime(fim)) {
                return "Data de fim inválida";
            }
            else if (inicio > fim) {
                return "A data do fim não pode ser menor que a data do início!";
            }
            else {
                const entregas = this.form.controls.entregas.value || [];
                for (let entrega of entregas) {
                    if (!this.auth.hasPermissionTo("MOD_PENT_ENTR_EXTRPL") && entrega.data_inicio < inicio)
                        return "A " + this.lex.translate("entrega") + " '" + entrega.descricao + "' possui data inicial anterior à " + this.lex.translate("do Plano de Entrega") + ": " + this.util.getDateFormatted(inicio);
                    if (!this.auth.hasPermissionTo("MOD_PENT_ENTR_EXTRPL") && entrega.data_fim > fim)
                        return "A " + this.lex.translate("entrega") + " '" + entrega.descricao + "' possui data fim posterior à " + this.lex.translate("do Plano de Entrega") + ": " + this.util.getDateFormatted(fim);
                }
            }
            return undefined;
        };
        this.titleEdit = (entity) => {
            return "Editando " + this.lex.translate("Plano de Entregas") + ': ' + (entity?.nome || "");
        };
        this.unidadeDao = injector.get(UnidadeDaoService);
        this.programaDao = injector.get(ProgramaDaoService);
        this.cadeiaValorDao = injector.get(CadeiaValorDaoService);
        this.planoEntregaDao = injector.get(PlanoEntregaDaoService);
        this.planoEntregaEntregaDao = injector.get(PlanoEntregaEntregaDaoService);
        this.planejamentoInstitucionalDao = injector.get(PlanejamentoDaoService);
        this.programaService = injector.get(ProgramaService);
        this.join = [
            "entregas.entrega",
            "entregas.objetivos.objetivo",
            "entregas.processos.processo",
            "entregas.produtos.produto",
            "entregas.unidade",
            "unidade",
            'entregas.reacoes.usuario:id,nome,apelido'
        ];
        this.modalWidth = 1200;
        this.form = this.fh.FormBuilder({
            nome: { default: "" },
            data_inicio: { default: new Date() },
            data_fim: { default: new Date() },
            unidade_id: { default: "" },
            plano_entrega_id: { default: null }, // até o momento, um plano de entrega não poderá estar vinculado a outro (adesão de Plano de Entrega)
            planejamento_id: { default: null },
            cadeia_valor_id: { default: null },
            programa_id: { default: null },
            entregas: { default: [] },
        }, this.cdRef, this.validate);
        this.programaMetadata = {
            todosUnidadeExecutora: true,
            vigentesUnidadeExecutora: false
        };
        this.unidadeWhere = [['executora', '==', true], ['apenas_chefiadas', '==', true]];
    }
    async loadData(entity, form, action) {
        if (action == 'clone') {
            entity.id = "";
            entity.data_inicio = new Date();
            entity.data_fim = moment().add(1, 'day').toDate();
            // só clonar entregas que não possuem vínculos excluídos
            const entregas = entity.entregas || [];
            // array de ids com vinculos excluídos
            const possuiVinculosExcluidos = await this.planoEntregaEntregaDao.possuiVinculosExcluidos(entregas.map(e => e.id));
            // filtra entregas que não possuem vínculos excluídos
            entity.entregas = entregas.filter(entrega => !possuiVinculosExcluidos.includes(entrega.id));
            entity.entregas = entity.entregas.map(entrega => {
                entrega.id = this.planoEntregaDao.generateUuid();
                entrega.plano_entrega_id = null;
                entrega._status = "ADD";
                entrega.progresso_realizado = 0;
                entrega.progresso_esperado = 0;
                entrega.realizado.valor = 0;
                entrega.realizado.porcentagem = 0;
                entrega.data_inicio = new Date();
                entrega.data_fim = moment().add(1, 'day').toDate();
                return entrega;
            });
        }
        let formValue = Object.assign({}, form.value);
        form.patchValue(this.util.fillForm(formValue, entity));
        this.cdRef.detectChanges();
    }
    async initializeData(form) {
        this.entity = new PlanoEntrega();
        this.entity.unidade_id = this.auth.unidade?.id || "";
        this.entity.unidade = this.auth.unidade;
        let programas = await this.programaDao.query({
            where: [['todosUnidadeExecutora', '==', this.auth.unidade.id]],
            orderBy: [["unidade.path", "desc"]]
        }).asPromise();
        let programaVigente = this.programaService.selecionaProgramaVigente(programas) || programas[0];
        if (programaVigente) {
            this.entity.programa = programaVigente;
            this.entity.programa_id = programaVigente.id;
        }
        const di = new Date(this.entity.data_inicio).toLocaleDateString();
        const df = this.entity.data_fim ? new Date(this.entity.data_fim).toLocaleDateString() : new Date().toLocaleDateString();
        this.entity.nome = this.auth.unidade.sigla + " - " + di + " - " + df;
        this.loadData(this.entity, this.form);
    }
    async saveData(form) {
        return new Promise((resolve, reject) => {
            let planoEntrega = this.util.fill(new PlanoEntrega(), this.entity);
            planoEntrega = this.util.fillForm(planoEntrega, this.form.value);
            planoEntrega.entregas = planoEntrega.entregas?.filter(x => x._status) || [];
            resolve(planoEntrega);
        });
    }
    dynamicButtons(row) {
        let result = [];
        return result;
    }
    onDataChange() { this.sugereNome(); }
    async onUnidadeChange() {
        const unidadeIdValue = this.form.controls['unidade_id'].value;
        let unidade_id = unidadeIdValue ? unidadeIdValue : this.auth.unidade?.id;
        if (unidade_id) {
            try {
                const permissaoIncluir = await this.planoEntregaDao.permissaoIncluir(unidade_id);
            }
            catch (error) {
                this.error(error);
            }
        }
        this.sugereNome();
        this.sugereRegramento();
    }
    sugereNome() {
        //if(this.action == 'new') {
        const sigla = this.unidade?.selectedItem ? this.unidade?.selectedItem?.entity.sigla : this.auth.unidade?.sigla;
        const di = new Date(this.form.controls.data_inicio.value).toLocaleDateString();
        const df = this.form.controls.data_fim.value ? " - " + new Date(this.form.controls.data_fim.value).toLocaleDateString() : '';
        this.form.controls.nome.setValue(sigla + " - " + di + df);
        //}
    }
    async sugereRegramento() {
        try {
            const unidadeId = this.form.controls.unidade_id?.value;
            if (!unidadeId) {
                console.warn('ID da unidade não fornecido para carregar programas');
                return;
            }
            let where = [['todosUnidadeExecutora', '==', unidadeId]];
            if (this.entity?.id && this.entity.programa_id)
                where = [['id', '==', this.entity.programa_id]];
            const programas = await this.programaDao.query({
                where: where,
                orderBy: [["unidade.path", "desc"]]
            }).asPromise();
            if (programas.length > 0) {
                if (this.programa) {
                    let programaVigente = programas[0];
                    let today = new Date();
                    this.programa.items = programas.map(prog => {
                        if (prog.data_inicio <= today && prog.data_fim >= today)
                            programaVigente = prog;
                        return ({
                            key: prog.id,
                            value: prog.nome,
                            data: prog
                        });
                    });
                    if (programaVigente && this.entity) {
                        this.entity.programa = programaVigente;
                        this.entity.programa_id = programaVigente.id;
                        this.programa.setValue(programaVigente.id);
                    }
                }
            }
            else {
                if (this.programa)
                    this.programa.disabled = 'true';
            }
        }
        catch (error) {
            console.error('Erro ao carregar programas:', error);
            this.dialog.alert('Erro', 'Não foi possível carregar os programas disponíveis.');
        }
    }
    somaDia(date, days) {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
    onProgramaChange() {
        const dias = this.programa?.selectedItem?.data?.prazo_max_plano_entrega;
        const data = this.somaDia(this.entity.data_inicio, dias);
        if (!this.entity?.data_fim) {
            this.form.controls.data_fim.setValue(new Date(data));
            this.dataFim?.change.emit();
        }
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], PlanoEntregaFormComponent.prototype, "editableForm", void 0);
__decorate([
    ViewChild(GridComponent, { static: true })
], PlanoEntregaFormComponent.prototype, "grid", void 0);
__decorate([
    ViewChild('programa', { static: false })
], PlanoEntregaFormComponent.prototype, "programa", void 0);
__decorate([
    ViewChild('unidade', { static: true })
], PlanoEntregaFormComponent.prototype, "unidade", void 0);
__decorate([
    ViewChild('nome', { static: true })
], PlanoEntregaFormComponent.prototype, "nomePE", void 0);
__decorate([
    ViewChild('data_fim', { static: true })
], PlanoEntregaFormComponent.prototype, "dataFim", void 0);
PlanoEntregaFormComponent = __decorate([
    Component({
        selector: 'app-plano-entrega-form',
        templateUrl: './plano-entrega-form.component.html',
        styleUrls: ['./plano-entrega-form.component.scss'],
        standalone: false
    })
], PlanoEntregaFormComponent);
export { PlanoEntregaFormComponent };
//# sourceMappingURL=plano-entrega-form.component.js.map