import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { TipoAvaliacaoDaoService } from 'src/app/dao/tipo-avaliacao-dao.service';
import { Avaliacao } from 'src/app/models/avaliacao.model';
import { AvaliacaoDaoService } from 'src/app/dao/avaliacao-dao.service';
import { PlanoTrabalhoConsolidacaoDaoService } from 'src/app/dao/plano-trabalho-consolidacao-dao.service';
import { PlanoEntregaDaoService } from 'src/app/dao/plano-entrega-dao.service';
import { NavigateResult } from 'src/app/services/navigate.service';
import { PlanoEntregaService } from '../../gestao/plano-entrega/plano-entrega.service';
import { PlanoEntregaEntregaDaoService } from 'src/app/dao/plano-entrega-entrega-dao.service';
import { PlanoTrabalhoEntregaDaoService } from 'src/app/dao/plano-trabalho-entrega-dao.service';
import { AvaliacaoEntregaChecklist } from 'src/app/models/avaliacao-entrega-checklist.model';
import { ProgramaDaoService } from 'src/app/dao/programa-dao.service';
let AvaliarComponent = class AvaliarComponent extends PageFormBase {
    constructor(injector) {
        super(injector, Avaliacao, AvaliacaoDaoService);
        this.injector = injector;
        this.recurso = false;
        this.tiposJustificativas = [];
        this.entregas = [];
        this.checklist = [];
        this.avaliacoes = [];
        this.modalWidth = 900;
        this.joinConsolidacao = [];
        this.joinPlanoEntrega = [];
        this.joinPrograma = ["tipo_avaliacao_plano_trabalho.notas.justificativas", "tipo_avaliacao_plano_entrega.notas.justificativas"];
        this.joinPlanoEntregaEntrega = ['entrega', 'objetivos.objetivo', 'processos.processo', 'unidade', 'comentarios.usuario:id,nome,apelido',];
        this.joinPlanoTrabalhoEntrega = ['entrega', 'planoEntregaEntrega:id,descricao,data_inicio,data_fim,plano_entrega_id,entrega_id', 'planoEntregaEntrega.entrega:id,nome,tipo_indicador'];
        this.validate = (control, controlName) => {
            let result = null;
            if (this.recurso) {
                if (controlName == 'recurso' && !control.value?.length) {
                    result = "Obrigatório";
                }
            }
            else {
                if (controlName == "nota" && ([null, undefined].includes(control.value) || !this.nota)) {
                    result = "Obrigatório";
                }
            }
            return result;
        };
        this.formValidation = (form) => {
            const values = form.value;
            if (!this.recurso) {
                if (this.nota?.justifica && !values.justificativa?.length && !values.justificativas?.length) {
                    return "Para a nota seleciona será necessário ao menos uma justificativa.";
                }
            }
            return undefined;
        };
        this.programaDao = injector.get(ProgramaDaoService);
        this.planoTrabalhoEntregaDao = injector.get(PlanoTrabalhoEntregaDaoService);
        this.tipoAvaliacaoDao = injector.get(TipoAvaliacaoDaoService);
        this.consolidacaoDao = injector.get(PlanoTrabalhoConsolidacaoDaoService);
        this.planoEntregaDao = injector.get(PlanoEntregaDaoService);
        this.planoEntregaEntregaDao = injector.get(PlanoEntregaEntregaDaoService);
        this.planoEntregaService = injector.get(PlanoEntregaService);
        this.join = ["avaliador", "entregas_checklist", "tipo_avaliacao.notas"];
        this.form = this.fh.FormBuilder({
            nota: { default: null },
            recurso: { default: "" },
            justificativas: { default: [] },
            justificativa: { default: "" },
            arquivar: { default: true },
        }, this.cdRef, this.validate);
    }
    async loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        this.loading = true;
        try {
            this.consolidacao = this.urlParams?.has("consolidacaoId") || this.metadata?.consolidacao ? this.metadata?.consolidacao || await this.consolidacaoDao.getById(this.urlParams.get("consolidacaoId"), this.joinConsolidacao) : undefined;
            this.planoEntrega = this.urlParams?.has("planoEntregaId") || this.metadata?.planoEntrega ? this.metadata?.planoEntrega || await this.planoEntregaDao.getById(this.urlParams.get("planoEntregaId"), this.joinPlanoEntrega) : undefined;
            this.avaliacoes = await this.dao.query({ where: this.consolidacao ? [["plano_trabalho_consolidacao_id", "==", this.consolidacao.id]] : [["plano_entrega_id", "==", this.planoEntrega?.id]], join: this.join, orderBy: [["data_avaliacao", "desc"]] }).asPromise();
            this.entity = this.avaliacoes.find(x => x.id == (this.consolidacao || this.planoEntrega)?.avaliacao_id) || this.entity;
            this.programa = this.metadata?.programa || await this.programaDao.query({ where: [["id", "==", this.consolidacao?.plano_trabalho?.programa_id || this.planoEntrega?.programa_id]], join: this.joinPrograma }).firstOrDefault(this.consolidacao?.plano_trabalho?.programa || this.planoEntrega?.programa);
            this.origem = !!this.consolidacao ? "CONSOLIDACAO" : "PLANO_ENTREGA";
            this.tipoAvaliacao = this.isConsolidacao ? this.programa?.tipo_avaliacao_plano_trabalho : this.programa?.tipo_avaliacao_plano_entrega;
            this.checklist = (this.isConsolidacao ? this.programa?.checklist_avaliacao_entregas_plano_trabalho : this.programa?.checklist_avaliacao_entregas_plano_entrega) || [];
            this.recurso = !!this.metadata?.recurso;
            this.entregas = this.metadata?.entregas || (this.isConsolidacao ?
                await this.planoTrabalhoEntregaDao.query({ where: [["plano_trabalho_id", "==", this.consolidacao.plano_trabalho_id]], join: this.joinPlanoTrabalhoEntrega }).asPromise() :
                await this.planoEntregaEntregaDao.query({ where: [["plano_entrega_id", "==", this.planoEntrega.id]], join: this.joinPlanoEntregaEntrega }).asPromise());
            this.entregas.forEach(x => {
                x._metadata = {};
                this.checklist.forEach(y => {
                    let checklist = this.entity?.entregas_checklist.find(z => x.id == (z.plano_entrega_entrega_id || z.plano_trabalho_entrega_id));
                    x._metadata[y.key] = !checklist || !!checklist.checklist.find(k => k.id == y.key)?.checked;
                });
            });
            this.usuario = this.consolidacao?.plano_trabalho?.usuario;
            formValue = this.util.fillForm(formValue, this.entity);
            this.form.controls.nota.setValue(formValue.nota);
            this.onNotaChange(new Event('change'));
            form.patchValue(formValue);
        }
        finally {
            this.loading = false;
        }
    }
    async initializeData(form) {
        this.entity = new Avaliacao();
        await this.loadData(this.entity, form);
    }
    get nota() {
        return this.notaInput?.nota;
    }
    get labelNota() {
        return 'Como foi o trabalho ' + (this.isConsolidacao ? 'de ' + this.util.apelidoOuNome(this.usuario) : 'da ' + this.planoEntrega?.unidade?.sigla) + '?';
    }
    get styleButtonNota() {
        const rgb = this.util.colorHexToRGB(this.nota?.cor || "#000000");
        return "background-color: rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ", 0.2);";
    }
    get isConsolidacao() {
        return this.origem == 'CONSOLIDACAO';
    }
    get isPlanoEntrega() {
        return this.origem == 'PLANO_ENTREGA';
    }
    onNotaChange(event) {
        this.tiposJustificativas = this.nota?.justificativas?.map(x => {
            return {
                key: x.tipo_justificativa_id,
                value: x.tipo_justificativa.nome || ""
            };
        }) || [];
    }
    async saveData(form) {
        if (this.recurso) {
            await this.dao.recorrer(this.consolidacao.avaliacao, form.recurso);
            return new NavigateResult(this.consolidacao.avaliacao);
        }
        else {
            //let justificativasIds: string[] = (form.justificativas as LookupItem[]).map(x => x.key);
            this.entity.id = ""; /* Todo save da avaliação é uma nova avaliação (Exceto o recurso) */
            this.entity.data_avaliacao = this.auth.hora;
            this.entity.nota = form.nota;
            this.entity.justificativa = form.justificativa;
            this.entity.justificativas = form.justificativas;
            this.entity.avaliador_id = this.auth.usuario.id;
            this.entity.plano_entrega_id = this.planoEntrega?.id || null;
            this.entity.plano_trabalho_consolidacao_id = this.consolidacao?.id || null;
            this.entity.tipo_avaliacao_id = this.tipoAvaliacao.id;
            this.entity.tipo_avaliacao_nota_id = this.nota.id;
            /* Atualiza os checklist das entregas */
            if (this.checklist.length) {
                this.entity.entregas_checklist = this.entregas.map(x => {
                    return new AvaliacaoEntregaChecklist({
                        plano_trabalho_entrega_id: this.consolidacao ? x.id : null,
                        plano_entrega_entrega_id: this.planoEntrega ? x.id : null,
                        checklist: this.checklist.map(y => {
                            return {
                                id: y.key,
                                texto: y.value,
                                checked: !!x._metadata[y.key]
                            };
                        })
                    });
                });
            }
            return new NavigateResult(await this.dao.save(this.entity, this.join));
        }
    }
};
__decorate([
    ViewChild('notaInput', { static: false })
], AvaliarComponent.prototype, "notaInput", void 0);
__decorate([
    ViewChild('justificativas', { static: false })
], AvaliarComponent.prototype, "justificativas", void 0);
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], AvaliarComponent.prototype, "editableForm", void 0);
AvaliarComponent = __decorate([
    Component({
        selector: 'avaliar',
        templateUrl: './avaliar.component.html',
        styleUrls: ['./avaliar.component.scss'],
        standalone: false
    })
], AvaliarComponent);
export { AvaliarComponent };
//# sourceMappingURL=avaliar.component.js.map