import {Component, Injector, ViewChild} from "@angular/core";
import {AbstractControl, FormGroup} from "@angular/forms";
import {GridComponent} from "src/app/components/grid/grid.component";
import {ToolbarButton} from "src/app/components/toolbar/toolbar.component";
import {CadeiaValorDaoService} from "src/app/dao/cadeia-valor-dao.service";
import {PlanejamentoDaoService} from "src/app/dao/planejamento-dao.service";
import {PlanoEntregaDaoService} from "src/app/dao/plano-entrega-dao.service";
import {UnidadeDaoService} from "src/app/dao/unidade-dao.service";
import {PlanoEntrega} from "src/app/models/plano-entrega.model";
import {Unidade} from "src/app/models/unidade.model";
import {PageListBase} from "src/app/modules/base/page-list-base";
import {PlanoEntregaService} from "../plano-entrega.service";
import {FullRoute} from "src/app/services/navigate.service";
import {Base} from "src/app/models/base.model";
import {Avaliacao} from "src/app/models/avaliacao.model";
import {AvaliacaoDaoService} from "src/app/dao/avaliacao-dao.service";
import {TipoAvaliacao} from "src/app/models/tipo-avaliacao.model";
import {LookupItem} from "src/app/services/lookup.service";
import {UnidadeService} from "src/app/services/unidade.service";
import {ProgramaService} from "src/app/services/programa.service";

@Component({
	selector: "plano-entrega-list",
	templateUrl: "./plano-entrega-list.component.html",
	styleUrls: ["./plano-entrega-list.component.scss"],
})
export class PlanoEntregaListComponent extends PageListBase<
	PlanoEntrega,
	PlanoEntregaDaoService
> {
	@ViewChild(GridComponent, {static: false}) public grid?: GridComponent;

	public showFilter: boolean = true;
	public avaliacao: boolean = false;
	public execucao: boolean = false;
	public linha?: PlanoEntrega;
	public unidadeDao: UnidadeDaoService;
	public avaliacaoDao: AvaliacaoDaoService;
	public planejamentoDao: PlanejamentoDaoService;
	public cadeiaValorDao: CadeiaValorDaoService;
	public planoEntregaService: PlanoEntregaService;
	public unidadeService: UnidadeService;
	public programaService: ProgramaService;
	public unidadeSelecionada: Unidade;
	public habilitarAdesaoToolbar: boolean = false;
	public toolbarButtons: ToolbarButton[] = [];
	public botoes: ToolbarButton[] = [];
	public routeStatus: FullRoute = {route: ["uteis", "status"]};
	public BOTAO_ADERIR_TOOLBAR: ToolbarButton;
	public BOTAO_ADERIR_OPTION: ToolbarButton;
	public BOTAO_ALTERAR: ToolbarButton;
	public BOTAO_ARQUIVAR: ToolbarButton;
	public BOTAO_AVALIAR: ToolbarButton;
	public BOTAO_CANCELAR_PLANO: ToolbarButton;
	public BOTAO_CANCELAR_AVALIACAO: ToolbarButton;
	public BOTAO_CANCELAR_CONCLUSAO: ToolbarButton;
	public BOTAO_CANCELAR_HOMOLOGACAO: ToolbarButton;
	public BOTAO_CLONAR: ToolbarButton;
	public BOTAO_CONCLUIR: ToolbarButton;
	public BOTAO_CONSULTAR: ToolbarButton;
	public BOTAO_DESARQUIVAR: ToolbarButton;
	public BOTAO_EXCLUIR: ToolbarButton;
	public BOTAO_HOMOLOGAR: ToolbarButton;
	public BOTAO_LIBERAR_HOMOLOGACAO: ToolbarButton;
	public BOTAO_LOGS: ToolbarButton;
	public BOTAO_REATIVAR: ToolbarButton;
	public BOTAO_RETIRAR_HOMOLOGACAO: ToolbarButton;
	public BOTAO_SUSPENDER: ToolbarButton;
	public DATAS_FILTRO: LookupItem[] = [
		{key: "VIGENTE", value: "Vigente"},
		{key: "NAOVIGENTE", value: "Não vigente"},
		{key: "INICIAM", value: "Iniciam"},
		{key: "FINALIZAM", value: "Finalizam"},
	];

	constructor(public injector: Injector) {
		super(injector, PlanoEntrega, PlanoEntregaDaoService);
		this.avaliacaoDao = injector.get<AvaliacaoDaoService>(AvaliacaoDaoService);
		this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
		this.planejamentoDao = injector.get<PlanejamentoDaoService>(
			PlanejamentoDaoService
		);
		this.cadeiaValorDao = injector.get<CadeiaValorDaoService>(
			CadeiaValorDaoService
		);
		this.planoEntregaService =
			injector.get<PlanoEntregaService>(PlanoEntregaService);
		this.unidadeService = injector.get<UnidadeService>(UnidadeService);
		this.programaService = injector.get<ProgramaService>(ProgramaService);
		this.unidadeSelecionada = this.auth.unidade!;
		this.code = "MOD_PLANE";
		/* Inicializações */
		this.title = this.lex.translate("Planos de Entregas");
		this.filter = this.fh.FormBuilder(
			{
				agrupar: {default: true},
				subordinadas: {default: false},
				principais: {default: false},
				arquivadas: {default: false},
				nome: {default: ""},
				data_filtro: {default: null},
				data_filtro_inicio: {default: new Date()},
				data_filtro_fim: {default: new Date()},
				status: {default: ""},
				unidade_id: {default: null},
				unidades_filhas: {default: false},
				planejamento_id: {default: null},
				cadeia_valor_id: {default: null},
				meus_planos: {default: true},
			},
			this.cdRef,
			this.filterValidate
		);
		this.join = [
			"planejamento:id,nome",
			"programa:id,nome",
			"cadeia_valor:id,nome",
			"unidade:id,sigla,path",
			"entregas.entrega",
			"entregas.objetivos.objetivo",
			"entregas.processos.processo",
			"entregas.unidade",
			"entregas.comentarios.usuario:id,nome,apelido",
			"entregas.reacoes.usuario:id,nome,apelido",
			"entregas.produtos.produto",
			"unidade.gestor:id",
			"unidade.gestores_substitutos:id",
			"unidade.unidade_pai",
			"avaliacao",
		];
		this.groupBy = [{field: "unidade.sigla", label: "Unidade"}];
		this.BOTAO_ADERIR_OPTION = {
			label: "Aderir",
			icon: this.entityService.getIcon("Adesao"),
			onClick: (() => {
				this.go.navigate(
					{route: ["gestao", "plano-entrega", "adesao"]},
					{
						metadata: {planoEntrega: this.linha},
						modalClose: (modalResult) => {
							this.refresh();
						},
					}
				);
			}).bind(this),
		};
		this.BOTAO_ADERIR_TOOLBAR = {
			label: "Aderir",
			disabled: !this.habilitarAdesaoToolbar,
			icon: this.entityService.getIcon("Adesao"),
			onClick: (() => {
				this.go.navigate(
					{route: ["gestao", "plano-entrega", "adesao"]},
					{
						modalClose: (modalResult) => {
							this.refresh();
						},
					}
				);
			}).bind(this),
		};
		this.BOTAO_ALTERAR = {
			label: "Alterar",
			icon: "bi bi-pencil-square",
			color: "btn-outline-info",
			onClick: (planoEntrega: PlanoEntrega) =>
				this.go.navigate(
					{route: ["gestao", "plano-entrega", planoEntrega.id, "edit"]},
					this.modalRefreshId(planoEntrega)
				),
		};
		this.BOTAO_CLONAR = {
			label: "Clonar",
			icon: "bi bi-copy",
			color: "btn-outline-primary",
			onClick: (planoEntrega: PlanoEntrega) => {
				this.dialog
					.alert(
						"Atenção!",
						"Não serão clonadas as metas e as entregas cujos vínculos com objetivos estratégicos, processos de cadeia de valor ou entregas de unidade superior não sejam mais possíveis."
					)
					.then(() => {
						this.go.navigate(
							{route: ["gestao", "plano-entrega", planoEntrega.id, "clone"]},
							this.modalRefreshId(planoEntrega)
						);
					});
			},
		};

		this.BOTAO_ARQUIVAR = {
			label: "Arquivar",
			icon: "bi bi-inboxes",
			onClick: this.arquivar.bind(this),
		};
		this.BOTAO_AVALIAR = {
			label: "Avaliar",
			icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "AVALIADO"),
			color: this.lookup.getColor(this.lookup.PLANO_ENTREGA_STATUS, "AVALIADO"),
			onClick: this.avaliar.bind(this),
		};
		this.BOTAO_CANCELAR_PLANO = {
			label: "Cancelar plano",
			icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "CANCELADO"),
			color: this.lookup.getColor(
				this.lookup.PLANO_ENTREGA_STATUS,
				"CANCELADO"
			),
			onClick: this.cancelarPlano.bind(this),
		};
		this.BOTAO_CANCELAR_AVALIACAO = {
			label: "Cancelar avaliação",
			icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "CONCLUIDO"),
			color: this.lookup.getColor(
				this.lookup.PLANO_ENTREGA_STATUS,
				"CANCELADO"
			),
			onClick: this.cancelarAvaliacao.bind(this),
		};
		this.BOTAO_CANCELAR_CONCLUSAO = {
			label: "Cancelar conclusão",
			icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "ATIVO"),
			color: this.lookup.getColor(this.lookup.PLANO_ENTREGA_STATUS, "ATIVO"),
			onClick: this.cancelarConclusao.bind(this),
		};
		this.BOTAO_CANCELAR_HOMOLOGACAO = {
			label: "Cancelar homologação",
			icon: this.lookup.getIcon(
				this.lookup.PLANO_ENTREGA_STATUS,
				"HOMOLOGANDO"
			),
			color: this.lookup.getColor(
				this.lookup.PLANO_ENTREGA_STATUS,
				"HOMOLOGANDO"
			),
			onClick: this.cancelarHomologacao.bind(this),
		};
		this.BOTAO_CONCLUIR = {
			label: "Concluir",
			id: "CONCLUIDO",
			icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "CONCLUIDO"),
			color: this.lookup.getColor(
				this.lookup.PLANO_ENTREGA_STATUS,
				"CONCLUIDO"
			),
			onClick: this.concluir.bind(this),
		};
		this.BOTAO_CONSULTAR = {
			label: "Informações",
			icon: "bi bi-info-circle",
			onClick: (planoEntrega: PlanoEntrega) =>
				this.go.navigate(
					{route: ["gestao", "plano-entrega", planoEntrega.id, "consult"]},
					{modal: true}
				),
		};
		this.BOTAO_DESARQUIVAR = {
			label: "Desarquivar",
			icon: "bi bi-reply",
			onClick: this.desarquivar.bind(this),
		};
		this.BOTAO_EXCLUIR = {
			label: "Excluir",
			icon: "bi bi-trash",
			onClick: this.delete.bind(this),
		};
		this.BOTAO_HOMOLOGAR = {
			label: "Homologar",
			icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "ATIVO"),
			color: this.lookup.getColor(this.lookup.PLANO_ENTREGA_STATUS, "ATIVO"),
			onClick: this.homologar.bind(this),
		};
		this.BOTAO_LIBERAR_HOMOLOGACAO = {
			label: "Liberar para homologação",
			icon: this.lookup.getIcon(
				this.lookup.PLANO_ENTREGA_STATUS,
				"HOMOLOGANDO"
			),
			color: this.lookup.getColor(
				this.lookup.PLANO_ENTREGA_STATUS,
				"HOMOLOGANDO"
			),
			onClick: this.liberarHomologacao.bind(this),
		};
		this.BOTAO_LOGS = {
			label: "Logs",
			icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "INCLUIDO"),
			color: this.lookup.getColor(this.lookup.PLANO_ENTREGA_STATUS, "INCLUIDO"),
			onClick: (planoEntrega: PlanoEntrega) =>
				this.go.navigate({
					route: ["logs", "change", planoEntrega.id, "consult"],
				}),
		};
		this.BOTAO_REATIVAR = {
			label: "Reativar",
			icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "ATIVO"),
			color: this.lookup.getColor(this.lookup.PLANO_ENTREGA_STATUS, "ATIVO"),
			onClick: this.reativar.bind(this),
		};
		this.BOTAO_RETIRAR_HOMOLOGACAO = {
			label: "Retirar de homologação",
			icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "INCLUIDO"),
			color: this.lookup.getColor(this.lookup.PLANO_ENTREGA_STATUS, "INCLUIDO"),
			onClick: this.retirarHomologacao.bind(this),
		};
		this.BOTAO_SUSPENDER = {
			label: "Suspender",
			id: "PAUSADO",
			icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "SUSPENSO"),
			color: this.lookup.getColor(this.lookup.PLANO_ENTREGA_STATUS, "SUSPENSO"),
			onClick: this.suspender.bind(this),
		};
		this.botoes = [
			this.BOTAO_ALTERAR,
			this.BOTAO_ARQUIVAR,
			this.BOTAO_AVALIAR,
			this.BOTAO_CANCELAR_PLANO,
			this.BOTAO_CANCELAR_AVALIACAO,
			this.BOTAO_CANCELAR_CONCLUSAO,
			this.BOTAO_CANCELAR_HOMOLOGACAO,
			this.BOTAO_CONCLUIR,
			this.BOTAO_CONSULTAR,
			this.BOTAO_DESARQUIVAR,
			this.BOTAO_EXCLUIR,
			this.BOTAO_HOMOLOGAR,
			this.BOTAO_LIBERAR_HOMOLOGACAO,
			this.BOTAO_LOGS,
			this.BOTAO_REATIVAR,
			this.BOTAO_RETIRAR_HOMOLOGACAO,
			this.BOTAO_SUSPENDER,
			this.BOTAO_CLONAR,
		];
		//this.BOTAO_ADERIR_OPTION, this.BOTAO_ADERIR_TOOLBAR,
	}

	public storeFilter = (filter?: FormGroup) => {
		const form = filter?.value;
		return {
			meus_planos: form.meus_planos,
			arquivadas: form.arquivadas,
			subordinadas: form.subordinadas,
		};
	};

	ngOnInit() {
		super.ngOnInit();
		this.execucao = !!this.queryParams?.execucao;
		this.avaliacao = !!this.queryParams?.avaliacao;
		this.showFilter =
			typeof this.queryParams?.showFilter != "undefined"
				? this.queryParams.showFilter == "true"
				: true;
		this.selectable = this.metadata?.selectable || this.selectable;

		if (this.metadata?.minha_unidade) {
			this.filter?.controls.unidade_id.setValue(this.auth.unidade?.id);
		}
		this.route.queryParams.subscribe((p) => {
			this.filter?.controls.unidade_id.setValue(this.auth.unidade?.id);
			if (p["context"] == "EXECUCAO" && this.filter) {
				this.filter?.controls.usuario.setValue(this.auth.usuario?.nome);
			}
		});
		if (this.execucao) {
			this.title = this.title + " (Execução)";
			this.filter!.controls.unidade_id.setValue(
				this.auth.unidadeGestor()?.id || null
			);
			this.filter!.controls.principais.setValue(false);
		}
		if (this.avaliacao) {
			this.title = this.title + " (Avaliação)";
			this.filter!.controls.unidade_id.setValue(
				this.auth.unidadeGestor()?.id || null
			);
			this.filter!.controls.unidades_filhas.setValue(true);
			this.filter!.controls.principais.setValue(false);
		}
		this.checaBotaoAderirToolbar();
		//this.toolbarButtons.push(this.BOTAO_ADERIR_TOOLBAR);  // Adesão de plano suspensa, por enquanto
	}

	ngAfterContentChecked(): void {
		if (this.auth.unidade != this.unidadeSelecionada) {
			this.unidadeSelecionada = this.auth.unidade!;
			this.checaBotaoAderirToolbar();
			this.cdRef.detectChanges();
		}
	}

	public onGridLoad(rows?: Base[]) {
		const extra = (this.grid?.query || this.query!).extra;

		rows?.forEach((v) => {
			let planoEntrega = v as PlanoEntrega;
			if (planoEntrega.avaliacao) {
				planoEntrega.avaliacao.tipo_avaliacao = extra?.tipos_avaliacoes?.find(
					(x: TipoAvaliacao) =>
						x.id == planoEntrega.avaliacao!.tipo_avaliacao_id
				);
			}
		});
	}

	public checaBotaoAderirToolbar() {
		/* let planos_ativos_unidade_pai = this.planosEntregasAtivosUnidadePai().length ? this.planosEntregasAtivosUnidadePai().map(x => x.id) : [];
    let planos_superiores_vinculados_pela_unidade_selecionada = this.planosEntregasAtivosUnidadeSelecionada().map(x => x.plano_entrega_id).filter(x => x != null);
    let condition1 = this.unidadeService.isGestorUnidade() || this.unidadeService.isGestorUnidade(this.auth.unidade?.unidade_pai_id) || (this.auth.isLotacaoUsuario(this.auth.unidade) && this.auth.hasPermissionTo("MOD_PENT_ADR"));
    let condition2 = !!planos_ativos_unidade_pai.filter(x => !planos_superiores_vinculados_pela_unidade_selecionada.includes(x)).length;
    this.habilitarAdesaoToolbar = condition1 && condition2;
    this.BOTAO_ADERIR_TOOLBAR.disabled = !this.habilitarAdesaoToolbar; */
		/*  (RI_PENT_1)
        O botão Aderir, na toolbar, deverá ser exibido sempre, mas para ficar habilitado:
        1. o usuário logado precisa ser gestor da unidade selecionada ou da sua unidade-pai, ou uma destas ser sua unidade de lotação principal e ele 
        possuir a capacidade "MOD_PENT_ADR" (RN_PENT_2_4); e
        2. a unidade-pai da unidade selecionada precisa possuir plano de entrega com o status ATIVO, que já não tenha sido vinculado pela unidade selecionada;
    */
	}

	public planosEntregasAtivosUnidadePai(): PlanoEntrega[] {
		return (
			this.auth.unidade?.unidade_pai?.planos_entrega?.filter((x) =>
				this.planoEntregaService.isAtivo(x)
			) || []
		);
	}

	public planosEntregasAtivosUnidadeSelecionada(): PlanoEntrega[] {
		return (
			this.auth?.unidade?.planos_entrega?.filter((x) =>
				this.planoEntregaService.isAtivo(x)
			) || []
		);
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
		if (!filter) {
			console.error("O objeto filter está indefinido.");
			return;
		}

		if (!filter.controls) {
			console.error("Os controls do formulário não estão disponíveis.");
			return;
		}

		// Definir valores nos filtros
		filter.controls.nome.setValue("");
		filter.controls.data_filtro.setValue(null);
		filter.controls.data_filtro_inicio.setValue(new Date());
		filter.controls.data_filtro_fim.setValue(new Date());
		filter.controls.unidade_id.setValue(null);
		filter.controls.planejamento_id.setValue(null);
		filter.controls.cadeia_valor_id.setValue(null);
		filter.controls.status.setValue(null);
		filter.controls.meus_planos.setValue(true);

		// 🔹 Verifique se o nome do campo está correto (subordinadas)
		if (filter.controls.subordinadas) {
			filter.controls.subordinadas.setValue(false);
		} else {
			console.warn("O controle 'subordinadas' não existe no formulário.");
		}

		super.filterClear(filter);
	}

	public filterWhere = (filter: FormGroup) => {
		let result: any[] = [];
		let form: any = filter.value;

		/*
    (RI_PENT_B) A consulta do grid retornará inicialmente os principais Planos de Entrega do usuário logado (a opção "principais" já vem marcada), que são:
    - os válidos das unidades onde ele possui algum vínculo (áreas de trabalho) (w1), e
    - se ele for gestor:
      - os ativos das unidades-pai de onde ele é gestor (w2), e 
      - os ativos das unidades imediatamente subordinadas (w3);
    */
		if (this.filter?.controls.principais.value) {
			let w1: [string, string, string[]] = [
				"unidade_id",
				"in",
				(this.auth.unidades || []).map((u) => u.id),
			];
			if (this.auth.isGestorAlgumaAreaTrabalho()) {
				let unidadesUsuarioEhGestor = this.auth.unidades?.filter((x) =>
					this.unidadeService.isGestorUnidade(x)
				);
				let w2: string[] | undefined = unidadesUsuarioEhGestor
					?.map((u) => u.unidade_pai?.id || "")
					.filter((x) => x.length);
				if (w2?.length) w1[2].push(...w2);
				let w3 = [
					"unidade.unidade_pai_id",
					"in",
					unidadesUsuarioEhGestor?.map((u) => u.id),
				];
				result.push(["or", w1, w3]);
			} else {
				result.push(w1);
			}
		}
		if (this.filter?.controls.meus_planos.value) {
			let w1: [string, string, string[]] = [
				"unidade_id",
				"in",
				(this.auth.unidades || []).map((u) => u.id),
			];
			result.push(w1);
		}
		if (form.nome?.length)
			result.push([
				"nome",
				"like",
				"%" + form.nome.trim().replace(" ", "%") + "%",
			]);
		if (form.data_filtro) {
			result.push(["data_filtro", "==", form.data_filtro]);
			result.push(["data_filtro_inicio", "==", form.data_filtro_inicio]);
			result.push(["data_filtro_fim", "==", form.data_filtro_fim]);
		}
		if (form.unidade_id) result.push(["unidade_id", "==", form.unidade_id]);
		if (!form.unidade_id) {
			result.push(["unidades_vinculadas", "==", this.auth.unidade?.id]);
		}
		if (form.planejamento_id)
			result.push(["planejamento_id", "==", form.planejamento_id]);
		if (form.cadeia_valor_id)
			result.push(["cadeia_valor_id", "==", form.cadeia_valor_id]);
		if (this.isModal) {
			result.push(["status", "==", "ATIVO"]);
		} else if (form.status || this.avaliacao) {
			result.push([
				"status",
				"in",
				form.status ? [form.status] : ["CONCLUIDO", "AVALIADO"],
			]);
		}

		//  (RI_PENT_C) Por padrão, os planos de entregas retornados na listagem do grid são os que não foram arquivados.
		result.push([
			"incluir_arquivados",
			"==",
			this.filter!.controls.arquivadas.value,
		]);
		result.push([
			"incluir_subordinadas",
			"==",
			this.filter!.controls.subordinadas.value,
		]);
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
			this.cdRef.detectChanges();
			this.grid!.reloadFilter();
		}
	}

	public onPrincipaisChange(event: Event) {
		if (this.filter!.controls.principais.value) {
			this.filter!.controls.unidade_id.setValue(null);
			this.filter!.controls.meus_planos.setValue(false);
		} else {
			if (this.filter!.controls.subordinadas) {
				this.filter!.controls.meus_planos.setValue(false);
			} else {
				this.filter!.controls.meus_planos.setValue(true);
			}
		}
		this.grid!.reloadFilter();
	}

	public dynamicButtons(row: PlanoEntrega): ToolbarButton[] {
		let result: ToolbarButton[] = [];
		let planoEntrega: PlanoEntrega = row as PlanoEntrega;
		switch (this.planoEntregaService.situacaoPlano(planoEntrega)) {
			case "INCLUIDO":
				if (this.botaoAtendeCondicoes(this.BOTAO_LIBERAR_HOMOLOGACAO, row))
					result.push(this.BOTAO_LIBERAR_HOMOLOGACAO);
				else result.push(this.BOTAO_CONSULTAR);
				break;
			case "HOMOLOGANDO":
				if (this.botaoAtendeCondicoes(this.BOTAO_HOMOLOGAR, row))
					result.push(this.BOTAO_HOMOLOGAR);
				break;
			case "ATIVO":
				if (this.botaoAtendeCondicoes(this.BOTAO_CONCLUIR, row))
					result.push(this.BOTAO_CONCLUIR);
				break;
			case "CONCLUIDO":
				if (this.botaoAtendeCondicoes(this.BOTAO_AVALIAR, row))
					result.push(this.BOTAO_AVALIAR);
				break;
			case "SUSPENSO":
				if (this.botaoAtendeCondicoes(this.BOTAO_REATIVAR, row))
					result.push(this.BOTAO_REATIVAR);
				break;
			case "AVALIADO":
				if (this.botaoAtendeCondicoes(this.BOTAO_ARQUIVAR, row))
					result.push(this.BOTAO_ARQUIVAR);
				break;
			case "ARQUIVADO":
				if (this.botaoAtendeCondicoes(this.BOTAO_DESARQUIVAR, row))
					result.push(this.BOTAO_DESARQUIVAR);
				break;
			case "CLONAR":
				if (this.botaoAtendeCondicoes(this.BOTAO_CLONAR, row))
					result.push(this.BOTAO_CLONAR);
				break;
			case "CANCELADO":
				break;
		}
		if (!result.length) result.push(this.BOTAO_CONSULTAR);
		return result;
	}

	public dynamicOptions(row: PlanoEntrega): ToolbarButton[] {
		let result: ToolbarButton[] = [];
		this.linha = row;
		this.botoes.forEach((botao) => {
			if (this.botaoAtendeCondicoes(botao, row)) result.push(botao);
		});
		return result;
	}

	public botaoAtendeCondicoes(
		botao: ToolbarButton,
		planoEntrega: PlanoEntrega
	): boolean {
		switch (botao) {
			case this.BOTAO_ADERIR_OPTION:
				/*         
          (RI_PENT_2) O botão Aderir, nas linhas do grid, deverá aparecer num plano somente se:
          - o plano estiver com o status Ativo; e
          - a unidade do plano for a unidade-pai da unidade selecionada pelo usuário; e
          - se o usuário for Gestor da unidade selecionada, ou ela for sua lotação principal e ele possuir a capacidade "MOD_PENT_ADR" ; e
          - se a unidade selecionada não possuir plano de entrega Ativo no mesmo período do plano em questão;
        */
				return (
					!this.execucao &&
					this.planoEntregaService.situacaoPlano(planoEntrega) == "ATIVO" &&
					planoEntrega.unidade_id == this.auth.unidade?.unidade_pai_id &&
					(this.unidadeService.isGestorUnidade() ||
						(this.auth.isLotacaoUsuario(this.auth.unidade) &&
							this.auth.hasPermissionTo("MOD_PENT_ADR"))) &&
					this.planosEntregasAtivosUnidadeSelecionada().filter((x) =>
						this.util.intersection([
							{start: x.data_inicio, end: x.data_fim!},
							{start: planoEntrega.data_inicio, end: planoEntrega.data_fim!},
						])
					).length == 0
				);
			case this.BOTAO_ALTERAR:
				/*
          (RN_PENT_L) Para ALTERAR um plano de entregas:
          - o Plano de Entregas precisa estar com o status INCLUIDO, HOMOLOGANDO ou ATIVO, e
          - o usuário logado precisa possuir a capacidade "MOD_PENT_EDT", o plano de entregas precisa ser válido (ou seja, nem deletado, nem arquivado e com status diferente de 'CANCELADO'), e:
                - o plano precisa estar com o status INCLUIDO ou HOMOLOGANDO, e o usuário logado precisa ser gestor da Unidade do plano, ou esta ser sua Unidade de lotação; ou
                - o usuário logado precisa ser gestor da Unidade-pai (Unidade A) da Unidade do plano (Unidade B) e possuir a capacidade "MOD_PENT_EDT_FLH"; (RN_PENT_C) ou
                - o usuário logado precisa possuir a atribuição de HOMOLOGADOR DE PLANO DE ENTREGA para a Unidade-pai (Unidade A) da Unidade do plano (Unidade B); ou
                - o plano de entregas precisa estar com o status ATIVO, a Unidade do plano precisa ser a Unidade de lotação do usuário logado, e ele possuir a capacidade "MOD_PENT_EDT_ATV_HOMOL" ou "MOD_PENT_EDT_ATV_ATV".
                - o usuário precisa possuir também a capacidade "MOD_PENT_QQR_UND";
          (RN_PENT_AE) Se a alteração for feita com o plano de entregas no status ATIVO e o usuário logado possuir a capacidade "MOD_PENT_EDT_ATV_HOMOL", o plano de entregas voltará ao status "HOMOLOGANDO";
          (RN_PENT_AF) Se a alteração for feita com o plano de entregas no status ATIVO e o usuário logado possuir a capacidade "MOD_PENT_EDT_ATV_ATV", o plano de entregas permanecerá no status "ATIVO";
        */
				let condicao0 = ["INCLUIDO", "HOMOLOGANDO", "ATIVO"].includes(
					this.planoEntregaService.situacaoPlano(planoEntrega)
				);
				let condicao1 =
					["INCLUIDO", "HOMOLOGANDO"].includes(
						this.planoEntregaService.situacaoPlano(planoEntrega)
					) &&
					(this.unidadeService.isGestorUnidade(planoEntrega.unidade) ||
						this.auth.isLotacaoUsuario(planoEntrega.unidade));
				let condicao2 =
					(planoEntrega.unidade?.instituidora == 1
						? this.unidadeService.isGestorUnidade(planoEntrega.unidade?.id)
						: this.unidadeService.isGestorUnidade(
								planoEntrega.unidade?.unidade_pai_id
						  )) && this.auth.hasPermissionTo("MOD_PENT_EDT_FLH");
				let condicao3 = this.auth.isIntegrante(
					"HOMOLOGADOR_PLANO_ENTREGA",
					planoEntrega.unidade!.unidade_pai_id!
				);
				let condicao4 =
					this.planoEntregaService.situacaoPlano(planoEntrega) == "ATIVO" &&
					this.auth.isLotacaoUsuario(planoEntrega.unidade) &&
					this.auth.hasPermissionTo([
						"MOD_PENT_EDT_ATV_HOMOL",
						"MOD_PENT_EDT_ATV_ATV",
					]);
				let condicao5 = this.auth.hasPermissionTo("MOD_PENT_QQR_UND");
				return (
					!this.execucao &&
					this.auth.hasPermissionTo("MOD_PENT_EDT") &&
					condicao0 &&
					this.planoEntregaService.isValido(planoEntrega) &&
					(condicao1 || condicao2 || condicao3 || condicao4 || condicao5)
				);
			case this.BOTAO_ARQUIVAR:
				/*
          (RN_PENT_N) Para ARQUIVAR um plano de entregas:
          - o plano precisa estar com o status CONCLUIDO ou AVALIADO, não ter sido arquivado, e:
            - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
            - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado e ele possuir a capacidade "MOD_PENT_ARQ";
        */
				return (
					["CONCLUIDO", "AVALIADO"].includes(
						this.planoEntregaService.situacaoPlano(planoEntrega)
					) &&
					(this.unidadeService.isGestorUnidade(planoEntrega.unidade) ||
						(this.auth.isLotacaoUsuario(planoEntrega.unidade) &&
							this.auth.hasPermissionTo("MOD_PENT_ARQ")))
				);
			case this.BOTAO_AVALIAR:
				/*
          (RN_PENT_O) Para AVALIAR um plano de entregas:
          - o plano precisa estar com o status CONCLUIDO, e:
              - o usuário logado precisa ser gestor da Unidade-pai (Unidade A) da Unidade do plano (Unidade B), ou
              - o usuário logado precisa possuir a atribuição de AVALIADOR DE PLANOS DE ENTREGAS para a Unidade do plano (Unidade B); ou
              - a Unidade-pai (Unidade A) precisa ser a Unidade de lotação do usuário logado, e ele possuir a capacidade "MOD_PENT_AVAL"; ou
              - o usuário logado precisa ser gestor de alguma Unidade da linha hierárquica ascendente da Unidade do plano (Unidade A e superiores), e possuir a capacidade "MOD_PENT_AVAL_SUBORD";
              - sugerir arquivamento automático (vide RI_PENT_A); 
        */
				let condic1 =
					planoEntrega.unidade?.instituidora == 1
						? this.unidadeService.isGestorUnidade(planoEntrega.unidade?.id)
						: this.unidadeService.isGestorUnidade(
								planoEntrega.unidade?.unidade_pai_id
						  );
				let condic3 =
					this.auth.isLotacaoUsuario(planoEntrega.unidade?.unidade_pai) &&
					this.auth.hasPermissionTo("MOD_PENT_AVAL");
				let condic4 =
					this.auth.isGestorLinhaAscendente(planoEntrega.unidade!) &&
					this.auth.hasPermissionTo("MOD_PENT_AVAL_SUBORD");
				return (
					this.planoEntregaService.situacaoPlano(planoEntrega) == "CONCLUIDO" &&
					(condic1 || condic3 || condic4)
				);
			case this.BOTAO_CANCELAR_AVALIACAO:
				/*
          (RN_PENT_R) Para CANCELAR a AVALIAÇÃO de um plano de entregas:
          - o plano precisa estar com o status AVALIADO, e
          - o usuário logado precisa ser gestor da Unidade-pai (Unidade A) da Unidade do plano (Unidade B), ou
          - a Unidade-pai (Unidade A) precisa ser a Unidade de lotação do usuário logado, e ele possuir a capacidade "MOD_PENT_CANC_AVAL"; ou
          - possuir a atribuição de AVALIADOR DE PLANOS DE ENTREGAS para a Unidade do plano (Unidade B);
        */
				return (
					this.planoEntregaService.situacaoPlano(planoEntrega) == "AVALIADO" &&
					(planoEntrega.unidade?.instituidora == 1
						? this.unidadeService.isGestorUnidade(planoEntrega.unidade?.id)
						: this.unidadeService.isGestorUnidade(
								planoEntrega.unidade?.unidade_pai_id
						  ) ||
						  this.auth.isIntegrante(
								"AVALIADOR_PLANO_ENTREGA",
								planoEntrega.unidade!.id!
						  ))
				);
			case this.BOTAO_CANCELAR_CONCLUSAO:
				/*
          (RN_PENT_S) Para CANCELAR a CONCLUSÃO de um plano de entregas:
          - o plano precisa estar com o status CONCLUIDO e o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
          - a Unidade do plano (Unidade B) precisa ser sua Unidade de lotação e o usuário logado precisa possuir a capacidade "**MOD_PENT_CANC_CONCL";        */
				return (
					this.planoEntregaService.situacaoPlano(planoEntrega) == "CONCLUIDO" &&
					this.programaService.programaVigente(planoEntrega.programa) &&
					(this.unidadeService.isGestorUnidade(planoEntrega.unidade) ||
						(this.auth.isLotacaoUsuario(planoEntrega.unidade) &&
							this.auth.hasPermissionTo("MOD_PENT_CANC_CONCL")))
				);
			case this.BOTAO_CANCELAR_HOMOLOGACAO:
				/*
          (RN_PENT_T) Para CANCELAR a HOMOLOGAÇÃO de um plano de entregas:
          - o plano precisa estar com o status ATIVO, e
            - o usuário logado precisa ser gestor da Unidade-pai (Unidade A) da Unidade do plano (Unidade B), ou
            - a Unidade-pai (Unidade A) precisa ser a Unidade de lotação do usuário logado, e ele possuir a capacidade "MOD_PENT_CANC_HOMOL"; ou
            - o usuário logado precisa possuir a atribuição de HOMOLOGADOR DE PLANOS DE ENTREGAS para a Unidade-pai (Unidade A) da Unidade do plano (Unidade B);
        */
				return (
					!this.execucao &&
					this.planoEntregaService.situacaoPlano(planoEntrega) == "ATIVO" &&
					(planoEntrega.unidade?.instituidora == 1
						? this.unidadeService.isGestorUnidade(planoEntrega.unidade?.id)
						: this.unidadeService.isGestorUnidade(
								planoEntrega.unidade?.unidade_pai_id
						  ) ||
						  (this.auth.isLotacaoUsuario(planoEntrega.unidade?.unidade_pai) &&
								this.auth.hasPermissionTo("MOD_PENT_CANC_HOMOL")) ||
						  this.auth.isIntegrante(
								"HOMOLOGADOR_PLANO_ENTREGA",
								planoEntrega.unidade!.unidade_pai_id!
						  ))
				);
			case this.BOTAO_CANCELAR_PLANO:
				/*
          (RN_PENT_P) Para CANCELAR UM PLANO DE ENTREGAS:
          - o usuário logado precisa possuir a capacidade "MOD_PENT_CNC", o plano precisa estar em um dos seguintes status: INCLUIDO, HOMOLOGANDO e ATIVO;
            - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
            - o usuário logado precisa ser gestor da Unidade-pai do plano (Unidade A);
          */
				return (
					this.auth.hasPermissionTo("MOD_PENT_CNC") &&
					["INCLUIDO", "HOMOLOGANDO", "ATIVO"].includes(
						this.planoEntregaService.situacaoPlano(planoEntrega)
					) &&
					(this.unidadeService.isGestorUnidade(planoEntrega.unidade?.id) ||
						this.unidadeService.isGestorUnidade(
							planoEntrega.unidade?.unidade_pai_id
						))
				);
			case this.BOTAO_CONCLUIR:
				/*
          (RN_PENT_U) Para CONCLUIR um plano de entregas:
          - o plano precisa estar com o status ATIVO, e
            - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
            - a Unidade do plano (Unidade B) precisa ser sua Unidade de lotação e o usuário logado precisa possuir a capacidade "MOD_PENT_CONC";
        */
				return (
					this.planoEntregaService.situacaoPlano(planoEntrega) == "ATIVO" &&
					(this.unidadeService.isGestorUnidade(planoEntrega.unidade) ||
						(this.auth.isLotacaoUsuario(planoEntrega.unidade) &&
							this.auth.hasPermissionTo("MOD_PENT_CONC")))
				);
			case this.BOTAO_CONSULTAR:
				/*
          (RN_PENT_V) CONSULTAR
          - todos os participantes podem visualizar todos os planos de entrega, desde que possuam a capacidade "MOD_PENT" (RN_PENT_F, RN_PENT_I);
        */
				return this.auth.hasPermissionTo("MOD_PENT");
			case this.BOTAO_DESARQUIVAR:
				/*
          (RN_PENT_W) Para DESARQUIVAR um plano de entregas:
          - o plano precisa estar arquivado, e:
              - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
              - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado e ele possuir a capacidade "MOD_PENT_ARQ";
        */
				return (
					this.planoEntregaService.situacaoPlano(planoEntrega) == "ARQUIVADO" &&
					(this.unidadeService.isGestorUnidade(planoEntrega.unidade) ||
						(this.auth.isLotacaoUsuario(planoEntrega.unidade) &&
							this.auth.hasPermissionTo("MOD_PENT_ARQ")))
				);
			case this.BOTAO_EXCLUIR:
				/*
          (RN_PENT_X) Para EXCLUIR um plano de entregas:
          - o usuário logado precisa possuir a capacidade "MOD_PENT_EXCL", o plano precisa estar com o status INCLUIDO ou HOMOLOGANDO; e
              - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
              - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado;
        */
				return (
					!this.execucao &&
					this.auth.hasPermissionTo("MOD_PENT_EXCL") &&
					["INCLUIDO", "HOMOLOGANDO"].includes(
						this.planoEntregaService.situacaoPlano(planoEntrega)
					) &&
					(this.unidadeService.isGestorUnidade(planoEntrega.unidade) ||
						this.auth.isLotacaoUsuario(planoEntrega.unidade))
				);
			case this.BOTAO_HOMOLOGAR:
				/*
          (RN_PENT_Y) Para HOMOLOGAR um plano de entregas:
          - o plano precisa estar com o status HOMOLOGANDO, e:
              - o usuário logado precisa ser gestor da Unidade-pai (Unidade A) da Unidade do plano (Unidade B); (RN_PENT_C), ou
              - a Unidade-pai (Unidade A) for a Unidade de lotação do usuário logado e ele possuir a capacidade "MOD_PENT_HOMOL", ou
              - o usuário logado precisa possuir a atribuição de HOMOLOGADOR DE PLANOS DE ENTREGAS para a Unidade-pai (Unidade A); (RN_PENT_E)
          - A homologação do plano de entregas não se aplica à Unidade instituidora.
        */
				let condition1 =
					this.planoEntregaService.situacaoPlano(planoEntrega) == "HOMOLOGANDO";
				let condition2 =
					planoEntrega.unidade?.instituidora == 1
						? this.unidadeService.isGestorUnidade(planoEntrega.unidade?.id)
						: this.unidadeService.isGestorUnidade(
								planoEntrega.unidade?.unidade_pai_id
						  );
				let condition3 =
					this.auth.isLotacaoUsuario(planoEntrega.unidade!.unidade_pai) &&
					this.auth.hasPermissionTo("MOD_PENT_HOMOL");
				let condition4 = this.auth.isIntegrante(
					"HOMOLOGADOR_PLANO_ENTREGA",
					planoEntrega.unidade!.unidade_pai_id!
				);
				return (
					!this.execucao &&
					condition1 &&
					(condition2 || condition3 || condition4)
				);
			case this.BOTAO_LIBERAR_HOMOLOGACAO:
				/*
          (RN_PENT_AA) Para LIBERAR PARA HOMOLOGAÇÃO um plano de entregas:
          - o plano precisa estar com o status INCLUIDO, conter ao menos uma entrega (RN_PENT_D), e
              - o usuário logado precisa ser gestor da Unidade do plano (Unidade B); ou
              - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado, e este possuir a capacidade "MOD_PENT_LIB_HOMOL"
        */
				return (
					!this.execucao &&
					this.planoEntregaService.situacaoPlano(planoEntrega) == "INCLUIDO" &&
					planoEntrega.entregas.length > 0 &&
					(this.unidadeService.isGestorUnidade(planoEntrega.unidade) ||
						(this.auth.isLotacaoUsuario(planoEntrega.unidade) &&
							this.auth.hasPermissionTo("MOD_PENT_LIB_HOMOL")))
				);
			case this.BOTAO_LOGS:
				/*
        
        */
				return (
					this.unidadeService.isGestorUnidade(planoEntrega.unidade) &&
					this.auth.hasPermissionTo("MOD_PENT_AVAL_SUBORD")
				);
			case this.BOTAO_REATIVAR:
				/*
          (RN_PENT_AC) Para REATIVAR um plano de entregas:
          - o plano precisa estar com o status SUSPENSO, e
              - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
              - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado, e ele possuir a capacidade "MOD_PENT_RTV"; ou
              - o usuário logado precisa ser gestor de alguma Unidade da linha hierárquica ascendente (Unidade A e superiores) da Unidade do plano (Unidade B);
        */
				return (
					this.planoEntregaService.situacaoPlano(planoEntrega) == "SUSPENSO" &&
					(this.unidadeService.isGestorUnidade(planoEntrega.unidade) ||
						(this.auth.isLotacaoUsuario(planoEntrega.unidade) &&
							this.auth.hasPermissionTo("MOD_PENT_RTV")) ||
						this.auth.isGestorLinhaAscendente(planoEntrega.unidade!))
				);
			case this.BOTAO_RETIRAR_HOMOLOGACAO:
				/*
          (RN_PENT_AB) Para RETIRAR DE HOMOLOGAÇÃO um plano de entregas:
          - o plano precisa estar com o status HOMOLOGANDO, e:
              - o usuário logado precisa ser gestor da Unidade do plano (Unidade B); ou
              - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado, e este possuir a capacidade "MOD_PENT_RET_HOMOL"
        */
				return (
					!this.execucao &&
					this.planoEntregaService.situacaoPlano(planoEntrega) ==
						"HOMOLOGANDO" &&
					(this.unidadeService.isGestorUnidade(planoEntrega.unidade) ||
						(this.auth.isLotacaoUsuario(planoEntrega.unidade) &&
							this.auth.hasPermissionTo("MOD_PENT_RET_HOMOL")))
				);
			case this.BOTAO_SUSPENDER:
				/*
          (RN_PENT_AD) Para SUSPENDER um plano de entregas:
          - o plano precisa estar com o status ATIVO, e:
              - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
              - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado, e ele possuir a capacidade "MOD_PENT_SUSP"; ou
              - o usuário logado precisa ser gestor de alguma Unidade da linha hierárquica ascendente (Unidade A e superiores) da Unidade do plano (Unidade B);
        */
				return (
					this.planoEntregaService.situacaoPlano(planoEntrega) == "ATIVO" &&
					(this.unidadeService.isGestorUnidade(planoEntrega.unidade) ||
						(this.auth.isLotacaoUsuario(planoEntrega.unidade) &&
							this.auth.hasPermissionTo("MOD_PENT_SUSP")) ||
						this.auth.isGestorLinhaAscendente(planoEntrega.unidade!))
				);
			case this.BOTAO_CLONAR:
				return (
					this.auth.hasPermissionTo("MOD_PENT_INCL") &&
					["CONCLUIDO", "AVALIADO"].includes(
						this.planoEntregaService.situacaoPlano(planoEntrega)
					)
				);
		}
		return false;
	}

	public arquivar(planoEntrega: PlanoEntrega) {
		this.go.navigate(this.routeStatus, {
			metadata: {
				tipo: "PlanoEntrega",
				entity: Object.assign({}, planoEntrega, {arquivar: true}),
				novoStatus: planoEntrega.status,
				onClick: this.dao!.arquivar.bind(this.dao),
			},
			title: "Arquivar Plano de Entregas",
			modalClose: (modalResult) => {
				if (modalResult) {
					(this.grid?.query || this.query!)
						.refreshId(planoEntrega.id)
						.then(() => {
							this.checaBotaoAderirToolbar();
						});
				}
			},
		});
	}

	public avaliar(planoEntrega: PlanoEntrega) {
		this.go.navigate(
			{route: ["gestao", "plano-entrega", planoEntrega.id, "avaliar"]},
			{
				modal: true,
				metadata: {planoEntrega: planoEntrega},
				modalClose: (modalResult?: Avaliacao) => {
					if (modalResult) {
						(this.grid?.query || this.query!)
							.refreshId(planoEntrega.id, ["avaliacao.tipo_avaliacao.notas"])
							.then(() => {
								this.checaBotaoAderirToolbar();
							});
						/*consolidacao.status = "AVALIADO";
          consolidacao.avaliacao_id = modalResult.id;
          consolidacao.avaliacao = modalResult;
          this.refreshConsolidacao(consolidacao);*/
					}
				},
			}
		);
	}

	public async cancelarAvaliacao(planoEntrega: PlanoEntrega) {
		/*this.go.navigate(this.routeStatus, {
      metadata: { tipo: "PlanoEntrega", entity: planoEntrega, novoStatus: "CONCLUIDO", onClick: this.dao!.cancelarAvaliacao.bind(this.dao) },
      title: "Cancelar Avaliação",
      modalClose: (modalResult) => {
        if (modalResult) {
          (this.grid?.query || this.query!).refreshId(planoEntrega.id).then(() => {
            this.checaBotaoAderirToolbar();
          });
        };
      }
    });*/
		this.submitting = true;
		try {
			let response = await this.avaliacaoDao!.cancelarAvaliacao(
				planoEntrega.avaliacao!.id
			);
			if (response) {
				(this.grid?.query || this.query!)
					.refreshId(planoEntrega.id)
					.then(() => {
						this.checaBotaoAderirToolbar();
					});
				/*consolidacao.status = "CONCLUIDO";
        consolidacao.avaliacao_id = null;
        consolidacao.avaliacao = undefined;
        this.refreshConsolidacao(consolidacao);*/
			}
		} catch (error: any) {
			this.error(error.message || error);
		} finally {
			this.submitting = false;
		}
	}

	public cancelarConclusao(planoEntrega: PlanoEntrega) {
		this.go.navigate(this.routeStatus, {
			metadata: {
				tipo: "PlanoEntrega",
				entity: planoEntrega,
				novoStatus: "ATIVO",
				onClick: this.dao!.cancelarConclusao.bind(this.dao),
			},
			title: "Cancelar Conclusão",
			modalClose: (modalResult) => {
				if (modalResult) {
					(this.grid?.query || this.query!)
						.refreshId(planoEntrega.id)
						.then(() => {
							this.checaBotaoAderirToolbar();
						});
				}
			},
		});
	}

	public cancelarHomologacao(planoEntrega: PlanoEntrega) {
		this.go.navigate(this.routeStatus, {
			metadata: {
				tipo: "PlanoEntrega",
				entity: planoEntrega,
				novoStatus: "HOMOLOGANDO",
				onClick: this.dao!.cancelarHomologacao.bind(this.dao),
			},
			title: "Cancelar Homologação",
			modalClose: (modalResult) => {
				if (modalResult) {
					(this.grid?.query || this.query!)
						.refreshId(planoEntrega.id)
						.then(() => {
							this.checaBotaoAderirToolbar();
						});
				}
			},
		});
	}

	public cancelarPlano(planoEntrega: PlanoEntrega) {
		this.go.navigate(this.routeStatus, {
			metadata: {
				tipo: "PlanoEntrega",
				entity: Object.assign({}, planoEntrega, {arquivar: true}),
				novoStatus: "CANCELADO",
				onClick: this.dao!.cancelarPlano.bind(this.dao),
			},
			title: "Cancelar Plano de Entregas",
			modalClose: (modalResult) => {
				if (modalResult) {
					(this.grid?.query || this.query!)
						.refreshId(planoEntrega.id)
						.then(() => {
							this.checaBotaoAderirToolbar();
						});
				}
			},
		});
	}

	public concluir(planoEntrega: PlanoEntrega) {
		this.go.navigate(this.routeStatus, {
			metadata: {
				tipo: "PlanoEntrega",
				entity: planoEntrega,
				novoStatus: "CONCLUIDO",
				onClick: this.dao!.concluir.bind(this.dao),
			},
			title: "Concluir Plano de Entregas",
			modalClose: (modalResult) => {
				if (modalResult) {
					(this.grid?.query || this.query!)
						.refreshId(planoEntrega.id)
						.then(() => {
							this.checaBotaoAderirToolbar();
						});
				}
			},
		});
	}

	public desarquivar(planoEntrega: PlanoEntrega) {
		this.go.navigate(this.routeStatus, {
			metadata: {
				tipo: "PlanoEntrega",
				entity: Object.assign({}, planoEntrega, {arquivar: false}),
				novoStatus: planoEntrega.status,
				onClick: this.dao!.arquivar.bind(this.dao),
			},
			title: "Desarquivar Plano de Entregas",
			modalClose: (modalResult) => {
				if (modalResult) {
					(this.grid?.query || this.query!)
						.refreshId(planoEntrega.id)
						.then(() => {
							this.checaBotaoAderirToolbar();
						});
				}
			},
		});
	}

	public homologar(planoEntrega: PlanoEntrega) {
		this.go.navigate(this.routeStatus, {
			metadata: {
				tipo: "PlanoEntrega",
				entity: planoEntrega,
				novoStatus: "ATIVO",
				onClick: this.dao!.homologar.bind(this.dao),
			},
			title: "Homologar Plano de Entregas",
			modalClose: (modalResult) => {
				if (modalResult) {
					(this.grid?.query || this.query!)
						.refreshId(planoEntrega.id)
						.then(() => {
							this.checaBotaoAderirToolbar();
						});
				}
			},
		});
	}

	public liberarHomologacao(planoEntrega: PlanoEntrega) {
		this.go.navigate(this.routeStatus, {
			metadata: {
				tipo: "PlanoEntrega",
				entity: planoEntrega,
				novoStatus: "HOMOLOGANDO",
				onClick: this.dao!.liberarHomologacao.bind(this.dao),
			},
			title: "Liberar para Homologação",
			modalClose: (modalResult) => {
				if (modalResult) {
					(this.grid?.query || this.query!)
						.refreshId(planoEntrega.id)
						.then(() => {
							this.checaBotaoAderirToolbar();
						});
				}
			},
		});
	}

	public reativar(planoEntrega: PlanoEntrega) {
		this.go.navigate(this.routeStatus, {
			metadata: {
				tipo: "PlanoEntrega",
				entity: planoEntrega,
				novoStatus: "ATIVO",
				onClick: this.dao!.reativar.bind(this.dao),
			},
			title: "Reativar Plano de Entregas",
			modalClose: (modalResult) => {
				if (modalResult) {
					(this.grid?.query || this.query!)
						.refreshId(planoEntrega.id)
						.then(() => {
							this.checaBotaoAderirToolbar();
						});
				}
			},
		});
	}

	public retirarHomologacao(planoEntrega: PlanoEntrega) {
		this.go.navigate(this.routeStatus, {
			metadata: {
				tipo: "PlanoEntrega",
				entity: planoEntrega,
				novoStatus: "INCLUIDO",
				onClick: this.dao!.retirarHomologacao.bind(this.dao),
			},
			title: "Retirar de Homologação",
			modalClose: (modalResult) => {
				if (modalResult) {
					(this.grid?.query || this.query!)
						.refreshId(planoEntrega.id)
						.then(() => {
							this.checaBotaoAderirToolbar();
						});
				}
			},
		});
	}

	public suspender(planoEntrega: PlanoEntrega) {
		this.go.navigate(this.routeStatus, {
			metadata: {
				tipo: "PlanoEntrega",
				entity: planoEntrega,
				novoStatus: "SUSPENSO",
				onClick: this.dao!.suspender.bind(this.dao),
			},
			title: "Suspender Plano de Entregas",
			modalClose: (modalResult) => {
				if (modalResult) {
					(this.grid?.query || this.query!)
						.refreshId(planoEntrega.id)
						.then(() => {
							this.checaBotaoAderirToolbar();
						});
				}
			},
		});
	}

	public disableMeus() {
		if (
			!this.filter ||
			!this.filter.controls.subordinadas ||
			!this.filter.controls.meus_planos
		) {
			console.warn("Formulário ou controles não inicializados corretamente.");
			return;
		}

		// Se "Unidades Subordinadas" está ativado, desativa "Meus Planos"
		if (this.filter.controls.subordinadas.value) {
			this.filter.controls.meus_planos.setValue(false);
		} else {
			this.filter.controls.meus_planos.setValue(true);
		}

		this.grid?.reloadFilter();
	}

	public disableSub() {
		if (
			!this.filter ||
			!this.filter.controls.subordinadas ||
			!this.filter.controls.meus_planos
		) {
			console.warn("Formulário ou controles não inicializados corretamente.");
			return;
		}

		// Se "Meus Planos" está ativado, desativa "Unidades Subordinadas"
		if (this.filter.controls.meus_planos.value) {
			this.filter!.controls.subordinadas.setValue(false);
			this.filter!.controls.principais.setValue(false);
		} else {
			this.filter!.controls.subordinadas.setValue(true);
		}

		this.grid?.reloadFilter();
	}

	public canAdd() {
		return this.auth.hasPermissionTo("MOD_PENT_INCL");
		/*
    - (RN_PENT_Z) ... O usuário logado precisa possuir a capacidade "MOD_PENT_INCL"
     */
	}
}
