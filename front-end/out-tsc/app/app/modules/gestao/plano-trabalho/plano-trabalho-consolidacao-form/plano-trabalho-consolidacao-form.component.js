import { __decorate } from "tslib";
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { PlanoTrabalhoConsolidacaoDaoService } from 'src/app/dao/plano-trabalho-consolidacao-dao.service';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { Atividade } from 'src/app/models/atividade.model';
import { PlanoTrabalhoService } from '../plano-trabalho.service';
import { TipoAtividadeDaoService } from 'src/app/dao/tipo-atividade-dao.service';
import { PlanoEntregaService } from '../../plano-entrega/plano-entrega.service';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
import { AtividadeService } from '../../atividade/atividade.service';
import { CalendarService } from 'src/app/services/calendar.service';
import { Comparecimento } from 'src/app/models/comparecimento.model';
import { ComparecimentoDaoService } from 'src/app/dao/comparecimento-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { PlanoEntregaEntregaDaoService } from 'src/app/dao/plano-entrega-entrega-dao.service';
import { AfastamentoDaoService } from 'src/app/dao/afastamento-dao.service';
let PlanoTrabalhoConsolidacaoFormComponent = class PlanoTrabalhoConsolidacaoFormComponent extends PageFrameBase {
    set noPersist(value) { super.noPersist = value; }
    get noPersist() { return super.noPersist; }
    set control(value) { super.control = value; }
    get control() { return super.control; }
    set entity(value) { super.entity = value; this.bindEntity(); }
    get entity() { return super.entity; }
    set disabled(value) {
        if (this._disabled != value || this.atividadeOptionsMetadata.disabled !== value) {
            this._disabled = value;
            this.atividadeOptionsMetadata.disabled = value;
            this.cdRef.detectChanges();
        }
    }
    get disabled() {
        return this._disabled;
    }
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.refreshList = new EventEmitter();
        this.joinAtividade = ['demandante', 'usuario', 'tipo_atividade', 'comentarios.usuario:id,nome,apelido', 'reacoes.usuario:id,nome,apelido'];
        this.itemsEntregas = [];
        this.etiquetas = [];
        this.etiquetasAscendentes = [];
        this.itemsOcorrencias = [];
        this.itemsComparecimentos = [];
        this.itemsAfastamentos = [];
        this._disabled = true;
        this.validateAtividade = (control, controlName) => {
            let result = null;
            if (['descricao'].indexOf(controlName) >= 0 && !control.value?.length) {
                result = "Obrigatório";
            }
            else if (['data_inicio', 'data_entrega'].includes(controlName) && control.value?.length && !this.util.isDataValid(control.value)) { //'data_distribuicao', 'data_estipulada_entrega',
                result = "Inválido";
            } /*else if (controlName == 'data_estipulada_entrega' && control.value.getTime() < this.formAtividade?.controls.data_distribuicao.value.getTime()) {
              result = "Menor que distribuição";
            }*/
            else if (controlName == 'data_inicio' && control.value?.length && control.value.getTime() < this.formAtividade?.controls.data_distribuicao.value.getTime()) {
                result = "Menor que distribuição";
            }
            else if (controlName == 'data_entrega' && control.value?.length && control.value.getTime() < this.formAtividade?.controls.data_distribuicao.value.getTime()) {
                result = "Menor que distribuição";
            }
            else if (controlName == 'data_entrega' && control.value.getTime() < this.formAtividade?.controls.data_inicio.value.getTime()) {
                result = "Menor que início";
            }
            return result;
        };
        //Não apagar
        /*public validateOcorrencia = (control: AbstractControl, controlName: string) => {
          let result = null;
          if (['descricao'].indexOf(controlName) >= 0 && !control.value?.length) {
            result = "Obrigatório";
          } else if(['data_inicio', 'data_fim'].includes(controlName) && !this.util.isDataValid(control.value)) {
            result = "Inválido";
          } else if(controlName == 'data_fim' && control.value.getTime() < this.formOcorrencia?.controls.data_inicio.value.getTime()) {
            result = "Menor que início";
          }
          return result;
        }*/
        this.validateComparecimento = (control, controlName) => {
            let result = null;
            if (['detalhamento', 'unidade_id'].indexOf(controlName) >= 0 && !control.value?.length) {
                result = "Obrigatório";
            }
            else if (controlName == 'data_comparecimento' && this.entity && !this.util.between(control.value, { start: this.entity.data_inicio, end: this.entity.data_fim })) {
                result = "Inválido";
            }
            return result;
        };
        this.cdRef = injector.get(ChangeDetectorRef);
        this.dao = injector.get(PlanoTrabalhoConsolidacaoDaoService);
        //this.consolidacaoOcorrenciaDao = injector.get<PlanoTrabalhoConsolidacaoOcorrenciaDaoService>(PlanoTrabalhoConsolidacaoOcorrenciaDaoService);
        this.unidadeDao = injector.get(UnidadeDaoService);
        this.comparecimentoDao = injector.get(ComparecimentoDaoService);
        this.atividadeDao = injector.get(AtividadeDaoService);
        this.atividadeService = injector.get(AtividadeService);
        this.calendar = injector.get(CalendarService);
        this.afastamentoDao = injector.get(AfastamentoDaoService);
        this.tipoAtividadeDao = injector.get(TipoAtividadeDaoService);
        this.planoTrabalhoService = injector.get(PlanoTrabalhoService);
        this.planoEntregaService = injector.get(PlanoEntregaService);
        this.pEEDao = injector.get(PlanoEntregaEntregaDaoService);
        this.formAtividade = this.fh.FormBuilder({
            descricao: { default: "" },
            etiquetas: { default: [] },
            checklist: { default: [] },
            comentarios: { default: [] },
            esforco: { default: 0 },
            tempo_planejado: { default: 0 },
            data_distribuicao: { default: new Date() },
            data_estipulada_entrega: { default: new Date() },
            data_inicio: { default: new Date() },
            data_entrega: { default: new Date() },
            //tipo_atividade_id: { default: null }
        }, this.cdRef, this.validateAtividade);
        /*this.formOcorrencia = this.fh.FormBuilder({
          data_inicio: { default: new Date() },
          data_fim: { default: new Date() },
          descricao: { default: "" }
        }, this.cdRef, this.validateOcorrencia);*/
        this.formComparecimento = this.fh.FormBuilder({
            data_comparecimento: { default: new Date() },
            unidade_id: { default: "" },
            detalhamento: { default: "" }
        }, this.cdRef, this.validateComparecimento);
        this.formEdit = this.fh.FormBuilder({
            descricao: { default: "" },
            //tipo_atividade_id: { default: null },
            comentarios: { default: [] },
            progresso: { default: 0 },
            etiquetas: { default: [] },
            etiqueta: { default: null }
        });
        this.atividadeOptionsMetadata = {
            refreshId: this.atividadeRefreshId.bind(this),
            removeId: this.atividadeRemoveId.bind(this),
            refresh: this.refresh.bind(this)
        };
    }
    refresh() {
        this.loadData(this.entity, this.form);
        this.refreshList.emit(true);
    }
    bindEntity() {
        if (this.entity) {
            this.entity._metadata = this.entity._metadata || {};
            this.entity._metadata.planoTrabalhoConsolidacaoFormComponent = this;
        }
    }
    atividadeRefreshId(id, atividade) {
        this.itemsEntregas.forEach(entrega => {
            let foundIndex = entrega.atividades.findIndex(x => x.id == id);
            if (foundIndex >= 0) {
                if (atividade) {
                    entrega.atividades[foundIndex] = atividade;
                }
                else {
                    this.atividadeDao.getById(id, this.joinAtividade).then(atividade => { if (atividade)
                        entrega.atividades[foundIndex] = atividade; });
                }
            }
        });
        this.cdRef.detectChanges();
    }
    atividadeRemoveId(id) {
        this.itemsEntregas.forEach(entrega => {
            let foundIndex = entrega.atividades.findIndex(x => x.id == id);
            if (foundIndex >= 0)
                entrega.atividades.splice(foundIndex, 1);
        });
        this.cdRef.detectChanges();
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        (async () => {
            await this.loadData(this.entity, this.form);
        })();
    }
    loadConsolidacao(dados) {
        this.itemsEntregas = dados.entregas.map(x => {
            if (x.plano_entrega_entrega)
                x.plano_entrega_entrega.plano_entrega = dados.planosEntregas.find(pe => pe.id == x.plano_entrega_entrega?.plano_entrega_id);
            let result = {
                id: x.id,
                entrega: x,
                atividades: dados.atividades.filter(y => y.plano_trabalho_entrega_id == x.id),
                badge: this.planoTrabalhoService.tipoEntrega(x, dados.planoTrabalho),
                meta: x.plano_entrega_entrega ? this.planoEntregaService.getValorMeta(x.plano_entrega_entrega) : '',
                metaRealizado: x.plano_entrega_entrega ? this.planoEntregaService.getValorRealizado(x.plano_entrega_entrega) : '',
                progresso_realizado: x.plano_entrega_entrega ? x.plano_entrega_entrega.progresso_realizado : 0,
                objetivos: x.plano_entrega_entrega ? x.plano_entrega_entrega.objetivos : [],
                processos: x.plano_entrega_entrega ? x.plano_entrega_entrega.processos : [],
                status: dados.planoTrabalho.status,
            };
            return result;
        });
        this.programa = dados.programa;
        this.planoTrabalho = dados.planoTrabalho;
        this.itemsOcorrencias = dados.ocorrencias;
        this.itemsComparecimentos = dados.comparecimentos;
        this.itemsAfastamentos = dados.afastamentos;
        this.unidade = dados.planoTrabalho.unidade || this.entity.plano_trabalho?.unidade;
        this.cdRef.detectChanges();
    }
    async loadData(entity, form) {
        this.gridEntregas.loading = true;
        this.cdRef.detectChanges();
        try {
            let dados = await this.dao.dadosConsolidacao(entity.id);
            this.loadConsolidacao(dados);
        }
        finally {
            this.gridEntregas.loading = false;
            this.cdRef.detectChanges();
        }
    }
    /***************************************************************************************
    * Atividades
    ****************************************************************************************/
    async addAtividade(entrega) {
        let planoTrabalho = entrega.plano_trabalho || this.entity.plano_trabalho;
        let efemerides = this.calendar.calculaDataTempoUnidade(this.entity.data_inicio, this.entity.data_fim, planoTrabalho.carga_horaria, this.unidade, "ENTREGA");
        const tempoPlanejado = this.calendar.horasUteis(this.entity.data_inicio, this.entity.data_fim, planoTrabalho.carga_horaria, this.unidade, "DISTRIBUICAO");
        const dataInicio = this.util.maxDate(this.util.setTime(this.entity.data_inicio, 0, 0, 0), planoTrabalho.data_inicio);
        const dataFim = this.util.minDate(this.util.setTime(this.entity.data_fim, 23, 59, 59), planoTrabalho.data_fim);
        let id = this.dao.generateUuid();
        let atividade = new Atividade({
            id: id,
            plano_trabalho: planoTrabalho,
            plano_trabalho_entrega: entrega,
            plano_trabalho_consolidacao: this.entity,
            demandante: this.auth.usuario,
            usuario: planoTrabalho.usuario,
            unidade: this.unidade,
            data_distribuicao: dataInicio,
            carga_horaria: planoTrabalho.carga_horaria,
            data_estipulada_entrega: dataFim,
            data_inicio: dataInicio,
            data_entrega: dataFim,
            tempo_planejado: tempoPlanejado,
            tempo_despendido: efemerides?.tempoUtil || 0,
            status: 'CONCLUIDO',
            progresso: 100,
            plano_trabalho_id: this.entity.plano_trabalho_id,
            plano_trabalho_entrega_id: entrega.id,
            plano_trabalho_consolidacao_id: this.entity.id,
            demandante_id: this.auth.usuario.id,
            usuario_id: planoTrabalho.usuario.id,
            unidade_id: this.unidade.id,
            metadados: {
                atrasado: false,
                tempo_despendido: 0,
                tempo_atraso: 0,
                pausado: false,
                iniciado: true,
                concluido: true,
                avaliado: false,
                arquivado: false,
                produtividade: 0,
                extra: undefined,
                _status: []
            },
            _status: 'temporario'
        });
        return atividade;
    }
    async loadAtividade(form, row) {
        this.formAtividade.patchValue(row);
        this.cdRef.detectChanges();
    }
    async removeAtividade(atividades, row) {
        let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir o item ?");
        if (confirm) {
            try {
                let atividade = row;
                await this.atividadeDao?.delete(atividade);
                atividades.splice(atividades.findIndex(x => x.id == atividade.id), 1);
                return true;
            }
            catch {
                return false;
            }
        }
        else {
            return false;
        }
    }
    async saveAtividade(form, row) {
        let result = undefined;
        this.gridAtividades.error = "";
        this.formAtividade.markAllAsTouched();
        if (this.formAtividade.valid) {
            row.id = row.id == "NEW" ? this.dao.generateUuid() : row.id;
            this.util.fillForm(row, this.formAtividade.value);
            this.submitting = true;
            try {
                result = await this.atividadeDao?.save(row, this.joinAtividade, ['etiquetas', 'checklist', 'comentarios', 'pausas', 'tarefas']);
                this.atividadeRefreshId(row.id, result);
                if (!!result && !!result.id)
                    this.refreshList.emit(true);
            }
            catch (error) {
                result = false;
                this.gridAtividades.error = error.message || error;
            }
            finally {
                this.submitting = false;
            }
        }
        return result;
    }
    onDataDistribuicaoChange(event) {
        this.formAtividade.controls.data_inicio.setValue(this.formAtividade.controls.data_distribuicao.value);
    }
    onDataEstipuladaEntregaChange(event) {
        this.formAtividade.controls.data_entrega.setValue(this.formAtividade.controls.data_estipulada_entrega.value);
    }
    atividadeDynamicButtons(row) {
        let result = [];
        result.push(Object.assign({}, this.gridEntregas.BUTTON_EDIT, {}));
        result.push(Object.assign({}, this.gridEntregas.BUTTON_DELETE, {}));
        return result;
    }
    async onColumnProgressoEtiquetasChecklistEdit(row) {
        if (!this.etiquetasAscendentes.filter(e => e.data == row.plano_trabalho.unidade.id).length) {
            let ascendentes = await this.carregaEtiquetasUnidadesAscendentes(row.plano_trabalho.unidade);
            this.etiquetasAscendentes.push(...ascendentes);
        }
        this.formEdit.controls.progresso.setValue(row.progresso);
        this.formEdit.controls.etiquetas.setValue(row.etiquetas);
        this.formEdit.controls.etiqueta.setValue(null);
        this.etiquetas = this.util.merge(row.tipo_atividade?.etiquetas, row.plano_trabalho.unidade?.etiquetas, (a, b) => a.key == b.key);
        this.etiquetas = this.util.merge(this.etiquetas, this.auth.usuario.config?.etiquetas, (a, b) => a.key == b.key);
        this.etiquetas = this.util.merge(this.etiquetas, this.etiquetasAscendentes.filter(x => x.data == row.plano_trabalho.unidade.id), (a, b) => a.key == b.key);
        this.checklist = this.util.clone(row.checklist);
    }
    async carregaEtiquetasUnidadesAscendentes(unidadeAtual) {
        let etiquetasUnidades = [];
        unidadeAtual = unidadeAtual ? unidadeAtual : this.auth.unidade;
        if (unidadeAtual.path) {
            let path = unidadeAtual.path.split("/");
            let unidades = await this.unidadeDao.query({ where: [["id", "in", path]] }).asPromise();
            unidades.forEach(un => {
                etiquetasUnidades = this.util.merge(etiquetasUnidades, un.etiquetas, (a, b) => a.key == b.key);
            });
            etiquetasUnidades.forEach(e => e.data = unidadeAtual.id);
        }
        return etiquetasUnidades;
    }
    async onColumnProgressoEtiquetasChecklistSave(row) {
        try {
            const saved = await this.atividadeDao.update(row.id, {
                progresso: this.formEdit.controls.progresso.value,
                etiquetas: this.formEdit.controls.etiquetas.value,
                checklist: this.checklist
            });
            row.progresso = this.formEdit.controls.progresso.value;
            row.checklist = this.checklist;
            return !!saved;
        }
        catch (error) {
            return false;
        }
    }
    onEtiquetaConfigClick() {
        this.go.navigate({ route: ["configuracoes", "preferencia", "usuario", this.auth.usuario.id], params: { etiquetas: true } }, {
            modal: true, modalClose: (modalResult) => {
                this.etiquetas = this.util.merge(this.etiquetas, this.auth.usuario.config?.etiquetas, (a, b) => a.key == b.key);
                this.cdRef.detectChanges();
            }
        });
    }
    addItemHandleEtiquetas() {
        let result = undefined;
        if (this.etiqueta && this.etiqueta.selectedItem) {
            const item = this.etiqueta.selectedItem;
            const key = item.key?.length ? item.key : this.util.textHash(item.value);
            if (this.util.validateLookupItem(this.formEdit.controls.etiquetas.value, key)) {
                result = {
                    key: key,
                    value: item.value,
                    color: item.color,
                    icon: item.icon
                };
                this.formEdit.controls.etiqueta.setValue(null);
            }
        }
        return result;
    }
    ;
    podeEditar(row) {
        return !row._status;
    }
    loadTipoAtividade(tipoAtividade) {
        if (tipoAtividade) {
            this.etiquetas = this.atividadeService.buildEtiquetas(this.unidade, tipoAtividade);
            this.atividadeService.buildChecklist(tipoAtividade, this.formAtividade.controls.checklist);
            this.formAtividade.controls.esforco.setValue(tipoAtividade?.esforco || 0);
        }
        else {
            this.etiquetas = [];
            this.formAtividade.controls.esforco.setValue(0);
        }
        this.cdRef.detectChanges();
    }
    onTipoAtividadeSelect(item) {
        const tipoAtividade = item.entity;
        this.loadTipoAtividade(tipoAtividade);
        this.atividadeService.comentarioAtividade(tipoAtividade, this.formAtividade.controls.comentarios);
        this.cdRef.detectChanges();
    }
    async onColumnAtividadeDescricaoEdit(row) {
        this.formAtividade.controls.descricao.setValue(row.descricao);
        //this.formEdit.controls.tipo_atividade_id.setValue(row.tipo_atividade_id);
        this.formAtividade.controls.comentarios.setValue(row.comentarios);
    }
    async onColumnAtividadeDescricaoSave(row) {
        try {
            this.atividadeService.comentarioAtividade(this.tipoAtividade?.selectedEntity, this.formAtividade.controls.comentarios);
            const saved = await this.atividadeDao.update(row.id, {
                descricao: this.formAtividade.controls.descricao.value,
                //tipo_atividade_id: this.formEdit.controls.tipo_atividade_id.value,
                comentarios: (this.formAtividade.controls.comentarios.value || []).filter((x) => ["ADD", "EDIT", "DELETE"].includes(x._status || ""))
            });
            row.descricao = this.formAtividade.controls.descricao.value;
            //row.tipo_atividade_id = this.formEdit.controls.tipo_atividade_id.value;
            row.tipo_atividade = this.tipoAtividade?.selectedEntity || null;
            row.comentarios = this.formAtividade.controls.comentarios.value;
            return !!saved;
        }
        catch (error) {
            return false;
        }
    }
    tempoAtividade(row) {
        let badge = [
            { color: "light", hint: "Início", icon: "bi bi-file-earmark-play", label: this.dao.getDateTimeFormatted(row.data_inicio) },
        ];
        let badgeTratar = this.atividadeService.temposAtividade(row);
        badgeTratar = badgeTratar.filter(bad => bad.icon != "bi bi-file-earmark-plus" && bad.icon != "bi bi-calendar-check");
        badge.push(...badgeTratar);
        return badge;
    }
    dynamicButtons(row) {
        let result = [];
        result.push({ label: "Detalhes", icon: "bi bi-eye", color: 'btn-outline-success', onClick: this.showDetalhes.bind(this) });
        return result;
    }
    async showDetalhes(elemento) {
        let entrega = await this.pEEDao.getById(elemento.entrega.plano_entrega_entrega.id, ['entrega', 'objetivos.objetivo']);
        this.go.navigate({ route: ['gestao', 'plano-entrega', 'entrega', elemento.entrega.plano_entrega_entrega.id, "detalhes"] }, {
            metadata: {
                plano_entrega: elemento.entrega.plano_entrega_entrega.plano_entrega,
                planejamento_id: elemento.entrega.plano_entrega_entrega.plano_entrega.planejamento_id,
                cadeia_valor_id: elemento.entrega.plano_entrega_entrega.plano_entrega.cadeia_valor_id,
                unidade_id: elemento.entrega.plano_entrega_entrega.plano_entrega.unidade_id,
                entrega: entrega
            }
        });
    }
    /***************************************************************************************
    * Comparecimento
    ****************************************************************************************/
    async addComparecimento() {
        return new Comparecimento({
            unidade_id: this.unidade?.id,
            unidade: this.unidade,
            plano_trabalho_consolidacao_id: this.entity.id
        });
    }
    async loadComparecimento(form, row) {
        this.formComparecimento.patchValue({
            data_comparecimento: row.data_comparecimento,
            unidade_id: row.unidade_id,
            detalhamento: row.detalhamento
        });
        this.cdRef.detectChanges();
    }
    async removeComparecimento(row) {
        let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir o item ?");
        if (confirm) {
            try {
                let comparecimento = row;
                await this.comparecimentoDao?.delete(comparecimento);
                this.itemsComparecimentos.splice(this.itemsComparecimentos.findIndex(x => x.id == comparecimento.id), 1);
                return true;
            }
            catch {
                return false;
            }
        }
        else {
            return false;
        }
    }
    async saveComparecimento(form, row) {
        let result = undefined;
        this.formComparecimento.markAllAsTouched();
        if (this.formComparecimento.valid) {
            row.id = row.id == "NEW" ? this.dao.generateUuid() : row.id;
            row.data_comparecimento = form.controls.data_comparecimento.value;
            row.detalhamento = form.controls.detalhamento.value;
            row.plano_trabalho_consolidacao_id = this.entity.id;
            row.unidade_id = form.controls.unidade_id.value;
            this.submitting = true;
            try {
                result = await this.comparecimentoDao?.save(row);
            }
            finally {
                this.submitting = false;
            }
        }
        return result;
    }
    comparecimentoDynamicButtons(row) {
        let result = [];
        //result.push({ hint: "Adicionar filho", icon: "bi bi-plus-circle", onClick: this.addChildProcesso.bind(this) });
        return result;
    }
    /***************************************************************************************
    * Afastamentos
    ****************************************************************************************/
    async addAfastamento() {
        this.go.navigate({ route: ['gestao', 'afastamento', 'new'] }, {
            metadata: { consolidacao: this.entity },
            filterSnapshot: undefined,
            querySnapshot: undefined,
            modalClose: (modalResult) => {
                if (modalResult)
                    this.refresh();
            }
        });
    }
    async removeAfastamento(row) {
        if (await this.dialog.confirm("Exclui ?", "Deseja realmente excluir o item ?")) {
            this.submitting = true;
            try {
                let afastamento = row;
                await this.afastamentoDao?.delete(afastamento);
                this.itemsAfastamentos.splice(this.itemsAfastamentos.findIndex(x => x.id == afastamento.id), 1);
            }
            finally {
                this.submitting = false;
            }
        }
    }
    afastamentoDynamicButtons(row) {
        let result = [];
        result.push(Object.assign({}, this.OPTION_INFORMACOES, { onClick: (doc) => this.go.navigate({ route: ["gestao", "afastamento", doc.id, "consult"] }, { modal: true }) }));
        result.push(Object.assign({}, this.OPTION_ALTERAR, { onClick: (doc) => this.go.navigate({ route: ["gestao", "afastamento", doc.id, "edit"] }, { modal: true, modalClose: (modalResult) => { if (modalResult)
                    this.refresh(); } }) }));
        result.push(Object.assign({}, this.OPTION_EXCLUIR, { onClick: this.removeAfastamento.bind(this) }));
        return result;
    }
    async showPlanejamento(planejamento_id) {
        this.go.navigate({ route: ['gestao', 'planejamento', planejamento_id, 'consult'] }, { modal: true });
    }
    async showCadeiaValor(cadeia_valor_id_id) {
        this.go.navigate({ route: ['gestao', 'cadeia-valor', cadeia_valor_id_id, 'consult'] }, { modal: true });
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], PlanoTrabalhoConsolidacaoFormComponent.prototype, "editableForm", void 0);
__decorate([
    ViewChild('gridEntregas', { static: false })
], PlanoTrabalhoConsolidacaoFormComponent.prototype, "gridEntregas", void 0);
__decorate([
    ViewChild('gridAtividades', { static: false })
], PlanoTrabalhoConsolidacaoFormComponent.prototype, "gridAtividades", void 0);
__decorate([
    ViewChild('etiqueta', { static: false })
], PlanoTrabalhoConsolidacaoFormComponent.prototype, "etiqueta", void 0);
__decorate([
    ViewChild('tipoAtividade', { static: false })
], PlanoTrabalhoConsolidacaoFormComponent.prototype, "tipoAtividade", void 0);
__decorate([
    ViewChild('listTarefas', { static: false })
], PlanoTrabalhoConsolidacaoFormComponent.prototype, "listTarefas", void 0);
__decorate([
    Input()
], PlanoTrabalhoConsolidacaoFormComponent.prototype, "cdRef", void 0);
__decorate([
    Input()
], PlanoTrabalhoConsolidacaoFormComponent.prototype, "planoTrabalho", void 0);
__decorate([
    Input()
], PlanoTrabalhoConsolidacaoFormComponent.prototype, "noPersist", null);
__decorate([
    Input()
], PlanoTrabalhoConsolidacaoFormComponent.prototype, "control", null);
__decorate([
    Input()
], PlanoTrabalhoConsolidacaoFormComponent.prototype, "entity", null);
__decorate([
    Input()
], PlanoTrabalhoConsolidacaoFormComponent.prototype, "disabled", null);
__decorate([
    Output()
], PlanoTrabalhoConsolidacaoFormComponent.prototype, "refreshList", void 0);
PlanoTrabalhoConsolidacaoFormComponent = __decorate([
    Component({
        selector: 'plano-trabalho-consolidacao-form',
        templateUrl: './plano-trabalho-consolidacao-form.component.html',
        styleUrls: ['./plano-trabalho-consolidacao-form.component.scss'],
        standalone: false
    })
], PlanoTrabalhoConsolidacaoFormComponent);
export { PlanoTrabalhoConsolidacaoFormComponent };
//# sourceMappingURL=plano-trabalho-consolidacao-form.component.js.map