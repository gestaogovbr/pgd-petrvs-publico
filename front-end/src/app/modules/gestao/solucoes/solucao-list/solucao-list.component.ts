import { Component, Injector, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { GridComponent } from "src/app/components/grid/grid.component";
import { ToolbarButton } from "src/app/components/toolbar/toolbar.component";
import { SolucaoDaoService } from "src/app/dao/solucao-dao.service";
import { UnidadeDaoService } from "src/app/dao/unidade-dao.service";
import { UsuarioDaoService } from "src/app/dao/usuario-dao.service";
import { Solucao } from "src/app/models/solucao.model";
import { PageListBase } from "src/app/modules/base/page-list-base";
import { SolucaoService } from "src/app/services/solucao.service";

@Component({
  selector: 'app-solucao-list',
  templateUrl: './solucao-list.component.html',
  styleUrls: ['./solucao-list.component.scss']
})
export class SolucaoListComponent extends PageListBase<Solucao, SolucaoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public catalogoService: SolucaoService;
  public usuarioDao: UsuarioDaoService;
  public unidadeDao: UnidadeDaoService;
  public botoes: ToolbarButton[] = [];
	public BOTAO_DETALHES: ToolbarButton;
  public BOTAO_CLONAR: ToolbarButton;
  public BOTAO_CONCLUIR: ToolbarButton;
  public BOTAO_CANCELAR: ToolbarButton;

  constructor(public injector: Injector, dao: SolucaoDaoService) {
    super(injector, Solucao, SolucaoDaoService);
    this.catalogoService = injector.get<SolucaoService>(SolucaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.title = this.lex.translate("Soluções");
    this.filter = this.fh.FormBuilder({
      agrupar: {default: true},
      nome: {default: ""},
      curador_responsavel_id: {default: ""},
      unidade_id: {default: ""},
      data_inicio: {default: ""},
      data_fim: {default: ""}
    });
    this.join = [
      "unidade",
      "responsavel"
    ];
    this.groupBy = [{field: "unidade.sigla", label: "Unidade"}];
    this.BOTAO_DETALHES = {
			label: "Detalhes",
			icon: "bi bi-eye",
			color: "btn-outline-success",
			onClick: this.edit.bind(this),
		};
    this.BOTAO_CLONAR = {
			label: "Clonar",
			icon: "bi bi-copy",
			color: "btn-outline-primary",
			onClick: this.edit.bind(this),
		};
    this.BOTAO_CONCLUIR = {
			label: "Concluir",
			icon: "bi bi-x-circle",
			color: "btn-outline-danger",
			onClick: this.edit.bind(this),
		};
    this.BOTAO_CANCELAR = {
			label: "Cancelar conclusão",
			icon: "bi bi-backspace",
			color: "btn-outline-warning",
			onClick: this.edit.bind(this),
		};
    this.botoes = [
			this.BOTAO_DETALHES,
      this.BOTAO_CLONAR,
      this.BOTAO_CONCLUIR,
      this.BOTAO_CANCELAR
    ]
  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  public dynamicButtons(row: Solucao): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    result.push(this.BOTAO_DETALHES);
    result.push(this.BOTAO_CLONAR);
    result.push(this.BOTAO_CONCLUIR);
    result.push(this.BOTAO_CANCELAR);
    return result;
  }

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

  public filterWhere = (filter: FormGroup) => {
		let result: any[] = [];
		let form: any = filter.value;

    if(form.nome?.length) {
      result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
    }
		if (form.data_inicio) {
			result.push(["data_inicio", ">=", form.data_inicio]);
    }
    if (form.data_fim) {
			result.push(["data_fim", "<=", form.data_fim]);
		}
		if (form.curador_responsavel_id) {
      result.push(["curador_responsavel_id", "==", form.curador_responsavel_id]);
    }
		if (form.unidade_id?.length) {
			result.push(["unidade_id", "==", form.unidade_id]);
    }
		return result;
	};

}