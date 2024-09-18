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
  public isCurador: boolean;

  constructor(public injector: Injector, dao: SolucaoDaoService) {
    super(injector, Solucao, SolucaoDaoService);
    this.catalogoService = injector.get<SolucaoService>(SolucaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    console.log(this.metadata);
    this.title = this.lex.translate("Soluções");
    this.filter = this.fh.FormBuilder({
      agrupar: {default: true},
      nome: {default: this.metadata?.nome ?? ""},
      usuario_id: {default: ""},
      unidade_id: {default: ""},
      id: {default: ""},
      status: {default: ""}
    });
    this.join = [
      "unidade",
      "responsavel"
    ];
    this.groupBy = [{field: "unidade.sigla", label: "Unidade"}];
    this.botoes = [
    ]
    this.options.push({
      icon: "bi bi-info-circle",
      label: "Informações",
      onClick: this.consult.bind(this)
    });

    // Testa se o usuário possui permissão para excluir o tipo de atividade
    if (this.auth.hasPermissionTo("MOD_PROD_CAT_EXCL")) {
      this.options.push({
        icon: "bi bi-trash",
        label: "Excluir",
        onClick: this.delete.bind(this)
      });
    }

    this.isCurador = this.auth.isUsuarioCurador()
  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  public dynamicButtons(row: Solucao): ToolbarButton[] {
    let result: ToolbarButton[] = [];
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
    if(form.id?.length) {
      result.push(["id", "like", "%" + form.id.trim().replace(" ", "%") + "%"]);
    }
		if (form.usuario_id) {
      result.push(["responsavel_id", "==", form.curador_responsavel_id]);
    }
		if (form.unidade_id?.length) {
			result.push(["unidade_id", "==", form.unidade_id]);
    }
    if (form.status) {
      result.push(["status", "==", form.status]);
    }
		return result;
	};

  public onBuscaAvancada() {
    this.go.navigate({ route: ["gestao", "solucao", "filter"] }, {
      metadata: {
        nome: this.filter?.controls.nome.value,
        id: this.filter?.controls.id.value,
        usuario_id: this.filter?.controls.usuario_id.value,
        status:this.filter?.controls.status.value
      },
      modalClose: async (result) => {
        if (result && this.filter) {
          this.filter?.controls.nome.setValue(result.nome);
          this.filter?.controls.id.setValue(result.id);
          this.filter?.controls.usuario_id.setValue(result.usuario_id);
          this.filter?.controls.status.setValue(result.status);
          this.grid!.reloadFilter();
        }
      },
    });
  }

  public onFilterClear(){
    this.filter?.reset()
    this.grid!.reloadFilter();
  }
}