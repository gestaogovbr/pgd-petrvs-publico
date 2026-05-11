import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
import { Atividade } from 'src/app/models/atividade.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { CalendarService } from 'src/app/services/calendar.service';
import { PlanoTrabalhoDaoService } from 'src/app/dao/plano-trabalho-dao.service';
import { ModalidadePgdService } from 'src/app/services/modalidade-pgd.service';
let AtividadeFormIniciarComponent = class AtividadeFormIniciarComponent extends PageFormBase {
    get labelInfoSuspender() {
        const n = this.iniciadas.length > 1 ? this.lex.translate("tarefas") : this.lex.translate("tarefa");
        const s = this.iniciadas.length == 1 ? "" : "s";
        const q = this.iniciadas.length == 1 ? "" : " " + this.iniciadas.length.toString();
        return this.iniciadas.length ? `Suspender a${s}${q} ${n} já iniciada${s}?` : "Não há outras atividades iniciadas pelo usuário!";
    }
    constructor(injector) {
        super(injector, Atividade, AtividadeDaoService);
        this.injector = injector;
        this.modalWidth = 600;
        this.iniciadas = [];
        this.planoTrabalhoSelecionado = null;
        this.planosTrabalhos = [];
        this.planosTrabalhosEntregas = [];
        this.planoTrabalhoJoin = ["entregas.plano_entrega_entrega:id,descricao"];
        this.validate = (control, controlName) => {
            let result = null;
            if (["usuario_id", "plano_trabalho_id", "plano_trabalho_entrega_id"].includes(controlName) && !control.value?.length) {
                result = "Obrigatório";
            }
            else if (controlName == "data_inicio" && !control.value) {
                result = "Obrigatório";
            }
            return result;
        };
        this.formValidation = (form) => {
            let result = undefined;
            /* (RN_ATV_6) Somente será permitido iniciar a atividade dentro do período do plano de trabalho. */
            if (this.planoTrabalhoSelecionado && (this.util.asTimestamp(this.form.controls.data_inicio.value) < this.util.asTimestamp(this.planoTrabalhoSelecionado.data_inicio) || this.util.asTimestamp(this.form.controls.data_inicio.value) > this.util.asTimestamp(this.planoTrabalhoSelecionado.data_fim))) {
                result = "Data de início fora do período do plano de trabalho (" + this.util.getDateFormatted(this.planoTrabalhoSelecionado.data_inicio) + " até " + this.util.getDateFormatted(this.planoTrabalhoSelecionado.data_fim) + ") [RN_ATV_6]";
            }
            return result;
        };
        this.usuarioDao = injector.get(UsuarioDaoService);
        this.planoTrabalhoDao = injector.get(PlanoTrabalhoDaoService);
        this.modalidadePgd = injector.get(ModalidadePgdService);
        this.calendar = injector.get(CalendarService);
        this.form = this.fh.FormBuilder({
            usuario_id: { default: undefined },
            plano_trabalho_id: { default: undefined },
            plano_trabalho_entrega_id: { default: undefined },
            data_distribuicao: { default: new Date() },
            data_estipulada_entrega: { default: new Date() },
            carga_horaria: { default: 0 },
            tempo_planejado: { default: 0 },
            esforco: { default: 0 },
            data_inicio: { default: null },
            suspender: { default: false }
        }, this.cdRef, this.validate);
        this.join = ["unidade", "atividade"];
    }
    loadIniciadas(usuario_id) {
        this.iniciadas = [];
        if (usuario_id?.length) {
            this.dao.iniciadas(usuario_id).then(idsIniciadas => {
                this.iniciadas = idsIniciadas;
                this.cdRef.detectChanges();
            });
        }
    }
    onUsuarioSelect(item) {
        const usuario = item.entity;
        const planosTrabalhos = usuario?.planos_trabalho || [];
        this.planosTrabalhos = planosTrabalhos.filter(x => x.unidade_id == this.entity.unidade_id).map(x => {
            return {
                key: x.id,
                value: (x.modalidade_pgd_label || this.modalidadePgd.label(x.modalidade_pgd)) + " - " + this.dao.getDateFormatted(x.data_inicio) + " à " + this.dao.getDateFormatted(x.data_fim),
                data: x
            };
        });
        this.cdRef.detectChanges();
        if (!this.form.controls.plano_trabalho_id.value?.length && this.planosTrabalhos.length == 1) {
            this.form.controls.plano_trabalho_id.setValue(this.planosTrabalhos[0].key);
        }
        this.cdRef.detectChanges();
    }
    onPlanoChange(event) {
        (async () => {
            if (this.entity && this.planoTrabalho?.selectedItem?.data) {
                const planoTrabalho = this.planoTrabalho?.selectedItem?.data;
                if (this.planoTrabalhoSelecionado?.id != planoTrabalho.id) {
                    this.planoTrabalhoSelecionado = await this.planoTrabalhoDao.getById(planoTrabalho.id, this.planoTrabalhoJoin);
                }
                const cargaHoraria = planoTrabalho?.carga_horaria || this.calendar.expedienteMedio(this.entity.unidade);
                const tempo_planejado = this.calendar.horasUteis(this.form.controls.data_distribuicao.value, this.form.controls.data_estipulada_entrega.value, cargaHoraria, this.entity.unidade, "DISTRIBUICAO");
                this.form.controls.carga_horaria.setValue(cargaHoraria);
                this.form.controls.tempo_planejado.setValue(tempo_planejado);
                this.form.controls.esforco.setValue(this.form.controls.esforco.value || this.entity?.tipo_atividade?.esforco || 0);
                /* Carrega entregas */
                const planoTrabalhoEntregaId = this.form.controls.plano_trabalho_entrega_id.value;
                this.planosTrabalhosEntregas = this.planoTrabalhoSelecionado?.entregas?.map(x => Object.assign({}, {
                    key: x.id,
                    value: x.descricao + (x.plano_entrega_entrega ? " (" + x.plano_entrega_entrega?.descricao + ")" : ""),
                    data: x
                })) || [];
                this.cdRef.detectChanges();
                this.form.controls.plano_trabalho_entrega_id.setValue(!planoTrabalhoEntregaId?.length && this.planosTrabalhos.length > 0 ? this.planosTrabalhos[0].key : planoTrabalhoEntregaId);
            }
        })();
    }
    async loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        formValue = this.util.fillForm(formValue, entity);
        if (!formValue.usuario_id?.length) {
            formValue.usuario_id = this.auth.usuario?.id;
        }
        formValue.data_inicio = formValue.data_inicio || this.util.setStrTime(new Date(), this.auth.unidadeHora);
        await this.usuario.loadSearch(entity.usuario || formValue.usuario_id);
        this.loadIniciadas(formValue.usuario_id);
        if (entity.unidade_id != this.auth.unidade.id) {
            await this.auth.selecionaUnidade(entity.unidade_id, undefined);
        }
        form.patchValue(formValue);
        this.onPlanoChange(new Event('change'));
    }
    async initializeData(form) {
        this.entity = (await this.dao.getById(this.urlParams.get("id"), this.join));
        await this.loadData(this.entity, form);
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            let atividade = this.util.fill(new Atividade(), this.entity);
            atividade = this.util.fillForm(atividade, this.form.value);
            atividade.id = this.entity.id;
            atividade.suspender = this.form.controls.suspender.value;
            this.dao.iniciar(atividade).then(saved => resolve(saved)).catch(reject);
        });
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], AtividadeFormIniciarComponent.prototype, "editableForm", void 0);
__decorate([
    ViewChild('usuario', { static: false })
], AtividadeFormIniciarComponent.prototype, "usuario", void 0);
__decorate([
    ViewChild('planoTrabalho', { static: false })
], AtividadeFormIniciarComponent.prototype, "planoTrabalho", void 0);
__decorate([
    ViewChild('planejado', { static: false })
], AtividadeFormIniciarComponent.prototype, "planejado", void 0);
AtividadeFormIniciarComponent = __decorate([
    Component({
        selector: 'app-atividade-form-iniciar',
        templateUrl: './atividade-form-iniciar.component.html',
        styleUrls: ['./atividade-form-iniciar.component.scss'],
        standalone: false
    })
], AtividadeFormIniciarComponent);
export { AtividadeFormIniciarComponent };
//# sourceMappingURL=atividade-form-iniciar.component.js.map