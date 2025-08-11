import {LookupItem} from "../../../../services/lookup.service";
import {Component, Injector, ViewChild} from "@angular/core";
import {AbstractControl, FormGroup} from "@angular/forms";
import {GridComponent} from "src/app/components/grid/grid.component";
import {ToolbarButton} from "src/app/components/toolbar/toolbar.component";
import {DocumentoDaoService} from "src/app/dao/documento-dao-service";
import {PlanoTrabalhoDaoService} from "src/app/dao/plano-trabalho-dao.service";
import {ProgramaDaoService} from "src/app/dao/programa-dao.service";
import {TipoModalidadeDaoService} from "src/app/dao/tipo-modalidade-dao.service";
import {UnidadeDaoService} from "src/app/dao/unidade-dao.service";
import {UsuarioDaoService} from "src/app/dao/usuario-dao.service";
import {IIndexable} from "src/app/models/base.model";
import {PlanoTrabalho} from "src/app/models/plano-trabalho.model";
import {PageListBase} from "src/app/modules/base/page-list-base";
import {FullRoute} from "src/app/services/navigate.service";
import {PlanoTrabalhoService} from "../plano-trabalho.service";
import {DocumentoService} from "src/app/modules/uteis/documentos/documento.service";
import {UtilService} from "src/app/services/util.service";
import {UnidadeService} from "src/app/services/unidade.service";
@Component({
	selector: "plano-trabalho-list",
	templateUrl: "./plano-trabalho-list.component.html",
	styleUrls: ["./plano-trabalho-list.component.scss"],
})
export class PlanoTrabalhoListComponent extends PageListBase<
	PlanoTrabalho,
	PlanoTrabalhoDaoService
> {
	@ViewChild(GridComponent, {static: false}) public grid?: GridComponent;

	public unidadeDao: UnidadeDaoService;
	public documentoDao: DocumentoDaoService;
	public documentoService: DocumentoService;
	public utilService: UtilService;
	public unidadeService: UnidadeService;
	public programaDao: ProgramaDaoService;
	public usuarioDao: UsuarioDaoService;
	public planoTrabalhoService: PlanoTrabalhoService;
	public temAtribuicaoChefia: boolean = false;
	public routeStatus: FullRoute = {route: ["uteis", "status"]};
	public tipoModalidadeDao: TipoModalidadeDaoService;
	public multiselectAllFields: string[] = [
		"tipo_modalidade_id",
		"usuario_id",
		"unidade_id",
		"documento_id",
	];
	public relatorios: LookupItem[] = [
		{key: "PTR_LISTA", value: "Lista Planos de Trabalhos"},
	];
	public botoes: ToolbarButton[] = [];
	public planoTrabalhoEditavel: boolean = false;
	public BOTAO_ALTERAR: ToolbarButton;
	public BOTAO_ARQUIVAR: ToolbarButton;
	public BOTAO_ASSINAR: ToolbarButton;
	public BOTAO_ATIVAR: ToolbarButton;
	public BOTAO_CLONAR: ToolbarButton;
	public BOTAO_CANCELAR_ASSINATURA: ToolbarButton;
	public BOTAO_CANCELAR_PLANO: ToolbarButton;
	public BOTAO_DESARQUIVAR: ToolbarButton;
	public BOTAO_ENVIAR_ASSINATURA: ToolbarButton;
	public BOTAO_INFORMACOES: ToolbarButton;
	public BOTAO_REATIVAR: ToolbarButton;
	public BOTAO_SUSPENDER: ToolbarButton;
	public BOTAO_TERMOS: ToolbarButton;
	public BOTAO_CONSOLIDACOES: ToolbarButton;
	public DATAS_FILTRO: LookupItem[] = [
		{key: "VIGENTE", value: "Vigente"},
		{key: "NAOVIGENTE", value: "Não vigente"},
		{key: "INICIAM", value: "Iniciam"},
		{key: "FINALIZAM", value: "Finalizam"},
	];

	constructor(public injector: Injector) {
		super(injector, PlanoTrabalho, PlanoTrabalhoDaoService);
		this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
		this.programaDao = injector.get<ProgramaDaoService>(ProgramaDaoService);
		this.documentoDao = injector.get<DocumentoDaoService>(DocumentoDaoService);
		this.documentoService = injector.get<DocumentoService>(DocumentoService);
		this.unidadeService = injector.get<UnidadeService>(UnidadeService);
		this.utilService = injector.get<UtilService>(UtilService);
		this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
		this.planoTrabalhoService =
			injector.get<PlanoTrabalhoService>(PlanoTrabalhoService);
		this.tipoModalidadeDao = injector.get<TipoModalidadeDaoService>(
			TipoModalidadeDaoService
		);
		/* Inicializações */
		this.title = this.lex.translate("Planos de Trabalho");
		this.code = "MOD_PTR";
		this.filter = this.fh.FormBuilder(
			{
				agrupar: {default: true},
				subordinadas: { default: false },
				lotados_minha_unidade: {default: false},
				usuario: {default: ""},
				status: {default: ""},
				unidade_id: {default: null},
				arquivados: {default: false},
				tipo_modalidade_id: {default: null},
				data_filtro: {default: null},
				data_filtro_inicio: {default: new Date()},
				data_filtro_fim: {default: new Date()},
				meus_planos: { default: true },
			},
			this.cdRef,
			this.filterValidate
		);
		this.join = [
			"unidade.gestor.usuario:id",
			"documento.assinaturas.usuario:id,nome,url_foto",
            "documento.assinaturas:id,usuario_id,documento_id",
			"programa:id,nome",
            "documento:id,numero",
			"tipo_modalidade:id,nome",
			"entregas.plano_entrega_entrega.entrega",
			"entregas.plano_entrega_entrega.plano_entrega:id,unidade_id",
			"entregas.plano_entrega_entrega.plano_entrega.unidade",
			"entregas.entrega",
			"entregas.reacoes.usuario:id,nome,apelido",
            "unidade.entidade:id,sigla",
            "unidade:id,sigla,entidade_id,unidade_pai_id",
            "usuario:id,nome,matricula,url_foto",
		];
		this.temAtribuicaoChefia = this.auth.isGestorAlgumaAreaTrabalho(false);
		this.groupBy = [{field: "unidade.sigla", label: "Unidade"}];
		this.BOTAO_ALTERAR = {
			label: "Alterar",
			icon: "bi bi-pencil-square",
			color: "btn-outline-info",
			onClick: this.edit.bind(this),
		};
		this.BOTAO_ARQUIVAR = {
			label: "Arquivar",
			icon: "bi bi-inboxes",
			onClick: this.arquivar.bind(this),
		};
		this.BOTAO_ASSINAR = {
			label: "Assinar",
			icon: "bi bi-pen",
			onClick: this.assinar.bind(this),
		};
		this.BOTAO_ATIVAR = {
			label: "Ativar",
			icon: this.lookup.getIcon(this.lookup.PLANO_TRABALHO_STATUS, "ATIVO"),
			color: this.lookup.getColor(this.lookup.PLANO_TRABALHO_STATUS, "ATIVO"),
			onClick: this.ativar.bind(this),
		};
		this.BOTAO_CANCELAR_ASSINATURA = {
			label: "Cancelar assinatura",
			icon: this.lookup.getIcon(
				this.lookup.PLANO_TRABALHO_STATUS,
				"AGUARDANDO_ASSINATURA ou INCLUIDO"
			),
			color: this.lookup.getColor(
				this.lookup.PLANO_TRABALHO_STATUS,
				"AGUARDANDO_ASSINATURA ou INCLUIDO"
			),
			onClick: this.cancelarAssinatura.bind(this),
		};
		this.BOTAO_CANCELAR_PLANO = {
			label: "Cancelar plano",
			icon: this.lookup.getIcon(this.lookup.PLANO_TRABALHO_STATUS, "CANCELADO"),
			color: this.lookup.getColor(
				this.lookup.PLANO_TRABALHO_STATUS,
				"CANCELADO"
			),
			onClick: this.cancelarPlano.bind(this),
		};
		this.BOTAO_DESARQUIVAR = {
			label: "Desarquivar",
			icon: "bi bi-reply",
			onClick: this.desarquivar.bind(this),
		};
		this.BOTAO_ENVIAR_ASSINATURA = {
			label: "Enviar para assinatura",
			icon: this.lookup.getIcon(
				this.lookup.PLANO_TRABALHO_STATUS,
				"AGUARDANDO_ASSINATURA"
			),
			color: this.lookup.getColor(
				this.lookup.PLANO_TRABALHO_STATUS,
				"AGUARDANDO_ASSINATURA"
			),
			onClick: this.enviarParaAssinatura.bind(this),
		};
		this.BOTAO_INFORMACOES = {
			label: "Informações",
			icon: "bi bi-info-circle",
			onClick: this.consult.bind(this),
		};
	
		this.BOTAO_TERMOS = {
			label: "Termos",
			icon: "bi bi-file-earmark-check",
			onClick: ((row: PlanoTrabalho) =>
				this.go.navigate(
					{route: ["uteis", "documentos", "TCR", row.id]},
					{
						modalClose: (modalResult) =>
							(this.grid?.query || this.query!).refreshId(row.id),
						metadata: this.planoTrabalhoService.metadados(row),
					}
				)).bind(this),
		};
		this.BOTAO_CONSOLIDACOES = {
			label: "Consolidações",
			icon: this.entityService.getIcon("PlanoTrabalhoConsolidacao"),
			onClick: ((row: PlanoTrabalho) =>
				this.go.navigate(
					{
						route: [
							"gestao",
							"plano-trabalho",
							"consolidacao",
							row.usuario_id,
							row.id,
						],
					},
					{
						modalClose: (modalResult) =>
							(this.grid?.query || this.query!).refreshId(row.id),
						modal: true,
					}
				)).bind(this),
		};
		this.BOTAO_REATIVAR = {
			label: "Reativar",
			icon: this.lookup.getIcon(this.lookup.PLANO_TRABALHO_STATUS, "ATIVO"),
			color: this.lookup.getColor(this.lookup.PLANO_TRABALHO_STATUS, "ATIVO"),
			onClick: this.reativar.bind(this),
		};
		this.BOTAO_SUSPENDER = {
			label: "Suspender",
			icon: this.lookup.getIcon(this.lookup.PLANO_TRABALHO_STATUS, "SUSPENSO"),
			color: this.lookup.getColor(
				this.lookup.PLANO_TRABALHO_STATUS,
				"SUSPENSO"
			),
			onClick: this.suspender.bind(this),
		};
		this.BOTAO_CLONAR = { label: "Clonar", icon: "bi bi-copy", color: "btn-outline-primary", onClick: (planoTrabalho: PlanoTrabalho) => {
			this.dialog.alert("Atenção!", "Não serão clonados os percentuais de contribuição e as contribuições para entregas que não estejam mais disponíveis").then(() => {	
				this.go.navigate({ route: ['gestao', 'plano-trabalho', planoTrabalho.id, 'clone'] }, this.modalRefreshId(planoTrabalho)) 
			});
		}};
		this.addOption(this.OPTION_LOGS, "MOD_AUDIT_LOG");
		this.botoes = [
			this.BOTAO_ALTERAR,
			this.BOTAO_ARQUIVAR,
			this.BOTAO_ASSINAR,
			this.BOTAO_ATIVAR,
			this.BOTAO_CANCELAR_ASSINATURA,
			this.BOTAO_CANCELAR_PLANO,
			this.BOTAO_DESARQUIVAR,
			this.BOTAO_ENVIAR_ASSINATURA,
			this.BOTAO_INFORMACOES,
			this.BOTAO_TERMOS,
			this.BOTAO_CONSOLIDACOES,
			this.BOTAO_REATIVAR,
			this.BOTAO_SUSPENDER,
			this.BOTAO_CLONAR,
			this.OPTION_LOGS
		];
		this.rowsLimit = 10;
	}

	ngOnInit(): void {
		super.ngOnInit();
		if (this.metadata?.minha_unidade) {
			this.filter?.controls.unidade_id.setValue(this.auth.unidade?.id);
		}
		this.route.queryParams.subscribe((p) => {
			if (p["context"] == "EXECUCAO" && this.filter) {
				this.filter?.controls.usuario.setValue(this.auth.usuario?.nome);
			}
			if (p["context"] == "GESTAO" && this.filter) {
				this.filter?.controls.unidade_id.setValue(this.auth.unidade?.id);
			}
		});
	}

	public dynamicOptions(row: any): ToolbarButton[] {
		let result: ToolbarButton[] = [];
		this.botoes.forEach((botao) => {
			if (this.botaoAtendeCondicoes(botao, row)) result.push(botao);
		});
		return result;
	}

	public dynamicButtons(row: any): ToolbarButton[] {
		let result: ToolbarButton[] = [];
		let planoTrabalho: PlanoTrabalho = row as PlanoTrabalho;
		switch (this.planoTrabalhoService.situacaoPlano(planoTrabalho)) {
			case "INCLUIDO":
				if (this.botaoAtendeCondicoes(this.BOTAO_ASSINAR, row))
					result.push(this.BOTAO_ASSINAR);
				else if (this.botaoAtendeCondicoes(this.BOTAO_ATIVAR, row))
					result.push(this.BOTAO_ATIVAR);
				else if (this.botaoAtendeCondicoes(this.BOTAO_ENVIAR_ASSINATURA, row))
					result.push(this.BOTAO_ENVIAR_ASSINATURA);
				/*         
          - botões-padrão:
            - 'Assinar'. Condições para ser exibido: vide RN_PTR_O;                  (quando for exigida apenas a assinatura do usuário logado no TCR)
            - 'Ativar'. Condições para ser exibido: vide RN_PTR_P;                   (quando não for exigida nenhuma assinatura no TCR)
            - 'Enviar para Assinatura'. Condições para ser exibido: vide RN_PTR_U;
            - 'Consultar'. Condições para ser exibido: vide RN_PTR_S; 
        */
				break;
			case "AGUARDANDO_ASSINATURA":
				if (this.botaoAtendeCondicoes(this.BOTAO_ASSINAR, row))
					result.push(this.BOTAO_ASSINAR);
				/**
          - botões-padrão:
            - 'Assinar'. Condições para ser exibido: vide RN_PTR_O;
            - 'Consultar'. Condições para ser exibido: vide RN_PTR_S;
        */
				break;
			case "ATIVO":
				/**
          - botões-padrão:
            - 'Consultar'. Condições para ser exibido: vide RN_PTR_S;
        */
				break;
			case "CONCLUIDO":
				if (this.botaoAtendeCondicoes(this.BOTAO_ARQUIVAR, row))
					result.push(this.BOTAO_ARQUIVAR);
				/**
          - botões-padrão:
            - 'Arquivar'. Condições para ser exibido: vide RN_PTR_N;
            - 'Consultar'. Condições para ser exibido: vide RN_PTR_S; 
        */
				break;
			case "SUSPENSO":
				/**
          - botões-padrão:
            - 'Consultar'. Condições para ser exibido: vide RN_PTR_S;
        */
				break;
			case "ARQUIVADO":
				/**
          - botões-padrão:
            - 'Consultar'. Condições para ser exibido: vide RN_PTR_S;
        */
				break;
			case "CANCELADO":
				if (this.botaoAtendeCondicoes(this.BOTAO_ARQUIVAR, row))
					result.push(this.BOTAO_ARQUIVAR);
				/**
          - botões-padrão:
            - 'Arquivar'. Condições para ser exibido: vide RN_PTR_N;
            - 'Consultar'. Condições para ser exibido: vide RN_PTR_S;
        */
				break;
		}
		if (!result.length) result.push(this.BOTAO_INFORMACOES);
		return result;
	}

	public filterValidate = (control: AbstractControl, controlName: string) => {
		let result = null;
		if (
			controlName == "data_filtro_inicio" &&
			control.value > this.filter?.controls.data_filtro_fim.value
		) {
			result = "Maior que fim";
		} else if (
			controlName == "data_filtro_fim" &&
			control.value < this.filter?.controls.data_filtro_inicio.value
		) {
			result = "Menor que início";
		}
		return result;
	};

	public filterClear(filter: FormGroup) {
		filter.controls.usuario.setValue("");
		filter.controls.unidade_id.setValue(null);
		filter.controls.status.setValue(null);
		filter.controls.arquivados.setValue(false);
		filter.controls.subordinadas.setValue(false);
		filter.controls.tipo_modalidade_id.setValue(null);
		filter.controls.data_filtro.setValue(null);
		filter.controls.data_filtro_inicio.setValue(new Date());
		filter.controls.data_filtro_fim.setValue(new Date());
		filter.controls.meus_planos.setValue(true);
		super.filterClear(filter);
	}

	public filterWhere = (filter: FormGroup) => {
		let result: any[] = [];
		let form: any = filter.value;
		if (form.tipo_modalidade_id?.length) {
			result.push(["tipo_modalidade_id", "==", form.tipo_modalidade_id]);
		}
		if (form.data_filtro) {
			result.push(["data_filtro", "==", form.data_filtro]);
			result.push(["data_filtro_inicio", "==", form.data_filtro_inicio]);
			result.push(["data_filtro_fim", "==", form.data_filtro_fim]);
		}
		if (form.usuario?.length)
			result.push([
				"usuario.nome",
				"like",
				"%" + form.usuario.trim().replace(" ", "%") + "%",
			]);
		if (this.filter?.controls.meus_planos.value) {
			let w1: [string, string, string[]] = ["unidade_id", "in", (this.auth.unidades || []).map(u => u.id)];
			result.push(w1);
		}
		if (form.unidade_id?.length)
			result.push(["unidade_id", "==", form.unidade_id]);
		if (form.status) result.push(["status", "==", form.status]);
		if (form.lotados_minha_unidade)
			result.push(["lotados_minha_unidade", "==", true]);
		//  (RI_PTR_C) Por padrão, os planos de trabalho retornados na listagem do grid são os que não foram arquivados.
		result.push([
			"incluir_arquivados",
			"==",
			this.filter!.controls.arquivados.value,
		]);
		result.push([
			"incluir_subordinadas",
			"==",
			this.filter!.controls.subordinadas.value,
		]);
		if (this.filter!.controls.meus_planos.value)
			result.push(["usuario.id", "==", this.auth.usuario?.id]);

		return result;
	};

	public onAgruparChange(event: Event) {
		const agrupar = this.filter!.controls.agrupar.value;
		if (
			(agrupar && !this.groupBy?.length) ||
			(!agrupar && this.groupBy?.length)
		) {
			this.groupBy = agrupar
				? [{field: "unidade.sigla", label: "Unidade"}]
				: [];
			this.grid!.reloadFilter();
		}
	}


	public onLotadosMinhaUnidadeChange(event: Event) {
		this.disableLotados();
		//this.grid!.reloadFilter();
	}

	public dynamicMultiselectMenu = (
		multiselected: IIndexable
	): ToolbarButton[] => {
		let assinar = !!Object.keys(multiselected).length;
		let menu = [];
		Object.entries(multiselected).forEach(([key, value]) => {
			if (!this.planoTrabalhoService.needSign(value)) assinar = false;
		});
		if (assinar)
			menu.push({
				label: "Assinar",
				icon: "bi bi-pen",
				onClick: this.assinar.bind(this),
			});
		return menu;
	};

	public botaoAtendeCondicoes(
		botao: ToolbarButton,
		planoTrabalho: PlanoTrabalho
	): boolean {
		let assinaturasExigidas = planoTrabalho._metadata?.assinaturasExigidas;
		let todasAssinaturasExigidas = [
			...assinaturasExigidas.gestores_entidade,
			...assinaturasExigidas.gestores_unidade_executora,
			...assinaturasExigidas.gestores_unidade_lotacao,
			...assinaturasExigidas.participante,
		];
		let assinaturasFaltantes = this.planoTrabalhoService.assinaturasFaltantes(
			planoTrabalho._metadata?.assinaturasExigidas,
			planoTrabalho._metadata?.jaAssinaramTCR
		);
		let haAssinaturasFaltantes =
			!!assinaturasFaltantes.participante.length ||
			!!assinaturasFaltantes.gestores_unidade_executora.length ||
			!!assinaturasFaltantes.gestores_unidade_lotacao.length ||
			!!assinaturasFaltantes.gestores_entidade.length;
		let usuarioEhGestorUnidadeExecutora = this.unidadeService.isGestorUnidade(
			planoTrabalho.unidade_id
		);
		let usuarioJaAssinouTCR = this.planoTrabalhoService.usuarioAssinou(
			planoTrabalho._metadata?.jaAssinaramTCR
		);
		let assinaturaUsuarioEhExigida = !!todasAssinaturasExigidas?.includes(
			this.auth.usuario?.id!
		);
		let planoIncluido =
			this.planoTrabalhoService.situacaoPlano(planoTrabalho) == "INCLUIDO";
		let usuarioEhParticipante =
			this.auth.usuario?.id == planoTrabalho.usuario_id;
		let planoAguardandoAssinatura =
			this.planoTrabalhoService.situacaoPlano(planoTrabalho) ==
			"AGUARDANDO_ASSINATURA";
		let planoAtivo =
			this.planoTrabalhoService.situacaoPlano(planoTrabalho) == "ATIVO";
		let planoConcluido =
			this.planoTrabalhoService.situacaoPlano(planoTrabalho) == "CONCLUIDO";
		let planoAvaliado =
			this.planoTrabalhoService.situacaoPlano(planoTrabalho) == "AVALIADO";
		let planoCancelado =
			this.planoTrabalhoService.situacaoPlano(planoTrabalho) == "CANCELADO";
		let planoDeletado =
			this.planoTrabalhoService.situacaoPlano(planoTrabalho) == "EXCLUIDO";
		let planoArquivado =
			this.planoTrabalhoService.situacaoPlano(planoTrabalho) == "ARQUIVADO";
		let planoSuspenso =
			this.planoTrabalhoService.situacaoPlano(planoTrabalho) == "SUSPENSO";
		let planoPossuiEntrega = planoTrabalho.entregas.length > 0;
		if (
			botao == this.BOTAO_INFORMACOES &&
			this.auth.hasPermissionTo("MOD_PTR")
		) {
			/*
      (RN_PTR_S) CONSULTAR
      Todos os participantes podem visualizar todos os planos de trabalho, desde que possuam a capacidade "MOD_PTR";
      */
			return true;
		} else {
			if (planoDeletado) {
				return false;
			} else {
				let validoTabela1 = false;
				let gestorUnidadeSuperior =
					planoTrabalho._metadata?.atribuicoesLogadoUnidadeSuperior.gestor ||
					planoTrabalho._metadata?.atribuicoesLogadoUnidadeSuperior
						.gestorSubstituto;
				let gestorLogado =
					planoTrabalho._metadata?.atribuicoesLogado.gestor ||
					planoTrabalho._metadata?.atribuicoesLogado.gestorSubstituto;
				switch (botao) {
					case this.BOTAO_ALTERAR:
						/*
            (RN_PTR_M) Condições para que um Plano de Trabalho possa ser alterado:
              - o usuário logado precisa possuir a capacidade "MOD_PTR_EDT", o Plano de Trabalho precisa ser válido (ou seja, nem deletado, nem arquivado, nem estar no status CANCELADO), e:
                - estando com o status 'INCLUIDO' ou 'AGUARDANDO_ASSINATURA', o usuário logado precisa atender os critérios da ação Alterar da TABELA_1;
                - estando com o status 'ATIVO', o usuário precisa possuir a capacidade MOD_PTR_EDT_ATV e atender os critérios da ação Alterar da TABELA_1;
              - Após alterado, e no caso se exija assinaturas no TCR, o Plano de Trabalho precisa ser repactuado (novo TCR), e o plano retorna ao status 'AGUARDANDO_ASSINATURA';
              - A alteração não pode apresentar período conflitante com outro plano já existente para a mesma Unidade Executora e mesmo participante, ou o usuário logado possuir a capacidade MOD_PTR_INTSC_DATA (RN_PTR_AA)
            */
						if (usuarioEhParticipante) {
							validoTabela1 =
								planoTrabalho._metadata?.usuarioEhParticipanteHabilitado;
						} else if (
							planoTrabalho._metadata?.atribuicoesParticipante.gestor
						) {
							validoTabela1 = gestorUnidadeSuperior;
						} else if (
							planoTrabalho._metadata?.atribuicoesParticipante.gestorSubstituto
						) {
							validoTabela1 =
								gestorUnidadeSuperior ||
								planoTrabalho._metadata?.atribuicoesLogado.gestor;
						} else if (
							planoTrabalho._metadata?.atribuicoesParticipante.gestorDelegado
						) {
							validoTabela1 = gestorLogado;
						} else {
							validoTabela1 =
								gestorLogado ||
								planoTrabalho._metadata?.atribuicoesLogado.gestorDelegado;
						}
						let condition1 = this.auth.hasPermissionTo("MOD_PTR_EDT");
						let condition2 = this.planoTrabalhoService.isValido(planoTrabalho);
						let condition3 =
							(planoIncluido || planoAguardandoAssinatura) && validoTabela1;
						let condition4 =
							planoAtivo &&
							validoTabela1 &&
							this.auth.hasPermissionTo("MOD_PTR_EDT_ATV");
						planoTrabalho._metadata = {
							...planoTrabalho._metadata,
							editavel: condition1 && condition2 && (condition3 || condition4),
						};
						return condition1 && condition2 && (condition3 || condition4);
					case this.BOTAO_ARQUIVAR:
						/*
            (RN_PTR_N) Condições para que um Plano de Trabalho possa ser arquivado:
              - o plano precisa estar com o status CONCLUIDO ou CANCELADO, não ter sido arquivado, e:
              - o usuário logado precisa ser o participante ou o gestor da Unidade Executora;
            */
						return (
							(planoConcluido || planoCancelado) &&
							!planoArquivado &&
							(usuarioEhParticipante || usuarioEhGestorUnidadeExecutora)
						);
					case this.BOTAO_ASSINAR:
						/*
            (RN_PTR_O) Condições para que um Plano de Trabalho possa ser assinado:
              - estar no status INCLUIDO ou AGUARDANDO_ASSINATURA, e
                - o plano precisa possuir ao menos uma entrega, e
                - o usuário logado precisa atender os critérios da ação Assinar da TABELA_1, e
                - a assinatura do usuário logado precisa ser uma das exigidas pelo Programa de Gestão, respeitando a TABELA_3, e ele não ter ainda assinado;
              - Enquanto faltar assinatura no TCR, o plano vai para o (ou permanece no) status de 'AGUARDANDO_ASSINATURA'. Quando o último assinar o TCR, o plano vai para o status 'ATIVO';                  
            */
						let condicao1 = planoIncluido || planoAguardandoAssinatura;
						let condicao2 = planoPossuiEntrega;
						let condicao3 = assinaturaUsuarioEhExigida && !usuarioJaAssinouTCR;
						return condicao1 && condicao2 && condicao3;
					case this.BOTAO_ATIVAR:
						/*
            (RN_PTR_P) Condições para que um Plano de Trabalho possa ser ativado:
              - o plano precisa estar no status 'INCLUIDO', e
                - o usuário logado precisa respeitar a ação Ativar da TABELA_1, e
                - nenhuma assinatura no TCR ser exigida pelo programa, e
                - o plano de trabalho precisa ter ao menos uma entrega;
            */
						if (planoTrabalho._metadata?.atribuicoesParticipante.gestor) {
							validoTabela1 =
								gestorUnidadeSuperior ||
								planoTrabalho._metadata?.usuarioEhParticipanteHabilitado;
						} else if (
							planoTrabalho._metadata?.atribuicoesParticipante.gestorSubstituto
						) {
							validoTabela1 =
								planoTrabalho._metadata?.atribuicoesLogado.gestor ||
								(usuarioEhParticipante &&
									planoTrabalho._metadata?.usuarioEhParticipanteHabilitado) ||
								(!usuarioEhParticipante &&
									planoTrabalho._metadata?.atribuicoesLogado.gestorSubstituto);
						} else if (
							planoTrabalho._metadata?.atribuicoesParticipante.gestorDelegado
						) {
							validoTabela1 =
								planoTrabalho._metadata?.atribuicoesLogado.gestor ||
								planoTrabalho._metadata?.atribuicoesLogado.gestorSubstituto ||
								(usuarioEhParticipante &&
									planoTrabalho._metadata?.usuarioEhParticipanteHabilitado);
						} else if (usuarioEhParticipante) {
							validoTabela1 =
								gestorLogado ||
								planoTrabalho._metadata?.usuarioEhParticipanteHabilitado;
						} else {
							validoTabela1 = gestorLogado;
						}
						return (
							planoIncluido &&
							validoTabela1 &&
							!assinaturasExigidas?.todas?.length &&
							planoPossuiEntrega
						);
					case this.BOTAO_CANCELAR_ASSINATURA:
						/*
            (RN_PTR_Q) Condições para que um Plano de Trabalho possa ter uma assinatura cancelada:
              - o plano precisa estar no status 'AGUARDANDO_ASSINATURA'; e
                - o usuário logado precisa já ter assinado o TCR;
              - Após o cancelamento da assinatura do usuário logado, se existir assinatura(s) de outro(s) usuário(s), o plano permanece no status 'AGUARDANDO_ASSINATURA'. Caso contrário, retrocessará para o status 'INCLUIDO';
            */
						return planoAguardandoAssinatura && usuarioJaAssinouTCR;
					case this.BOTAO_CANCELAR_PLANO:
						/*
            (RN_PTR_R) Condições para que um Plano de Trabalho possa ser cancelado:
              - o usuário logado precisa possuir a capacidade "MOD_PTR_CNC", e
                - o plano precisa estar em um dos seguintes status: INCLUIDO, AGUARDANDO_ASSINATURA, ATIVO; e
                - não possuir nenhuma atividade lançada e não possuir nenhuma consolidação CONCLUIDO/AVALIADO; [RN_PTR_K]
                - o usuário logado precisa ser gestor da Unidade Executora;
            */
						return !!planoTrabalho._metadata?.podeCancelar;
					case this.BOTAO_DESARQUIVAR:
						/*
              (RN_PTR_T) DESARQUIVAR
              O plano precisa estar arquivado, e:
                  - o usuário logado precisa ser o participante ou gestor da Unidade Executora;
            */
						return (
							planoArquivado &&
							(usuarioEhParticipante || usuarioEhGestorUnidadeExecutora)
						);
					case this.BOTAO_ENVIAR_ASSINATURA:
						/*
            (RN_PTR_U) Condições para que um Plano de Trabalho possa ser enviado para assinatura:
              - o plano precisa estar com o status INCLUIDO; e
                - o usuário logado precisa atender os critérios da ação Assinar da TABELA_1, e
                - a assinatura do usuário logado não ser exigida, e caso seja, então ele já deve ter assinado o TCR (salvaguarda); e
                - devem existir assinaturas exigíveis ainda pendentes; e
                - o plano precisa possuir ao menos uma entrega.
            */
						return (
							planoIncluido &&
							(!assinaturaUsuarioEhExigida || usuarioJaAssinouTCR) &&
							haAssinaturasFaltantes &&
							planoPossuiEntrega &&
							(usuarioEhParticipante || usuarioEhGestorUnidadeExecutora)
						);
					case this.BOTAO_REATIVAR:
						/*
              (RN_PTR_W) REATIVAR
              O plano precisa estar com o status SUSPENSO, e
                - o usuário logado precisa ser gestor da Unidade Executora;
            */
						return planoSuspenso && usuarioEhGestorUnidadeExecutora;
					case this.BOTAO_SUSPENDER:
						/*
              (RN_PTR_X) SUSPENDER
              O plano precisa estar com o status ATIVO, e
                - o usuário logado precisa ser gestor da Unidade Executora;
            */
						return planoAtivo && usuarioEhGestorUnidadeExecutora;
					case this.BOTAO_TERMOS:
						return this.auth.hasPermissionTo("MOD_PTR");
					case this.BOTAO_CONSOLIDACOES:
						return true;
					case this.OPTION_LOGS:
						return true;
					case this.BOTAO_CLONAR:
						return (planoConcluido || planoAvaliado) && this.auth.hasPermissionTo("MOD_PTR_INCL");
				}
			}
		}
		return false;
	}

	public contadorAssinaturas(planoTrabalho: PlanoTrabalho): string {
    let jaAssinaramTCR = planoTrabalho._metadata?.jaAssinaramTCR || {};
   	const assinaturasNecessarias = [
        ...(jaAssinaramTCR.participante || []),
        ...(jaAssinaramTCR.gestores_unidade_executora || []),
        ...(jaAssinaramTCR.gestores_unidade_lotacao || []),
        ...(jaAssinaramTCR.gestores_entidade || [])
    ];
		const totalExigidasUnicas = new Set(assinaturasNecessarias).size;


    return `${totalExigidasUnicas} de ${planoTrabalho._metadata?.quantidadeAssinaturasExigidas}`;
	}


	public arquivar(planoTrabalho: PlanoTrabalho) {
		this.go.navigate(this.routeStatus, {
			metadata: {
				tipo: "PlanoTrabalho",
				entity: Object.assign({}, planoTrabalho, {arquivar: true}),
				novoStatus: planoTrabalho.status,
				onClick: this.dao!.arquivar.bind(this.dao),
			},
			title: "Arquivar Plano de Trabalho",
			modalClose: (modalResult) => {
				if (modalResult) {
					(this.grid?.query || this.query!).refreshId(planoTrabalho.id);
				}
			},
		});
	}

	public assinar(planoTrabalho?: PlanoTrabalho) {
		const planosIds = planoTrabalho
			? [planoTrabalho.id]
			: Object.keys(this.grid!.multiselected || {});
		const documentos = this.grid!.items.filter(
			(x) => planosIds.includes(x.id) && x.documento_id?.length
		).map((x) => x.documento);
		if (!documentos.length) {
			this.dialog.alert("Selecione", "Nenhum plano selecionado!");
		} else {
			this.documentoService
				.sign(documentos)
				.then(() =>
					(this.grid?.query || this.query!).refreshId(planoTrabalho!.id)
				);
		}
	}

	public ativar(planoTrabalho: PlanoTrabalho) {
		this.go.navigate(this.routeStatus, {
			metadata: {
				tipo: "PlanoTrabalho",
				entity: planoTrabalho,
				novoStatus: "ATIVO",
				onClick: this.dao!.ativar.bind(this.dao),
			},
			title: "Ativar Plano de Trabalho",
			modalClose: (modalResult) => {
				if (modalResult) {
					(this.grid?.query || this.query!).refreshId(planoTrabalho.id);
				}
			},
		});
	}

	// COMPLEMENTAR A IMPLEMENTAÇÃO DO MÉTODO
	public cancelarAssinatura(planoTrabalho: PlanoTrabalho) {
		this.go.navigate(this.routeStatus, {
			metadata: {
				tipo: "PlanoTrabalho",
				entity: planoTrabalho,
				novoStatus: "AGUARDANDO_ASSINATURA",
				onClick: this.dao!.cancelarAssinatura.bind(this.dao),
			},
			title: "Cancelar Assinatura do TCR",
			modalClose: (modalResult) => {
				if (modalResult) {
					(this.grid?.query || this.query!).refreshId(planoTrabalho.id);
				}
			},
		});
	}

	public cancelarPlano(planoTrabalho: PlanoTrabalho) {
		this.go.navigate(this.routeStatus, {
			metadata: {
				tipo: "PlanoTrabalho",
				entity: Object.assign({}, planoTrabalho, {arquivar: true}),
				exigeJustificativa: true,
				novoStatus: "CANCELADO",
				onClick: this.dao!.cancelarPlano.bind(this.dao),
			},
			title: "Cancelar Plano de Trabalho",
			modalClose: (modalResult) => {
				if (modalResult) {
					(this.grid?.query || this.query!).refreshId(planoTrabalho.id);
				}
			},
		});
	}

	public desarquivar(planoTrabalho: PlanoTrabalho) {
		this.go.navigate(this.routeStatus, {
			metadata: {
				tipo: "PlanoTrabalho",
				entity: Object.assign({}, planoTrabalho, {arquivar: false}),
				novoStatus: planoTrabalho.status,
				onClick: this.dao!.arquivar.bind(this.dao),
			},
			title: "Desarquivar Plano de Trabalho",
			modalClose: (modalResult) => {
				if (modalResult) {
					(this.grid?.query || this.query!).refreshId(planoTrabalho.id);
				}
			},
		});
	}


	public enviarParaAssinatura(planoTrabalho: PlanoTrabalho) {
		this.go.navigate(this.routeStatus, {
			metadata: {
				tipo: "PlanoTrabalho",
				entity: planoTrabalho,
				novoStatus: "AGUARDANDO_ASSINATURA",
				onClick: this.dao!.enviarParaAssinatura.bind(this.dao),
			},
			title: "Disponibilizar Plano de Trabalho para assinatura",
			modalClose: (modalResult) => {
				if (modalResult) {
					(this.grid?.query || this.query!).refreshId(planoTrabalho.id);
				}
			},
		});
	}

	public reativar(planoTrabalho: PlanoTrabalho) {
		this.go.navigate(this.routeStatus, {
			metadata: {
				tipo: "PlanoTrabalho",
				entity: planoTrabalho,
				novoStatus: "ATIVO",
				onClick: this.dao!.reativar.bind(this.dao),
			},
			title: "Reativar Plano de Trabalho",
			modalClose: (modalResult) => {
				if (modalResult) {
					(this.grid?.query || this.query!).refreshId(planoTrabalho.id);
				}
			},
		});
	}

	public suspender(planoTrabalho: PlanoTrabalho) {
		this.go.navigate(this.routeStatus, {
			metadata: {
				tipo: "PlanoTrabalho",
				entity: planoTrabalho,
				novoStatus: "SUSPENSO",
				onClick: this.dao!.suspender.bind(this.dao),
			},
			title: "Suspender Plano de Trabalho",
			modalClose: (modalResult) => {
				if (modalResult) {
					(this.grid?.query || this.query!).refreshId(planoTrabalho.id);
				}
			},
		});
	}

	public disableMeus() {
		if (!this.filter || !this.filter.controls.subordinadas || !this.filter.controls.meus_planos) {
			console.warn("Formulário ou controles não inicializados corretamente.");
			return;
		}

		// Se "Unidades Subordinadas" está ativado, desativa "Meus Planos"
		if (this.filter.controls.subordinadas.value) {
			this.filter.controls.meus_planos.setValue(false);
			this.filter.controls.lotados_minha_unidade.setValue(false);
		} else {
			this.filter.controls.meus_planos.setValue(true);
		}

		//this.grid!.reloadFilter();
	}

	public disableSub() {
		if (!this.filter || !this.filter.controls.subordinadas || !this.filter.controls.meus_planos) {
			console.warn("Formulário ou controles não inicializados corretamente.");
			return;
		}

		// Se "Meus Planos" está ativado, desativa "Unidades Subordinadas"
		if (this.filter.controls.meus_planos.value) {
			this.filter!.controls.subordinadas.setValue(false);
			this.filter!.controls.lotados_minha_unidade.setValue(false);
		} else {
			this.filter!.controls.subordinadas.setValue(true);

		}

		//this.grid!.reloadFilter();
	}

	public disableLotados() {
		if (!this.filter || !this.filter.controls.subordinadas || !this.filter.controls.meus_planos || !this.filter.controls.lotados_minha_unidade) {
			console.warn("Formulário ou controles não inicializados corretamente.");
			return;
		}

		if (this.filter.controls.lotados_minha_unidade.value) {
			this.filter.controls.meus_planos.setValue(false);
			this.filter!.controls.subordinadas.setValue(false);
		} else {
			this.filter.controls.meus_planos.setValue(true);
		}

		//this.grid!.reloadFilter();
	}
}
