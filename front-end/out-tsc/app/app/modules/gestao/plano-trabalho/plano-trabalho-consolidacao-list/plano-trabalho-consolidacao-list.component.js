import { __decorate } from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { PlanoTrabalhoConsolidacaoDaoService } from 'src/app/dao/plano-trabalho-consolidacao-dao.service';
import { PlanoTrabalhoConsolidacao } from 'src/app/models/plano-trabalho-consolidacao.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { PlanoTrabalhoService } from '../plano-trabalho.service';
import { PlanoTrabalhoConsolidacaoFormComponent } from '../plano-trabalho-consolidacao-form/plano-trabalho-consolidacao-form.component';
import { PlanoTrabalhoDaoService } from 'src/app/dao/plano-trabalho-dao.service';
import { AvaliacaoDaoService } from 'src/app/dao/avaliacao-dao.service';
import { UnidadeService } from 'src/app/services/unidade.service';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
let PlanoTrabalhoConsolidacaoListComponent = class PlanoTrabalhoConsolidacaoListComponent extends PageFrameBase {
    set entity(value) { super.entity = value; }
    get entity() { return super.entity; }
    get items() {
        return this.entity?.consolidacoes || [];
    }
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.validate = (control, controlName) => {
            let result = null;
            // TODO: Validar data
            return result;
        };
        /* Inicializações */
        this.dao = injector.get(PlanoTrabalhoConsolidacaoDaoService);
        this.avaliacaoDao = injector.get(AvaliacaoDaoService);
        this.planoTrabalhoService = injector.get(PlanoTrabalhoService);
        this.unidadeService = injector.get(UnidadeService);
        this.planoTrabalhoDao = injector.get(PlanoTrabalhoDaoService);
        this.atividadeDao = injector.get(AtividadeDaoService);
        this.title = this.lex.translate("Consolidações");
        this.code = "MOD_PTR_CSLD";
        this.modalWidth = 1200;
        this.form = this.fh.FormBuilder({
            'data_inicio': { default: new Date() },
            'data_fim': { default: new Date() }
        }, this.cdRef, this.validate);
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        (async () => {
            if (this.urlParams?.has("usuarioId") && this.urlParams?.has("planoTrabalhoId")) {
                let dados = await this.planoTrabalhoDao.getByUsuario(this.urlParams.get("usuarioId"), true, this.urlParams.get("planoTrabalhoId"));
                if (dados.planos.length == 1)
                    this.entity = dados.planos[0];
            }
            let agora = (new Date()).getTime();
            this.items.forEach(v => {
                if (!v.plano_trabalho)
                    v.plano_trabalho = this.entity;
                if (this.util.asTimestamp(v.data_inicio) <= agora && agora <= this.util.asTimestamp(v.data_fim))
                    this.grid.expand(v.id);
            });
        })();
    }
    async addConsolidacao() {
        return new PlanoTrabalhoConsolidacao({
            id: this.dao.generateUuid(),
            plano_trabalho_id: this.entity.id
        });
    }
    async loadConsolidacao(form, row) {
        this.form.patchValue({
            data_inicio: row.data_inicio,
            data_fim: row.data_fim
        });
        this.cdRef.detectChanges();
    }
    async removeConsolidacao(row) {
        let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir o item ?");
        if (confirm) {
            try {
                let consolidacao = row;
                await this.dao?.delete(consolidacao);
                this.items.splice(this.items.findIndex(x => x.id == consolidacao.id), 1);
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
    async saveConsolidacao(form, row) {
        let result = undefined;
        this.form.markAllAsTouched();
        if (this.form.valid) {
            row.id = row.id == "NEW" ? this.dao.generateUuid() : row.id;
            row.data_inicio = form.controls.data_inicio.value;
            row.data_fim = form.controls.data_fim.value;
            result = await this.dao?.save(row);
        }
        return result;
    }
    refreshConsolidacao(consolidacao, dados) {
        if (dados && consolidacao._metadata?.planoTrabalhoConsolidacaoFormComponent) {
            let consolidacaoForm = consolidacao._metadata?.planoTrabalhoConsolidacaoFormComponent;
            consolidacaoForm.loadConsolidacao(dados);
        }
        else {
            this.grid.refreshExpanded(consolidacao.id);
        }
        this.grid.refreshRows();
    }
    async concluir(consolidacao) {
        try {
            //se usuário logado não for igual do do plano de trabalho, precisa registrar a justificativa
            if (this.auth.usuario.id != consolidacao.plano_trabalho?.usuario_id) {
                // abrir modal para registrar justificativa
                let justificativa = await this.dialog.prompt("Justificativa", "Por favor, insira a justificativa para a conclusão do planejamento.");
                if (!justificativa)
                    return;
                consolidacao.justificativa_conclusao = justificativa;
            }
            this.submitting = true;
            let response = await this.dao.concluir(consolidacao.id, consolidacao.justificativa_conclusao || null);
            consolidacao.status = response.status;
            this.refreshConsolidacao(consolidacao, response);
        }
        catch (error) {
            this.error(error.message || error);
        }
        finally {
            this.submitting = false;
        }
    }
    async cancelarConclusao(consolidacao) {
        this.submitting = true;
        try {
            let response = await this.dao.cancelarConclusao(consolidacao.id);
            consolidacao.status = response.status;
            consolidacao.justificativa_conclusao = null;
            this.refreshConsolidacao(consolidacao, response);
        }
        catch (error) {
            this.error(error.message || error);
        }
        finally {
            this.submitting = false;
        }
    }
    anterior(consolidacao) {
        return this.entity.consolidacoes.reduce((a, v) => this.util.asTimestamp(v.data_inicio) < this.util.asTimestamp(consolidacao.data_inicio) && (!a || this.util.asTimestamp(a.data_inicio) < this.util.asTimestamp(v.data_inicio)) ? v : a, undefined);
    }
    proximo(consolidacao) {
        return this.entity.consolidacoes.reduce((a, v) => this.util.asTimestamp(v.data_fim) > this.util.asTimestamp(consolidacao.data_fim) && (!a || this.util.asTimestamp(a.data_fim) > this.util.asTimestamp(v.data_fim)) ? v : a, undefined);
    }
    isDisabled(row) {
        return !["INCLUIDO"].includes(row?.status ?? "");
    }
    podeInserir() {
        return this.auth.hasPermissionTo("MOD_PTR_CSLD_INCL");
    }
    async onRefresh(consolidacao) {
        try {
            const freshDados = await this.dao.dadosConsolidacao(consolidacao.id);
            consolidacao.atividades = freshDados.atividades;
            const index = this.items.findIndex(item => item.id === consolidacao.id);
            if (index >= 0) {
                this.items[index] = consolidacao;
            }
        }
        catch (error) {
            console.error('Error refreshing consolidacao:', error);
        }
    }
    dynamicButtons(row) {
        /*
        (PTR:TABELA_1)
        Ação \ Ator   | PT do Chefe    | PT do Chefe Sub.     | PT do Delegado   | PT do Lotado/Colaborador
        --------------+----------------+----------------------+------------------+-------------------------
        Avaliar       | CF+,CS+        | CF,CF+,CS+           | CF,CS            | CF,CS
        */
        let result = [];
        let consolidacao = row;
        const usuarioId = consolidacao.plano_trabalho?.usuario_id;
        const unidadeId = this.entity.unidade_id;
        const temRecurso = consolidacao?.avaliacoes.filter((a) => a.recurso != null).length > 0;
        const isUsuarioDoPlano = this.auth.usuario.id == usuarioId;
        const nenhumGestor = { gestor: false, gestorSubstituto: false, gestorDelegado: false };
        const gestorLogado = this.entity?._metadata["atribuicoesGestorUsuarioLogado"] || nenhumGestor;
        const gestorParticipante = this.entity?._metadata["atribuicoesGestorUsuario"] || nenhumGestor;
        const gestorUnidadeSuperior = this.entity?._metadata["gestorUnidadeSuperior"] || nenhumGestor;
        const isAvaliador = !isUsuarioDoPlano && this.auth.hasPermissionTo("MOD_PTR_CSLD_AVAL") &&
            (this.auth.isIntegrante('AVALIADOR_PLANO_TRABALHO', unidadeId) ||
                (gestorParticipante.gestor && (gestorUnidadeSuperior.gestor || gestorUnidadeSuperior.gestorSubstituto)) ||
                (gestorParticipante.gestorSubstituto && (gestorLogado.gestor || gestorUnidadeSuperior.gestor || gestorUnidadeSuperior.gestorSubstituto)) ||
                (!gestorParticipante.gestor && !gestorParticipante.gestorSubstituto && (gestorLogado.gestor || gestorLogado.gestorSubstituto)));
        const isGestor = this.unidadeService.isGestorUnidade(consolidacao.plano_trabalho?.unidade_id);
        const BOTAO_CONCLUIR = { hint: "Concluir", icon: "bi bi-check-circle", color: "btn-outline-success", onClick: this.concluir.bind(this) };
        const BOTAO_CANCELAR_CONCLUSAO = { hint: "Cancelar conclusão", icon: "bi bi-backspace", color: "btn-outline-danger", onClick: this.cancelarConclusao.bind(this) };
        const BOTAO_AVALIAR = { hint: "Avaliar", icon: "bi bi-star", color: "btn-outline-warning", onClick: (row) => this.planoTrabalhoService.avaliar(row, this.entity.programa, this.refreshConsolidacao.bind(this)) };
        const BOTAO_REAVALIAR = { hint: "Reavaliar", icon: "bi bi-star-half", color: "btn-outline-warning", onClick: (row) => this.planoTrabalhoService.avaliar(row, this.entity.programa, this.refreshConsolidacao.bind(this)) };
        const BOTAO_FAZER_RECURSO = { label: 'Recurso', id: "RECORRIDO", icon: "bi bi-journal-medical", color: "btn-outline-warning", onClick: (row) => this.planoTrabalhoService.fazerRecurso(row, this.entity.programa, this.refreshConsolidacao.bind(this)) };
        const BOTAO_CANCELAR_AVALIACAO = { hint: "Cancelar avaliação", id: "INCLUIDO", icon: "bi bi-backspace", color: "btn-outline-danger", onClick: (row) => this.planoTrabalhoService.cancelarAvaliacao(row, this, this.refreshConsolidacao.bind(this)) };
        //!this.isDisabled()
        if (true) {
            if (["INCLUIDO"].includes(consolidacao.status) && (isUsuarioDoPlano || isGestor || this.auth.hasPermissionTo("MOD_PTR_CSLD_CONCL"))) {
                result.push(BOTAO_CONCLUIR);
            }
            // this.planoTrabalhoService.diasParaConcluirConsolidacao(row, this.entity!.programa) >= 0 &&
            if (consolidacao.status == "CONCLUIDO" && (isUsuarioDoPlano || isGestor || this.auth.hasPermissionTo("MOD_PTR_CSLD_DES_CONCL"))) {
                result.push(BOTAO_CANCELAR_CONCLUSAO);
            }
            if (consolidacao.status == "CONCLUIDO" && isAvaliador) {
                /* (RN_CSLD_16) A avaliação somente poderá ser realizado caso não exista período anterior ou o período anterior esteja AVALIADO, e respeitando os critérios da tabela [PTR:TABELA_1] */
                result.push(BOTAO_AVALIAR);
            }
            if (consolidacao.status == "AVALIADO" && consolidacao.avaliacao) {
                /* (RN_AVL_2) [PT] O usuário do plano de trabalho que possuir o acesso MOD_PTR_CSLD_REC_AVAL poderá recorrer da nota atribuida dentro do limites estabelecido pelo programa; */
                if (isUsuarioDoPlano && !temRecurso && this.auth.hasPermissionTo('MOD_PTR_CSLD_REC_AVAL') && consolidacao.avaliacao?.data_avaliacao && ['Inadequado', 'Não executado'].includes(consolidacao.avaliacao?.nota)) {
                    result.push(BOTAO_FAZER_RECURSO);
                }
                if (isAvaliador) {
                    //const ultimaAvaliacao = consolidacao!.avaliacoes.reduce((latest, current) => current.data_avaliacao > latest.data_avaliacao ? current : latest, consolidacao!.avaliacoes[0]);
                    //const recente = ultimaAvaliacao.data_avaliacao > new Date(Date.now() - 24 * 60 * 60 * 1000);
                    // Só permite reavaliar se a última avaliação for recente
                    result.push(BOTAO_REAVALIAR);
                    // Só permite cancelar a avaliacao se não houver recurso na lista de avaliações
                    if (!(consolidacao.avaliacoes.filter(a => a.recurso).length > 0))
                        result.push(BOTAO_CANCELAR_AVALIACAO);
                }
            }
        }
        return result;
    }
    mostrarAvaliacao(row) {
        this.planoTrabalhoService.visualizarAvaliacao(row);
    }
    labelStatus(consolidacao) {
        const statusLabelMap = {
            'INCLUIDO': !!consolidacao.atividades.length ? "Incluido" : "Aguardando Registro",
        };
        return statusLabelMap[consolidacao.status] ?? this.lookup.getValue(this.lookup.CONSOLIDACAO_STATUS, consolidacao.status);
    }
    iconStatus(consolidacao) {
        const statusIconMap = {
            'INCLUIDO': !!consolidacao.atividades.length ? "bi bi-pencil-square" : "bi bi-clock",
        };
        return statusIconMap[consolidacao.status] ?? this.lookup.getValue(this.lookup.CONSOLIDACAO_STATUS, consolidacao.status);
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], PlanoTrabalhoConsolidacaoListComponent.prototype, "grid", void 0);
__decorate([
    Input()
], PlanoTrabalhoConsolidacaoListComponent.prototype, "entity", null);
__decorate([
    ViewChild(PlanoTrabalhoConsolidacaoFormComponent)
], PlanoTrabalhoConsolidacaoListComponent.prototype, "childComponent", void 0);
PlanoTrabalhoConsolidacaoListComponent = __decorate([
    Component({
        selector: 'plano-trabalho-consolidacao-list',
        templateUrl: './plano-trabalho-consolidacao-list.component.html',
        styleUrls: ['./plano-trabalho-consolidacao-list.component.scss'],
        standalone: false
    })
], PlanoTrabalhoConsolidacaoListComponent);
export { PlanoTrabalhoConsolidacaoListComponent };
//# sourceMappingURL=plano-trabalho-consolidacao-list.component.js.map