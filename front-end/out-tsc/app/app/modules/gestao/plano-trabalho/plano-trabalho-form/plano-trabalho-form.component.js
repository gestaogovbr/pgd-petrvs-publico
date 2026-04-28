import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { DocumentoDaoService } from 'src/app/dao/documento-dao-service';
import { PlanoTrabalhoDaoService } from 'src/app/dao/plano-trabalho-dao.service';
import { ProgramaDaoService } from 'src/app/dao/programa-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { PlanoTrabalho } from 'src/app/models/plano-trabalho.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { DocumentoService } from 'src/app/modules/uteis/documentos/documento.service';
import { CalendarService } from 'src/app/services/calendar.service';
import { PlanoTrabalhoService } from '../plano-trabalho.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { TemplateService } from 'src/app/modules/uteis/templates/template.service';
import { UtilService } from 'src/app/services/util.service';
import moment from 'moment';
import { ProgramaService } from 'src/app/services/programa.service';
import { ModalidadePgdService } from 'src/app/services/modalidade-pgd.service';
let PlanoTrabalhoFormComponent = class PlanoTrabalhoFormComponent extends PageFormBase {
    constructor(injector) {
        super(injector, PlanoTrabalho, PlanoTrabalhoDaoService);
        this.injector = injector;
        this.entregas = [];
        this.gestoresUnidadeExecutora = [];
        this.usuarioUnidades = [];
        this.planosUsuarioComPendencias = false;
        this.validate = (control, controlName) => {
            let result = null;
            if (this.isRequiredFieldEmpty(control, controlName)) {
                result = "Obrigatório";
            }
            else if (this.isCargaHorariaInvalid(control, controlName)) {
                result = "Valor não pode ser zero.";
            }
            else if (this.isDateInvalid(control, controlName)) {
                result = "Inválido";
            }
            else if (this.isEndDateBeforeStartDate(control, controlName)) {
                result = "Menor que o início";
            }
            else if (this.isStartDateBeforeProgramStart(control, controlName)) {
                result = "Menor que programa";
            }
            else if (this.isEndDateAfterProgramEnd(control, controlName)) {
                result = "Maior que programa";
            }
            else if (this.limit365days(control, controlName)) {
                result = "Limite de 365 dias";
            }
            return result;
        };
        this.limit365days = (control, controlName) => {
            if (controlName !== 'data_fim')
                return false;
            const startDate = this.form?.controls.data_inicio.value;
            if (!this.util.isDataValid(startDate) || !this.util.isDataValid(control.value))
                return false;
            const start = moment(startDate).startOf('day');
            const end = moment(control.value).startOf('day');
            const limit = start.clone().add(365, 'days');
            // Retorna true quando ultrapassa 365 dias
            return end.isAfter(limit);
        };
        this.formValidation = async (form) => {
            let result = "";
            return result;
            // TODO:
            // Validar se as entregas pertencem ao plano de entregas da unidade
        };
        this.titleEdit = (entity) => {
            return "Editando " + this.lex.translate("Plano de Trabalho") + ': ' + (entity?.usuario?.apelido || "");
        };
        this.join = [
            "unidade.entidade",
            "entregas.entrega",
            "entregas.plano_entrega_entrega:id,plano_entrega_id,descricao,data_inicio,data_fim,progresso_realizado,progresso_realizado",
            "usuario.participacoes_programas",
            "usuario.lotacao",
            "usuario.areas_trabalho.atribuicoes",
            "usuario.unidades",
            "programa.template_tcr",
            "documento",
            "documentos.assinaturas.usuario:id,nome,apelido",
            "entregas.plano_entrega_entrega.entrega",
            "entregas.plano_entrega_entrega.plano_entrega.unidade:id,nome,sigla",
            'entregas.reacoes.usuario:id,nome,apelido'
        ];
        this.joinPrograma = ["template_tcr"];
        this.programaDao = injector.get(ProgramaDaoService);
        this.usuarioDao = injector.get(UsuarioDaoService);
        this.unidadeDao = injector.get(UnidadeDaoService);
        this.documentoService = injector.get(DocumentoService);
        this.templateService = injector.get(TemplateService);
        this.utilService = injector.get(UtilService);
        this.calendar = injector.get(CalendarService);
        this.modalidadePgd = injector.get(ModalidadePgdService);
        this.documentoDao = injector.get(DocumentoDaoService);
        this.planoTrabalhoService = injector.get(PlanoTrabalhoService);
        this.programaService = injector.get(ProgramaService);
        this.modalWidth = 1300;
        this.planoDataset = this.dao.dataset();
        this.form = this.fh.FormBuilder({
            carga_horaria: { default: "" },
            tempo_total: { default: "" },
            tempo_proporcional: { default: "" },
            data_inicio: { default: new Date() },
            data_fim: { default: new Date() },
            usuario_id: { default: "" },
            unidade_id: { default: "" },
            programa_id: { default: "" },
            documento_id: { default: null },
            documentos: { default: [] },
            atividades: { default: [] },
            entregas: { default: [] },
            modalidade_pgd: { default: null },
            forma_contagem_carga_horaria: { default: "DIA" },
            editar_texto_complementar_unidade: { default: false },
            editar_texto_complementar_usuario: { default: false },
            unidade_texto_complementar: { default: "" },
            usuario_texto_complementar: { default: "" },
            criterios_avaliacao: { default: [] },
            criterio_avaliacao: { default: "" }
        }, this.cdRef, this.validate);
        this.programaMetadata = {
            todosUnidadeExecutora: false,
            vigentesUnidadeExecutora: true
        };
    }
    ngOnInit() {
        super.ngOnInit();
        const segment = (this.url ? this.url[this.url.length - 1]?.path : "") || "";
        this.action = ["termos"].includes(segment) ? segment : this.action;
        this.buscaGestoresUnidadeExecutora(this.entity?.unidade ?? null);
    }
    atualizarTcr() {
        this.entity = this.loadEntity();
        if (!this.formDisabled) {
            let textoUsuario = this.form.controls.usuario_texto_complementar.value;
            let textoUnidade = this.form.controls.unidade_texto_complementar.value;
            let documento = this.planoTrabalhoService.atualizarTcr(this.planoTrabalho, this.entity, textoUsuario, textoUnidade);
            this.form?.controls.documento_id.setValue(documento?.id);
            this.form?.controls.documentos.setValue(this.entity.documentos);
            this.datasource = documento?.datasource || {};
            this.template = this.selectedPrograma?.template_tcr;
            this.editingId = ["ADD", "EDIT"].includes(documento?._status || "") ? documento.id : undefined;
        }
        this.cdRef.detectChanges();
    }
    get isTermos() {
        return this.action == "termos";
    }
    isRequiredFieldEmpty(control, controlName) {
        const requiredFields = ['unidade_id', 'programa_id', 'usuario_id'];
        return requiredFields.includes(controlName) && !control.value?.length;
    }
    isCargaHorariaInvalid(control, controlName) {
        return controlName === 'carga_horaria' && !control.value;
    }
    isDateInvalid(control, controlName) {
        const dateFields = ['data_inicio', 'data_fim'];
        return dateFields.includes(controlName) && !this.util.isDataValid(control.value);
    }
    isEndDateBeforeStartDate(control, controlName) {
        if (controlName !== 'data_fim')
            return false;
        const startDate = this.form?.controls.data_inicio.value;
        return this.util.isDataValid(startDate) &&
            this.util.asTimestamp(control.value) <= this.util.asTimestamp(startDate);
    }
    isStartDateBeforeProgramStart(control, controlName) {
        if (controlName !== 'data_inicio' || !this.selectedPrograma)
            return false;
        return moment(control.value).startOf('day') <
            moment(this.selectedPrograma.data_inicio).startOf('day');
    }
    isEndDateAfterProgramEnd(control, controlName) {
        if (controlName !== 'data_fim' || !this.selectedPrograma)
            return false;
        return moment(control.value).startOf('day') >
            moment(this.selectedPrograma.data_fim).startOf('day');
    }
    onUnidadeSelect() {
        if (this.unidade.selectedItem) {
            this.carregaProgramas(this.unidade?.selectedItem?.key);
            let unidade = this.usuario?.selectedEntity?.unidades.find((u) => u.id == this.unidade?.selectedItem?.key);
            this.selectedUnidade = unidade;
            let usuario = this.usuario?.selectedEntity;
            this.entity.unidade = unidade;
            this.entity.unidade_id = unidade.id;
            this.form.controls.forma_contagem_carga_horaria.setValue(unidade?.entidade?.forma_contagem_carga_horaria || "DIA");
            this.form.controls.unidade_texto_complementar.setValue(unidade?.texto_complementar_plano || "");
            this.form.controls.usuario_texto_complementar.setValue(usuario?.texto_complementar_plano || "");
            this.unidadeDao.getById(unidade.id, ['gestor:id,usuario_id', 'gestores_substitutos:id,usuario_id', 'gestores_delegados:id,usuario_id']).then(unidade => {
                this.buscaGestoresUnidadeExecutora(unidade);
            });
        }
        else {
            if (this.programa)
                this.programa.items = [];
        }
    }
    /**
     * Carrega os programas disponíveis para uma unidade específica
     * @param unidadeId - ID da unidade para carregar os programas
     */
    async carregaProgramas(unidadeId) {
        try {
            if (!unidadeId) {
                console.warn('ID da unidade não fornecido para carregar programas');
                return;
            }
            const programas = await this.programaDao.query({
                where: [['todosUnidadeExecutora', '==', unidadeId]],
                join: this.joinPrograma,
                orderBy: [["unidade.path", "desc"]]
            }).asPromise();
            if (programas.length > 0) {
                if (this.programa)
                    this.programa.items = programas.map(prog => ({
                        key: prog.id,
                        value: prog.nome,
                        data: prog
                    }));
                const programaVigente = this.programaService.selecionaProgramaVigente(programas);
                this.preenchePrograma(programaVigente || programas[0]);
            }
            else {
                this.regramentoNaoEncontrado();
            }
        }
        catch (error) {
            console.error('Erro ao carregar programas:', error);
            this.dialog.alert('Erro', 'Não foi possível carregar os programas disponíveis.');
            this.regramentoNaoEncontrado();
        }
    }
    selecionaModalidade(usuario) {
        let modalidade = this.modalidadePgd.normalize(this.entity?.modalidade_pgd ?? usuario?.modalidade_pgd ?? null);
        if (usuario?.pedagio && this.modalidadePgd.exigePedagio(modalidade)) {
            modalidade = 'presencial';
        }
        this.form?.controls.modalidade_pgd.setValue(modalidade);
        if (this.entity)
            this.entity.modalidade_pgd = modalidade;
    }
    podeEditarTextoComplementar(unidade_id) {
        return (unidade_id == this.auth.unidadeGestor()?.id) ?
            undefined :
            'true';
    }
    onProgramaSelect() {
        if (!this.programa?.selectedItem)
            return;
        let programa = this.programa.selectedItem.data;
        this.selectedPrograma = programa;
        this.entity.programa_id = programa.id;
        this.entity.programa = programa;
        this.form?.controls.criterios_avaliacao.setValue(programa.plano_trabalho_criterios_avaliacao || []);
        this.form?.controls.data_inicio.updateValueAndValidity();
        this.form?.controls.data_fim.updateValueAndValidity();
    }
    async onUsuarioSelect(selected) {
        try {
            if (['new', 'clone'].includes(this.action))
                this.planosUsuarioComPendencias = await this.dao.planosUsuarioComPendencias(selected.entity.id);
            if (this.planosUsuarioComPendencias) {
                if (this.editableForm) {
                    this.editableForm.noButtons = 'true';
                    this.editableForm.error = 'Não é possível criar um novo plano enquanto houver pendências de registro de execução e/ou avaliação de planos anteriores.';
                }
            }
            else {
                this.editableForm.noButtons = undefined;
                this.editableForm.error = undefined;
                this.processarUnidadesUsuario(selected.entity);
                this.resetProgramaItems();
                const unidadeId = this.action === 'edit' ? this.entity?.unidade_id : selected.entity.lotacao.unidade_id;
                this.carregaProgramas(unidadeId);
                this.selecionaModalidade(selected.entity);
            }
            const participa = this.utilService.slugify(selected.entity.participa_pgd ?? '');
            if (participa === 'nao') {
                this.dialog.alert('Atenção', 'Antes de elaborar plano de trabalho, solicite à sua chefia imadiata que selecione-o como participante do PGD no SouGov Líder e aguarde a atualização do sistema');
                this.editableForm.noButtons = 'true';
            }
            this.form.controls.usuario_texto_complementar.setValue(selected.entity.texto_complementar_plano || "");
            if (!this.form?.controls.unidade_id.value) {
                selected.entity.unidades?.every(async (unidade) => {
                    if (selected.entity.lotacao.unidade_id == unidade.id) {
                        //this.preencheUnidade(unidade);
                        return false;
                    }
                    else
                        return true;
                });
            }
        }
        catch (error) {
            console.error('Erro ao selecionar usuário:', error);
            this.dialog.alert('Erro', 'Ocorreu um erro ao processar a seleção do usuário.');
        }
    }
    /**
     * Reseta os itens do programa para o estado inicial
     */
    resetProgramaItems() {
        if (this.programa) {
            this.programa.items = [];
        }
    }
    /**
     * Processa as unidades do usuário selecionado
     * @param usuario - Entidade do usuário selecionado
     */
    processarUnidadesUsuario(usuario) {
        const unidadeIds = usuario.areas_trabalho?.map((at) => {
            let usuarioAtribuicoes = at.atribuicoes.map((a) => a.atribuicao);
            if (usuarioAtribuicoes.length == 1 && usuarioAtribuicoes.includes('GESTOR_DELEGADO')) {
                return [];
            }
            return at.unidade_id;
        }) || [];
        this.usuarioUnidades = usuario.unidades?.filter((unidade) => unidadeIds.flat().includes(unidade.id)).map((unidade) => ({
            key: unidade.id,
            value: `${unidade.sigla} - ${unidade.nome}`
        })) || [];
    }
    preenchePrograma(programa) {
        if (programa) {
            this.selectedPrograma = programa;
            this.form?.controls.programa_id.setValue(programa.id);
            this.entity.programa_id = programa.id;
            this.entity.programa = programa;
            this.form?.controls.criterios_avaliacao.setValue(programa.plano_trabalho_criterios_avaliacao || []);
            this.form?.controls.data_inicio.updateValueAndValidity();
            this.form?.controls.data_fim.updateValueAndValidity();
        }
        else {
            this.form?.setErrors({ programa: "Não há programa vigente para a unidade executora." });
        }
    }
    onDataInicioChange(event) {
        this.calculaTempos();
    }
    onDataFimChange(event) {
        this.calculaTempos();
    }
    onCargaHorariaChenge(event) {
        this.calculaTempos();
    }
    calculaTempos() {
        const inicio = this.form?.controls.data_inicio.value;
        const fim = this.form?.controls.data_fim.value;
        const carga = this.form?.controls.carga_horaria.value || 8;
        const usuario = this.usuario?.selectedEntity;
        if (usuario && this.selectedUnidade && this.util.isDataValid(inicio) && this.util.isDataValid(fim) && this.util.asTimestamp(inicio) < this.util.asTimestamp(fim)) {
            this.calendar.loadFeriadosCadastrados(this.selectedUnidade.id).then((feriados) => {
                this.horasTotais = this.calendar.calculaDataTempoUnidade(inicio, fim, carga, this.selectedUnidade, "ENTREGA", [], []);
                this.horasParciais = this.calendar.calculaDataTempoUnidade(inicio, fim, carga, this.selectedUnidade, "ENTREGA", [], usuario.afastamentos);
                this.form?.controls.tempo_total.setValue(this.horasTotais.tempoUtil);
                this.form?.controls.tempo_proporcional.setValue(this.horasParciais.tempoUtil);
            });
        }
    }
    async loadData(entity, form, action) {
        if (action == 'clone') {
            entity.id = "";
            entity.data_inicio = new Date();
            entity.data_fim = moment().add(1, 'day').toDate();
            entity.documento_id = null;
            entity.entregas = this.entregasClonadas(entity.entregas);
        }
        this.planoTrabalho = new PlanoTrabalho(entity);
        await Promise.all([
            this.calendar.loadFeriadosCadastrados(entity.unidade_id),
            this.usuario?.loadSearch(entity.usuario || entity.usuario_id)
        ]);
        let formValue = Object.assign({}, form.value);
        form.patchValue(this.util.fillForm(formValue, entity));
        this.selecionaModalidade(entity.usuario);
        //this.form!.controls.unidade_id.setValue(null);
        if (action == 'clone') {
            this.form?.controls.usuario_texto_complementar.setValue(entity.usuario?.texto_complementar_plano || "");
        }
        else {
            this.atualizarTcr();
        }
        this.calculaTempos();
    }
    entregasClonadas(entregas) {
        // Se a entrega for vinculada a um plano de entrega, o plano de entrega precisa estar vigente
        // Se a entrega tiver sido excluida do plano de entrega, não clonar
        const entregasVigentes = entregas.filter((entrega) => {
            const planoEntrega = entrega.plano_entrega_entrega?.plano_entrega;
            if (!planoEntrega)
                return false;
            const dataInicio = this.util.asDate(planoEntrega.data_inicio);
            const dataFim = this.util.asDate(planoEntrega.data_fim);
            const agora = new Date();
            return (dataInicio ? dataInicio <= agora : true) && (dataFim ? dataFim >= agora : true);
        });
        return entregasVigentes.map((entrega) => {
            entrega.id = this.documentoDao.generateUuid();
            entrega._status = "ADD";
            entrega.forca_trabalho = 0;
            return entrega;
        });
    }
    async initializeData(form) {
        if (this.isTermos) {
            this.entity = (await this.dao.getById(this.urlParams.get("id"), this.join));
        }
        else {
            this.entity = new PlanoTrabalho();
            this.entity.carga_horaria = this.auth.entidade?.carga_horaria_padrao || 8;
            this.entity.forma_contagem_carga_horaria = this.auth.entidade?.forma_contagem_carga_horaria || "DIA";
            if (this.auth.unidade) {
                //this.entity.unidade_id = this.auth.unidade!.id;     
                this.buscaGestoresUnidadeExecutora(this.auth.unidade);
                if (!this.gestoresUnidadeExecutora.includes(this.auth.unidade.id)) {
                    this.entity.usuario_id = this.auth.usuario.id;
                }
            }
        }
        await this.loadData(this.entity, this.form);
        if (!this.isTermos) {
            let nowDate = new Date();
            nowDate.setHours(0, 0, 0, 0);
            this.form?.controls.data_inicio.setValue(nowDate);
            this.form?.controls.data_fim.setValue(null);
        }
    }
    /* Cria um objeto Plano baseado nos dados do formulário */
    loadEntity() {
        let plano = this.util.fill(new PlanoTrabalho(), this.entity);
        plano = this.util.fillForm(plano, this.form.value);
        plano.usuario = (this.usuario.selectedEntity || this.entity?.usuario);
        plano.unidade = (this.selectedUnidade || this.entity?.unidade);
        plano.programa = (this.selectedPrograma || this.entity?.programa);
        plano.modalidade_pgd = this.modalidadePgd.normalize(this.form?.controls.modalidade_pgd.value);
        plano.documento = this.entity?.documento;
        plano.documento_id = this.form?.controls.documento_id.value;
        return plano;
    }
    async saveData(form) {
        this.submitting = true;
        try {
            /* Atualiza o documento */
            this.atualizarTcr();
            /* Confirma dados do documento */
            this.documentos?.saveData();
            this.submitting = true;
            this.entity.documentos = this.entity.documentos.filter((documento) => {
                return ["ADD", "EDIT", "DELETE"].includes(documento._status || "");
            });
            /* Salva separadamente as informações do plano */
            let requests = [this.dao.save(this.entity, this.join)];
            if (this.form.controls.editar_texto_complementar_unidade.value) {
                requests.push(this.unidadeDao.update(this.entity.unidade_id, {
                    texto_complementar_plano: this.form.controls.unidade_texto_complementar.value
                }));
            }
            if (this.form.controls.editar_texto_complementar_usuario.value) {
                requests.push(this.usuarioDao.update(this.entity.usuario_id, {
                    texto_complementar_plano: this.form.controls.usuario_texto_complementar.value
                }));
            }
            let responses = await Promise.all(requests);
            this.entity = responses[0];
            this.exibeAlertaTotalAssinaturas(this.entity);
            return true;
        }
        finally {
            this.submitting = false;
        }
    }
    onTabSelect(tab) {
        if (tab.key == "TERMO")
            this.atualizarTcr();
    }
    exibeAlertaTotalAssinaturas(plano) {
        if (plano && plano._metadata) {
            let assinaturasExigidas = plano._metadata?.quantidadeAssinaturasExigidas;
            if (assinaturasExigidas == 1)
                this.dialog.alert("Atenção", "O participante tem atribuição de chefia substituta da unidade superior à sua unidade de lotação. Por isso, este Plano de Trabalho exigirá somente uma assinatura.", "OK");
        }
    }
    documentoDynamicButtons(row) {
        let result = [];
        let documento = row;
        if (this.isTermos && this.planoTrabalhoService.needSign(this.entity, documento)) {
            result.push({ hint: "Assinar", icon: "bi bi-pen", onClick: this.signDocumento.bind(this) });
        }
        result.push({ hint: "Preview", icon: "bi bi-zoom-in", onClick: ((documento) => { this.dialog.html({ title: "Termo de adesão", modalWidth: 1000 }, documento.conteudo || ""); }).bind(this) });
        return result;
    }
    async signDocumento(documento) {
        await this.documentoService.sign([documento]);
        this.cdRef.detectChanges();
    }
    get formaContagemCargaHoraria() {
        const forma = this.form?.controls.forma_contagem_carga_horaria.value || "DIA";
        return forma == "DIA" ? "day" : forma == "SEMANA" ? "week" : "mouth";
    }
    onFormaContagemCargaHorariaChange(unit) {
        this.form.controls.forma_contagem_carga_horaria.setValue(unit == "day" ? "DIA" : unit == "week" ? "SEMANA" : "MES");
    }
    isVigente(documento) {
        return this.form.controls.documento_id.value == documento.id;
    }
    buscaGestoresUnidadeExecutora(unidade) {
        if (unidade)
            [unidade.gestor?.usuario_id, ...unidade.gestores_substitutos?.map(x => x.usuario_id), ...unidade.gestores_delegados?.map(x => x.usuario_id)].forEach(gestor => {
                if (gestor)
                    this.gestoresUnidadeExecutora.push(gestor);
            });
        return this.gestoresUnidadeExecutora;
    }
    regramentoNaoEncontrado() {
        this.form?.controls.programa_id.setValue("");
        this.dialog.alert("Regramento não encontrado.", "Não será possível criar o Plano de Trabalho");
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], PlanoTrabalhoFormComponent.prototype, "editableForm", void 0);
__decorate([
    ViewChild('gridAtividades', { static: false })
], PlanoTrabalhoFormComponent.prototype, "gridAtividades", void 0);
__decorate([
    ViewChild('gridDocumentos', { static: false })
], PlanoTrabalhoFormComponent.prototype, "gridDocumentos", void 0);
__decorate([
    ViewChild('tabs', { static: false })
], PlanoTrabalhoFormComponent.prototype, "tabs", void 0);
__decorate([
    ViewChild('usuario', { static: false })
], PlanoTrabalhoFormComponent.prototype, "usuario", void 0);
__decorate([
    ViewChild('programa', { static: false })
], PlanoTrabalhoFormComponent.prototype, "programa", void 0);
__decorate([
    ViewChild('unidade', { static: false })
], PlanoTrabalhoFormComponent.prototype, "unidade", void 0);
__decorate([
    ViewChild('planoEntrega', { static: false })
], PlanoTrabalhoFormComponent.prototype, "planoEntrega", void 0);
__decorate([
    ViewChild('atividade', { static: false })
], PlanoTrabalhoFormComponent.prototype, "atividade", void 0);
__decorate([
    ViewChild('entrega', { static: false })
], PlanoTrabalhoFormComponent.prototype, "entrega", void 0);
__decorate([
    ViewChild('documentos', { static: false })
], PlanoTrabalhoFormComponent.prototype, "documentos", void 0);
PlanoTrabalhoFormComponent = __decorate([
    Component({
        selector: 'plano-trabalho-form',
        templateUrl: './plano-trabalho-form.component.html',
        styleUrls: ['./plano-trabalho-form.component.scss'],
        standalone: false
    })
], PlanoTrabalhoFormComponent);
export { PlanoTrabalhoFormComponent };
//# sourceMappingURL=plano-trabalho-form.component.js.map